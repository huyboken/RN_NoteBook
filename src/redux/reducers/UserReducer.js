import {actions} from '../constants';
import {reducerDefault} from '../reducerHandler';

const setFirstTimeUse = (...props) => {
  return reducerDefault(...props, actions.SET_FIRST_TIME_USE);
};

const getFirstTimeUse = (...props) => {
  return reducerDefault(...props, actions.GET_FIRST_TIME_USE);
};

const getUserInfo = (...props) => {
  return reducerDefault(...props, actions.GET_USER_INFO);
};

const updateUserInfo = (...props) => {
  return reducerDefault(...props, actions.UPDATE_USER_INFO);
};

export const userReducers = {setFirstTimeUse, getFirstTimeUse, getUserInfo, updateUserInfo};
