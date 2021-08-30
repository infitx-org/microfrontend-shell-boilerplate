import React, { Component, ComponentType, Suspense } from 'react';
import { Row, Spinner } from 'components';
import loadComponent from './loadComponent';
import ErrorBoundary from './ErrorBoundary';
import PubSub from './pubsub';

const pubSub = new PubSub();

setInterval(() => pubSub.dispatch('channel-A', 'Hey'), 300);
setInterval(() => pubSub.dispatch('channel-B', 'Hey'), 1000);

interface LoaderProps {
  url: string;
  appName: string;
  component: string;
  Fallback?: ComponentType;
  children?: React.ReactNode;
  [x: string]: any;
}

interface LazyProps {
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
    const { Fallback = BaseFallback, children, ...otherProps } = this.props;
    const { AsyncComponent } = this;

    return (
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <AsyncComponent pubSub={pubSub} {...otherProps}>
            {children}
          </AsyncComponent>
        </Suspense>
      </ErrorBoundary>
    );
  }
}
