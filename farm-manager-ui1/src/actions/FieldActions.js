import {
    FIELD_TABLE_SORT, GET_FIELD, DELETE_FIELD, SELECT_FIELD, GET_FIELDS, GET_FIELD_IN_POLYGONS,
    CLEAR_FIELD,
    TOGGLE_FIELD_LAYER,
    SET_MAP_BASE_LAYER,
} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';


const BASE_URL = 'api/field/';


export function sortFields(sortParam) {
    return {
        type: FIELD_TABLE_SORT,
        payload: sortParam
    };
}

export function toggleFieldLayer(name) {
    return {
        type: TOGGLE_FIELD_LAYER,
        payload: name
    };
}

export function setMapBaseLayer(name) {
    return {
        type: SET_MAP_BASE_LAYER,
        payload: name
    };
}

export function selectField(field) {
    return {
        type: SELECT_FIELD,
        payload: field
    };
}

export function clearField() {
    return {
        type: CLEAR_FIELD,
    };
}



export function saveField(field) {
    if(field.id) {
        return directPut(BASE_URL, field);
    } else {
        return directPost(BASE_URL,field);
    }
}


export function deleteField(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_FIELD);
    };
}



export function getField(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_FIELD);
    };
}

export function getFields() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_FIELDS);
    };
}

export function getFieldInPolygons(){
    return function (dispatch) {
        restGet(`${BASE_URL}fieldin/polygons`, dispatch,GET_FIELD_IN_POLYGONS);
    };
}