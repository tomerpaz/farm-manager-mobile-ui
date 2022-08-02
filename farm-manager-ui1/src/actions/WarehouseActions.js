import {
    GET_WAREHOUSES, GET_WAREHOUSE, SELECT_WAREHOUSE, DELETE_WAREHOUSE, CLEAR_WAREHOUSE
} from './types';
import {directPost, directPut, restDelete, restGet} from "./util/RestUtil";

const BASE_URL = 'api/warehouse/';

export function saveWarehouse(entity) {
    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function deleteWarehouse(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_WAREHOUSE);
    };
}

export function getWarehouses() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_WAREHOUSES);
    };
}
export function getWarehouse(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_WAREHOUSE);
    };
}

export function selectWarehouse(entity) {
    return {
        type: SELECT_WAREHOUSE,
        payload: entity
    };
}

export function clearWarehouse() {
    return {
        type: CLEAR_WAREHOUSE,
    };
}
//deleteWarehouse,getWarehouses,getWarehouse,selectWarehouse,saveWarehouse
