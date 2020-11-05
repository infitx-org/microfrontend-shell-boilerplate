import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useToken } from './hooks';

import ChildApp from './ChildApp/ChildApp';
import SecondChildApp from './ChildApp/SecondChildApp';
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
              <ChildApp token={token} />
            </Route>
            <Route path="/other">
              <SecondChildApp token={token} />
            </Route>
          </Switch>
        </Layout.Page>
      </Layout.Content>
    </Layout.Container>
  );
};

export default App;
