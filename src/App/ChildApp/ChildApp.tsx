import React, { FC, Suspense } from 'react';
import loadComponent from 'utils/loader';

/* eslint-disable */
interface ErrorBoundaryState {
  error?: Error;
}
class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error ? error : undefined };
  }

  componentDidCatch(error: Error) {
    console.error(error.toString());
  }

  render() {
    if (this.state.error) {
      return (
        <span style={{ color: 'red' }}>
          {this.state.error.type} : {this.state.error.message}
        </span>
      );
    }

    return this.props.children;
  }
}

/* eslint-enable */
const ComponentLoadingPromise = loadComponent('http://localhost:3002/app.js', 'app', 'App');

// @ts-ignore
const ChildApp: FC<ChildAppWrapperProps> = React.lazy(ComponentLoadingPromise);

interface ChildAppWrapperProps {
  token: string | null;
}

const ChildAppWrapper: FC<ChildAppWrapperProps> = ({ token }) => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <ChildApp token={token} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ChildAppWrapper;
