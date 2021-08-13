import { Dispatch as ReduxDispatch } from 'redux';
import createReducer from './createReducer';

const rootReducer = createReducer()();

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = ReduxDispatch;
