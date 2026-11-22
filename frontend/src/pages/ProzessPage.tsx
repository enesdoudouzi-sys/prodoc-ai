import { useState } from "react";
import { useBpmnGenerator } from "../hooks/useApi";
import BpmnViewer from "../components/BpmnViewer";
import type { BpmnErgebnis } from "../types";

export default function ProzessPage() {
  const { generate, loading, error } = useBpmnGenerator();
  const [beschreibung, setBeschreibung] = useState("");
  const [name, setName] = useState("");
  const [ergebnis, setErgebnis] = useState<BpmnErgebnis | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await generate(beschreibung, name || undefined);
    if (result) setErgebnis(result);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ color: "#f3f4f6", margin: "0 0 4px", fontSize: 20 }}>BPMN-Diagramm generieren</h2>
        <p style={{ color: "#6b7280", margin: 0, fontSize: 14 }}>
          Beschreibe deinen Geschäftsprozess in einfacher Sprache — die KI erstellt ein BPMN 2.0 Diagramm.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", color: "#9ca3af", fontSize: 13, marginBottom: 6 }}>Prozessname (optional)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Rechnungsfreigabe"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", color: "#9ca3af", fontSize: 13, marginBottom: 6 }}>Prozessbeschreibung *</label>
          <textarea
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
            placeholder="z.B. Rechnung kommt per E-Mail rein, Buchhaltung prüft den Betrag, bei Betrag über 1000€ genehmigt der Chef, danach erfolgt die Zahlung..."
            rows={5}
            required
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !beschreibung.trim()}
          style={{
            background: loading ? "#374151" : "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 24px",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            alignSelf: "flex-start",
          }}
        >
          {loading ? "Generiere…" : "BPMN generieren"}
        </button>
      </form>

      {error && (
        <div style={{ background: "#1f1215", border: "1px solid #7f1d1d", borderRadius: 8, padding: "12px 16px", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      {ergebnis && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h3 style={{ color: "#f3f4f6", margin: 0 }}>{ergebnis.name}</h3>
            <span style={{ background: "#6366f1", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>
              {ergebnis.schritte.length} Schritte
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ergebnis.schritte.map((schritt, i) => (
              <span key={i} style={{ background: "#1f2937", color: "#9ca3af", fontSize: 12, padding: "4px 12px", borderRadius: 20 }}>
                {i + 1}. {schritt}
              </span>
            ))}
          </div>

          <BpmnViewer xml={ergebnis.bpmn_xml} />
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: 8,
  padding: "10px 14px",
  color: "#f3f4f6",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};
