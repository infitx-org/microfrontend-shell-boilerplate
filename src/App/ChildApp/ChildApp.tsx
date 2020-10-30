import React, { FC, Suspense } from 'react';

// eslint-disable-next-line
const ChildApp: FC<ChildAppWrapperProps> = React.lazy(() => import('app/App'));
// @ts-ignore
// const ChildApp: FC<{ token }> = ({ token }) => <span>{token}</span>;

interface ChildAppWrapperProps {
  token: string | null;
}

const ChildAppWrapper: FC<ChildAppWrapperProps> = ({ token }) => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <ChildApp token={token} />
    </Suspense>
  </div>
);

export default ChildAppWrapper;
