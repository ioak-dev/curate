import axios from "axios";
import sjcl from 'ioak-sjcl';
import CryptoJS from 'crypto-js';
import { constants } from '../Constants';

const baseUrl = process.env.REACT_APP_API_URL;

export function signup(data) {
    return axios.get(baseUrl + constants.API_URL_PRESIGNUP)
        .then(function(response) {
            if (response.status === 200) {
                return axios.post(baseUrl + constants.API_URL_SIGNUP, {
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    problem: encrypt(data.password, response.data.solution, response.data.salt),
                    solution: response.data.solution
                    })
                    .then(function(response) {
                        return Promise.resolve(response.status);
                    })
            }
        })
}

export function signin(data) {
    return axios.get(baseUrl + constants.API_URL_PRESIGNIN + data.username)
        .then(function(response) {
            if (response.status === 200) {
                let solution = decrypt(data.password, JSON.stringify(response.data));
                return axios.post(baseUrl + constants.API_URL_SIGNIN, {
                    name: data.username, solution: solution
                    })
                    .then(function(response) {
                        return Promise.resolve(response);
                    })
            }
        })
        .catch((error) => {
            if (error.message === "ccm: tag doesn't match") {
                return Promise.resolve({
                    status: 401
                });
            } else {
                return Promise.resolve(error.response);
            }
        })
}

function encrypt(password, message, salt) {
    const config = {
        cipher: 'aes',
        iter: '12000',
        ks: 256,
        salt: CryptoJS.enc.Base64.stringify((CryptoJS.enc.Utf8.parse(salt)))
    }
    return sjcl.encrypt(password, message, config);
}

function decrypt(password, ciphertext) {
    return sjcl.decrypt(password, ciphertext);
}

// window.addEventListener("unhandledrejection", function(promiseRejectionEvent) { 
//     this.console.log(promiseRejectionEvent);
// });
