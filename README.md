<div align="center">

# ⚡ ProDoc AI

**KI-gestützte Dokumentenverarbeitung und Prozessanalyse für KMUs**

*Dokumente hochladen → KI extrahiert Daten → Prozess wird als BPMN visualisiert*

[![CI](https://github.com/enesdoudouzi-sys/prodoc-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/enesdoudouzi-sys/prodoc-ai/actions)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-22c55e)](LICENSE)

</div>

---

## Screenshot

> *Upload → Extract → Visualize*

![ProDoc AI Demo](docs/screenshot-ui.png)

---

## Features

| Feature | Beschreibung |
|---|---|
| 📄 **Dokument-Upload** | PDF, TXT, MD — bis 10 MB |
| 🤖 **KI-Extraktion** | Typ, Absender, Empfänger, Datum, Betrag, Referenz via Gemini |
| 🔄 **BPMN-Generierung** | Prozessbeschreibung → valides BPMN 2.0 XML |
| 👁️ **BPMN-Viewer** | Interaktive Visualisierung mit bpmn.js |
| 📋 **Verlauf** | Alle verarbeiteten Dokumente mit Zeitstempel |

---

## Architektur

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                         │
│          React · TypeScript · Vite · bpmn.js         │
│                                                      │
│   ┌──────────────┐        ┌──────────────────────┐   │
│   │  Dokumente   │        │      Prozesse        │   │
│   │  Upload+List │        │  BPMN-Editor+Viewer  │   │
│   └──────┬───────┘        └──────────┬───────────┘   │
└──────────┼───────────────────────────┼───────────────┘
           │  HTTP/REST                │
┌──────────▼───────────────────────────▼───────────────┐
│                   FastAPI Backend                     │
│                                                      │
│   POST /dokumente/   ──►  Extraktor Service          │
│   POST /prozesse/bpmn ──► BPMN Generator Service     │
│                                                      │
│              ↕ google-genai SDK                      │
│           Google Gemini 2.0 Flash                    │
└──────────────────────────────────────────────────────┘
```

---

## Stack

| Bereich | Technologie |
|---|---|
| **Backend** | Python 3.11 · FastAPI · Pydantic v2 |
| **KI** | Google Gemini 2.0 Flash · google-genai SDK |
| **Frontend** | React 18 · TypeScript · Vite · bpmn.js |
| **DevOps** | Docker · GitHub Actions CI |

---

## Quickstart

```bash
git clone https://github.com/enesdoudouzi-sys/prodoc-ai.git
cd prodoc-ai
cp .env.example .env
# GOOGLE_API_KEY in .env eintragen
```

**Backend starten:**
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend starten:**
```bash
cd frontend
npm install
npm run dev
```

| Service | URL |
|---|---|
| API Docs (Swagger) | http://localhost:8000/docs |
| Frontend | http://localhost:5173 |

---

## API Endpoints

| Methode | Route | Beschreibung |
|---|---|---|
| `GET` | `/health` | Status-Check |
| `POST` | `/dokumente/` | Dokument hochladen + analysieren |
| `GET` | `/dokumente/` | Alle verarbeiteten Dokumente |
| `DELETE` | `/dokumente/` | Verlauf leeren |
| `POST` | `/prozesse/bpmn` | Prozessbeschreibung → BPMN XML |

**Beispiel — Dokument hochladen:**
```bash
curl -X POST http://localhost:8000/dokumente/ \
  -F "datei=@rechnung.pdf"
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2026-11-27T10:00:00Z",
  "dateiname": "rechnung.pdf",
  "status": "erfolgreich",
  "typ": "rechnung",
  "daten": {
    "absender": "Muster GmbH",
    "empfaenger": "Kunde AG",
    "datum": "2026-11-01",
    "betrag": "1.250,00 EUR",
    "referenz": "RE-2026-0042"
  }
}
```

---

## Lernmodule — Enes Doudouzi (AI Engineering)

| Modul | Thema | Woche | Status |
|---|---|---|---|
| E-001 | Prototyp-Review & Tech-Stack | 1 | ✅ Fertig |
| E-002 | Datenmodell: Mehrfachpositionen | 2 | ⬜ Offen |
| E-003 | SQLite DB + SQLAlchemy | 3 | ⬜ Offen |
| E-004 | Event Log Design | 3 | ⬜ Offen |
| E-005 | Regelbasierter Extraktor (Baseline) | 4 | ⬜ Offen |
| E-006 | Evaluation: KI vs. Regelbasiert | 5 | ⬜ Offen |
| E-007 | CSV / SQL Export-Endpoints | 6 | ⬜ Offen |
| E-008 | Docker + Cloud Deployment | 8 | ⬜ Offen |

---

## Team

**Enes Doudouzi** — AI Engineering & Softwareentwicklung  
**Ahmet** — Process Optimization & Business Analysis

*Intelligent Process Optimization Lab*
