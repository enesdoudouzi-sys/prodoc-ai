# ProDoc AI

**KI-gestützte Dokumentenverarbeitung und Prozessanalyse für KMUs.**  
*Von Enes Doudouzi — Intelligent Process Optimization Lab*

[![CI](https://github.com/enesdoudouzi-sys/prodoc-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/enesdoudouzi-sys/prodoc-ai/actions)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Dokumente hochladen → KI extrahiert Daten → Prozess wird als BPMN visualisiert.

## Stack

| Bereich | Technologie |
|---|---|
| Backend | Python 3.11 · FastAPI · Pydantic |
| KI | Google Gemini · Dokumenten-Extraktion · BPMN-Generierung |
| Frontend | React · TypeScript · Vite · bpmn.js |
| DevOps | Docker · GitHub Actions CI |

## Quickstart

```bash
git clone https://github.com/enesdoudouzi-sys/prodoc-ai.git
cd prodoc-ai
cp .env.example .env
# GOOGLE_API_KEY in .env eintragen

cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API Docs: http://localhost:8000/docs

## API Endpoints

| Methode | Route | Beschreibung |
|---|---|---|
| `GET` | `/health` | Status |
| `POST` | `/dokumente/` | Dokument hochladen + analysieren |
| `GET` | `/dokumente/` | Alle verarbeiteten Dokumente |
| `DELETE` | `/dokumente/` | Verlauf leeren |
| `POST` | `/prozesse/bpmn` | Prozess → BPMN generieren |

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

## Team

**Enes Doudouzi** — AI Engineering & Softwareentwicklung  
**Ahmet** — Process Optimization & Business Analysis

*Intelligent Process Optimization Lab*
