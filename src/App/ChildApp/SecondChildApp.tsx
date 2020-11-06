import React, { FC, Suspense } from 'react';

// @ts-ignore
const SecondChildApp: FC<SecondChildAppWrapperProps> = React.lazy(() => import('app/App'));

interface SecondChildAppWrapperProps {
  token: string | null;
}

const SecondChildAppWrapper: FC<SecondChildAppWrapperProps> = ({ token }) => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <SecondChildApp token={token} />
    </Suspense>
  </div>
);

export default SecondChildAppWrapper;
