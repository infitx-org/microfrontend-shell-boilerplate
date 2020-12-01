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
import rootSaga from './sagas';

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
  const injectors = applyInjectors({
    staticReducers,
    sagaRunner: sagaMiddleware.run,
    rootSaga: rootSaga,
  });
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    combineReducers(staticReducers),
    undefined,
    // @ts-ignore
    composeEnhancers(injectors, middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store as InjectableStore;
}
