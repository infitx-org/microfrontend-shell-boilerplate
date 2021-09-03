## Environment Variables

The application is driven by some environment variables used at build and runtime.

#### Used Locally

| Name | Description | Default |
|---|---|---|
| `REACT_APP_API_BASE_URL` | base path for api (could be a URL) | /api |
| `REACT_APP_AUTH_ENABLED` | enabled or disables auth | true |
| `REACT_APP_MOCK_API` |  enables mock api locally | true |
| `DEV_PORT` | webpack server dev http port | 3001 |
| `PUBLIC_PATH` | public url where the app is accessible | http://localhost:3001/ |
| `REMOTE_1_URL` | where to load the app 1 | http://localhost:3012 |

#### Used In Production / Online

| `Name` | Description | Default |
|---|---|---|
| `REACT_APP_API_BASE_URL` | base path for api (could be a URL) | /api |
| `REACT_APP_AUTH_ENABLED` | enabled or disables auth | true |
| `REACT_APP_MOCK_API` |  enables mock api locally | true |
| `PUBLIC_PATH` | public url where the app is accessible | http://localhost:3001/ |
| `REMOTE_1_URL` | where to load the app 1 | 


**Note** This project is using the `REMOTE_1_URL` to dinamically load a remote. You can add as many remotes as you want or you can decide to use static know localtions without relying on environment variables for the purpose.

**Note** When working with several host/remote applications it is a requirement that
`PUBLIC_PATH` are updated to avoid port collision.