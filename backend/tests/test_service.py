"""Runs without shap or fastapi: trains tiny stand-ins shaped like the two notebooks' models,
exports them with export_utils, and exercises loading, validation and prediction.
    pytest tests -q
"""
import sys
from pathlib import Path

import numpy as np
import pandas as pd
import pytest
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))
import export_utils  # noqa: E402
import explain  # noqa: E402
import labels  # noqa: E402
import service  # noqa: E402


@pytest.fixture(scope="module")
def models_dir(tmp_path_factory):
    d = tmp_path_factory.mktemp("models")
    rng = np.random.default_rng(0)

    # crop-like: bare RF on 7 numeric features
    cls = np.array(["rice", "maize", "jute"])
    y = rng.choice(cls, 300)
    X = pd.DataFrame({c: rng.normal(50, 10, 300) + 15 * (y == "rice") for c in
                      ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]})
    Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    crop = RandomForestClassifier(n_estimators=20, random_state=42).fit(Xtr, ytr)
    export_utils.export_module("crop", crop, Xtr, pd.Series(ytr), Xte, yte, "synthetic", out_dir=d)

    # fertilizer-like: pipeline with imputer + one-hot, NaNs in training data
    num = ["Temperature", "Moisture", "Rainfall", "PH", "Nitrogen", "Phosphorous", "Potassium", "Carbon"]
    df = pd.DataFrame({c: rng.normal(30, 5, 400) for c in num})
    df.loc[::17, "Rainfall"] = np.nan
    df["Soil"] = rng.choice(["Loamy Soil", "Acidic Soil"], 400)
    df["Crop"] = rng.choice(["rice", "Kidney Beans"], 400)
    yf = np.where(df["Soil"] == "Loamy Soil", "DAP", "Lime")
    Xtr, Xte, ytr, yte = train_test_split(df, yf, test_size=0.2, random_state=42, stratify=yf)
    pre = ColumnTransformer([
        ("numeric", Pipeline([("imputer", SimpleImputer(strategy="median"))]), num),
        ("categorical", Pipeline([("imputer", SimpleImputer(strategy="most_frequent")),
                                  ("encoder", OneHotEncoder(handle_unknown="ignore"))]), ["Soil", "Crop"]),
    ])
    fert = Pipeline([("preprocessor", pre),
                     ("classifier", RandomForestClassifier(n_estimators=20, random_state=42))]).fit(Xtr, ytr)
    export_utils.export_module("fertilizer", fert, Xtr, pd.Series(ytr), Xte, yte, "synthetic", out_dir=d,
                               remarks={"DAP": "Phosphorus source", "Lime": "Raises soil pH"})

    # yield-like: regressor pipeline with calendar columns computed from a date
    n = 600
    dates = pd.date_range("2014-01-01", periods=n)
    month, doy = dates.month.values, dates.dayofyear.values
    yd = pd.DataFrame({
        "Soil_pH": rng.normal(6.5, .5, n), "Temperature": rng.normal(20, 8, n),
        "Humidity": rng.normal(60, 10, n), "Wind_Speed": rng.normal(8, 2, n),
        "N": rng.normal(60, 10, n), "P": rng.normal(40, 5, n), "K": rng.normal(40, 5, n),
        "Year": dates.year.values, "Month_Sin": np.sin(2 * np.pi * month / 12),
        "Month_Cos": np.cos(2 * np.pi * month / 12),
        "DayOfYear_Sin": np.sin(2 * np.pi * doy / 365.25), "DayOfYear_Cos": np.cos(2 * np.pi * doy / 365.25),
        "Crop_Type": rng.choice(["Corn", "Wheat", "Rice"], n), "Soil_Type": rng.choice(["Loamy", "Clay"], n),
    })
    yd.loc[::13, "Wind_Speed"] = np.nan
    target = np.where((month >= 6) & (month <= 8), 0.0, 30 + 0.3 * yd["Temperature"].values + rng.normal(0, 2, n))
    cut = int(n * 0.8)
    ynum = [c for c in yd.columns if c not in ("Crop_Type", "Soil_Type")]
    ypre = ColumnTransformer([
        ("numeric", Pipeline([("imputer", SimpleImputer(strategy="median"))]), ynum),
        ("categorical", Pipeline([("imputer", SimpleImputer(strategy="most_frequent")),
                                  ("encoder", OneHotEncoder(handle_unknown="ignore"))]), ["Crop_Type", "Soil_Type"]),
    ])
    ymodel = Pipeline([("preprocessor", ypre),
                       ("regressor", RandomForestRegressor(n_estimators=15, random_state=42))])
    ymodel.fit(yd.iloc[:cut], target[:cut])
    cal_cols = ["Month_Sin", "Month_Cos", "DayOfYear_Sin", "DayOfYear_Cos"]
    export_utils.export_module("yield", ymodel, yd.iloc[:cut], pd.Series(target[:cut]), yd.iloc[cut:],
                               pd.Series(target[cut:]), "synthetic", out_dir=d,
                               derived=["Year"] + cal_cols, merge={"Season": cal_cols})
    return d


@pytest.fixture(scope="module")
def reg(models_dir):
    r = service.Registry(models_dir)
    r.load()
    return r


CROP = dict(N=50, P=50, K=50, temperature=50, humidity=50, ph=50, rainfall=50)
FERT = dict(Temperature=30, Moisture=30, Rainfall=30, PH=30, Nitrogen=30, Phosphorous=30,
            Potassium=30, Carbon=30, Soil="Loamy", Crop="Kidney Beans")


def test_metadata_contents(models_dir):
    import json
    m = json.loads((models_dir / "fertilizer" / "metadata.json").read_text())
    assert m["classes"] == ["DAP", "Lime"] and m["n_trees"] == 20
    assert m["profiles"]["DAP"]["Nitrogen"][0] <= m["profiles"]["DAP"]["Nitrogen"][1] <= m["profiles"]["DAP"]["Nitrogen"][2]
    assert {"accuracy", "macro_f1", "top3_accuracy"} <= set(m["metrics"])


def test_crop_response_shape(reg):
    r = service.predict_classification(reg, "crop", CROP)
    assert r["top"] == r["ranking"][0]["name"]
    assert abs(sum(x["p"] for x in r["ranking"]) - 1) < 0.01
    assert set(r["profile"]) == set(CROP) and len(r["profile"]["N"]) == 3
    assert r["trees"] == 20


def test_fertilizer_aliases_and_remark(reg):
    payload = {k.lower(): v for k, v in FERT.items()}
    payload.update(n=30, p=30, k=30)  # short names for the nutrients
    for k in ("nitrogen", "phosphorous", "potassium"):
        payload.pop(k)
    r = service.predict_classification(reg, "fertilizer", payload)
    assert r["top"] in ("DAP", "Lime") and r["remark"]


def test_soil_name_variants_resolve(reg):
    b = reg.get("fertilizer")
    assert service.build_row(b, {**FERT, "Soil": "loamy soil"})["Soil"][0] == "Loamy Soil"
    assert service.build_row(b, {**FERT, "Crop": "kidneybeans"})["Crop"][0] == "Kidney Beans"


@pytest.mark.parametrize("bad, status", [
    ({**CROP, "N": "abc"}, 422), ({**CROP, "N": 1e6}, 422), ({**CROP, "N": float("nan")}, 422),
    ({**CROP, "N": True}, 422), ({k: v for k, v in CROP.items() if k != "K"}, 422), ([1, 2], 400),
])
def test_crop_rejects_bad_input(reg, bad, status):
    with pytest.raises(service.ApiError) as e:
        service.predict_classification(reg, "crop", bad)
    assert e.value.status == status


def test_unknown_category_rejected(reg):
    with pytest.raises(service.ApiError) as e:
        service.predict_classification(reg, "fertilizer", {**FERT, "Soil": "Martian"})
    assert e.value.status == 422 and "Allowed" in e.value.message


def test_missing_model_is_503(tmp_path_factory):
    empty = service.Registry(tmp_path_factory.mktemp("empty"))
    empty.load()
    with pytest.raises(service.ApiError) as e:
        service.predict_yield(empty, {})
    assert e.value.status == 503


YIELD = dict(Crop_Type="Corn", Soil_Type="Loamy", Soil_pH=6.5, Temperature=20, Humidity=60,
             Wind_Speed=8, N=60, P=40, K=40)


def test_yield_metadata(models_dir):
    import json
    m = json.loads((models_dir / "yield" / "metadata.json").read_text())
    assert m["task"] == "regression" and m["interval"]["q_low"] < m["interval"]["q_high"]
    assert {"mae", "rmse", "r2", "mae_nonzero", "mae_zero"} <= set(m["metrics"])


def test_yield_response_shape(reg):
    r = service.predict_yield(reg, {**YIELD, "month": 4})
    assert r["low"] <= r["value"] <= r["high"] and r["value"] >= 0
    assert {c["name"] for c in r["by_crop"]} == {"Corn", "Wheat", "Rice"}
    assert len(r["sweep"]) == 25 and r["sweep"][0]["x"] < r["sweep"][-1]["x"]
    assert "assumptions" not in r  # month was supplied, so nothing was assumed


def test_yield_season_matters_and_default_is_reported(reg):
    spring = service.predict_yield(reg, {**YIELD, "month": 4})["value"]
    summer = service.predict_yield(reg, {**YIELD, "month": 7})["value"]
    assert spring > summer + 5  # the stand-in data is zero in June to August
    r = service.predict_yield(reg, YIELD)  # no date at all
    assert r["assumptions"]["date_assumed"] is True
    d = service.predict_yield(reg, {**YIELD, "date": "2023-04-10"})
    assert "assumptions" not in d


def test_yield_aliases_and_validation(reg):
    alias = {"crop": "Wheat", "soil": "Clay", "ph": 6.5, "temperature": 20, "humidity": 60, "wind": 8,
             "n": 60, "p": 40, "k": 40, "month": 4}
    assert service.predict_yield(reg, alias)["value"] >= 0
    for bad in ({**YIELD, "month": 13}, {**YIELD, "month": "x"}, {**YIELD, "date": "nope"},
                {**YIELD, "Temperature": 500}, {k: v for k, v in YIELD.items() if k != "N"}):
        with pytest.raises(service.ApiError) as e:
            service.predict_yield(reg, bad)
        assert e.value.status == 422
    with pytest.raises(service.ApiError) as e:
        service.predict_yield(reg, [1])
    assert e.value.status == 400


def test_yield_effects_always_present_with_dashboard_labels(reg):
    r = service.predict_yield(reg, {**YIELD, "month": 4})  # no explainer in this fixture
    labs = [e["label"] for e in r["effects"]]
    assert set(labs) == {"Soil pH", "Temperature", "Relative humidity", "Wind speed",
                         "Nitrogen", "Phosphorus", "Potassium"}
    assert [abs(e["delta"]) for e in r["effects"]] == sorted((abs(e["delta"]) for e in r["effects"]), reverse=True)
    hot = service.predict_yield(reg, {**YIELD, "Temperature": 40, "month": 4})["effects"]
    assert next(e for e in hot if e["label"] == "Temperature")["delta"] != 0


def test_yield_explanation_keeps_raw_names_and_merges_season(reg):
    b = reg.get("yield")

    class Fake:
        def explain_row(self, X, cls):
            assert cls is None and list(X.columns) == b.columns
            return [{"feature": c, "value": 0.0, "shap": 1.0} for c in b.columns]
    b.explainer = Fake()
    try:
        r = service.predict_yield(reg, {**YIELD, "month": 4})
    finally:
        b.explainer = None
    by = {e["feature"]: e for e in r["explanation"]}
    assert by["Season"]["shap"] == 4.0 and by["Season"]["value"] == 4
    assert "Soil_pH" in by and "Month_Sin" not in by
    assert r["effects"]  # still there next to the SHAP explanation


def test_dashboard_block_shapes(reg, models_dir):
    import json
    crop = service.meta_summary(reg)["crop"]
    assert set(crop["metrics"]) == {"accuracy", "top3", "macro_f1"}
    yb = labels.dashboard_block("yield", json.loads((models_dir / "yield" / "metadata.json").read_text()))
    assert set(yb["metrics"]) == {"r2", "mae", "rmse"}
    fb = json.loads((models_dir / "fertilizer" / "dashboard.json").read_text())
    assert set(fb) == {"metrics", "importance"}
    # importance (when SHAP ran) is {display label: share}; here shap is absent so it is None
    assert fb["importance"] is None or all(0 <= v <= 1 for v in fb["importance"].values())


def test_importance_uses_dashboard_labels():
    meta = {"task": "classification", "metrics": {"accuracy": .9, "top3_accuracy": .99, "macro_f1": .8},
            "importance": [{"feature": "ph", "importance": .6}, {"feature": "N", "importance": .4}]}
    b = labels.dashboard_block("crop", meta)
    assert b["importance"] == {"Soil pH": .6, "Nitrogen": .4} and b["metrics"]["top3"] == .99
