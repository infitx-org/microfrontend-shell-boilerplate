## Environment Variables

The application is driven by some environment variables used at build and runtime.

```
REACT_APP_API_BASE_URL=/api          // base path for api (could be a URL)
REACT_APP_AUTH_ENABLED=true          // enabled or disables auth
REACT_APP_MOCK_API=true              // necessary to mock api locally
REMOTE_1_URL=http://localhost:3012   // where to load the app 1
DEV_PORT=3001                        // dev only / http port
PUBLIC_PATH=http://localhost:3001/   // dev only, public url, VERCEL_URL used in cloud
```

**Note**When working with several host/remote applications it is a requirement that
`PUBLIC_PATH` are updated to avoid port collision.