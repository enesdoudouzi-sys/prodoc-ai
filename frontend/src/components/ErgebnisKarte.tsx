import type { DokumentErgebnis } from "../types";

const TYP_LABEL: Record<string, string> = {
  rechnung: "Rechnung",
  vertrag: "Vertrag",
  bestellung: "Bestellung",
  unbekannt: "Unbekannt",
};

const TYP_FARBE: Record<string, string> = {
  rechnung: "#10b981",
  vertrag: "#6366f1",
  bestellung: "#f59e0b",
  unbekannt: "#6b7280",
};

interface Props {
  ergebnis: DokumentErgebnis;
}

function Zeile({ label, wert }: { label: string; wert?: string }) {
  if (!wert) return null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1f2937" }}>
      <span style={{ color: "#6b7280", fontSize: 13 }}>{label}</span>
      <span style={{ color: "#f3f4f6", fontSize: 13, fontWeight: 500, maxWidth: "60%", textAlign: "right" }}>{wert}</span>
    </div>
  );
}

export default function ErgebnisKarte({ ergebnis }: Props) {
  if (ergebnis.status === "fehler") {
    return (
      <div style={{ background: "#1f1215", border: "1px solid #7f1d1d", borderRadius: 12, padding: 20 }}>
        <p style={{ color: "#fca5a5", margin: 0 }}>Fehler: {ergebnis.fehler}</p>
      </div>
    );
  }

  const typ = ergebnis.typ || "unbekannt";
  const farbe = TYP_FARBE[typ];
  const d = ergebnis.daten;

  return (
    <div style={{ background: "#111827", border: `1px solid #1f2937`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: farbe + "1a", borderBottom: `1px solid ${farbe}33`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ background: farbe, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5 }}>
          {TYP_LABEL[typ]}
        </span>
        <span style={{ color: "#9ca3af", fontSize: 13 }}>{ergebnis.dateiname}</span>
      </div>

      <div style={{ padding: "4px 20px 16px" }}>
        <Zeile label="Absender" wert={d?.absender} />
        <Zeile label="Empfänger" wert={d?.empfaenger} />
        <Zeile label="Datum" wert={d?.datum} />
        <Zeile label="Betrag" wert={d?.betrag} />
        <Zeile label="Referenz" wert={d?.referenz} />
        {d?.beschreibung && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#1f2937", borderRadius: 8 }}>
            <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 4px" }}>Zusammenfassung</p>
            <p style={{ color: "#e5e7eb", fontSize: 13, margin: 0 }}>{d.beschreibung}</p>
          </div>
        )}
      </div>
    </div>
  );
}
