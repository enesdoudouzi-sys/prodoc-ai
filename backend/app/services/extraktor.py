"""Dokument-Extraktion via Gemini."""
from __future__ import annotations

import io
import json
import os
import re

import PyPDF2
from google import genai
from google.genai import types

from app.models.dokument import DokumentTyp, ExtrahierteDaten

MODEL = "gemini-2.0-flash"

SYSTEM_PROMPT = """Du bist ein Experte für Dokumentenanalyse.

Analysiere das gegebene Dokument und extrahiere alle relevanten Daten.
Bestimme zuerst den Dokumenttyp: rechnung, vertrag, bestellung oder unbekannt.

Antworte NUR mit einem JSON-Objekt:
{
  "typ": "rechnung|vertrag|bestellung|unbekannt",
  "absender": "Name/Firma oder null",
  "empfaenger": "Name/Firma oder null",
  "datum": "YYYY-MM-DD oder null",
  "betrag": "1234.56 EUR oder null",
  "referenz": "Rechnungs-/Bestell-/Vertragsnummer oder null",
  "beschreibung": "Kurze Zusammenfassung in einem Satz",
  "rohfelder": {}
}"""


def _client() -> genai.Client:
    return genai.Client(api_key=os.environ["GOOGLE_API_KEY"])


def _parse_json(text: str) -> dict:
    text = text.strip()
    match = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, re.DOTALL)
    if match:
        return json.loads(match.group(1))
    return json.loads(text)


def text_aus_pdf(inhalt: bytes) -> str:
    reader = PyPDF2.PdfReader(io.BytesIO(inhalt))
    return "\n".join(s.extract_text() or "" for s in reader.pages).strip()


def extrahiere_dokument(text: str) -> ExtrahierteDaten:
    client = _client()
    antwort = client.models.generate_content(
        model=MODEL,
        contents=f"Analysiere dieses Dokument:\n\n{text[:4000]}",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.1,
        ),
    )
    daten = _parse_json(antwort.text)
    return ExtrahierteDaten(
        typ=DokumentTyp(daten.get("typ", "unbekannt")),
        absender=daten.get("absender"),
        empfaenger=daten.get("empfaenger"),
        datum=daten.get("datum"),
        betrag=daten.get("betrag"),
        referenz=daten.get("referenz"),
        beschreibung=daten.get("beschreibung"),
        rohfelder=daten.get("rohfelder", {}),
    )
