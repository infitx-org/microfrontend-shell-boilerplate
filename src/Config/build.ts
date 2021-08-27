import { ApiConfig, AppConfig, AuthConfig } from './types';

export default async (): Promise<AppConfig & AuthConfig & ApiConfig> => {
  const { protocol, host } = window.location;
  const baseUrl = `${protocol}//${host}`;
  // Using the same protocol as we've been loaded from to avoid Mixed Content error.
  const defaults = {
    loginEndpoint: `${baseUrl}/auth/auth/login`,
    logoutEndpoint: `${baseUrl}/kratos/self-service/browser/flows/logout`,
    tokenEndpoint: `${baseUrl}/kratos/sessions/whoami`,
    apiBaseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
    isAuthEnabled: process.env.REACT_APP_AUTH_ENABLED !== 'false',
    basename: '',
    mockApi: process.env.MOCK_API === 'true',
  };

  const config = { ...defaults };

  try {
    const {
      API_BASE_URL,
      AUTH_ENABLED,
      DIST_PUBLIC_URL,
      LOGIN_URL,
      LOGOUT_URL,
      MOCK_API,
      TOKEN_URL,
    } = await fetch(`${baseUrl}/config.json`).then((response) => response.json());

    if (TOKEN_URL) {
      config.tokenEndpoint = TOKEN_URL;
    }
    if (LOGIN_URL) {
      config.loginEndpoint = LOGIN_URL;
    }
    if (LOGOUT_URL) {
      config.logoutEndpoint = LOGOUT_URL;
    }
    if (API_BASE_URL) {
      config.apiBaseUrl = API_BASE_URL;
    }
    if (MOCK_API) {
      config.mockApi = MOCK_API === 'true';
    }
    if (AUTH_ENABLED) {
      config.isAuthEnabled = AUTH_ENABLED !== 'false';
    }
    if (DIST_PUBLIC_URL) {
      const distPublicUrl = new URL(DIST_PUBLIC_URL || baseUrl);
      config.basename = distPublicUrl.pathname;
    }
  } catch (err) {
    // eslint-disable-next-line
    console.info('config returned error', err);
  }

  return config;
};
