import { Store, StoreCreator, Reducer, AnyAction, combineReducers } from 'redux';
import { Saga, Task } from 'redux-saga';
// @ts-ignore
import hash from 'object-hash';

export type SagaRunner = (Saga: Saga) => Task;
export type SagaInjector = (key: string, saga: Saga) => void;

type ReducerMap = Record<string, Reducer>;

// We need to define the InjectReducerAndSaga type extending the store the way we want
type InjectReducerAndSaga = (reducer: Reducer, saga: Saga) => string;

interface StoreInjectors {
  inject: InjectReducerAndSaga;
  asyncReducers?: any;
}

type InjectableStore = Store & StoreInjectors;

function createSagaInjector(runSaga: SagaRunner): SagaInjector {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();
  const isInjected = (key: string) => injectedSagas.has(key);

  return function sagaInjector(key: string, saga: Saga) {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };
}

function createReducerInjector(replaceReducer: (reducer: Reducer) => void, reducers: ReducerMap) {
  const asyncReducers: ReducerMap = {};

  return function reducerInjector(asyncReducer: Reducer) {
    const hashValue = hash(asyncReducer(undefined, {} as AnyAction));

    // do not replace reducer if already mounted
    if (!(hashValue in asyncReducers)) {
      // save new reducer
      Object.assign(asyncReducers, { [hashValue]: asyncReducer });

      replaceReducer(
        combineReducers({
          ...reducers,
          ...asyncReducers,
        }),
      );
    }

    return hashValue;
  };
}

function addInjectors(store: Store, reducers: ReducerMap, sagaRunner: SagaRunner): InjectableStore {
  // Inject microfrontend reducers and sagas

  const injectSaga = createSagaInjector(sagaRunner);
  const injectReducer = createReducerInjector(store.replaceReducer, reducers);

  return {
    ...store,
    inject: (asyncReducer: Reducer, asyncSaga): string => {
      const hashValue = injectReducer(asyncReducer);

      if (asyncSaga) {
        // let's run the child app sagas by using the same unique hashValue
        injectSaga(hashValue, asyncSaga);
      }

      return hashValue;
    },
  };
}

const injectStore = ({
  staticReducers,
  sagaRunner,
}: {
  staticReducers: ReducerMap;
  sagaRunner: SagaRunner;
}) => (createStore: StoreCreator) => {
  return function injectStoreCreator(reducerFn: Reducer, preloadedState: ReturnType<Reducer>) {
    const store = createStore(reducerFn, preloadedState);
    return addInjectors(store, staticReducers, sagaRunner);
  };
};

export { injectStore };

export type { InjectableStore };
