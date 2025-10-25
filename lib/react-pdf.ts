import type { ComponentType, ReactElement } from "react";

export type ReactPdfModule = {
  pdf: (document: ReactElement) => {
    updateContainer: (document: ReactElement) => void;
    toBlob: () => Promise<Blob>;
    toString: () => Promise<string>;
  };
  Document: ComponentType<any>;
  Page: ComponentType<any>;
  Text: ComponentType<any>;
  View: ComponentType<any>;
  StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => T;
  };
  Font: {
    register: (options: {
      family: string;
      fonts: {
        src: string;
        fontWeight?: string | number;
        fontStyle?: string;
      }[];
    }) => void;
    registerHyphenation?: (splitter: (word: string) => string[]) => void;
  };
};

const REACT_PDF_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/@react-pdf/renderer@3.4.4/+esm";

let reactPdfModulePromise: Promise<ReactPdfModule> | null = null;

export async function loadReactPdf(): Promise<ReactPdfModule> {
  if (!reactPdfModulePromise) {
    reactPdfModulePromise = import(
      /* @vite-ignore */ REACT_PDF_MODULE_URL
    ).then((module) => module as unknown as ReactPdfModule);
  }

  return reactPdfModulePromise;
}
