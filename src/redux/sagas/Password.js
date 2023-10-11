import {debounce, put, takeLatest, throttle} from 'redux-saga/effects';
import {actions, _onFail, _onSuccess} from '../constants';
import API from '../../utils/API';

function* getAllPassword(payload) {
  try {
    const passwords = yield API.getAll('passwords', 25, payload.lastVisible);
    if (passwords) {
      yield put({
        type: _onSuccess(actions.GET_ALL_PASSWORD),
        data: passwords?.data,
        lastVisible: passwords?.lastVisible,
        shouldOverwriteExist: payload.shouldOverwriteExist || false,
      });
    } else {
      yield put({type: _onFail(actions.GET_ALL_PASSWORD)});
    }
  } catch (e) {
    yield put({type: _onFail(actions.GET_ALL_PASSWORD)});
  }
}

function* createPassword(payload) {
  try {
    const res = yield API.create('passwords', payload.body);
    if (res.status) {
      yield put({type: _onSuccess(actions.CREATE_PASSWORD), data: res});
    } else {
      yield put({type: _onFail(actions.CREATE_PASSWORD)});
    }
  } catch (e) {
    yield put({type: _onFail(actions.CREATE_PASSWORD)});
  }
}

function* updatePassword(payload) {
  try {
    const res = yield API.update('passwords', payload.id, payload.body);
    if (res.status) {
      yield put({type: _onSuccess(actions.UPDATE_PASSWORD), data: res});
    } else {
      yield put({type: _onFail(actions.UPDATE_PASSWORD)});
    }
  } catch (e) {
    yield put({type: _onFail(actions.UPDATE_PASSWORD)});
  }
}

function* deletePassword(payload) {
  try {
    const res = yield API.remove('passwords', payload.body);
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
  yield takeLatest(actions.UPDATE_PASSWORD, updatePassword);
}
