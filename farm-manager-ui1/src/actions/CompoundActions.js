import {SELECT_COMPOUND, GET_COMPOUND, DELETE_COMPOUND, GET_COMPOUNDS, CLEAR_COMPOUND} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';

const BASE_URL = 'api/compound/'

export function selectCompound(e) {
    return {
        type: SELECT_COMPOUND,
        payload: e
    };
}

export function clearCompound() {
    return {
        type: CLEAR_COMPOUND,
    };
}

export function saveCompound(e) {
    if(e.id) {
        return directPut(BASE_URL, e);
    } else {
        return directPost(BASE_URL,e);
    }
}


export function deleteCompound(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_COMPOUND);
    };
}

export function getCompound(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_COMPOUND);
    };
}

export function getCompounds() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_COMPOUNDS);
    };
}