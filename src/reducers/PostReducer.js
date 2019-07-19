import { GET_POSTS, ADD_POST } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            console.log('GET_POSTS reducer');
            return {
                ...state,
                items: action.payload
            };
        case ADD_POST:
            console.log('ADD_POST reducer');
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
}