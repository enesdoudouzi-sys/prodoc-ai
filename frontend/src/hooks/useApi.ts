import { useState } from "react";
import type { DokumentErgebnis, BpmnErgebnis } from "../types";

const BASE = "/api";

export function useDokumentUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File): Promise<DokumentErgebnis | null> {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("datei", file);
      const res = await fetch(`${BASE}/dokumente/`, { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Upload fehlgeschlagen");
      }
      return await res.json();
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { upload, loading, error };
}

export function useBpmnGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(beschreibung: string, name?: string): Promise<BpmnErgebnis | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/prozesse/bpmn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ beschreibung, name }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Generierung fehlgeschlagen");
      }
      return await res.json();
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, error };
}
