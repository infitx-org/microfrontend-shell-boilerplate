import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, MessageBox } from 'components';
import { useAuthConfig, AuthConfig } from 'Config';
import Loader from 'utils/loader';
import Menu from './Menu';
import { Remote } from './types';

function getRoutes(remotes: Remote[], authConfig: AuthConfig) {
  return remotes.map(({ path, appComponent, url, appName }) => {
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
  const [remotes, setRemotes] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function readRemotes() {
      try {
        const response = await fetch('/api/remotes');
        const json = await response.json();
        setRemotes(json);
      } catch (e) {
        setError(e.message);
      }
    }
    readRemotes();
  }, []);
  const authConfig = useAuthConfig();

  return (
    <Layout>
      <Layout.Navbar username="Guest User" title="Shell Application Container" />
      <Layout.Content>
        {error ? (
          <MessageBox kind="danger">{error}</MessageBox>
        ) : (
          <>
            <Layout.SideMenu>
              <Menu remotes={remotes} />
            </Layout.SideMenu>
            <Layout.Page>
              <Switch>{getRoutes(remotes, authConfig)}</Switch>
            </Layout.Page>
          </>
        )}
      </Layout.Content>
    </Layout>
  );
}

export default App;
