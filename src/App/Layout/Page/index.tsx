import React, { FC } from 'react';

type Page = {};

const Page: FC<Page> = ({ children }) => {
  return <div className="layout__page">{children}</div>;
};

export default Page;
