import React, { Suspense } from 'react';
import loadComponent from './loadComponent';
import ErrorBoundary from './ErrorBoundary';

interface LoaderProps {
  url: string;
  appName: string;
  component: string;
  [x: string]: unknown;
}

function Loader({ url, appName, component, children, ...other }: LoaderProps) {
  const Component = React.lazy(loadComponent(url, appName, component));

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...other}>{children}</Component>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Loader;
