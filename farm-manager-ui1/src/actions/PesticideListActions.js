import {directGet, directPost, directPut, restDelete, restGet} from './util/RestUtil';

import {
    GET_PESTICIDE_LISTS, GET_PESTICIDE_LIST, SELECT_PESTICIDE_LIST, DELETE_PESTICIDE_LIST,
    SELECT_PESTICIDE_LIST_PESTICIDE, CLEAR_PESTICIDE_LIST,DUPLICATE_PESTICIDE_LIST, DELETE_PESTICIDE_LIST_PESTICIDE
}
    from './types'
const BASE_URI = 'api/pesticidelist/';


export function getCropPesticideLists(cropId) {
    return directGet(`${BASE_URI}crop/${cropId}`);
}

export function getPesticidesByList(listId) {
    return directGet(`${BASE_URI}pesticides/${listId}`);
}


export function getSubstancePesticideLists(substanceId) {
    return directGet(`${BASE_URI}substance/${substanceId}`);
}

export function savePesticideList(entity) {
    if(entity.id) {
        console.log('savePesticideList', entity)

        return directPut(BASE_URI, entity);
    } else {
        return directPost(BASE_URI,entity);
    }
}

export function deletePesticideList(id) {
    return function (dispatch) {
        restDelete(`${BASE_URI}${id}`, dispatch, DELETE_PESTICIDE_LIST);
    };
}

export function getPesticideLists() {
    return function (dispatch) {
        restGet(BASE_URI, dispatch,GET_PESTICIDE_LISTS);
    };
}
export function getPesticideList(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}${id}`, dispatch,GET_PESTICIDE_LIST);
    };
}

export function duplicatePesticideList(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}duplicate/${id}`, dispatch,DUPLICATE_PESTICIDE_LIST);
    };
}



export function selectPesticideList(entity) {
    return {
        type: SELECT_PESTICIDE_LIST,
        payload: entity
    };
}
export function selectPesticideListPesticide(entity) {
    return {
        type: SELECT_PESTICIDE_LIST_PESTICIDE,
        payload: entity
    };
}

export function savePesticideListPesticide(entity) {
    if(entity.id) {
        return directPut(`${BASE_URI}pesticide/`, entity);
    } else {
        return directPost(`${BASE_URI}pesticide/`,entity);
    }
}

export function deletePesticideListPesticide(id){
    return function (dispatch) {
        restDelete(`${BASE_URI}pesticide/${id}`, dispatch, DELETE_PESTICIDE_LIST_PESTICIDE);
    };

}

export function clearPesticideList(){
    return {
        type: CLEAR_PESTICIDE_LIST,
    };
}
