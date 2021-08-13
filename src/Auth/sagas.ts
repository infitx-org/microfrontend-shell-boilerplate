import apis from 'utils/api';
import { is200, is401 } from '@modusbox/ts-utils/lib/http';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as selectors from './selectors';
import { actions } from './slice';

function* doAuth() {
  try {
    const { status, data } = yield call(apis.whoami.read, {});

    if (is200(status)) {
      yield put(actions.checkAuthSuccess(data));
    } else if (is401(status)) {
      window.location.href = yield select(selectors.getLoginEndpoint);
    } else {
      yield put(
        actions.checkAuthFailed(
          'There was an error while performing authentication. Please try again later',
        ),
      );
    }
  } catch (e) {
    yield put(
      actions.checkAuthFailed('Currently unable to perform authentication. Please try again later'),
    );
  }
}

function* logout() {
  window.location.href = yield select(selectors.getLogoutEndpoint);
}

function* checkAuthSaga() {
  yield takeLatest([actions.checkAuth.type], doAuth);
}

function* logoutSaga() {
  yield takeLatest([actions.logout.type], logout);
}

export default function* rootSaga() {
  yield all([checkAuthSaga(), logoutSaga()]);
}
