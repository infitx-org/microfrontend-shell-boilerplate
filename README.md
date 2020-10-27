### Microfrontned Shell Boilerplate

This is the Shell application boilerplate project to create microfrontends.

It is based on React / Redux and it is built in Typescript and developed with Webpack, Babel, Eslint, Prettier.

Includes React Router, Redux Saga, and the modusbox UI components.

It provides a basic module structure ready to be used, a webpack configuration that exports the microfrontend so that it can be lazy loaded.

#### Available scripts

 - `yarn prettier` to prettify the codebase
 - `yarn lint` to lint the codebase
 - `yarn build` to produce the bundle(s)
 - `yarn serve` to run the production build locally

#### Structure

The file structure is quite similar to a standard module based structure; the only difference with a regular app where all source is bundled, here we are exporting multiple chunks (done automatically by webpack) so that child microfrontends (remotes) will be loaded optimally avoiding the risk of increasing the bundle and importing the same libraries twice.

Folders are modules and inculde separate files around React views and Redux structure.


#### Webpack configuration

Enabling code splitting for the microfrontend shell is done using the Webpack _ModuleFederationPlugin_.

The confguration is similar to the following: 
```javascript
plugins: [
    new ModuleFederationPlugin({
      remotes: {
        app: 'app@http://localhost:3002/app.js',
      },
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
````

