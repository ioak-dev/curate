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
                    name: data.name,
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
    return axios.get(baseUrl + constants.API_URL_PRESIGNIN + data.email)
        .then(function(response) {
            if (response.status === 200) {
                let solution = decrypt(data.password, JSON.stringify(response.data));
                return axios.post(baseUrl + constants.API_URL_SIGNIN, {
                    email: data.email, solution: solution
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

export function updateUserDetails(data, token, type) {
    return axios.get(baseUrl + constants.API_URL_PRESIGNUP)
        .then(function(response) {
            if (response.status === 200) {
                let newData = {};
                if (type && type === 'password') {
                    newData = {
                        problem: encrypt(data.password, response.data.solution, response.data.salt),
                        solution: response.data.solution
                    }
                } else {
                    newData = {
                        name: data.name,
                        email: data.email
                    }
                }

                return axios.put(baseUrl + constants.API_URL_USER_DETAILS, newData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(function(response) {
                        return Promise.resolve(response);
                    })
            }
        })
}

export function sentPasswordChangeEmail(data, type) {

    return axios.post(baseUrl + constants.API_URL_CODE, data)
        .then(function(response) {
            return Promise.resolve(response.status);
        })
}

export function resetPassword(data, type) {

    return axios.get(baseUrl + constants.API_URL_PRESIGNUP)
        .then(function(response) {
            if (response.status === 200) {
                let newData = {};
                if (type && type === 'password') {
                    newData = {
                        problem: encrypt(data.password, response.data.solution, response.data.salt),
                        solution: response.data.solution,
                        resetCode: data.resetCode
                    }

                }

                return axios.post(baseUrl + constants.API_URL_RESET, newData)
                    .then(function(response) {
                        return Promise.resolve(response.status);
                    })


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
