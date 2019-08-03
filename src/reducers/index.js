import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import EventReducer from './EventReducer';

export default combineReducers({
    authorization: AuthReducer,
    profile: ProfileReducer,
    event: EventReducer
})