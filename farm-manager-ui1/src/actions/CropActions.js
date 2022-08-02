import {
    GET_CROPS, GET_CROP, SELECT_CROP, DELETE_CROP, CLEAR_CROP
} from './types';
import {directPost, directPut, restDelete, restGet} from "./util/RestUtil";

const BASE_URL = 'api/crops/'

export function saveCrop(entity) {
    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function deleteCrop(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_CROP);
    };
}

export function getCrops() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_CROPS);
    };
}
export function getCrop(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_CROP);
    };
}

export function selectCrop(entity) {
    return {
        type: SELECT_CROP,
        payload: entity
    };
}

export function clearCrop() {
    return {
        type: CLEAR_CROP,
    };
}