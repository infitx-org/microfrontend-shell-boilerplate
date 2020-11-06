import React, { FC, Suspense } from 'react';

// @ts-ignore
const ChildApp: FC<ChildAppWrapperProps> = React.lazy(() => import('app/App'));

interface ChildAppWrapperProps {
  token: string | null;
}

const ChildAppWrapper: FC<ChildAppWrapperProps> = ({ token }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChildApp token={token} />
      </Suspense>
    </div>
  );
};

export default ChildAppWrapper;
