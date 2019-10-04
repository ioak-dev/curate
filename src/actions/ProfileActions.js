import axios from "axios";
import { constants } from '../components/Constants';
import { GET_PROFILE, SET_PROFILE } from './types';

const baseUrl = process.env.REACT_APP_API_URL;

export const getProfile = () => dispatch => {
    dispatch({
        type: GET_PROFILE
    });
}

export const reloadProfile = (authorization) => dispatch => {
    axios.get(baseUrl + constants.API_URL_PREFERENCES,
        {
            headers: {
                Authorization: 'Bearer ' + authorization.token
            }
        })
        .then(function(response) {
            dispatch({
                type: SET_PROFILE,
                payload: response.data
            })
        }
    );
}

export const persistProfile = (authorization, payload) => dispatch => {
    axios.put(baseUrl + constants.API_URL_PREFERENCES, payload,
        {
            headers: {
                Authorization: 'Bearer ' + authorization.token
            }
        })
        .then(function(response) {
            dispatch({
                type: SET_PROFILE,
                payload: response.data
            })
        }
    );
}

export const setProfile = (payload) => dispatch => {
    dispatch({
        type: SET_PROFILE,
        payload: payload
    });
}
