import { SELECT_TAG, GET_TAG, DELETE_TAG, GET_TAGS, CLEAR_TAG, TAG_UPDATE, TAG_CREATE } from './types';
import { restDelete, restGet, restPut, restPost } from './util/RestUtil';


const BASE_URL = 'api/tag/'

export function selectTag(tag) {
    return {
        type: SELECT_TAG,
        payload: tag
    };
}

export function clearTag() {
    return {
        type: CLEAR_TAG,
    };
}

export function saveTag(tag) {
    if (tag.id) {
        return function (dispatch) {
            restPut(`${BASE_URL}`, tag, dispatch, TAG_UPDATE);
        };
    } else {
        return function (dispatch) {
            restPost(`${BASE_URL}`, tag, dispatch, TAG_CREATE);
        };
    }
}


export function deleteTag(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_TAG);
    };
}

export function getTag(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch, GET_TAG);
    };
}

export function getTags() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch, GET_TAGS);
    };
}