import { combineReducers } from 'redux';
import { alertReducer } from 'react-native-redux-alert'
import user from './user/user';

export default combineReducers({
    alertReducer,
    user,
});
