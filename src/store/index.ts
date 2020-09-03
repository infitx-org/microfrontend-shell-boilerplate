import {
  InjectableStore,
  addReducerInjector,
  addSagaInjector,
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

  const storeWithRJ = addReducerInjector(store, reducer);
  const storeWithSJ = addSagaInjector(storeWithRJ, sagaMiddleware.run, sagas);

  sagaMiddleware.run(sagas);

  return storeWithSJ;
}
