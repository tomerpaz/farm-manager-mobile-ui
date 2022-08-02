import { SELECT_SEASON, SELECT_FIELD, SELECT_SITE,
     RELOADING_MAP, EDIT_MAP, SET_MAP_PESTS, SET_MAP_REF_DATE, 
     SET_MAP_INFECTION_LEVEL, SET_MAP_TIME_RANGE, SET_MAP_ACTIVITIES } from './types';

export function setReloadingMap(reloading) {
    return {
        type: RELOADING_MAP,
        payload: reloading
    };
}

export function editMap(edit) {
    return {
        type: EDIT_MAP,
        payload: edit
    };
}

export function setMapPests(value) {
    return {
        type: SET_MAP_PESTS,
        payload: value
    };
}

export function setMapActivities(value) {
    return {
        type: SET_MAP_ACTIVITIES,
        payload: value
    };
}

export function setMapTimeRange(value) {
    console.log(value);
    return {
        type: SET_MAP_TIME_RANGE,
        payload: value
    };
}

export function setMapInfectionLevel(value) {
    return {
        type: SET_MAP_INFECTION_LEVEL,
        payload: value
    };
}

export function setMapRefDate(value) {
    return {
        type: SET_MAP_REF_DATE,
        payload: value
    };
}