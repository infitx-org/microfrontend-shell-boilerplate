import React, { FC } from 'react';
import Loader from '../../utils/loader';

export const Title: FC<unknown> = ({ children }) => (
  <Loader url="http://localhost:3002/app.js" appName="app" module="Title">
    {children}
  </Loader>
);

export const MicrofrontendOne: FC<{ token: string | null }> = ({ token }) => (
  <Loader url="http://localhost:3002/app.js" appName="app" module="App" token={token} />
);

export const MicrofrontendTwo: FC<{ token: string | null }> = ({ token }) => (
  <Loader url="http://localhost:3003/app2.js" appName="app2" module="App2" token={token} />
);
