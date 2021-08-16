### Microfrontend Shell Boilerplate

This is the Shell application boilerplate project to create microfrontends.

It is based on React / Redux and it is built in Typescript and developed with Webpack, Babel, Eslint, Prettier.

Includes React Router, Redux Saga, and the modusbox UI components.

It provides a basic module structure ready to be used, a webpack configuration that exports the microfrontend so that it can be lazy loaded.

#### Available scripts

 - `yarn prettier` to prettify the codebase
 - `yarn lint` to lint the codebase
 - `yarn build` to produce the bundle(s)
 - `yarn serve` to run the production build locally
 - `yarn test` to run the tests

#### Structure

The file structure is quite similar to a standard module based structure; the only difference with a regular app where all source is bundled, here we are exporting multiple chunks (done automatically by webpack) so that child microfrontends (remotes) will be loaded optimally avoiding the risk of increasing the bundle and importing the same libraries twice.

Folders are modules and inculde separate files around React views and Redux structure.


#### Webpack configuration

Enabling code splitting for the microfrontend shell is done using the Webpack _ModuleFederationPlugin_.

The confguration is similar to the following: 
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
Ther are more usage examples in `App/Microfrontend`.