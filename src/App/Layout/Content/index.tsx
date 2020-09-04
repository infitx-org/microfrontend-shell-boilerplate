import React, { FC } from 'react';

const Content: FC<unknown> = ({ children }) => {
  return <div className="layout__content">{children}</div>;
};

export default Content;
