import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components';
import { useAuthConfig } from 'Config';
import { useToken } from './hooks';

import Menu from './Menu';
import { MicrofrontendOne, MicrofrontendTwo } from './Microfrontends';

function App() {
  const token = useToken();
  const authConfig = useAuthConfig();

  return (
    <Layout>
      <Layout.Navbar username="Guest User" title="Shell Application Container" />
      <Layout.Content>
        <Layout.SideMenu>
          <Menu />
        </Layout.SideMenu>
        <Layout.Page>
          <Switch>
            <Route path="/child">
              <MicrofrontendOne token={token} authConfig={authConfig} />
            </Route>
            <Route path="/other">
              <MicrofrontendTwo token={token} authConfig={authConfig} />
            </Route>
            <Route path="/signin">
              <p>Please authenticate again</p>
            </Route>
          </Switch>
        </Layout.Page>
      </Layout.Content>
    </Layout>
  );
}

export default App;
