import { History, createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as app } from 'App';
import { reducer as auth } from 'Auth';
import { reducer as config } from 'Config';

export default function getCreateReducer(history: History = createBrowserHistory()) {
  return function createReducer() {
    return combineReducers({
      router: connectRouter(history),
      app,
      config,
      auth,
    });
  };
}
