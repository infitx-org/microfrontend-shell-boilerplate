import React, { Component, ComponentType, Suspense } from 'react';
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

export default class Loader extends Component<LoaderProps> {
  private AsyncComponent: ComponentType;

  constructor(props: LoaderProps) {
    super(props);
    const { url, appName, component } = this.props;

    // load before mount so that it's stored in memory and won't cause
    // reloads when rendered again
    this.AsyncComponent = React.lazy(loadComponent(url, appName, component));
  }

  render() {
    const { Fallback = BaseFallback, children, ...otherProps } = this.props;
    const { AsyncComponent } = this;

    return (
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <AsyncComponent {...otherProps}>{children}</AsyncComponent>
        </Suspense>
      </ErrorBoundary>
    );
  }
}
