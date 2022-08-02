import {SELECT_LINK, GET_LINK, DELETE_LINK, GET_LINKS, CLEAR_LINK} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';


const BASE_URL = 'api/link/'

export function selectLink(link) {
    return {
        type: SELECT_LINK,
        payload: link
    };
}

export function clearLink() {
    return {
        type: CLEAR_LINK,
    };
}

export function saveLink(link) {
    if(link.id) {
        return directPut(BASE_URL, link);
    } else {
        return directPost(BASE_URL,link);
    }
}


export function deleteLink(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_LINK);
    };
}

export function getLink(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_LINK);
    };
}

export function getLinks() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_LINKS);
    };
}