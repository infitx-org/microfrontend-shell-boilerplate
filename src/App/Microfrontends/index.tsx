import React from 'react';
import { AuthConfig } from 'Config';
import Loader from '../../utils/loader';

interface SharedProps {
  token: string | null;
  authConfig: AuthConfig;
}

export function MicrofrontendOne(props: SharedProps) {
  return <Loader url="http://localhost:3002/app.js" appName="app" component="App" {...props} />;
}

export function MenuOne(props: any) {
  return <Loader url="http://localhost:3002/app.js" appName="app" component="Menu" {...props} />;
}

export function MicrofrontendTwo(props: SharedProps) {
  return <Loader url="http://localhost:3003/app2.js" appName="app2" component="App2" {...props} />;
}
