import { GET_NOTIFICATION, ADD_NOTIFICATION, REMOVE_NOTIFICATION,
        GET_SPINNER, START_SPINNER, STOP_SPINNER } from '../actions/types';

const initialState = {
    notification: null,
    spinner: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NOTIFICATION:
            console.log('GET_NOTIFICATION reducer');
            return {
                ...state
            };
        case ADD_NOTIFICATION:
            console.log('ADD_NOTIFICATION reducer');
            return {
                ...state,
                ...action.payload
            };
        
        case REMOVE_NOTIFICATION:
            console.log('REMOVE_NOTIFICATION reducer');
            return {
                ...state,
                notification: null
            };
            
        case GET_SPINNER:
            console.log('GET_SPINNER reducer');
            return {
                ...state
            };
        case START_SPINNER:
            console.log('START_SPINNER reducer');
            return {
                ...state,
                spinner: true
            };
        
        case STOP_SPINNER:
            console.log('STOP_SPINNER reducer');
            return {
                ...state,
                spinner: false
            };
        default:
            return state;
    }
}