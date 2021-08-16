import { injectors } from '@modusbox/redux-utils';
import { InjectableStore } from '@modusbox/redux-utils/lib/injectors/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import getCreateReducer, { getReducers } from './createReducer';
import rootSaga from './sagas';

interface StoreConfig {
  isDevelopment: boolean;
  history: History;
}

export default function configure(config: StoreConfig, preloadedState = {}): InjectableStore {
  const { history } = config;
  const sagaMiddleware = createSagaMiddleware({});
  const createReducer = getCreateReducer(history);
  const staticReducers = createReducer();
  const middlewares = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  const withInjectors = injectors.applyInjectors({
    staticReducers: getReducers(history),
    sagaRunner: sagaMiddleware.run,
    rootSaga,
  });
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    staticReducers,
    preloadedState,
    // @ts-ignore
    composeEnhancers(withInjectors, middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store as InjectableStore;
}
