import { MessageBox } from 'components';
// @ts-ignore
import WarnIcon from 'bootstrap-icons/icons/exclamation-diamond-fill.svg';
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
        <MessageBox kind="danger" icon={<WarnIcon />} size={30}>
          <b>{this.state.error.name}</b>: {this.state.error.message}
        </MessageBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
