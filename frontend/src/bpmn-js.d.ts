declare module "bpmn-js" {
  interface Canvas {
    fitViewport(): void;
  }
  interface BpmnJSInstance {
    importXML(xml: string): Promise<{ warnings: string[] }>;
    get(name: "canvas"): Canvas;
    destroy(): void;
  }
  interface BpmnJSOptions {
    container: HTMLElement;
  }
  class BpmnJS {
    constructor(options: BpmnJSOptions);
    importXML(xml: string): Promise<{ warnings: string[] }>;
    get(name: "canvas"): Canvas;
    destroy(): void;
  }
  export default BpmnJS;
}
