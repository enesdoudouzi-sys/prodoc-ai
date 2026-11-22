from fastapi import APIRouter, HTTPException, UploadFile, File

from app.models.dokument import DokumentErgebnis
from app.services.extraktor import extrahiere_dokument, text_aus_pdf

router = APIRouter(tags=["Dokumente"])

_verlauf: list[DokumentErgebnis] = []


@router.post("/", response_model=DokumentErgebnis)
async def dokument_hochladen(datei: UploadFile = File(...)):
    erlaubt = {".pdf", ".txt", ".md"}
    suffix = "." + datei.filename.rsplit(".", 1)[-1].lower()
    if suffix not in erlaubt:
        raise HTTPException(400, f"Nur {', '.join(erlaubt)} erlaubt.")

    inhalt = await datei.read()
    if len(inhalt) > 10 * 1024 * 1024:
        raise HTTPException(400, "Datei zu groß (max. 10 MB).")

    try:
        text = text_aus_pdf(inhalt) if suffix == ".pdf" else inhalt.decode("utf-8", errors="ignore")
        daten = extrahiere_dokument(text)
        ergebnis = DokumentErgebnis(
            dateiname=datei.filename,
            status="erfolgreich",
            typ=daten.typ,
            daten=daten,
        )
    except Exception as e:
        ergebnis = DokumentErgebnis(dateiname=datei.filename, status="fehler", fehler=str(e))

    _verlauf.append(ergebnis)
    return ergebnis


@router.get("/", response_model=list[DokumentErgebnis])
def alle_dokumente():
    return _verlauf


@router.delete("/")
def verlauf_loeschen():
    _verlauf.clear()
    return {"status": "geleert"}
