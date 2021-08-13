import { History, createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
// import { reducer as app } from 'App';
import { reducer as auth } from 'Auth';
// import { reducer as publicReducer } from 'Public';
import { reducer as config } from 'Config';
// import AppReducer from '../App/reducer';

export function getReducers(history: History) {
  return {
    router: connectRouter(history),
    config,
    auth,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getCreateReducer(history: History = createBrowserHistory()) {
  return function createReducer() {
    return combineReducers(getReducers(history));
  };
}
