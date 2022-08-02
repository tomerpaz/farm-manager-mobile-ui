import {
    GET_TARIFF,
    SET_TARIFF,
    SELECT_TARIFF,
    SET_FETCH_TARIFFS, DELETE_TARIFF, CLEAR_TARIFF, DUPLICATE_TARIFF,
} from './types';

import {buildSearch,  directGet, directPost, directPut, restDelete, restGet} from './util/RestUtil';
import { asLocalDate } from '../utils';

const BASE_URI = '/api/tariff/'





export function getTariff(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}${id}`, dispatch, GET_TARIFF);
    };
}

export function duplicateTariff(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}${id}`, dispatch, DUPLICATE_TARIFF);
    };
}

export function deleteTariff(id) {
    return function (dispatch) {
        restDelete(`${BASE_URI}${id}`, dispatch, DELETE_TARIFF);
    };
}



export function saveTariff(procurement) {
    procurement.fields = procurement.procurementFields;
    procurement.effectiveFrom = asLocalDate(procurement.effectiveFrom, true)

    if (procurement.id) {
        return directPut(`${BASE_URI}`, procurement)
    } else {
        return directPost(`${BASE_URI}`, procurement);
    }
}

export function getTariffs(page, size, orderBy, dir, filter, start, end) {
    const search = buildSearch(filter, start, end, null, true);
    return directGet(`${BASE_URI}${page}/${size}/${orderBy}/${dir}${search}`);
}


export function selectTariff(tariff) {
    return function (dispatch) {
        dispatch({
            type: SELECT_TARIFF,
            payload: tariff
        });
    };
}

export function setFetchTariffs(state) {
    return function (dispatch) {
        dispatch({
            type: SET_FETCH_TARIFFS,
            payload: state
        });
    };
}

export function clearTariff() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_TARIFF,
        });
    };
}


