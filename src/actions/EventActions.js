import { RECEIVE_EVENT, SEND_EVENT } from '../actions/types';

export const receiveEvents = () => dispatch => {
    dispatch({
        type: RECEIVE_EVENT
    });
}

export const sendEvent = (name, signal = true, data) => dispatch => {
    dispatch({
        type: SEND_EVENT,
        payload: {
            name: name,
            signal: signal,
            data: data
        }
    });
}
