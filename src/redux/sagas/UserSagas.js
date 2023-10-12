import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce, put, takeLatest, throttle} from 'redux-saga/effects';
import {actions, _onFail, _onSuccess} from '../constants';
import API from '../../utils/API';

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

function* getUserInfo() {
  try {
    const res = yield API.get('users');
    if (res) {
      yield put({
        type: _onSuccess(actions.GET_USER_INFO),
        data: res,
      });
    } else {
      yield put({type: _onFail(actions.GET_USER_INFO), data: null});
    }
  } catch (e) {
    yield put({type: _onFail(actions.GET_USER_INFO)});
  }
}

function* updateUserInfo(payload) {
  const userId = yield AsyncStorage.getItem('UserId');
  try {
    const res = yield API.update('users', userId, payload.body);
    if (res.status) {
      yield put({
        type: _onSuccess(actions.UPDATE_USER_INFO),
        data: {...res, ...payload.body},
      });
    } else {
      yield put({type: _onFail(actions.UPDATE_USER_INFO), data: null});
    }
  } catch (e) {
    yield put({type: _onFail(actions.UPDATE_USER_INFO)});
  }
}

export default function* watchUserSagas() {
  yield takeLatest(actions.SET_FIRST_TIME_USE, setFirstTimeUse);
  yield takeLatest(actions.GET_FIRST_TIME_USE, getFirstTimeUse);
  yield takeLatest(actions.GET_USER_INFO, getUserInfo);
  yield takeLatest(actions.UPDATE_USER_INFO, updateUserInfo);
}
