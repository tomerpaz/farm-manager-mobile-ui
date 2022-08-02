import {
    GET_ACTIVITY_DEF_TYPES,GET_ACTIVITY_DEF_TYPE,SELECT_ACTIVITY_DEF_TYPE,DELETE_ACTIVITY_DEF_TYPE,
    CLEAR_ACTIVITY_DEF_TYPE,
} from './types';

import {directPost, directPut, restDelete, restGet} from "./util/RestUtil";

const BASE_URL = 'api/activityDefType/'

export function saveActivityDefType(entity) {
    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function deleteActivityDefType(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_ACTIVITY_DEF_TYPE);
    };
}

export function getActivityDefTypes() {
    return function (dispatch) {
        restGet(`${BASE_URL}self/${false}`, dispatch,GET_ACTIVITY_DEF_TYPES);
    };
}
export function getActivityDefType(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_ACTIVITY_DEF_TYPE);
    };
}

export function selectActivityDefType(entity) {
    return {
        type: SELECT_ACTIVITY_DEF_TYPE,
        payload: entity
    };
}

export function clearActivityDefType() {
    return {
        type: CLEAR_ACTIVITY_DEF_TYPE,
    };
}


//deleteActivityDefType,getActivityDefTypes,getActivityDefType,selectActivityDefType,saveActivityDefType

