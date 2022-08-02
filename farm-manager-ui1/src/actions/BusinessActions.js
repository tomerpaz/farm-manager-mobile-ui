import { asLocalDate } from '../utils';
import {
    GET_BUSINESSES, GET_BUSINESS, SELECT_BUSINESS, DELETE_BUSINESS, CLEAR_BUSINESS, GET_BUSINESS_USERS,
    SELECT_BUSINESS_USER,GET_FEILDIN_GROUPS, GET_LINKED_GROWERS, GET_FEILDIN_COMPANIES,
} from './types';
import {directPost, directPut, restDelete, restGet, directGet} from "./util/RestUtil";

const BASE_URL = 'api/business/';

export function saveBusiness(entity) {

    entity.validThrough = asLocalDate(entity.validThrough, true);
    entity.registration = asLocalDate(entity.registration, true);

    if(entity.id) {
        return directPut(BASE_URL, entity);
    } else {
        return directPost(BASE_URL,entity);
    }
}

export function updateBusiness(entity) {
    return directPut(BASE_URL, entity);
}

export function deleteBusiness(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_BUSINESS);
    };
}

export function getBusinesses() {
    return function (dispatch) {
        restGet(BASE_URL, dispatch,GET_BUSINESSES);
        restGet(`${BASE_URL}fieldin/companies`, dispatch,GET_FEILDIN_COMPANIES);
        restGet(`${BASE_URL}fieldin/groups`, dispatch,GET_FEILDIN_GROUPS);

    };
}




export function resetImagery(business) {
    return directGet(`${BASE_URL}${business}/resetimagery`);
}


export function getLinkedGrowers() {
    return function (dispatch) {        
        restGet(`${BASE_URL}growers`, dispatch,GET_LINKED_GROWERS);

    };
}

export function getBusiness(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_BUSINESS);
        restGet(`${BASE_URL}user/${id}`, dispatch,GET_BUSINESS_USERS);
    };
}


export function selectBusiness(entity) {
    return {
        type: SELECT_BUSINESS,
        payload: entity
    };
}


export function selectBusinessUser(entity) {
    return {
        type: SELECT_BUSINESS_USER,
        payload: entity
    };
}

export function clearBusiness() {
    return {
        type: CLEAR_BUSINESS,
    };
}

export function saveBusinessUser(entity) {
    if(entity.newUser === true) {
        return directPost(`${BASE_URL}user/`,entity);
    } else {
        return directPut(`${BASE_URL}user/`, entity);
    }
}

export function updatePassword(currentPassword, newPassword) {
    return directPut(`${BASE_URL}password/${currentPassword}/${newPassword}`, '');
}

