## Microfrontend Setup

This microfrontend setup is configured to have this project acting as the host.

It is responsible to load the children modules/app at runtime and provide them with some context e.g. auth, routing. 

`microfrontend-shell-boilerplate` is a default host(parent) boilerplate meant to consume one or more child microfrontends such as [microfrontend-boilerplate](https://github.com/modusintegration/microfrontend-boilerplate).

- [Isolation And Defined Boundary](#isolation-and-defined-boundary)
- [Webpack Module Federation](#webpack-module-federation)
- [Loading Children Modules](#loading-children-modules)


### Isolation And Defined Boundary

- [Custom Redux Context](#custom-redux-context)
- [CSS Namespaceing](#css-namespacing)


#### Custom Redux Context

The Redux store needs to be isolated and non accessible by the children applications.

For such reason, the store module (`src/store`) exports a custom React Context that is used in the Redux / React-Router Provider components.

```tsx
import configureStore, { ReduxContext } from './store';
///
///
const ConnectedApp = () => (
  <Provider store={store} context={ReduxContext}>
    <ConnectedRouter history={history} context={ReduxContext}>
      <AuthApp />
    </ConnectedRouter>
  </Provider>
);
```

**Note** While it's not necessary to use  in the host, it's still quite convenient to separate React from the application flow and business logic.

You can choose to adopt a different state manager as long as you keep it isolated and do not allow the children applications to access it.

#### CSS Namespacing

Due to the nature of the architecture, it's not possible to eliminate the issue of classnames collision. 

It's good practice to namespace your css classnames in the remote children and keep the host ones very specific.


### Webpack Module Federation

The default configuration works when running the host locally, however it's necessary to adjust the settings before deploying online.

In the project root directory you can find the `webpack.config.js` configuration file.

- [Code Splitting](#code-splitting)
- [Public Path](#public-path)
- [Module Federation Plugin](#module-federation-plugin)

#### Code Splitting

Code splitting is automatically enabled when using the _ModuleFederationPlugin_.

#### Public Path

In order to work, the microfrontend host has to specity the correct `output.publicPath`.

The `publicPath` represents the URL where the host is expected to be accessed.

To simplify the configuration, this is set using the `PUBLIC_PATH` environemnt variable.


#### Module Federation Plugin

At the plugins section, you can find the _ModuleFederationPlugin_.

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
        '@modusbox/react-components',
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

#### Loading children modules

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

#### Resources

 - https://webpack.js.org/concepts/module-federation/
 - https://github.com/module-federation/module-federation-examples
 - https://github.com/modusintegration/microfrontend-boilerplate
 - https://jamstack.org/
