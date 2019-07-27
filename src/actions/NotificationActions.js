import { GET_NOTIFICATION, REMOVE_NOTIFICATION, ADD_NOTIFICATION,
        GET_SPINNER, START_SPINNER, STOP_SPINNER } from '../actions/types';

export const getNotifications = () => dispatch => {
    dispatch({
        type: GET_NOTIFICATION
    });
}

export const addNotification = (type, message, timeout) => dispatch => {
    dispatch({
        type: ADD_NOTIFICATION,
        payload: {
            notification: {
                type: type,
                message: message,
                timeout: timeout
            }
        }
    });
}

export const removeNotification = () => dispatch => {
    dispatch({
        type: REMOVE_NOTIFICATION
    });
}

export const getSpinner = () => dispatch => {
    dispatch({
        type: GET_SPINNER
    });
}

export const startSpinner = () => dispatch => {
    dispatch({
        type: START_SPINNER
    });
}

export const stopSpinner = () => dispatch => {
    dispatch({
        type: STOP_SPINNER
    });
}