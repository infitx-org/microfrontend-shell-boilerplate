import React, { Component, ComponentType, Suspense } from 'react';
import { Row, Spinner } from 'components';
import { PubSub, AuthConfig } from '@modusbox/microfrontend-utils';
import loadComponent from './loadComponent';
import ErrorBoundary from './ErrorBoundary';

const pubSub = new PubSub();

pubSub.dispatch('channel-A', 'channel-A queue message', { persist: 10000 });

interface BaseLoaderProps {
  url: string;
  appName: string;
  component: string;
  Fallback?: ComponentType;
  children?: React.ReactNode;
  [x: string]: any;
  path: string;
}

type MainLoaderProps = BaseLoaderProps & {
  main: true;
  authConfig: AuthConfig;
};

type SecondaryLoaderProps = BaseLoaderProps & {
  main: false;
  authConfig?: undefined;
};

type LoaderProps = MainLoaderProps | SecondaryLoaderProps;

interface LazyProps {
  path: string;
  pubSub: PubSub;
}

function BaseFallback() {
  return (
    <Row style={{ height: '100px' }}>
      <Spinner center />
    </Row>
  );
}

export default class Loader extends Component<LoaderProps> {
  private AsyncComponent: ComponentType<LazyProps>;

  constructor(props: LoaderProps) {
    super(props);
    const { url, appName, component } = this.props;

    // load before mount so that it's stored in memory and won't cause
    // reloads when rendered again
    this.AsyncComponent = React.lazy(loadComponent<LazyProps>(url, appName, component));
  }

  render() {
    const {
      // these ones are not passed down, only used internally
      url,
      appName,
      component,
      Fallback = BaseFallback,
      // these props are passed to the async component
      path,
      children,
      ...otherProps
    } = this.props;
    const { AsyncComponent } = this;

    return (
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <AsyncComponent pubSub={pubSub} path={path} {...otherProps}>
            {children}
          </AsyncComponent>
        </Suspense>
      </ErrorBoundary>
    );
  }
}
