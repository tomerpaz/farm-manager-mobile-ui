import {SELECT_CROP_GENUS, GET_CROP_GENUS, DELETE_CROP_GENUS, GET_CROP_GENUSES, CLEAR_CROP_GENUS} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';

const BASE_URL = 'api/food/safety/cropgenus/'

export function selectCropGenus(e) {
    return {
        type: SELECT_CROP_GENUS,
        payload: e
    };
}

export function clearCropGenus() {
    return {
        type: CLEAR_CROP_GENUS,
    };
}

export function saveCropGenus(tag) {
    if(tag.id) {
        return directPut(BASE_URL, tag);
    } else {
        return directPost(BASE_URL,tag);
    }
}


export function deleteCropGenus(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_CROP_GENUS);
    };
}

export function getCropGenus(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_CROP_GENUS);
    };
}

export function getCropGenuses() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_CROP_GENUSES);
    };
}