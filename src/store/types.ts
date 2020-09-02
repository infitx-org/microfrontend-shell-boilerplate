import { Dispatch as ReduxDispatch } from 'redux';
import { RouterState } from 'connected-react-router';

export interface State {
  router: RouterState;
}
export type Dispatch = ReduxDispatch;
