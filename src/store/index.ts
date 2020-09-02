import {
  InjectableStore,
  addReducerInjector,
  addSagaInjector,
} from '@modusbox/modusbox-ui-components/dist/redux/injectors';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import createReducer from './createReducer';
import sagas from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof composeWithDevTools;
    store?: () => InjectableStore;
  }
}

interface StoreConfig {
  isDevelopment: boolean;
}

export default function configure(
  history: History,
  config: StoreConfig = {
    isDevelopment: process.env.NODE_ENV === 'development',
  },
): InjectableStore {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middleware = [...getDefaultMiddleware(), routerMiddleware(history), sagaMiddleware];
  const reducer = createReducer(history);
  const store = configureStore({
    reducer,
    middleware,
    devTools: config.isDevelopment,
  });

  const storeWithRJ = addReducerInjector(store, reducer);
  const storeWithSJ = addSagaInjector(storeWithRJ, sagaMiddleware.run, sagas);

  // if (module.hot) {
  //   module.hot.accept('store/index', () => {
  //     // forceReducerReload(configure(history));
  //   });
  // }

  sagaMiddleware.run(sagas);

  return storeWithSJ;
}
