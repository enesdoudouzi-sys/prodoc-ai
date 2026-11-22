"""BPMN-Generierung via Gemini — Prozessbeschreibung → BPMN 2.0 XML."""
from __future__ import annotations

import os
import re
import uuid

from google import genai
from google.genai import types

from app.models.prozess import BpmnErgebnis

MODEL = "models/gemini-3.5-flash"

SYSTEM_PROMPT = """Du bist ein BPMN 2.0 Experte.

Erstelle aus der gegebenen Prozessbeschreibung ein valides BPMN 2.0 XML.

Regeln:
- Verwende eindeutige IDs (z.B. sid-1, sid-2, ...)
- Jeder Prozess beginnt mit einem StartEvent und endet mit einem EndEvent
- Verwende Tasks für Aktivitäten, ExclusiveGateways für Entscheidungen
- Halte das XML minimal und valide

Antworte mit einem JSON:
{
  "name": "Prozessname",
  "schritte": ["Schritt 1", "Schritt 2", ...],
  "bpmn_xml": "<?xml version=..."
}"""


def generiere_bpmn(beschreibung: str, name: str = "Prozess") -> BpmnErgebnis:
    client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

    antwort = client.models.generate_content(
        model=MODEL,
        contents=f"Erstelle BPMN für diesen Prozess:\n\nName: {name}\n\n{beschreibung}",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.1,
        ),
    )

    rohtext = antwort.text.strip()
    if rohtext.startswith("```"):
        rohtext = rohtext.split("```")[1]
        if rohtext.startswith("json"):
            rohtext = rohtext[4:]

    import json
    daten = json.loads(rohtext)

    return BpmnErgebnis(
        name=daten.get("name", name),
        bpmn_xml=daten.get("bpmn_xml", ""),
        beschreibung=beschreibung,
        schritte=daten.get("schritte", []),
    )
