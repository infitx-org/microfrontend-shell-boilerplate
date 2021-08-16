import React from 'react';
import { Spinner, ErrorBox } from 'components';
import { AuthProps } from './connectors';
import './Auth.scss';

const Auth = ({ isAuthPending, authError }: AuthProps) => {
  return (
    <div className="auth__container">
      <div className="auth__error__container">{authError && <ErrorBox>{authError}</ErrorBox>}</div>
      <div className="auth__loader__container">{isAuthPending && <Spinner size="medium" />}</div>
    </div>
  );
};

export default Auth;
