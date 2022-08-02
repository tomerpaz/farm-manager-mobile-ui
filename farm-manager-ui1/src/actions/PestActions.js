import {
    GET_PESTS,GET_PEST,SELECT_PEST,DELETE_PEST,CLEAR_PEST
} from './types';
import {directPost, directPut, restDelete, restGet} from "./util/RestUtil";

const BASE_URL = 'api/pest/';

export function savePest(entity) {
    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function deletePest(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_PEST);
    };
}

export function getPests() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_PESTS);
    };
}
export function getPest(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_PEST);
    };
}

export function selectPest(entity) {
    return {
        type: SELECT_PEST,
        payload: entity
    };
}

export function clearPest(entity) {
    return {
        type: CLEAR_PEST,
        payload: entity
    };
}