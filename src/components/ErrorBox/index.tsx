import React from 'react';
// @ts-ignore
import WarnIcon from 'bootstrap-icons/icons/exclamation-diamond-fill.svg';
import { MessageBox } from '@modusbox/react-components';

interface ErrorBoxProps {
  children: React.ReactNode;
}

function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <MessageBox kind="danger" icon={<WarnIcon />} size={30}>
      {children}
    </MessageBox>
  );
}

export default ErrorBox;
