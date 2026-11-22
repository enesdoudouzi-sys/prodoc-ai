import { useState } from "react";
import DokumentUpload from "../components/DokumentUpload";
import ErgebnisKarte from "../components/ErgebnisKarte";
import type { DokumentErgebnis } from "../types";

export default function DokumentePage() {
  const [ergebnisse, setErgebnisse] = useState<DokumentErgebnis[]>([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ color: "#f3f4f6", margin: "0 0 4px", fontSize: 20 }}>Dokument analysieren</h2>
        <p style={{ color: "#6b7280", margin: 0, fontSize: 14 }}>
          Lade eine Rechnung, einen Vertrag oder eine Bestellung hoch — die KI extrahiert alle relevanten Daten.
        </p>
      </div>

      <DokumentUpload onErgebnis={(e) => setErgebnisse((prev) => [e, ...prev])} />

      {ergebnisse.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ color: "#9ca3af", margin: 0, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Ergebnisse ({ergebnisse.length})
          </h3>
          {ergebnisse.map((e, i) => (
            <ErgebnisKarte key={i} ergebnis={e} />
          ))}
        </div>
      )}
    </div>
  );
}
