/**
 * Vite Environment Configuration
 * For type-safe environment variables
 */

interface ImportMetaEnv {
  readonly REACT_APP_API_URL: string
  readonly REACT_APP_GOOGLE_CLIENT_ID: string
  readonly REACT_APP_GOOGLE_REDIRECT_URI: string
  readonly REACT_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
