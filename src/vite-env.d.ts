/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FRONTEND_GOOGLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
