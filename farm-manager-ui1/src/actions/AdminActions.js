import {GET_USERS, GET_AUTHORIZATIONS, TOGGLE_AUTHORIZATION, EDIT_USER, SAVE_USER_TAGS,GET_USER_TAGS, SET_TAGS_AUTHORIZATIONS} from './types';
import {restGet, restPost, directPost, directPut, directGet} from './util/RestUtil';

const BASE_URI = '/api/business/admin/';

export function getUsers() {
    return function (dispatch) {
        restGet(`${BASE_URI}users`, dispatch, GET_USERS);
    };
}

export function getAuthorizations() {
    return function (dispatch) {
        restGet(`${BASE_URI}authorizations`, dispatch, GET_AUTHORIZATIONS);
    };
}

export function toggleAuthorizations(authorization) {
    return function (dispatch) {
        restPost(`${BASE_URI}toggle`,authorization, dispatch, TOGGLE_AUTHORIZATION);
    };
}


export function selectUser(user) {
    return {
        type: EDIT_USER,
        payload: user
    };
}

export function setTagsAuthorizations(value) {
    return {
        type: SET_TAGS_AUTHORIZATIONS,
        payload: value
    };
}

export function saveUser(user) {
        return directPost(`${BASE_URI}user`, user);
}

export function getGGNToken(ggn) {
    return directGet(`${BASE_URI}ggtoken/${ggn}`);
}



export function getUserTags(user) {
    return function (dispatch) {
        restGet(`${BASE_URI}usertags/${user}`, dispatch, GET_USER_TAGS);
    };
}

export function saveUserTags(user, tagIds) {
    return function (dispatch) {
        restPost(`${BASE_URI}usertags/${user}`, tagIds, dispatch, SAVE_USER_TAGS);
    };
}