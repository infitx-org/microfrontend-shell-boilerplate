import React, { ComponentType, useEffect } from 'react';
import authConnector, { AuthProps } from './connectors';
import { AuthAppProps } from './types';
import Auth from './Auth';

export function withAuth(App: ComponentType<AuthAppProps>) {
  const AuthLoader = (props: AuthProps): JSX.Element => {
    const { isAuthEnabled, isLoggedIn, userEmail, doAuth, onLogoutClick } = props;

    useEffect(() => {
      if (isAuthEnabled) {
        doAuth();
      }
    }, []);

    if (!isAuthEnabled || isLoggedIn) {
      const authAppProps: AuthAppProps = {
        onLogoutClick,
        userEmail,
      };
      return <App {...authAppProps} />;
    }
    return <Auth {...props} />;
  };

  return authConnector(AuthLoader);
}
