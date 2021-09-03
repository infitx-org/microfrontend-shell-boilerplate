## Authentication

Authentication can be disabled in _dev_ by setting `REACT_APP_AUTH_ENABLED=false` in your `.env.local` configuration file.

Authentication is enabled by default in a production.

The following environment variables are used to do authentication in production mode.
They need to be set at _runtime_.

- `TOKEN_URL` Specifies the token endpoint
- `LOGIN_URL` Specifies the login endpoint
- `LOGOUT_URL` Specifies the logout endpoint
