import {
  addInjectors,
  InjectableStore,
} from '@modusbox/modusbox-ui-components/dist/redux/injectors';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import createReducer from './createReducer';
import sagas from './sagas';

interface StoreConfig {
  isDevelopment: boolean;
}

type Saga = () => Generator;

export default function configure(
  history: History,
  config: StoreConfig = {
    isDevelopment: process.env.NODE_ENV === 'development',
  },
): InjectableStore {
  const sagaMiddleware = createSagaMiddleware({});
  const middleware = [...getDefaultMiddleware(), routerMiddleware(history), sagaMiddleware];
  const reducer = createReducer(history);
  const store = configureStore({
    reducer,
    middleware,
    devTools: config.isDevelopment,
  });

  // TODO: Fix ui-components not returning Task https://github.com/modusintegration/modusbox-ui-components/blob/version2/src/rredux/injectors/types.ts#L4
  // @ts-ignore
  const injectableStore = addInjectors(store, reducer, sagas, sagaMiddleware.run);

  sagaMiddleware.run(sagas);

  return injectableStore;
}
