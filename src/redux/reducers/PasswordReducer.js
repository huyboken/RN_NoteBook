const {actions} = require('../constants');
const {reducerDefault, reducerPagination} = require('../reducerHandler');

const getAllPassword = (...props) => {
  return reducerPagination(...props, actions.GET_ALL_PASSWORD);
};

const createPassword = (...props) => {
  return reducerDefault(...props, actions.CREATE_PASSWORD);
};

const deletePassword = (...props) => {
  return reducerDefault(...props, actions.DELETE_PASSWORD);
};

export const passwordReducer = {
  getAllPassword,
  createPassword,
  deletePassword,
};
