import React, { ReactElement, FC } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { Provider, ReactReduxContext } from 'react-redux';
import configure from 'store/configureStore';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function render(ui: ReactElement<unknown>, { ...renderOptions } = {}) {
  const history = createMemoryHistory();
  const store = configure({ isDevelopment: true, history });

  // @ts-ignore
  const wrapper: FC<unknown> = ({ children }) => {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
