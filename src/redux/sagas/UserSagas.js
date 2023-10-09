import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce, put, takeLatest, throttle} from 'redux-saga/effects';
import {actions, _onFail, _onSuccess} from '../constants';

function* setFirstTimeUse() {
  try {
    yield AsyncStorage.setItem('isFirstTimeUse', 'true');
    yield put({type: _onSuccess(actions.SET_FIRST_TIME_USE)});
  } catch (e) {
    yield put({type: _onFail(actions.SET_FIRST_TIME_USE)});
  }
}

function* getFirstTimeUse() {
  try {
    const firstTimeUse = yield AsyncStorage.getItem('isFirstTimeUse');
    if (firstTimeUse) {
      yield put({type: _onSuccess(actions.GET_FIRST_TIME_USE), data: true});
    } else {
      yield put({type: _onSuccess(actions.GET_FIRST_TIME_USE), data: false});
    }
  } catch (e) {
    yield put({type: _onFail(actions.GET_FIRST_TIME_USE)});
  }
}

function* getUserInfo(payload) {
  try {
    if (payload.user?.uid) {
      yield put({
        type: _onSuccess(actions.GET_USER_INFO),
        data: payload.user?.uid,
      });
    } else {
      yield put({type: _onFail(actions.GET_USER_INFO), data: null});
    }
  } catch (e) {
    yield put({type: _onFail(actions.GET_USER_INFO)});
  }
}

export default function* watchUserSagas() {
  yield takeLatest(actions.SET_FIRST_TIME_USE, setFirstTimeUse);
  yield takeLatest(actions.GET_FIRST_TIME_USE, getFirstTimeUse);
  yield takeLatest(actions.GET_USER_INFO, getUserInfo);
}
