import React, { FC } from 'react';

const Page: FC<unknown> = ({ children }) => {
  return <div className="layout__page">{children}</div>;
};

export default Page;
