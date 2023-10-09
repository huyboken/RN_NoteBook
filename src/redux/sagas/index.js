import {all, fork} from 'redux-saga/effects';
import watchUserSagas from './UserSagas';
import watchPasswordSagas from './Password';

export default function* rootSaga() {
  yield all([fork(watchUserSagas), fork(watchPasswordSagas)]);
}
