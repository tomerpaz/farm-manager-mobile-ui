
import {
    GET_GIS_POLYGONS,SET_GIS_POLYGON_ID,GET_GIS_POLYGON_ID,SET_GIS_POLYGON_NAME,GET_GIS_POLYGON_NAME, GET_GIS_POLYGON_ATTRIBUTES, DELETE_GIS_DATA} from './types';

import {  restGet, directPut } from './util/RestUtil';

const BASE_URI = 'api/gis/';

export function getGisPolygons() {

    return function (dispatch) {
        restGet(`${BASE_URI}`, dispatch, GET_GIS_POLYGONS);
    };
}

export function updateGisPolygons(polygons) {
    return directPut(BASE_URI, polygons);
}

export function setGisPolygonId(type, value) {
    return function (dispatch) {
        restGet(`${BASE_URI}id/${type}/${value}`, dispatch, SET_GIS_POLYGON_ID);
    };
}


export function setGisPolygonName(type,value) {
    return function (dispatch) {
        restGet(`${BASE_URI}name/${type}/${value}`, dispatch, SET_GIS_POLYGON_NAME);
    };
}

export function getGisPolygonId(type) {
    return function (dispatch) {
        restGet(`${BASE_URI}id/${type}`, dispatch, GET_GIS_POLYGON_ID);
    };
}


export function getGisPolygonName(type) {
    return function (dispatch) {
        restGet(`${BASE_URI}name/${type}`, dispatch, GET_GIS_POLYGON_NAME);
    };
}


export function getGisPolygonAttributes(type) {
    return function (dispatch) {
        restGet(`${BASE_URI}attributes/${type}`, dispatch, GET_GIS_POLYGON_ATTRIBUTES);
    };
}



export function deleteGisData(type) {
    return function (dispatch) {
        restGet(`${BASE_URI}deletedata/${type}`, dispatch, DELETE_GIS_DATA);
    };
}
