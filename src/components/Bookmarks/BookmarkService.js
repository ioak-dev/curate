import axios from "axios";
import { constants } from '../Constants';

const baseUrl = process.env.REACT_APP_API_URL;

export function importBookmarks(data, token) {
    return axios.post(baseUrl + constants.API_URL_BOOKMARK_IMPORT, data,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(function(response) {
            return Promise.resolve(response);
        })
}
