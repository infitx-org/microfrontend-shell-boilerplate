import React, { useEffect } from 'react';
import { Layout, MessageBox } from 'components';
import Router from './Router';
import appConnector, { AppProps } from './connectors';
import { Remote } from './types';
import './App.scss';

function App({ onMount, remotes }: AppProps) {
  useEffect(() => {
    onMount();
  }, []);

  let content = null;
  if (remotes.pending || !remotes.initialized) {
    content = <MessageBox kind="default">"Loading Remotes</MessageBox>;
  } else if (remotes.error) {
    content = <MessageBox kind="danger">{remotes.error}</MessageBox>;
  } else {
    content = <Router remotes={remotes.data as Remote[]} />;
  }

  return (
    <Layout>
      <Layout.Navbar username="Guest User" title="Shell Application Container" />
      <Layout.Content>{content}</Layout.Content>
    </Layout>
  );
}

export default appConnector(App);
