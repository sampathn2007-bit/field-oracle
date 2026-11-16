"""Run this in the Colab notebooks (after training) to export a model for the API.

    from export_utils import export_module
    export_module("crop", crop_model, X_train_core, y_train_core, X_test_core, y_test_core,
                  trained_on="Crop_recommendationV2_noisy.csv")

    export_module("yield", yield_model, X_train, y_train, X_test, y_test, trained_on="...",
                  derived=["Year", "Month_Sin", "Month_Cos", "DayOfYear_Sin", "DayOfYear_Cos"],
                  merge={"Season": ["Month_Sin", "Month_Cos", "DayOfYear_Sin", "DayOfYear_Cos"]})

Writes  models/<name>/model.joblib, metadata.json and dashboard.json.
Classification: features and ranges, classes, metrics, per-class profiles, remarks, global SHAP importance.
Regression: the same, plus an 80% interval taken from test-set residuals and zero/non-zero error split.
`derived` = model columns the API computes from a date (not asked from the user).
`merge`   = columns shown as one feature in explanations (e.g. the calendar columns as "Season").
Upload explain.py, labels.py and export_utils.py to Colab next to the notebook; `pip install shap` first.
"""
from __future__ import annotations

import json
import platform
from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import sklearn
from sklearn.metrics import accuracy_score, f1_score, mean_absolute_error, mean_squared_error, r2_score

from explain import Explainer, merge_rows, split_model
from labels import dashboard_block


def _profiles(X: pd.DataFrame, y, numeric_cols):
    """Per class and numeric feature: [10th percentile, mean, 90th percentile]."""
    y = np.asarray(y)
    out = {}
    for cls in sorted(set(y)):
        sub = X[y == cls]
        out[str(cls)] = {
            c: [
                round(float(sub[c].quantile(0.10)), 2),
                round(float(sub[c].mean()), 2),
                round(float(sub[c].quantile(0.90)), 2),
            ]
            for c in numeric_cols
        }
    return out


def export_module(name, model, X_train, y_train, X_test, y_test, trained_on, out_dir="models",
                  remarks=None, importance_rows=200, derived=None, merge=None):
    out = Path(out_dir) / name
    out.mkdir(parents=True, exist_ok=True)
    _, clf = split_model(model)
    is_clf = hasattr(clf, "classes_")
    cols = list(X_train.columns)

    features, numeric_cols = [], []
    for c in cols:
        s = X_train[c]
        if pd.api.types.is_numeric_dtype(s):
            numeric_cols.append(c)
            features.append({"name": c, "type": "numeric", "min": round(float(np.nanmin(s)), 4),
                             "max": round(float(np.nanmax(s)), 4), "median": round(float(np.nanmedian(s)), 4)})
        else:
            features.append({"name": c, "type": "categorical",
                             "categories": sorted(str(v) for v in s.dropna().unique())})

    pred = model.predict(X_test)
    meta_extra = {}
    if is_clf:
        proba = model.predict_proba(X_test)
        classes = np.asarray(clf.classes_)
        top3 = float(np.mean([t in classes[np.argsort(-p)[:3]] for t, p in zip(y_test, proba)]))
        metrics = {
            "accuracy": round(float(accuracy_score(y_test, pred)), 4),
            "macro_f1": round(float(f1_score(y_test, pred, average="macro")), 4),
            "top3_accuracy": round(top3, 4),
        }
        meta_extra = {"task": "classification", "classes": [str(c) for c in classes],
                      "profiles": _profiles(X_train, y_train, numeric_cols), "remarks": remarks or {}}
    else:
        y_arr = np.asarray(y_test, dtype=float)
        resid = y_arr - pred
        nz = y_arr > 0
        metrics = {
            "mae": round(float(mean_absolute_error(y_arr, pred)), 4),
            "rmse": round(float(np.sqrt(mean_squared_error(y_arr, pred))), 4),
            "r2": round(float(r2_score(y_arr, pred)), 4),
            "mae_nonzero": round(float(np.abs(resid[nz]).mean()), 4) if nz.any() else None,
            "mae_zero": round(float(np.abs(resid[~nz]).mean()), 4) if (~nz).any() else None,
            "zero_share_test": round(float((~nz).mean()), 4),
        }
        meta_extra = {
            "task": "regression",
            # marginal 80% interval from test-set residuals: prediction + q_low .. prediction + q_high
            "interval": {"level": 0.8, "source": "test-set residuals",
                         "q_low": round(float(np.quantile(resid, 0.10)), 4),
                         "q_high": round(float(np.quantile(resid, 0.90)), 4)},
            "sweep_feature": "Temperature", "crop_feature": "Crop_Type",
        }
    metrics.update({"n_train": int(len(X_train)), "n_test": int(len(X_test))})

    importance = None
    try:
        importance = Explainer(model, cols).global_importance(X_train, max_rows=importance_rows)
        importance = merge_rows(importance, merge, "importance")
    except Exception as e:  # shap missing or failed: export anyway
        print("Global SHAP importance skipped:", repr(e))

    meta = {
        "module": name,
        "model_file": "model.joblib",
        "trained_on": trained_on,
        "created": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "features": features,
        "derived": list(derived or []),
        "merge": merge or {},
        "n_trees": getattr(clf, "n_estimators", None),
        "metrics": metrics,
        "importance": importance,
        "versions": {"python": platform.python_version(), "sklearn": sklearn.__version__,
                     "pandas": pd.__version__, "numpy": np.__version__},
        **meta_extra,
    }
    joblib.dump(model, out / "model.joblib", compress=3)
    (out / "metadata.json").write_text(json.dumps(meta, indent=2, default=str), encoding="utf-8")
    # Optional: paste these two keys under CONFIG.<module> in the dashboard's js/config.js to show its
    # "Model performance" card. The dashboard hides the card while they are absent.
    block = dashboard_block(name, meta)
    (out / "dashboard.json").write_text(json.dumps(block, indent=2), encoding="utf-8")
    print("dashboard config block:", json.dumps(block))
    print(f"Exported {name} -> {out}  |  {metrics}")
    return meta
