import { SELECT_RESOURCE_EXTERNAL_CODE, GET_RESOURCE_EXTERNAL_CODE, DELETE_RESOURCE_EXTERNAL_CODE, GET_RESOURCE_EXTERNAL_CODES, CLEAR_RESOURCE_EXTERNAL_CODE, RESOURCE_EXTERNAL_CODE_UPDATE, RESOURCE_EXTERNAL_CODE_CREATE } from './types';
import { restDelete, restGet, restPut, restPost } from './util/RestUtil';


const BASE_URL = 'api/resourceexternalcode/'

export function selectResourceExternalCode(e) {
    return {
        type: SELECT_RESOURCE_EXTERNAL_CODE,
        payload: e
    };
}

export function clearResourceExternalCode() {
    return {
        type: CLEAR_RESOURCE_EXTERNAL_CODE,
    };
}

export function saveResourceExternalCode(e) {
    if (e.id) {
        return function (dispatch) {
            restPut(`${BASE_URL}`, e, dispatch, RESOURCE_EXTERNAL_CODE_UPDATE);
        };
    } else {
        return function (dispatch) {
            restPost(`${BASE_URL}`, e, dispatch, RESOURCE_EXTERNAL_CODE_CREATE);
        };
    }
}


export function deleteResourceExternalCode(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_RESOURCE_EXTERNAL_CODE);
    };
}

export function getResourceExternalCode(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch, GET_RESOURCE_EXTERNAL_CODE);
    };
}

export function getResourceExternalCodes() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch, GET_RESOURCE_EXTERNAL_CODES);
    };
}