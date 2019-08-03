import { RECEIVE_EVENT, SEND_EVENT } from '../actions/types';

const initialState = {
    name: 'none',
    signal: false,
    data: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case RECEIVE_EVENT:
            console.log('RECEIVE_EVENT reducer');
            return {
                ...state
            };
        case SEND_EVENT:
            console.log('SEND_EVENT reducer');
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}