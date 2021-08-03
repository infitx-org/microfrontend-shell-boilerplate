import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components';
import { useToken } from './hooks';

import Menu from './Menu';
import { MicrofrontendOne, MicrofrontendTwo } from './Microfrontends';

const App: FC<unknown> = () => {
  const token = useToken();

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
              <MicrofrontendOne token={token} />
            </Route>
            <Route path="/other">
              <MicrofrontendTwo token={token} />
            </Route>
          </Switch>
        </Layout.Page>
      </Layout.Content>
    </Layout>
  );
};

export default App;
