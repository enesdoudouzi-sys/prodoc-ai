import { useState } from "react";
import DokumentePage from "./pages/DokumentePage";
import ProzessPage from "./pages/ProzessPage";

type Tab = "dokumente" | "prozesse";

export default function App() {
  const [tab, setTab] = useState<Tab>("dokumente");

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #1f2937", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 32, height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>⚡</span>
            <span style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>DocFlow AI</span>
            <span style={{ background: "#1f2937", color: "#6b7280", fontSize: 11, padding: "2px 8px", borderRadius: 20 }}>Beta</span>
          </div>

          <nav style={{ display: "flex", gap: 4 }}>
            {(["dokumente", "prozesse"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? "#1f2937" : "transparent",
                  color: tab === t ? "#f3f4f6" : "#6b7280",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: 14,
                  fontWeight: tab === t ? 600 : 400,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {t === "dokumente" ? "📄 Dokumente" : "🔄 Prozesse"}
              </button>
            ))}
          </nav>

          <div style={{ marginLeft: "auto", color: "#374151", fontSize: 12 }}>
            Powered by Gemini
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {tab === "dokumente" ? <DokumentePage /> : <ProzessPage />}
      </main>
    </div>
  );
}
