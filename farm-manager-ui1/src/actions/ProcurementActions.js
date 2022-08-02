import {
    GET_PROCUREMENTS, 
    GET_PROCUREMENT,
    SET_PROCUREMENT,
    SET_PROCUREMENT_FILTER, SET_PROCUREMENT_FILTER_FREE_TEXT, SET_PROCUREMENT_FILTER_START, SET_PROCUREMENT_FILTER_END,
    SET_PROCUREMENT_CURRENT_PAGE,SET_PROCUREMENT_SORTING, SET_FETCHING_PROCUREMENTS, SET_SUPPLIER_INVOICE, SET_SUPPLIER_MONTH_INVOICE, DUPLICATE_PROCUREMENT


} from './types';


import {buildSearch, directDelete, directGet, directPost, directPut, restGet} from './util/RestUtil';
import { asLocalDate } from '../utils';

const BASE_URI = 'api/procurement/';

export function getProcurement(id, mode) {
    return function (dispatch) {
        restGet(`${BASE_URI}${id}`, dispatch, mode === 'd' ? DUPLICATE_PROCUREMENT : GET_PROCUREMENT);
    };
}




export function saveSupplierMonthInvoice(supplierId, procurementRef, year, month, procurements) {
//data.selectedProcuremenets
    let p =  '?' + procurements.map((e => 'p='+e)).join('&');
    return directGet(`${BASE_URI}invoice/${supplierId}/${procurementRef}/${year}/${month}/${p}`);
}

export function setSupplierInvoice(flag) {
    return function (dispatch) {
        dispatch({
            type: SET_SUPPLIER_INVOICE,
            payload: flag,
        });    
    };
}


export function deleteProcurement(id) {
    return directDelete(`${BASE_URI}${id}`);
}


export function saveProcurement(entity) {
    entity.fields = entity.procurementFields;
    entity.procurementDate = asLocalDate(entity.procurementDate, true)
    
   // entity.procurementDate = asLocalDate(entity.procurementDate, true)

    if (entity.id) {
        return directPut(`${BASE_URI}`, entity)
    } else {
        return directPost(`${BASE_URI}`, entity);
    }
}

export function getProcurements(page, size, orderBy, dir, filter, start, end, freeText) {
    return function (dispatch) {
        dispatch({
            type: SET_FETCHING_PROCUREMENTS,
            payload: true,
        });
        const search = buildSearch(filter, start, end, freeText, true);
        return  restGet(`${BASE_URI}${page}/${size}/${orderBy}/${dir}${search}`, dispatch, GET_PROCUREMENTS);
    }
}

export function getSupplierMonthProcurements(year, month, supplier) {
    return directGet(`${BASE_URI}supplieryearmonth/${year}/${month}/${supplier}`);
}

export function setProcurement(procurement) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT,
            payload: procurement
        });
    };
}

export function setProcurementFilter(filter) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT_FILTER,
            payload: filter
        });
    };
}

export function setProcurementFilterFreeText(filter) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT_FILTER_FREE_TEXT,
            payload: filter
        });
    };
}

export function setProcurementFilterStart(filter) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT_FILTER_START,
            payload: filter
        });
    };
}
export function setProcurementFilterEnd(filter) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT_FILTER_END,
            payload: filter
        });
    };
}

export function setProcurementCurrentPage(page) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT_CURRENT_PAGE,
            payload: page
        });
    };
}

export function setProcurementSorting(sorting) {
    return function (dispatch) {
        dispatch({
            type: SET_PROCUREMENT_SORTING,
            payload: sorting
        });
    };
}

