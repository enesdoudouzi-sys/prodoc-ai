from pydantic import BaseModel
from typing import Optional


class ProzessBeschreibung(BaseModel):
    beschreibung: str
    name: Optional[str] = None


class BpmnErgebnis(BaseModel):
    name: str
    bpmn_xml: str
    beschreibung: str
    schritte: list[str]
