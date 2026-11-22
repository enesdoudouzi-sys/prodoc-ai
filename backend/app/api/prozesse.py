from fastapi import APIRouter, HTTPException

from app.models.prozess import ProzessBeschreibung, BpmnErgebnis
from app.services.bpmn_generator import generiere_bpmn

router = APIRouter(tags=["Prozesse"])


@router.post("/bpmn", response_model=BpmnErgebnis)
def prozess_zu_bpmn(body: ProzessBeschreibung):
    if not body.beschreibung.strip():
        raise HTTPException(400, "Prozessbeschreibung darf nicht leer sein.")
    if len(body.beschreibung) < 20:
        raise HTTPException(400, "Beschreibung zu kurz — mindestens 20 Zeichen.")
    try:
        return generiere_bpmn(body.beschreibung, body.name or "Prozess")
    except Exception as e:
        raise HTTPException(500, str(e))
