import {userReducers} from './UserReducer';
import {passwordReducer} from './PasswordReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  ...userReducers,
  ...passwordReducer,
});

export default rootReducer;
