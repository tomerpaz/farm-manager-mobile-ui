import axios from 'axios';
import { AUTH_USER, INIT_AUTH_USER, INVALIDATE_USER} from './types';
import { getJwtToken } from './util/JwtUtil';
import { postHeaders } from './util/RestUtil';
import {getBackendURL} from "../config";

export function signUser(username, password) {
    return function (dispatch) {
        var headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        let data = {
            username: username,
            password: password
        };
        postHeaders('api/auth/login', data, dispatch, AUTH_USER, headers);
    };
}


export function directSignUser(data) {
    var headers = {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    return axios.post(`${getBackendURL()}/${'api/auth/login'}`, data, headers);
}

export function signOut() {
   // window.location.reload();

    return {
        type: INVALIDATE_USER,
    };
}

export function init() {
    return function (dispatch) {
        if (getJwtToken()) {
            dispatch({type: INIT_AUTH_USER});
        } else {
            dispatch({type: INVALIDATE_USER});
        }
    };
}
