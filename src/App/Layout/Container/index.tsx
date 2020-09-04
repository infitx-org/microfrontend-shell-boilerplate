import React, { FC } from 'react';

const Container: FC<unknown> = ({ children }) => {
  return <div className="layout__container">{children}</div>;
};

export default Container;
