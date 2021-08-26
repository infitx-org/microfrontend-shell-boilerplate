import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import getCreateReducer from './createReducer';
import rootSaga from './sagas';

interface StoreConfig {
  isDevelopment: boolean;
  history: History;
}

export default function configure(config: StoreConfig, preloadedState = {}) {
  const { history } = config;
  const sagaMiddleware = createSagaMiddleware({});
  const createReducer = getCreateReducer(history);
  const staticReducers = createReducer();
  const middlewares = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    staticReducers,
    preloadedState,
    // @ts-ignore
    composeEnhancers(middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
