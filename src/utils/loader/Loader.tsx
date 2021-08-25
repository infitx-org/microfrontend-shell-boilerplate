import React, { ComponentType, Suspense } from 'react';
import loadComponent from './loadComponent';
import ErrorBoundary from './ErrorBoundary';

interface LoaderProps {
  url: string;
  appName: string;
  component: string;
  Fallback?: ComponentType;
  children?: React.ReactNode;
}

function BaseFallback() {
  return <div>Loading...</div>;
}

export default function Loader({
  url,
  appName,
  component,
  Fallback = BaseFallback,
  children,
  ...otherProps
}: LoaderProps) {
  const Component = React.lazy(loadComponent(url, appName, component));

  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Component {...otherProps}>{children}</Component>
      </Suspense>
    </ErrorBoundary>
  );
}
