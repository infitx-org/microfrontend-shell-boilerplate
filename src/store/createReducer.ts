import { Reducer } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
// import AppReducer from '../App/reducer';

export default function createReducer(history: History): Record<string, Reducer> {
  return {
    router: connectRouter(history),
    // app: AppReducer
  };
}
