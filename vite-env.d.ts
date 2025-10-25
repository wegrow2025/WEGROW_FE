/// <reference types="vite" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 여기에 필요한 다른 환경변수도 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type JsPdfInstance = {
  internal: {
    pageSize: {
      getWidth: () => number;
      getHeight: () => number;
    };
  };
  addImage: (...args: any[]) => void;
  addPage: () => void;
  save: (fileName: string) => void;
  getImageProperties: (dataUrl: string) => { width: number; height: number };
  setProperties: (props: Record<string, string>) => void;
};

type JsPdfConstructor = new (...args: any[]) => JsPdfInstance;

declare global {
  interface Window {
    html2canvas?: (
      element: HTMLElement,
      options?: Record<string, unknown>
    ) => Promise<HTMLCanvasElement>;
    jspdf?: {
      jsPDF: JsPdfConstructor;
    };
  }
}

export {};
