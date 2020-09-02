import React, { FC, Suspense } from 'react';
// import { useHistory } from 'react-router-dom';
import { Title } from 'components';
import { useBasePath } from './hooks';

// @ts-ignore
const ChildAppLoader = React.lazy(() => import('app/App'));

const ChildApp = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <ChildAppLoader />
    </Suspense>
  </div>
);

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

const Welcome: FC<WelcomeProps> = ({ basePath }) => (
  <div style={{ padding: '10px' }}>
    <Title>
      <strong>Welcome! This is the shell App. Basepath is {basePath}</strong>
    </Title>
    <ChildApp />
  </div>
);

export default App;
