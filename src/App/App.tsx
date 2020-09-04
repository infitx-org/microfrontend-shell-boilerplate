import React, { FC, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useBasePath } from './hooks';
import ChildApp from './ChildApp';
import Layout from './Layout';

const App: FC<unknown> = () => {
  /* const history = useHistory(); */
  const basePath = useBasePath();

  return (
    <>
      <Welcome basePath={basePath} />
    </>
  );
};

interface WelcomeProps {
  basePath: string;
}

const Welcome: FC<WelcomeProps> = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setToken(data.access_token));
  }, []);

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
          </Switch>
        </Layout.Page>
      </Layout.Content>
    </Layout.Container>
  );
};

export default App;
