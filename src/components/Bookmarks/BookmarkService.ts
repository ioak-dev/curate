import { httpPost } from "../Lib/RestTemplate";
import { constants } from '../Constants';

export function importBookmarks(data, token) {
    return httpPost(constants.API_URL_BOOKMARK_IMPORT, data,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(function(response) {
            return Promise.resolve(response);
        })
}

