interface EnvConfig {
    apiBaseUrl: string;
    debugMode: boolean;
    appTitle: string;
  }
  
  export const env: EnvConfig = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    appTitle: import.meta.env.VITE_APP_TITLE
  };