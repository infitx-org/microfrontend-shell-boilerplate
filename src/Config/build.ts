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
    basename: baseUrl,
    mockApi: process.env.REACT_APP_MOCK_API === 'true',
  };

  const config = { ...defaults };

  try {
    const { API_BASE_URL, AUTH_ENABLED, LOGIN_URL, LOGOUT_URL, MOCK_API } = await fetch(
      `${baseUrl}/config.json`,
    ).then((response) => response.json());

    if (LOGIN_URL !== undefined) {
      config.loginEndpoint = LOGIN_URL;
    }
    if (LOGOUT_URL !== undefined) {
      config.logoutEndpoint = LOGOUT_URL;
    }
    if (API_BASE_URL !== undefined) {
      config.apiBaseUrl = API_BASE_URL;
    }
    if (MOCK_API !== undefined) {
      config.mockApi = MOCK_API === 'true';
    }
    if (AUTH_ENABLED !== undefined) {
      config.isAuthEnabled = AUTH_ENABLED !== 'false';
    }
  } catch (err) {
    // eslint-disable-next-line
    console.info('config returned error', err);
  }

  return config;
};
