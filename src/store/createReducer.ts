import { History, createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
// import { reducer as app } from 'App';
import { reducer as auth } from 'Auth';
// import { reducer as publicReducer } from 'Public';
import { reducer as config } from 'Config';
// import AppReducer from '../App/reducer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getCreateReducer(history: History = createBrowserHistory()) {
  return function createReducer() {
    return combineReducers({
      router: connectRouter(history),
      config,
      auth,
      // app,
      // public: publicReducer,
    });
  };
}
