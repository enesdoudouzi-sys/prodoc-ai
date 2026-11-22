import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js";

interface Props {
  xml: string;
}

export default function BpmnViewer({ xml }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<BpmnJS | null>(null);

  useEffect(() => {
    if (!containerRef.current || !xml) return;

    const viewer = new BpmnJS({ container: containerRef.current });
    viewerRef.current = viewer;

    viewer.importXML(xml)
      .then(() => viewer.get("canvas").fitViewport())
      .catch(console.error);

    return () => {
      viewer.destroy();
    };
  }, [xml]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: 400, background: "#0d1117", borderRadius: 12, border: "1px solid #1f2937" }}
    />
  );
}
