import React, { FC, Suspense } from 'react';

// @ts-ignore
const ChildAppLoader = React.lazy(() => import('app/App'));

const ChildApp: FC<unknown> = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <ChildAppLoader />
    </Suspense>
  </div>
);

export default ChildApp;
