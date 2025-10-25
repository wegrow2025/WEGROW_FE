export type PdfMake = {
  createPdf: (
    docDefinition: unknown,
    tableLayouts?: Record<string, unknown>,
    fonts?: Record<string, unknown>,
  ) => {
    getBlob: (callback: (blob: Blob) => void) => void;
  };
  vfs: Record<string, string>;
  fonts?: Record<string, unknown>;
};

const PDFMAKE_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/pdfmake@0.2.10/build/pdfmake.min.js?module";

const FONT_SOURCES = [
  {
    fileName: "NotoSansKR-Regular.otf",
    url: "https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf",
    variant: "normal",
  },
  {
    fileName: "NotoSansKR-Bold.otf",
    url: "https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf",
    variant: "bold",
  },
] as const;

let pdfMakePromise: Promise<PdfMake> | null = null;
let fontRegistrationPromise: Promise<void> | null = null;
let fontsRegistered = false;

export async function loadPdfMake(): Promise<PdfMake> {
  if (!pdfMakePromise) {
    pdfMakePromise = import(/* @vite-ignore */ PDFMAKE_MODULE_URL).then(
      (module) => (module.default ?? module) as PdfMake,
    );
  }

  return pdfMakePromise;
}

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
};

const fetchFont = async (
  fileName: string,
  url: string,
): Promise<[string, string]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load font: ${fileName}`);
  }

  const buffer = await response.arrayBuffer();
  return [fileName, arrayBufferToBase64(buffer)];
};

export async function ensurePdfMakeFonts(pdfMake: PdfMake): Promise<void> {
  if (fontsRegistered) {
    return;
  }

  if (!fontRegistrationPromise) {
    fontRegistrationPromise = (async () => {
      const fontEntries = await Promise.all(
        FONT_SOURCES.map((font) => fetchFont(font.fileName, font.url)),
      );

      pdfMake.vfs = pdfMake.vfs ?? {};
      for (const [fileName, base64] of fontEntries) {
        pdfMake.vfs[fileName] = base64;
      }

      pdfMake.fonts = {
        ...(pdfMake.fonts ?? {}),
        NotoSansKR: {
          normal: FONT_SOURCES[0].fileName,
          bold: FONT_SOURCES[1].fileName,
        },
      };

      fontsRegistered = true;
    })().catch((error) => {
      fontRegistrationPromise = null;
      throw error;
    });
  }

  await fontRegistrationPromise;
}
