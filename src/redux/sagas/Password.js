import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce, put, takeLatest, throttle} from 'redux-saga/effects';
import {actions, _onFail, _onSuccess} from '../constants';
import API from '../../utils/API';

function* getAllPassword(payload) {
  try {
    const passwords = yield API.getAll('users', 'passwords');
    if (passwords) {
      yield put({type: _onSuccess(actions.GET_ALL_PASSWORD), data: passwords});
    } else {
      yield put({type: _onFail(actions.GET_ALL_PASSWORD)});
    }
  } catch (e) {
    console.log(e);
    yield put({type: _onFail(actions.GET_ALL_PASSWORD)});
  }
}

function* createPassword(payload) {
  try {
    const res = yield API.create('users', 'passwords', payload.body);
    if (res.status) {
      yield put({type: _onSuccess(actions.CREATE_PASSWORD), data: res});
    } else {
      yield put({type: _onFail(actions.CREATE_PASSWORD)});
    }
  } catch (e) {
    yield put({type: _onFail(actions.CREATE_PASSWORD)});
  }
}

function* deletePassword(payload) {
  try {
    const res = yield API.remove('users', 'passwords', payload.body);
    if (res.status) {
      yield put({
        type: _onSuccess(actions.DELETE_PASSWORD),
        data: {...res, id: payload.body},
      });
    } else {
      yield put({type: _onFail(actions.DELETE_PASSWORD)});
    }
  } catch (e) {
    yield put({type: _onFail(actions.DELETE_PASSWORD)});
  }
}

export default function* watchPasswordSagas() {
  yield takeLatest(actions.GET_ALL_PASSWORD, getAllPassword);
  yield takeLatest(actions.CREATE_PASSWORD, createPassword);
  yield takeLatest(actions.DELETE_PASSWORD, deletePassword);
}
