import {
    SELECT_INVENTORY_UPDATE, GET_INVENTORY_UPDATE, DELETE_INVENTORY_UPDATE, SET_FETCH_INVENTORY_UPDATE,
    GET_INVENTORY, CLEAR_INVENTORY_UPDATE, GET_STOCK_MOVEMENTS
} from './types';
import {directPut, directPost, restDelete, restGet, directGet} from './util/RestUtil';
import { asLocalDate } from '../utils';


const BASE_URL = 'api/inventory/'
const BASE_URL_UPDATE = `${BASE_URL}update/`


export function saveInventoryUpdate(inventoryUpdate) {
    inventoryUpdate.updateDate = asLocalDate(inventoryUpdate.updateDate, true)

    if(inventoryUpdate.id) {
        return directPut(BASE_URL_UPDATE, inventoryUpdate);
    } else {
        return directPost(BASE_URL_UPDATE,inventoryUpdate);
    }
}

export function selectInventoryUpdate(inventoryUpdate) {
    return {
        type: SELECT_INVENTORY_UPDATE,
        payload: inventoryUpdate
    };
}

export function setFetchInventoryUpdate(state) {
    return {
        type: SET_FETCH_INVENTORY_UPDATE,
        payload: state
    };
}

export function clearInventoryUpdate() {
    return {
        type: CLEAR_INVENTORY_UPDATE,
    };
}



export function deleteInventoryUpdate(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL_UPDATE}${id}`, dispatch, DELETE_INVENTORY_UPDATE);
    };
}

export function getInventory(time, filter) {
    let search = filter ? '?filter=' + filter.map((e => e.value)).join(',')  : '' ;

    return function (dispatch) {
        restGet(`${BASE_URL}current/${asLocalDate(time)}${search}`, dispatch,GET_INVENTORY);
    };
}

///movements/{start}/{end}
export function getStockMovments(start, end, filter) {
    let search = filter ? '?filter=' + filter.map((e => e.value)).join(',')  : '' ;

    return function (dispatch) {
        restGet(`${BASE_URL}movements/${asLocalDate(start)}/${asLocalDate(end)}${search}`, dispatch,GET_STOCK_MOVEMENTS);
    };
}

export function getInventoryUpdate(id) {
    return function (dispatch) {
        restGet(`${BASE_URL_UPDATE}${id}`, dispatch,GET_INVENTORY_UPDATE);
    };
}

export function getDirectInventoryUpdates(page, size, orderBy, dir, filter) {
    let search = filter ? '?filter=' + filter.map((e => e.value)).join(',')  : '' ;
    return directGet(`${BASE_URL_UPDATE}${page}/${size}/${orderBy}/${dir}${search}`);
}