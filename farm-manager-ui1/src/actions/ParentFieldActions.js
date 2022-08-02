import {
    SELECT_PARENT_FIELD, GET_PARENT_FIELD, DELETE_PARENT_FIELD, GET_PARENT_FIELDS,
    CLEAR_PARENT_FIELD
} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';



const BASE_URL = 'api/parent/'
export function selectParentField(parentField) {
    return {
        type: SELECT_PARENT_FIELD,
        payload: parentField
    };
}

export function clearParentField() {
    return {
        type: CLEAR_PARENT_FIELD,
    };
}


export function saveParentField(parentField) {
    if(parentField.id) {
        return directPut(BASE_URL, parentField);
    } else {
        return directPost(BASE_URL,parentField);
    }
}


export function deleteParentField(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_PARENT_FIELD);
    };
}

export function getParentField(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_PARENT_FIELD);
    };
}

export function getParentFields() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_PARENT_FIELDS);
    };
}
