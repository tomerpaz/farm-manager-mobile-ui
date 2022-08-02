import {
    GET_CONTAINERS, GET_CONTAINER, SELECT_CONTAINER, DELETE_CONTAINER, CLEAR_CONTAINER
} from './types';
import {directPost, directPut, restDelete, restGet} from "./util/RestUtil";

const BASE_URL = 'api/container/'

export function saveContainer(entity) {
    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function deleteContainer(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_CONTAINER);
    };
}

export function getContainers() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_CONTAINERS);
    };
}
export function getContainer(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_CONTAINER);
    };
}

export function selectContainer(entity) {
    return {
        type: SELECT_CONTAINER,
        payload: entity
    };
}

export function clearContainer() {
    return {
        type: CLEAR_CONTAINER,
    };
}
