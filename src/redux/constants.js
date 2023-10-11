export const actions = {
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
  GET_FIRST_TIME_USE: 'GET_FIRST_TIME_USE',
  GET_USER_INFO: 'GET_USER_INFO',
  GET_ALL_PASSWORD: 'GET_ALL_PASSWORD',
  CREATE_PASSWORD: 'CREATE_PASSWORD',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  DELETE_PASSWORD: 'DELETE_PASSWORD',
};

//Case thành công
export function _onSuccess(action) {
  return action + '_SUCCESS';
}

//Case thêm item lên đầu
export function _onUnshift(action) {
  return action + '_UNSHIFT';
}

//Case thất bại
export function _onFail(action) {
  return action + '_FAIL';
}

//Case reset dữ liệu về mặc định
export function _onUnmount(action) {
  return action + '_UNMOUNT';
}

//Case đang xử lí
export function _onProcessing(action) {
  return action + '_PROCESSING';
}

//Case thêm item con
export function _onBindChildren(action) {
  return action + '_CHILDREN';
}

//Case cập nhật 1 item
export function _onReloadSingle(action) {
  return action + '_RELOAD_SINGLE';
}

//Case xoá 1 item
export function _onRemoveOne(action) {
  return action + '_REMOVE_ONE';
}

export function _updateItem(action) {
  return action + '_UPDATE_ITEM';
}
export function _updateRooms(action) {
  return action + '_UPDATE_ROOMS';
}
export function _deleteRoom(action) {
  return action + '_DELETE_ROOM';
}

export function _onUpdateStatusMess(action) {
  return action + '_UPDATE_STATUS_MESSAGE';
}

export function _updateARoom(action) {
  return action + '_UPDATE_A_ROOM';
}
