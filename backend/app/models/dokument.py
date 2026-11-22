from pydantic import BaseModel
from typing import Optional
from enum import Enum


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
    rohfelder: dict = {}


class DokumentErgebnis(BaseModel):
    dateiname: str
    status: str
    typ: Optional[DokumentTyp] = None
    daten: Optional[ExtrahierteDaten] = None
    fehler: Optional[str] = None
