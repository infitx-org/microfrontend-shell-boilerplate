import React from 'react';
import { Layout } from 'components';
import { Switch, Route } from 'react-router-dom';
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

interface RouterProps {
  remotes: Remote[];
}

function Router({ remotes }: RouterProps) {
  const authConfig = useAuthConfig();
  return (
    <>
      <Layout.SideMenu className="app__menu__container">
        <Menu remotes={remotes} />
      </Layout.SideMenu>
      <Layout.Page>
        <Switch>{getRoutes(remotes, authConfig)}</Switch>
      </Layout.Page>
    </>
  );
}

export default Router;
