import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components';
import { useAuthConfig, AuthConfig } from 'Config';
import microfrontends from 'microfrontends';
import Loader from 'utils/loader';
import Menu from './Menu';

function getRoutes(authConfig: AuthConfig) {
  return microfrontends.map(({ path, appComponent, url, appName }) => {
    return (
      <Route path={path} key={path}>
        <Loader
          url={url}
          appName={appName}
          component={appComponent}
          authConfig={authConfig}
          path={path}
        />
      </Route>
    );
  });
}

function App() {
  const authConfig = useAuthConfig();

  return (
    <Layout>
      <Layout.Navbar username="Guest User" title="Shell Application Container" />
      <Layout.Content>
        <Layout.SideMenu>
          <Menu />
        </Layout.SideMenu>
        <Layout.Page>
          <Switch>{getRoutes(authConfig)}</Switch>
        </Layout.Page>
      </Layout.Content>
    </Layout>
  );
}

export default App;
