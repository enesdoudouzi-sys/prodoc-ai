import { useRef, useState } from "react";
import { useDokumentUpload } from "../hooks/useApi";
import type { DokumentErgebnis } from "../types";

const TYP_FARBE: Record<string, string> = {
  rechnung: "#10b981",
  vertrag: "#6366f1",
  bestellung: "#f59e0b",
  unbekannt: "#6b7280",
};

interface Props {
  onErgebnis: (e: DokumentErgebnis) => void;
}

export default function DokumentUpload({ onErgebnis }: Props) {
  const { upload, loading, error } = useDokumentUpload();
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    const result = await upload(file);
    if (result) onErgebnis(result);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        style={{
          border: `2px dashed ${drag ? "#6366f1" : "#374151"}`,
          borderRadius: 12,
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: drag ? "rgba(99,102,241,0.08)" : "transparent",
          transition: "all 0.2s",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
        <p style={{ color: "#9ca3af", margin: 0 }}>
          Datei hier ablegen oder <span style={{ color: "#6366f1" }}>auswählen</span>
        </p>
        <p style={{ color: "#6b7280", fontSize: 12, margin: "8px 0 0" }}>PDF, TXT, MD · max. 10 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.md"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {loading && (
        <div style={{ textAlign: "center", color: "#6366f1" }}>
          <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
          {" "}Analysiere Dokument…
        </div>
      )}

      {error && (
        <div style={{ background: "#1f1215", border: "1px solid #7f1d1d", borderRadius: 8, padding: "12px 16px", color: "#fca5a5" }}>
          {error}
        </div>
      )}
    </div>
  );
}
