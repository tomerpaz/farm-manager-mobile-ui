import {
    CLEAR_DASHBOARD, GET_DASHBOARD_PLANTATION, GET_DASHBOARD_DOMAIN, GET_DASHBOARD_FINANCIAL, GET_DASHBOARD_FINANCIAL2, GET_DASHBOARD_QUANTITATIVE, GET_DASHBOARD_QUANTITATIVE2, GET_CROP_ROTATION,
    SET_FETCHING_FINANCIAL_DASHBOARD,SET_FETCHING_QUANTITATIVE_DASHBOARD
} from './types';

import {  restGet } from './util/RestUtil';

const BASE_DASH_URI = 'api/dashboard/';


export function getPlantationDashboard(year, domain){
    return function (dispatch) {
        restGet(`${BASE_DASH_URI}plantation/${year}/${domain}`, dispatch, GET_DASHBOARD_PLANTATION);
    };
}

export function getDomainDashboard(domainId){
    return function (dispatch) {
        restGet(`${BASE_DASH_URI}domain/${domainId}`, dispatch, GET_DASHBOARD_DOMAIN);
    };
}


export function getFianancialDashboard(year, plantation, filter, secondary ){
    const search = filter ? '?filter=' + filter.map((e => e.value)).join(',')  : ''; 
    return function (dispatch) {
        dispatch({
            type: SET_FETCHING_FINANCIAL_DASHBOARD,
            payload: secondary,
        });
        restGet(`${BASE_DASH_URI}financial/${year}/${plantation}${search}`, dispatch, secondary ? GET_DASHBOARD_FINANCIAL2 : GET_DASHBOARD_FINANCIAL);
    };
}

export function getQuantitativeDashboard(year, plantation, filter, secondary ){
    const search = filter ? '?filter=' + filter.map((e => e.value)).join(',')  : ''; 
    return function (dispatch) {
        dispatch({
            type: SET_FETCHING_QUANTITATIVE_DASHBOARD,
            payload: secondary,
        });
        restGet(`${BASE_DASH_URI}quantitative/${year}/${plantation}${search}`, dispatch, secondary ? GET_DASHBOARD_QUANTITATIVE2 : GET_DASHBOARD_QUANTITATIVE);
    };
}

export function getFieldCropRotations(){
    return function (dispatch) {
        restGet(`${BASE_DASH_URI}rotation`, dispatch, GET_CROP_ROTATION);
    };
}

export function clearDashboard() {
    return {
        type: CLEAR_DASHBOARD,
    };
}