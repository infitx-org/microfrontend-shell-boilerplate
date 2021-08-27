### Microfrontend Shell Boilerplate

This is the Shell application boilerplate project to create microfrontends.

It is based on React / Redux and it is built in Typescript and developed with Webpack, Babel, Eslint, Prettier.

Includes React Router, Redux Saga, and the @Modusbox UI components.

It provides a basic module structure ready to be used, a webpack configuration that exports the microfrontend so that it can be lazy loaded.

Microfrontends can be set up to act as hosts(parents), remotes(children) or
bi-directional apps where the host consumes remotes but can also be consumed by another host.

`microfrontend-shell-boilerplate` is a default host(parent) boilerplate
meant to consume one or more child microfrontends such as `microfrontend-boilerplate`.

https://github.com/modusintegration/microfrontend-boilerplate

#### Available scripts

 - `yarn prettier` to prettify the codebase
 - `yarn lint` to lint the codebase
 - `yarn build` to produce the bundle(s)
 - `yarn serve` to run the production build locally
 - `yarn test` to run the tests

#### Structure

The file structure is quite similar to a standard module based structure; the only difference with a regular app where all source is bundled, here we are exporting multiple chunks (done automatically by webpack) so that child microfrontends (remotes) will be loaded optimally avoiding the risk of increasing the bundle and importing the same libraries twice.

Folders are modules and include separate files around React views and Redux structure.


#### Webpack configuration

Enabling code splitting for the microfrontend shell is done using the Webpack _ModuleFederationPlugin_.

The configuration is similar to the following:
```javascript
plugins: [
    new ModuleFederationPlugin({
      shared: [
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'redux',
        'redux-saga',
        'history',
        '@reduxjs/toolkit',
        '@modusbox/modusbox-ui-components',
      ],
    }),
    ...
```
**Note** We are not specifying the _remotes_ configuration because we are now using _dyanmic lazy loading_.

It is still possible to define static remotes using traditional method

```javascript
plugins: [
  new ModuleFederationPlugin({
    remotes: {
      app: 'app@http://localhost:3002/app.js',
    },
    shared: [...],
  }),
  ...
]
```

#### Loading child modules

There is a React utility module `src/utils/loader` that takes care of dynamic lazy loading of child components, and it also includes some optimization e.g. caching.

It is used as follows:
```javascript
  <Loader
    url="http://localhost:3002/app.js"
    appName="app"
    module="App"
    {...props}
  />
```
There are more usage examples in `App/Microfrontend`.

#### Development setup

Application hosting configuration can be found in `.env`
When working with several host/remote applications it is a requirement that
`PUBLIC_PATH` and `DEV_PORT` are updated to avoid port collision.

```
DEV_PORT=3012
PUBLIC_PATH=http://localhost:3012/
```

#### Deployment - In Progress

This boilerplate is currently configured to deploy to [Vercel](https://vercel.com/docs)
using [Vercel for Github](https://vercel.com/docs/git/vercel-for-github)

`microfrontend-shell-boilerplate` can be made to be used with other SPA hosting services.
Just update `webpack.config.js` to pull and set env variables from a hosting service
into `DEV_PORT` and `PUBLIC_PATH`.

```javascript
const { DEV_PORT, VERCEL_URL } = process.env;
const { parsed } = require('dotenv').config({
  path: './.env',
});

const config = {
  DEV_PORT: DEV_PORT || parsed.DEV_PORT,
  PUBLIC_PATH: VERCEL_URL ? `https://${VERCEL_URL}/` : parsed.PUBLIC_PATH,
}
```

#### Resources

 - https://webpack.js.org/concepts/module-federation/
 - https://github.com/module-federation/module-federation-examples
 - https://github.com/modusintegration/microfrontend-boilerplate
