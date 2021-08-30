import React from 'react';
import { Column, Heading, Icon, Layout, Row, Text } from 'components';
import { Switch, Route } from 'react-router-dom';
import EmotionLessIcon from 'bootstrap-icons/icons/emoji-expressionless.svg';
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

interface HomeRouteProps {
  remotes: Remote[];
}
function HomeRoute({ remotes }: HomeRouteProps) {
  return (
    <>
      <Heading size="3">This is your home route</Heading>
      <br />
      <br />
      <Text>The api /api/remotes returned {remotes.length} remote apps</Text>
      <br />
      <br />
      <Text>The config is the following</Text>
      <code>
        <pre style={{ background: '#eee', borderRadius: 5, padding: 10 }}>
          {JSON.stringify(remotes, null, 2)}
        </pre>
      </code>
    </>
  );
}

function NotFoundRoute() {
  return (
    <Column style={{ height: '100%' }} align="center center">
      <Heading size="3">Something did not work as expected</Heading>
      <br />
      <br />

      <Row align="center center">
        <Icon size={80} icon={<EmotionLessIcon />} fill="#999" />
        <Heading size="4" style={{ color: '#999', paddingLeft: '40px' }}>
          The page you are looking for does not exist
        </Heading>
      </Row>
      <br />
      <br />
    </Column>
  );
}

interface RouterProps {
  remotes: Remote[];
}

function Router({ remotes }: RouterProps) {
  const authConfig = useAuthConfig();
  return (
    <>
      <Layout.SideMenu>
        <Menu remotes={remotes} />
      </Layout.SideMenu>
      <Layout.Page>
        <Switch>
          <Route exact path="/">
            <HomeRoute remotes={remotes} />
          </Route>
          {getRoutes(remotes, authConfig)}
          <Route path="*">
            <NotFoundRoute />
          </Route>
        </Switch>
      </Layout.Page>
    </>
  );
}

export default Router;
