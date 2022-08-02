import {
WIALON_GET_TOKEN,WIALON_SYNC_FIELDS,WIALON_GET_UNITS, WIALON_SAVE_TOKEN,WIALON_DELETE_TOKEN,WIALON_SYNCHING, GET_TRACKS,SET_SELECTED_TRACKS, ADD_SELECTED_TRACK,
SET_TRACK_MAX_AVG_SPEED,SET_TRACK_MIN_LENGHT, GET_TRACKER_ACTIVITY, CLEAR_TRACKER_ACTIVITY

} from './types';
import { restGet, restDelete, buildSearch, directGet } from './util/RestUtil';


const BASE_URL = 'api/wialon/';

const BASE_URL_TRACKER = 'api/tracker/';


export function wialonSyncFields(){
    return function (dispatch) {
        dispatch({
            type: WIALON_SYNCHING,
            payload: true
        });
        restGet(`${BASE_URL}syncfields`, dispatch,WIALON_SYNC_FIELDS);
    };
}


export function setSelectedTracks(tracks){
    return function (dispatch) {
        dispatch({
            type: SET_SELECTED_TRACKS,
            payload: tracks
        });
    };
}

export function addSelectedTrack(track){
    return function (dispatch) {
        dispatch({
            type: ADD_SELECTED_TRACK,
            payload: track
        });
    };
}

export function setTrackMinLength(value){
    return function (dispatch) {
        dispatch({
            type: SET_TRACK_MIN_LENGHT,
            payload: value
        });
    };
}

export function setTrackMaxAvgSpeed(value){
    return function (dispatch) {
        dispatch({
            type: SET_TRACK_MAX_AVG_SPEED,
            payload: value
        });
    };
}

export function wialonGetUnits(){
    return function (dispatch) {
        restGet(`${BASE_URL}units`, dispatch,WIALON_GET_UNITS);
    };
}


export function getTracks(page, size, orderBy, dir, filter, start, end, maxAvgSpeed, minLength, freeText) {
    const search = buildSearch(filter, start, end, freeText, true);
    return function (dispatch) {
        restGet(`${BASE_URL_TRACKER}${page}/${size}/${orderBy}/${dir}/${maxAvgSpeed}/${minLength}${search}`, dispatch,GET_TRACKS);
    };
}

export function wialonGetToken(){
    return function (dispatch) {
        restGet(`${BASE_URL}token`, dispatch,WIALON_GET_TOKEN);
    };
}

export function wialonSaveToken(e) {
    return function (dispatch) {
        restGet(`${BASE_URL}savetoken/${e}`, dispatch, WIALON_SAVE_TOKEN);
    };
}

export function wialonDeleteToken() {
    return function (dispatch) {
        restDelete(`${BASE_URL}unlink`, dispatch, WIALON_DELETE_TOKEN);
    };
}

export function importTracks(days) {
    return directGet(`${BASE_URL_TRACKER}importTracks/${days}`);
}

export function getTrack(e) {
    return directGet(`${BASE_URL_TRACKER}${e}`);
}

export function getTrackerActivity(e,trackMaxAvgSpeed, trackMinLength) {
    //console.log(trackMaxAvgSpeed, trackMinLength)
    return function (dispatch) {
        restGet(`${BASE_URL_TRACKER}trackactivity/${e}/${trackMaxAvgSpeed}/${trackMinLength}`, dispatch, GET_TRACKER_ACTIVITY);
    };
}

export function clearTrackerActivity(){
    return function (dispatch) {
        dispatch({
            type: CLEAR_TRACKER_ACTIVITY,
            payload: null
        });
    };
}