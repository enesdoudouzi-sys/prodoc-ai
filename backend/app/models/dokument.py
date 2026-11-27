from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Optional
import uuid

from pydantic import BaseModel, Field


class DokumentTyp(str, Enum):
    RECHNUNG = "rechnung"
    VERTRAG = "vertrag"
    BESTELLUNG = "bestellung"
    UNBEKANNT = "unbekannt"


class ExtrahierteDaten(BaseModel):
    typ: DokumentTyp
    absender: Optional[str] = None
    empfaenger: Optional[str] = None
    datum: Optional[str] = None
    betrag: Optional[str] = None
    referenz: Optional[str] = None
    beschreibung: Optional[str] = None
    rohfelder: dict = Field(default_factory=dict)


class DokumentErgebnis(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    dateiname: str
    status: str
    typ: Optional[DokumentTyp] = None
    daten: Optional[ExtrahierteDaten] = None
    fehler: Optional[str] = None
