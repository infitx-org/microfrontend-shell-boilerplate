import apis from 'utils/api';
import { is200 } from '@modusbox/ts-utils/lib/http';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* requestRemotes() {
  try {
    const { status, data } = yield call(apis.remotes.read, {});

    if (is200(status)) {
      yield put(actions.requestRemotesSuccess(data));
    } else {
      yield put(
        actions.requestRemotesFailed(
          'There was an error while retrieving remotes. Please try again later',
        ),
      );
    }
  } catch (e) {
    yield put(actions.requestRemotesFailed('Some internal error occurred. Please try again later'));
  }
}

function* requestRemotesSaga() {
  yield takeLatest([actions.requestRemotes.type], requestRemotes);
}

export default function* rootSaga() {
  yield all([requestRemotesSaga()]);
}
