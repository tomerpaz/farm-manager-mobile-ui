import {SELECT_SITE, GET_SITE, DELETE_SITE, GET_SITES, CLEAR_SITE} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';


const BASE_URL = 'api/site/'

export function selectSite(site) {
    return {
        type: SELECT_SITE,
        payload: site
    };
}

export function clearSite() {
    return {
        type: CLEAR_SITE,
    };
}

export function saveSite(site) {
    if(site.id) {
        return directPut(BASE_URL, site);
    } else {
        return directPost(BASE_URL,site);
    }
}


export function deleteSite(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_SITE);
    };
}

export function getSite(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_SITE);
    };
}

export function getSites() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_SITES);
    };
}