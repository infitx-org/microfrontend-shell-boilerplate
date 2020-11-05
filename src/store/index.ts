import {
  applyInjectors,
  InjectableStore,
} from '@modusbox/modusbox-ui-components/dist/redux/injectors';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, combineReducers } from 'redux';
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
  // eslint-disable-next-line
  config: StoreConfig = {
    isDevelopment: process.env.NODE_ENV === 'development',
  },
): InjectableStore {
  const sagaMiddleware = createSagaMiddleware({});
  const staticReducers = createReducer(history);
  const middlewares = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  const injectors = applyInjectors({ staticReducers, sagaRunner: sagaMiddleware.run });
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    combineReducers(staticReducers),
    undefined,
    composeEnhancers(middlewares, injectors),
  );

  sagaMiddleware.run(sagas);

  return store as InjectableStore;
}
