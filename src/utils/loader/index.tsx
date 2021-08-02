import React, { FC, Suspense } from 'react';
import loadComponent from './loadComponent';
import ErrorBoundary from './ErrorBoundary';

interface LoaderProps {
  url: string;
  appName: string;
  module: string;
  [x: string]: unknown;
}

const Loader: FC<LoaderProps> = (props) => {
  const { url, appName, module, children, ...other } = props;
  const Component = React.lazy(loadComponent(url, appName, module));

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...other}>{children}</Component>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Loader;
