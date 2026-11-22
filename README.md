# DocFlow AI

**KI-gestützte Dokumentenverarbeitung und Prozessanalyse für KMUs.**

[![CI](https://github.com/enesdoudouzi-sys/docflow-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/enesdoudouzi-sys/docflow-ai/actions)
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
git clone https://github.com/enesdoudouzi-sys/docflow-ai.git
cd docflow-ai
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

## Team

**Enes Doudouzi** — AI & Software Engineering  
**Ahmet** — Process Optimization & Business Analysis

*Intelligent Process Optimization Lab*
