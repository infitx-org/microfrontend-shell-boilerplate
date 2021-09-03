## Microfrontend Setup

This microfrontend setup is configured to have this project acting as the host.

It is responsible to load the children modules/app at runtime and provide them with some context e.g. auth, routing. 

`microfrontend-shell-boilerplate` is a default host(parent) boilerplate meant to consume one or more child microfrontends such as [microfrontend-boilerplate](https://github.com/modusintegration/microfrontend-boilerplate).

Enabling code splitting for the microfrontend shell is done using the Webpack _ModuleFederationPlugin_.

### Configuring Webpack Module Federeation

In the project root directory you can find the `webpack.config.js` configuration file.


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
