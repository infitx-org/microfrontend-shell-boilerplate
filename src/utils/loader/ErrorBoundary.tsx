import React from 'react';

interface ErrorBoundaryState {
  error?: Error;
}

class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error || undefined };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line
    console.error(error.toString());
  }

  render() {
    if (this.state.error) {
      return (
        <span style={{ color: 'red' }}>
          {this.state.error.name} : {this.state.error.message}
        </span>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
