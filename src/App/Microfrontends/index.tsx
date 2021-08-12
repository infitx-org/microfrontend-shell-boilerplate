import React, { FC } from 'react';
import Loader from '../../utils/loader';

export const Title: FC<unknown> = ({ children }) => (
  <Loader url="http://localhost:3002/app.js" appName="app" component="Title">
    {children}
  </Loader>
);

export const MicrofrontendOne: FC<{ token: string | null }> = ({ token }) => (
  <Loader url="http://localhost:3002/app.js" appName="app" component="App" token={token} />
);

export const MicrofrontendTwo: FC<{ token: string | null }> = ({ token }) => (
  <Loader url="http://localhost:3003/app2.js" appName="app2" component="App2" token={token} />
);
