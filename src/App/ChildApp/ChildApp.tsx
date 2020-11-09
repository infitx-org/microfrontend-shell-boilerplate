import React, { FC, Suspense } from 'react';

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

class WebpackContainerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Webpack Container Error';
  }
}

class WebpackLoadingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Webpack Loading Error';
  }
}

function loadComponent(url: string, scope: string, moduleName: string) {
  return () =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = async () => {
        try {
          // @ts-ignore
          await __webpack_init_sharing__('default');
          // @ts-ignore
          const container = window[scope];
          if (!container) {
            reject(new WebpackContainerError(`container ${scope} not found`));
          }

          // @ts-ignore
          await container.init(__webpack_share_scopes__.default);
          // @ts-ignore
          const factory = await window[scope].get(`./${moduleName}`);
          const Module = factory();
          resolve(Module);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => {
        reject(new WebpackLoadingError(`Error loading from ${url}`));
      };

      const head =
        document.querySelector('head') || document.body.appendChild(document.createElement('head'));
      head.appendChild(script);
    });
}

/* eslint-enable */
const ComponentLoadingPromise = loadComponent('http://localhost:3002/aspp.js', 'app', 'App');

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
