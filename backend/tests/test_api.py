"""API Tests — Gemini wird gemockt."""
import sys, os
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models.dokument import DokumentTyp, ExtrahierteDaten
from app.models.prozess import BpmnErgebnis

client = TestClient(app)

MOCK_EXTRAKTION = ExtrahierteDaten(
    typ=DokumentTyp.RECHNUNG,
    absender="Mustermann GmbH",
    empfaenger="Schmidt AG",
    datum="2026-11-22",
    betrag="1.250,00 EUR",
    referenz="RE-2026-0042",
    beschreibung="Rechnung für Lieferung von Büromaterial",
)

MOCK_BPMN = BpmnErgebnis(
    name="Rechnungsfreigabe",
    bpmn_xml='<?xml version="1.0"?><definitions></definitions>',
    beschreibung="Testprozess",
    schritte=["Rechnung eingang", "Prüfung", "Freigabe", "Zahlung"],
)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_dokument_upload_txt():
    with patch("app.api.dokumente.extrahiere_dokument", return_value=MOCK_EXTRAKTION):
        r = client.post(
            "/dokumente/",
            files={"datei": ("rechnung.txt", b"Rechnung von Mustermann GmbH", "text/plain")},
        )
    assert r.status_code == 200
    assert r.json()["status"] == "erfolgreich"
    assert r.json()["typ"] == "rechnung"


def test_dokument_falscher_typ():
    r = client.post(
        "/dokumente/",
        files={"datei": ("bild.jpg", b"data", "image/jpeg")},
    )
    assert r.status_code == 400


def test_alle_dokumente():
    r = client.get("/dokumente/")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_prozess_zu_bpmn():
    with patch("app.api.prozesse.generiere_bpmn", return_value=MOCK_BPMN):
        r = client.post("/prozesse/bpmn", json={
            "beschreibung": "Rechnung kommt rein, Buchhaltung prüft, Chef genehmigt, Zahlung erfolgt.",
            "name": "Rechnungsfreigabe",
        })
    assert r.status_code == 200
    assert r.json()["name"] == "Rechnungsfreigabe"
    assert len(r.json()["schritte"]) > 0


def test_prozess_leer():
    r = client.post("/prozesse/bpmn", json={"beschreibung": ""})
    assert r.status_code == 400


def test_verlauf_loeschen():
    client.delete("/dokumente/")
    r = client.get("/dokumente/")
    assert r.json() == []
