"""Model registry, input validation and prediction. No web framework in here, so it is easy to test."""
from __future__ import annotations

import json
import logging
import math
import os
import re
from datetime import date as _date, datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import sklearn

from labels import dashboard_block, label  # noqa: E402

log = logging.getLogger("field_oracle")

# Dashboard-side spellings accepted for model columns (matched after lower-casing and stripping symbols).
INPUT_ALIASES = {"n": "nitrogen", "p": "phosphorous", "phosphorus": "phosphorous", "k": "potassium",
                 "crop": "croptype", "soil": "soiltype", "ph": "soilph", "wind": "windspeed",
                 "temp": "temperature"}

# Optional date inputs for the yield model (it was trained with calendar features).
CAL_KEYS = {"date", "month", "year"}


class ApiError(Exception):
    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status, self.message = status, message


def _key(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", str(s).lower())


class Bundle:
    def __init__(self, name, model, meta, explainer=None):
        self.name, self.model, self.meta, self.explainer = name, model, meta, explainer
        self.features = meta["features"]
        self.columns = [f["name"] for f in self.features]


class Registry:
    def __init__(self, models_dir):
        self.models_dir = Path(models_dir)
        self.bundles: dict[str, Bundle] = {}

    def load(self):
        for meta_path in sorted(self.models_dir.glob("*/metadata.json")):
            name = meta_path.parent.name
            try:
                meta = json.loads(meta_path.read_text(encoding="utf-8"))
                trained_with = meta.get("versions", {}).get("sklearn")
                if trained_with and trained_with != sklearn.__version__:
                    log.warning("%s: trained with scikit-learn %s but serving with %s; "
                                "pin the same version", name, trained_with, sklearn.__version__)
                model = joblib.load(meta_path.parent / meta.get("model_file", "model.joblib"))
                explainer = None
                if os.getenv("SHAP_ENABLED", "1") != "0":
                    try:
                        from explain import Explainer
                        explainer = Explainer(model, [f["name"] for f in meta["features"]])
                    except Exception as e:
                        log.warning("%s: SHAP explanations disabled (%r)", name, e)
                self.bundles[name] = Bundle(name, model, meta, explainer)
                log.info("Loaded model '%s' (%d classes)", name, len(meta.get("classes", [])))
            except Exception:
                log.exception("Could not load model '%s'", name)

    def get(self, name) -> Bundle:
        b = self.bundles.get(name)
        if b is None:
            raise ApiError(503, f"The {name} model is not available yet")
        return b

    def status(self):
        return {m: (m in self.bundles) for m in ("crop", "fertilizer", "yield")}


# ---------------------------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------------------------
def _bounds(f):
    """Soft server-side bounds: observed range widened by 25%, never below 0 for non-negative features.
    Add "valid_min" / "valid_max" to a feature in metadata.json to set hard limits instead."""
    lo, hi = f["min"], f["max"]
    span = (hi - lo) or abs(hi) or 1.0
    lo2, hi2 = lo - 0.25 * span, hi + 0.25 * span
    if lo >= 0:
        lo2 = max(lo2, 0.0)
    return f.get("valid_min", lo2), f.get("valid_max", hi2)


def _lookup(columns):
    look = {_key(c): c for c in columns}
    for alias, target in INPUT_ALIASES.items():
        if _key(target) in look:
            look.setdefault(alias, look[_key(target)])
    return look


def _canonical_category(value, categories):
    vk = _key(value)
    for cat in categories:
        ck = _key(cat)
        if vk in (ck, ck + "soil") or vk + "soil" == ck:
            return cat
    return None


def build_row(bundle: Bundle, payload: dict, skip=()) -> pd.DataFrame:
    if not isinstance(payload, dict):
        raise ApiError(400, "Request body must be a JSON object")
    look = _lookup(bundle.columns)
    given = {}
    for k, v in payload.items():
        col = look.get(_key(k))
        if col is not None:
            given[col] = v

    missing = [c for c in bundle.columns if c not in given and c not in skip]
    if missing:
        raise ApiError(422, "Missing fields: " + ", ".join(missing))

    row = {}
    for f in bundle.features:
        if f["name"] in skip:
            continue
        name, v = f["name"], given[f["name"]]
        if f["type"] == "numeric":
            if isinstance(v, bool):
                raise ApiError(422, f"{name} must be a number")
            try:
                x = float(v)
            except (TypeError, ValueError):
                raise ApiError(422, f"{name} must be a number") from None
            if not math.isfinite(x):
                raise ApiError(422, f"{name} must be a finite number")
            lo, hi = _bounds(f)
            if not lo <= x <= hi:
                raise ApiError(422, f"{name} = {x:g} is outside the accepted range {lo:g} to {hi:g}")
            row[name] = x
        else:
            cat = _canonical_category(v, f["categories"])
            if cat is None:  # the one-hot encoder would silently ignore this, so reject it here
                raise ApiError(422, f"{name} '{v}' is not recognised. Allowed: " + ", ".join(f["categories"]))
            row[name] = cat
    return pd.DataFrame([row]).reindex(columns=bundle.columns)


# ---------------------------------------------------------------------------------------------
# Prediction
# ---------------------------------------------------------------------------------------------
def predict_classification(registry: Registry, module: str, payload: dict) -> dict:
    b = registry.get(module)
    X = build_row(b, payload)

    proba = b.model.predict_proba(X)[0]
    classes = [str(c) for c in (b.model.classes_ if hasattr(b.model, "classes_")
                                else b.model[-1].classes_)]
    order = np.argsort(-proba)
    ranking = [{"name": classes[i], "p": round(float(proba[i]), 4)} for i in order]
    top = ranking[0]["name"]

    resp = {
        "ranking": ranking,
        "top": top,
        "profile": b.meta.get("profiles", {}).get(top, {}),
        "trees": b.meta.get("n_trees"),
    }
    remark = b.meta.get("remarks", {}).get(top)
    if remark:
        resp["remark"] = remark

    if b.explainer is not None:
        try:
            resp["explanation"] = b.explainer.explain_row(X, top)
        except Exception:
            log.exception("SHAP failed for %s; returning prediction without explanation", module)
    return resp


def _calendar(payload: dict) -> dict:
    """Optional `date` (YYYY-MM-DD) or `month` (1-12) [+ `year`]. If none is given, today's date is used
    and the response says so under `assumptions`."""
    raw = {_key(k): v for k, v in payload.items() if _key(k) in CAL_KEYS}
    blank = lambda v: v is None or v == ""
    today = datetime.now(timezone.utc).date()
    assumed = False
    try:
        if not blank(raw.get("date")):
            d = _date.fromisoformat(str(raw["date"])[:10])
        elif not blank(raw.get("month")):
            m = raw["month"]
            if isinstance(m, bool) or (isinstance(m, float) and not m.is_integer()):
                raise ValueError
            year = today.year if blank(raw.get("year")) else int(raw["year"])
            d = _date(year, int(m), 15)  # mid-month when only the month is known
        else:
            d, assumed = today, True
    except (TypeError, ValueError):
        raise ApiError(422, "month must be 1-12, year a valid year, date YYYY-MM-DD") from None
    return {"year": d.year, "month": d.month, "doy": d.timetuple().tm_yday, "assumed": assumed}


def _calendar_columns(cal: dict) -> dict:
    two_pi = 2 * math.pi  # same formulas as the training notebook
    return {
        "Year": cal["year"],
        "Month_Sin": math.sin(two_pi * cal["month"] / 12),
        "Month_Cos": math.cos(two_pi * cal["month"] / 12),
        "DayOfYear_Sin": math.sin(two_pi * cal["doy"] / 365.25),
        "DayOfYear_Cos": math.cos(two_pi * cal["doy"] / 365.25),
    }


def _repeat(X: pd.DataFrame, n: int) -> pd.DataFrame:
    return pd.concat([X] * n, ignore_index=True)


def predict_yield(registry: Registry, payload: dict) -> dict:
    from explain import merge_rows

    b = registry.get("yield")
    if not isinstance(payload, dict):
        raise ApiError(400, "Request body must be a JSON object")
    cal = _calendar(payload)
    derived = set(b.meta.get("derived", []))
    user = {k: v for k, v in payload.items() if _key(k) not in CAL_KEYS}
    X = build_row(b, user, skip=derived)
    for c, v in _calendar_columns(cal).items():
        if c in derived:
            X[c] = v
    X = X[b.columns]

    value = max(0.0, float(b.model.predict(X)[0]))
    iv = b.meta.get("interval") or {}
    low = min(value, max(0.0, value + iv.get("q_low", 0.0)))
    high = max(value, value + iv.get("q_high", 0.0))
    resp = {"value": round(value, 2), "low": round(low, 2), "high": round(high, 2)}

    by_name = {f["name"]: f for f in b.features}
    crop_f = by_name.get(b.meta.get("crop_feature", "Crop_Type"))
    if crop_f:  # same conditions, every crop
        cats = crop_f["categories"]
        Xc = _repeat(X, len(cats))
        Xc[crop_f["name"]] = cats
        vals = np.maximum(b.model.predict(Xc), 0)
        resp["by_crop"] = sorted(({"name": c, "value": round(float(v), 2)} for c, v in zip(cats, vals)),
                                 key=lambda r: r["value"], reverse=True)

    sweep_f = by_name.get(b.meta.get("sweep_feature", "Temperature"))
    if sweep_f:  # response to one input, others held fixed
        xs = np.linspace(sweep_f["min"], sweep_f["max"], 25)
        Xs = _repeat(X, len(xs))
        Xs[sweep_f["name"]] = xs
        ys = np.maximum(b.model.predict(Xs), 0)
        resp["sweep"] = [{"x": round(float(x), 2), "y": round(float(y), 2)} for x, y in zip(xs, ys)]

    # Always present (the dashboard needs it): each numeric input set to its typical value in turn,
    # shown as how much that moves the forecast. Independent of SHAP.
    nums = [f for f in b.features if f["type"] == "numeric" and f["name"] not in derived]
    Xe = _repeat(X, len(nums))
    for i, f in enumerate(nums):
        Xe.loc[i, f["name"]] = f.get("median", (f["min"] + f["max"]) / 2)
    alt = np.maximum(b.model.predict(Xe), 0)
    resp["effects"] = sorted(
        ({"label": label("yield", f["name"]), "delta": round(value - float(a), 2)} for f, a in zip(nums, alt)),
        key=lambda e: abs(e["delta"]), reverse=True)

    if b.explainer is not None:
        try:
            expl = b.explainer.explain_row(X, None)  # raw column names; the dashboard maps them to labels
            resp["explanation"] = merge_rows(expl, b.meta.get("merge"), "shap", values={"Season": cal["month"]})
        except Exception:
            log.exception("SHAP failed for yield; returning prediction without explanation")

    if cal["assumed"]:  # the dashboard sends no date, so say which one was used
        resp["assumptions"] = {"month": cal["month"], "year": cal["year"], "date_assumed": True}
    return resp


def meta_summary(registry: Registry) -> dict:
    """Per model: the dashboard-shaped `metrics` / `importance` (paste into config.js), plus extras."""
    out = {}
    for name, b in registry.bundles.items():
        derived = set(b.meta.get("derived", []))
        out[name] = {
            **dashboard_block(name, b.meta),
            "task": b.meta.get("task"),
            "classes": b.meta.get("classes"),
            "trained_on": b.meta.get("trained_on"),
            "interval": b.meta.get("interval"),
            "features": [f for f in b.features if f["name"] not in derived],
        }
    return out
