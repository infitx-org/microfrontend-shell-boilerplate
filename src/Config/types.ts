export type AppConfig = {
  basename: string;
};

export type ApiConfig = {
  apiBaseUrl: string;
  mockApi: boolean;
};

export interface AuthConfig {
  loginEndpoint: string;
  logoutEndpoint: string;
  tokenEndpoint: string;
  isAuthEnabled: boolean;
}

export type ConfigState = {
  app: AppConfig;
  api: ApiConfig;
  auth: AuthConfig;
  isDevelopment: boolean;
};
