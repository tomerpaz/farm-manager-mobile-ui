import { useState, useEffect } from 'react';

import { SEARCH_AGROMONITORING, NDVI_HISTORY, ADD_NDVI_HISTORY, GET_SOIL_DATA, GET_UVI,
     GET_ACCUMUATED_PRECIP,GET_ACCUMUATED_TEMP, GET_WEATHER, CHANGE_IMAGERY_DATE, CHANGE_NDVI_PALETTE } from './types';
import axios from 'axios';
import { subtractYear, toUTCDate, newDate } from "../utils/DateUtil";



const BASE_URL = 'https://api.agromonitoring.com/agro/1.0/';
const IMAGE_SEARCH_URL = `${BASE_URL}image/search`;

const NDVI_HISTORY_URL = `${BASE_URL}ndvi/history`;

const SOIL_URL = `${BASE_URL}soil`;
const WAETHER_URL = `${BASE_URL}weather`;
const UVI_URL = `${BASE_URL}uvi`;

const WAETHER_HISTORY = `${BASE_URL}weather/history/`;

const ACCUMULATED_TEMP = `${WAETHER_HISTORY}accumulated_temperature`;
const ACCUMULATED_PRECIP = `${WAETHER_HISTORY}accumulated_precipitation`;
const SOIL_HISTORY = `${BASE_URL}soil/history`;

const config = {
    headers: {
        'Content-Type': "application/json",
    }
};

export function agromonitoringSearchPolygon(polyid, apiKey, type) {
    return function (dispatch) {


        const end = toUTCDate(newDate());
        const start = toUTCDate(subtractYear(newDate(), 2));

        const url = `${IMAGE_SEARCH_URL}?start=${start}&end=${end}&polyid=${polyid}&appid=${apiKey}&type=${getType(type)}`;

        axios.get(url, config).then(response => {
            dispatch({
                type: SEARCH_AGROMONITORING,
                payload: response.data
            });
        })
            .catch(error => {
                console.log(error);
            });
    };
}

export function agromonitoringSearchPolygons(imageryIds, apiKey, type) {
    return function (dispatch) {


        const end = toUTCDate(newDate());
        const start = toUTCDate(subtractYear(newDate(), 1));

        if(imageryIds){
            imageryIds.forEach(imageryId => {
                const url = `${IMAGE_SEARCH_URL}?start=${start}&end=${end}&polyid=${imageryId}&appid=${apiKey}&type=${getType(type)}`;

                axios.get(url, config).then(response => {
                    dispatch({
                        type: ADD_NDVI_HISTORY,
                      //  payload: response.data
                        payload: {
                            imageryId: imageryId,
                            history: response.data,
                        }
                    });
                })
                    .catch(error => {
                        console.log(error);
                    });

            })
        }


    };
}

const S2 = 's2';

function getType(type){
    return type ? type : S2
}
//http://api.agromonitoring.com/agro/1.0/ndvi/history?start={start date}&end={end date}&polyid={ID of polygon}&appid={API key}
export function getNdviHistory(polyid, apiKey, start, end, type) {
    return function (dispatch) {
        const endUTC = toUTCDate(end);
        const startUTC = toUTCDate(start);

        const url = `${NDVI_HISTORY_URL}?start=${startUTC}&end=${endUTC}&polyid=${polyid}&appid=${apiKey}&type=${getType(type)}`;

        axios.get(url, config).then(response => {
            dispatch({
                type: NDVI_HISTORY,
                payload: response.data
            });
        })
            .catch(error => {
                console.log(error);
            });
    }
}

export function getPolygonSoilHistory(polyid, apiKey, start, end) {
    const endUTC = toUTCDate(end);
    const startUTC = toUTCDate(start);
    const url = `${SOIL_HISTORY}?start=${startUTC}&end=${endUTC}&polyid=${polyid}&appid=${apiKey}&units='metric'`;
    console.log(url)
   return  axios.get(url, config);
}

export function getPolygonAccumulatedData(polyid, apiKey, start, end) {


    return function (dispatch) {
        const endUTC = toUTCDate(end);
        const startUTC = toUTCDate(start);

        axios.get(`${ACCUMULATED_TEMP}?start=${startUTC}&end=${endUTC}&polyid=${polyid}&appid=${apiKey}`, config).then(response => {
            dispatch({
                type: GET_ACCUMUATED_TEMP,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });

        axios.get(`${ACCUMULATED_PRECIP}?start=${startUTC}&end=${endUTC}&polyid=${polyid}&appid=${apiKey}`, config).then(response => {
            dispatch({
                type: GET_ACCUMUATED_PRECIP,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export function getSenecingData(polyid, apiKey) {
    return function (dispatch) {

        axios.get(`${SOIL_URL}?polyid=${polyid}&appid=${apiKey}`, config).then(response => {
            dispatch({
                type: GET_SOIL_DATA,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });

        axios.get(`${WAETHER_URL}?polyid=${polyid}&appid=${apiKey}`, config).then(response => {
            dispatch({
                type: GET_WEATHER,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });

        axios.get(`${UVI_URL}?polyid=${polyid}&appid=${apiKey}`, config).then(response => {
            dispatch({
                type: GET_UVI,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export function changeImageryDate(date) {
    return {
        type: CHANGE_IMAGERY_DATE,
        payload: date
    };
}

export function changeNdviPalette(id) {
    return {
        type: CHANGE_NDVI_PALETTE,
        payload: id
    };
}
