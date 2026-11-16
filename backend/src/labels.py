"""Display labels and the dashboard-shaped `metrics` / `importance` block.

FIELD_LABELS mirrors the `label` values in the dashboard's js/config.js, so the API can return the
names the dashboard shows without the dashboard changing. Used by both service.py and export_utils.py.
"""
from __future__ import annotations

FIELD_LABELS = {
    "crop": {"N": "Nitrogen", "P": "Phosphorus", "K": "Potassium", "temperature": "Temperature",
             "humidity": "Relative humidity", "ph": "Soil pH", "rainfall": "Rainfall"},
    "fertilizer": {"Temperature": "Temperature", "Moisture": "Soil moisture", "Rainfall": "Rainfall",
                   "PH": "Soil pH", "Nitrogen": "Nitrogen", "Phosphorous": "Phosphorus",
                   "Potassium": "Potassium", "Carbon": "Soil carbon", "Soil": "Soil", "Crop": "Crop"},
    "yield": {"Soil_pH": "Soil pH", "Temperature": "Temperature", "Humidity": "Relative humidity",
              "Wind_Speed": "Wind speed", "N": "Nitrogen", "P": "Phosphorus", "K": "Potassium",
              "Crop_Type": "Crop type", "Soil_Type": "Soil type"},
}


def label(module: str, column: str) -> str:
    return FIELD_LABELS.get(module, {}).get(column, column.replace("_", " "))


def dashboard_block(module: str, meta: dict) -> dict:
    """The `metrics` and `importance` the dashboard reads from CONFIG[module] (see modelCard in app.js).

    metrics:    classifiers {accuracy, top3, macro_f1}; yield {r2, mae, rmse}  (fractions, not percents)
    importance: {display label: share between 0 and 1}
    """
    m = meta.get("metrics") or {}
    if meta.get("task") == "regression":
        metrics = {"r2": m.get("r2"), "mae": m.get("mae"), "rmse": m.get("rmse")}
    else:
        metrics = {"accuracy": m.get("accuracy"), "top3": m.get("top3_accuracy"), "macro_f1": m.get("macro_f1")}
    imp = {label(module, r["feature"]): r["importance"] for r in (meta.get("importance") or [])}
    return {"metrics": metrics if m else None, "importance": imp or None}
