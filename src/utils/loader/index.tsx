import React, { FC, Suspense } from 'react';
import loadComponent from './loadComponent';
import ErrorBoundary from './ErrorBoundary';

interface LoaderProps {
  url: string;
  appName: string;
  module: string;
  [x: string]: unknown;
}

class Loader extends React.Component<LoaderProps, {}> {
  Microfrontend: FC<unknown>;

  constructor(props: LoaderProps) {
    super(props);
    this.Microfrontend = React.lazy(loadComponent(props.url, props.appName, props.module));
  }

  render() {
    const { appName, url, module, children, ...props } = this.props;
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <this.Microfrontend {...props}>{children}</this.Microfrontend>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default Loader;
