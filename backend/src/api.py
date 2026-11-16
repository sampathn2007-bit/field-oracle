"""FastAPI app. Run:  uvicorn src.api:app --reload --port 8000   (from the repo root)

Env vars: MODELS_DIR (default ./models), CORS_ORIGINS (comma separated, default *).
"""
from __future__ import annotations

import logging
import os
import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Body, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

sys.path.insert(0, str(Path(__file__).resolve().parent))  # lets service.py import explain.py

from service import (ApiError, Registry, meta_summary, predict_classification,  # noqa: E402
                     predict_yield)

logging.basicConfig(level=logging.INFO)
MODELS_DIR = Path(os.getenv("MODELS_DIR", Path(__file__).resolve().parent.parent / "models"))
registry = Registry(MODELS_DIR)


@asynccontextmanager
async def lifespan(app):
    registry.load()
    yield


app = FastAPI(title="Field Oracle API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ApiError)
async def _api_error(_, exc: ApiError):
    return JSONResponse({"error": exc.message}, status_code=exc.status)


@app.exception_handler(RequestValidationError)
async def _bad_body(_, exc: RequestValidationError):
    return JSONResponse({"error": "Request body must be a JSON object"}, status_code=422)


@app.exception_handler(StarletteHTTPException)
async def _http_error(_, exc: StarletteHTTPException):
    return JSONResponse({"error": str(exc.detail)}, status_code=exc.status_code)


@app.get("/api/health")
def health():
    return {"status": "ok", "models": registry.status()}


@app.get("/api/meta")
def meta():
    return meta_summary(registry)


# Plain `def` endpoints run in FastAPI's thread pool, so SHAP does not block the event loop.
@app.post("/api/crop")
def crop(payload: dict = Body(...)):
    return predict_classification(registry, "crop", payload)


@app.post("/api/fertilizer")
def fertilizer(payload: dict = Body(...)):
    return predict_classification(registry, "fertilizer", payload)


@app.post("/api/yield")
def yield_(payload: dict = Body(...)):
    return predict_yield(registry, payload)
