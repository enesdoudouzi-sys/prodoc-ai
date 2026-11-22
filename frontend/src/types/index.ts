export type DokumentTyp = "rechnung" | "vertrag" | "bestellung" | "unbekannt";

export interface ExtrahierteDaten {
  typ: DokumentTyp;
  absender?: string;
  empfaenger?: string;
  datum?: string;
  betrag?: string;
  referenz?: string;
  beschreibung?: string;
  rohfelder: Record<string, unknown>;
}

export interface DokumentErgebnis {
  dateiname: string;
  status: "erfolgreich" | "fehler";
  typ?: DokumentTyp;
  daten?: ExtrahierteDaten;
  fehler?: string;
}

export interface BpmnErgebnis {
  name: string;
  bpmn_xml: string;
  beschreibung: string;
  schritte: string[];
}
