import {
    GET_ACTIVITY_DEFS,GET_ACTIVITY_DEF,SELECT_ACTIVITY_DEF,DELETE_ACTIVITY_DEF,CLEAR_ACTIVITY_DEF
} from './types';

import {directPost, directPut, restDelete, restGet} from "./util/RestUtil";

const BASE_URL = 'api/activityDef/'

export function saveActivityDef(entity) {
    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function deleteActivityDef(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_ACTIVITY_DEF);
    };
}

export function getActivityDefs() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_ACTIVITY_DEFS);
    };
}
export function getActivityDef(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_ACTIVITY_DEF);
    };
}

export function selectActivityDef(entity) {
    return {
        type: SELECT_ACTIVITY_DEF,
        payload: entity
    };
}
export function clearActivityDef() {
    return {
        type: CLEAR_ACTIVITY_DEF,
    };
}
