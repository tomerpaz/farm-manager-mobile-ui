import {SELECT_ALERT, GET_ALERT, DELETE_ALERT, GET_ALERTS, CLEAR_ALERT, SET_EXECUTE_ALERT} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';


const BASE_URL = 'api/alert/'

export function selectAlert(e) {
    return {
        type: SELECT_ALERT,
        payload: e
    };
}

export function clearAlert() {
    return {
        type: CLEAR_ALERT,
    };
}

export function saveAlert(e) {
    if(e.id) {
        return directPut(BASE_URL, e);
    } else {
        return directPost(BASE_URL,e);
    }
}


export function deleteAlert(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_ALERT);
    };
}

export function getAlert(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_ALERT);
    };
}

export function getAlerts(active) {
    return function (dispatch) {
        restGet(`${BASE_URL}source/UI/${active}`, dispatch,GET_ALERTS);
    };
}

export function setExecutedAlert(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}executed/${id}`, dispatch,SET_EXECUTE_ALERT);
    };
}