"""DocFlow AI — Backend API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import dokumente, prozesse, health

app = FastAPI(
    title="DocFlow AI API",
    description="KI-gestützte Dokumentenverarbeitung und Prozessanalyse",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(health.router)
app.include_router(dokumente.router, prefix="/dokumente")
app.include_router(prozesse.router, prefix="/prozesse")
