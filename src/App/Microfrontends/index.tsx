import React from 'react';
import { AuthConfig } from 'Config';
import Loader from 'utils/loader';

const [url, name, component] = (process.env.MICROFRONTEND_ONE || '').split('|');

interface SharedProps {
  token: string | null;
  authConfig: AuthConfig;
  [x: string]: any;
}

export function MicrofrontendOne(props: SharedProps) {
  return <Loader url={url} appName={name} component={component} {...props} />;
}

export function MenuOne(props: any) {
  return <Loader url="http://localhost:3012/app.js" appName="app" component="Menu" {...props} />;
}

export function MicrofrontendTwo(props: SharedProps) {
  return <Loader url="http://localhost:3003/app2.js" appName="app2" component="App2" {...props} />;
}
