import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useToken } from './hooks';

import { Title, MicrofrontendOne, MicrofrontendTwo } from './Microfrontends';
import Layout from './Layout';

const App: FC<unknown> = () => {
  const token = useToken();

  return (
    <Layout.Container>
      <Layout.Navbar username="Guest User" />
      <Layout.Content>
        <Layout.SideMenu />
        <Layout.Page>
          <Switch>
            <Route path="/child">
              <Title>App loaded from external script: 3002</Title>
              <MicrofrontendOne token={token} />
            </Route>
            <Route path="/other">
              <Title>App loaded from external script: 3003</Title>
              <MicrofrontendTwo token={token} />
            </Route>
          </Switch>
        </Layout.Page>
      </Layout.Content>
    </Layout.Container>
  );
};

export default App;
