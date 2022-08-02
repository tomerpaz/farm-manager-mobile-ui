import axios from 'axios';

import {
    GET_GLOBAL_DATA, SET_USER_MAP_CENTER, RECOVER_PASSWORD, SET_TABLE_PAGE_SIZE, SET_DOMAIN_STATUS_FILTER, GET_GG_ADMIN_AREAS, GET_NOTIFICATIONS,
    SET_CROP_TYPE,
    SET_NAVIGATE_ON_CRITICAL
} from './types';

import { restGet } from './util/RestUtil';
import { getBackendURL } from '../config';

const BASE_URI = 'api/account/';

export function getGlobalData() {

    return function (dispatch) {
        restGet(`/api/account/global`, dispatch, GET_GLOBAL_DATA);
    };
}

export function getGGAdminAreas() {

    return function (dispatch) {
        restGet(`/api/food/safety/adminareas`, dispatch, GET_GG_ADMIN_AREAS);
    };
}

export function setUserMapCenter(zoom, lng, lat) {

    return function (dispatch) {
        restGet(`${BASE_URI}user/${zoom}/${lng}/${lat}`, dispatch, SET_USER_MAP_CENTER);
    };
}

export function setDomainStatusFilter(value) {

    return function (dispatch) {
        restGet(`${BASE_URI}user/domainstatus/${value}`, dispatch, SET_DOMAIN_STATUS_FILTER);
    };
}

export function getNotifications() {

    return function (dispatch) {
        restGet(`${BASE_URI}notifications`, dispatch, GET_NOTIFICATIONS);
    };
}

export function setNevigateOnCritical(e) {
    return {
        type: SET_NAVIGATE_ON_CRITICAL,
        payload: e
    };
}



export function recoverPassword(user) {

    console.log(`${BASE_URI}recoverpassword/${user}`)
    return function (dispatch) {
        return axios.get(`${getBackendURL()}/open/recoverpassword/${user}`).then(response => {

            dispatch({
                type: RECOVER_PASSWORD,
                payload: response.data
            });
        });
    };
}


export function setTablePageSize(size) {
    return function (dispatch) {

        dispatch({
            type: SET_TABLE_PAGE_SIZE,
            payload: size
        });
    };
}

export function setCropType(type) {
    return function (dispatch) {

        dispatch({
            type: SET_CROP_TYPE,
            payload: type
        });
    };
}