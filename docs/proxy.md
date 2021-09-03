## Proxy

The frontend uses one or more apis online, secured by authentication.

Since cross-origin requests are prevented by the browser, the frontend uses a proxy to access apis and auth.

Proxy configuration is in `src/setupProxy` and it's only used in _dev_ mode.