/// <reference types="vite" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 여기에 필요한 다른 환경변수도 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}