import { all } from 'redux-saga/effects';
import { sagas as authSagas } from 'Auth';
import appSagas from '../App/sagas';

function* rootSaga(): Generator {
  yield all([appSagas(), authSagas()]);
}

export default rootSaga;
