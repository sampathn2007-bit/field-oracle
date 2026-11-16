"""SHAP layer: per-prediction explanations and global importance.

Works for a bare tree classifier (crop) or a sklearn Pipeline whose last step is a tree classifier
(fertilizer). One-hot columns are summed back into one contribution per original input feature.
`shap` is imported lazily so the rest of the backend still runs if it is not installed.
"""
from __future__ import annotations

import os

import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline


def split_model(model):
    """Return (preprocessing_or_None, final_estimator)."""
    if isinstance(model, Pipeline):
        pre = model[:-1] if len(model.steps) > 1 else None
        return pre, model.steps[-1][1]
    return None, model


def group_index(pre, input_cols):
    """For each transformed column, the index of the original input feature it came from."""
    if pre is None:
        return np.arange(len(input_cols))
    idx = []
    for name in pre.get_feature_names_out():
        base = name.split("__", 1)[1] if "__" in name else name
        best = None
        for j, c in enumerate(input_cols):
            if base == c or base.startswith(c + "_"):
                if best is None or len(c) > len(input_cols[best]):
                    best = j
        if best is None:
            raise ValueError(f"Cannot map transformed column '{name}' to an input feature")
        idx.append(best)
    return np.array(idx)


def _py(v):
    return v.item() if isinstance(v, np.generic) else v


class Explainer:
    def __init__(self, model, input_cols):
        import shap  # lazy

        self.pre, self.clf = split_model(model)
        self.input_cols = list(input_cols)
        self.group = group_index(self.pre, self.input_cols)
        # classifiers have classes_; regressors do not (a single output)
        self.classes = [str(c) for c in self.clf.classes_] if hasattr(self.clf, "classes_") else None
        self.explainer = shap.TreeExplainer(self.clf)

    # -- internals -------------------------------------------------------------------------
    def _dense(self, X: pd.DataFrame) -> np.ndarray:
        Z = X[self.input_cols] if self.pre is None else self.pre.transform(X)
        if hasattr(Z, "toarray"):
            Z = Z.toarray()
        return np.asarray(Z, dtype=float)

    def _shap(self, X: pd.DataFrame) -> np.ndarray:
        """Return SHAP values shaped (rows, transformed_features, classes).

        Older SHAP returns a list of per-class arrays; newer returns one 3-D array. Handle both.
        """
        kwargs = {"check_additivity": False}
        if os.getenv("SHAP_APPROX") == "1":  # much faster on deep forests, but approximate (Saabas)
            kwargs["approximate"] = True
        sv = self.explainer.shap_values(self._dense(X), **kwargs)
        if isinstance(sv, list):
            sv = np.stack([np.asarray(a) for a in sv], axis=-1)
        sv = np.asarray(sv)
        if sv.ndim == 2:
            sv = sv[:, :, None]
        return sv

    def _collapse(self, sv: np.ndarray) -> np.ndarray:
        """Sum one-hot columns back into the original features: (rows, input_features, classes)."""
        out = np.zeros((sv.shape[0], len(self.input_cols), sv.shape[2]))
        for t, g in enumerate(self.group):
            out[:, g, :] += sv[:, t, :]
        return out

    # -- public ----------------------------------------------------------------------------
    def explain_row(self, X_row: pd.DataFrame, class_name=None):
        """SHAP values of one row, largest effect first. class_name selects the class for classifiers;
        for regressors leave it None (values are in the units of the target)."""
        k = 0 if self.classes is None else self.classes.index(str(class_name))
        vals = self._collapse(self._shap(X_row))[0, :, k]
        row = X_row.iloc[0]
        out = [
            {"feature": f, "value": _py(row[f]), "shap": round(float(v), 4)}
            for f, v in zip(self.input_cols, vals)
        ]
        return sorted(out, key=lambda r: abs(r["shap"]), reverse=True)

    def global_importance(self, X: pd.DataFrame, max_rows: int = 200, seed: int = 42):
        """Mean |SHAP| per original feature, summed over classes, normalised to sum to 1."""
        if len(X) > max_rows:
            X = X.sample(max_rows, random_state=seed)
        sv = self._collapse(self._shap(X))
        imp = np.abs(sv).mean(axis=0).sum(axis=1)
        imp = imp / imp.sum() if imp.sum() else imp
        rows = [{"feature": f, "importance": round(float(v), 4)} for f, v in zip(self.input_cols, imp)]
        return sorted(rows, key=lambda r: r["importance"], reverse=True)


def merge_rows(rows, groups, field, values=None):
    """Combine several input columns into one display feature, e.g. the four calendar columns into 'Season'.

    rows: list of {"feature", field, ...}; groups: {"Season": ["Month_Sin", ...]};
    values: optional {"Season": 7} to show as the merged feature's input value.
    """
    out = list(rows)
    for name, cols in (groups or {}).items():
        members = [r for r in out if r["feature"] in cols]
        if not members:
            continue
        out = [r for r in out if r["feature"] not in cols]
        merged = {"feature": name, field: round(sum(r[field] for r in members), 4)}
        if values is not None:
            merged["value"] = values.get(name)
        out.append(merged)
    return sorted(out, key=lambda r: abs(r[field]), reverse=True)
