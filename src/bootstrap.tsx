import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store/configureStore';
import getConfig from './Config';
import App from './App';
import { hocs as authHocs } from './Auth';
import './index.scss';

const AuthApp = authHocs.withAuth(App);

async function boot() {
  const config = await getConfig();
  const history = createBrowserHistory();
  const store = configureStore(
    { isDevelopment: process.env.NODE_ENV === 'development', history },
    {
      config: {
        app: {
          basename: config.basename,
        },
        api: {
          apiBaseUrl: config.apiBaseUrl,
          mockApi: config.mockApi,
        },
        auth: {
          loginEndpoint: config.loginEndpoint,
          logoutEndpoint: config.logoutEndpoint,
          tokenEndpoint: config.tokenEndpoint,
          isAuthEnabled: config.isAuthEnabled,
        },
      },
    },
  );

  const ConnectedApp = () => (
    <Provider store={store}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <AuthApp />
      </ConnectedRouter>
    </Provider>
  );

  ReactDOM.render(<ConnectedApp />, document.getElementById('root'));
}

boot();
