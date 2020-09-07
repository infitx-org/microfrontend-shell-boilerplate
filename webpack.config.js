const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  devtool: 'cheap-module-source-map',
  devServer: {
    disableHostCheck: true,
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // Use 'ws' instead of 'sockjs-node' on server since we're using native
    // websockets in `webpackHotDevClient`.
    transportMode: 'ws',
    // Prevent a WS client from getting injected as we're already including
    // `webpackHotDevClient`.
    injectClient: false,
    historyApiFallback: true, // React Router
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    host: '0.0.0.0',
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://localhost',
        secure: false,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/', // Where it's going to be expected to be published for being externally loaded
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        use: 'eslint-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(ts|js)x?$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        app: 'app@http://localhost:3002/app.js',
      },
      shared: {
        ...deps,
        react: {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps.react
        },
        'react-dom': {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps['react-dom'],
        },
        'react-redux': {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps['react-redux'],
        },
        'react-router-dom': {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps['react-router-dom'],
        },
        redux: {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps.redux,
        },
        'redux-saga': {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps['redux-saga'],
        },
        history: {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps.history,
        },
        '@modusbox/modusbox-ui-components': {
          // eager: true,
          // singleton: true,
          // requiredVersion: deps['@modusbox/modusbox-ui-components'],
        },
      }, // The modules that are being shared across the apps
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
