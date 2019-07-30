import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NotificationReducer from './NotificationReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
    authorization: AuthReducer,
    notification: NotificationReducer,
    profile: ProfileReducer
})