import {
    DELETE_MAINTENANCE,
    GET_MAINTENANCE,
    DUPLICATE_MAINTENANCE,
    SELECT_MAINTENANCE,
    SET_FETCH_MAINTENANCE, CLEAR_MAINTENANCE,
} from './types';

import {buildSearch, directGet, directPost, directPut, restDelete, restGet} from './util/RestUtil';
import { asLocalDate } from '../utils';

const BASE_URI = '/api/maintenance/'

export function getMaintenance(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}${id}`, dispatch, GET_MAINTENANCE);
    };
}

export function duplicateMaintenance(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}${id}`, dispatch, DUPLICATE_MAINTENANCE);
    };
}

export function deleteMaintenance(id) {
    return function (dispatch) {
        restDelete(`${BASE_URI}${id}`, dispatch, DELETE_MAINTENANCE);
    };
}

export function saveMaintenance(entity) {
    entity.date = asLocalDate(entity.date, true)

    if (entity.id) {
        return directPut(`${BASE_URI}`, entity)
    } else {
        return directPost(`${BASE_URI}`, entity);
    }
}



export function getMaintenances(page, size, orderBy, dir, filter, start, end) {
    const search = buildSearch(filter, start, end, null, true);
    return directGet(`${BASE_URI}${page}/${size}/${orderBy}/${dir}${search}`);
}


export function selectMaintenance(entity) {
    return function (dispatch) {
        dispatch({
            type: SELECT_MAINTENANCE,
            payload: entity
        });
    };
}

export function clearMaintenance(entity) {
    return function (dispatch) {
        dispatch({
            type: CLEAR_MAINTENANCE,
            payload: entity
        });
    };
}

export function setFetchMaintenance(state) {
    return function (dispatch) {
        dispatch({
            type: SET_FETCH_MAINTENANCE,
            payload: state
        });
    };
}
