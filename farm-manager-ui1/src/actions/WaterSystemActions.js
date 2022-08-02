import {
    CLEAR_WATER_SYS, GET_WATER_SYS, UPDATE_VALVE,
    WATER_SYS_CONFIG_CREATE, WATER_SYS_CONFIG_UPDATE, DELETE_WATER_SYS_CONFIG, SYNC_WATER_SYS, VALVE_CREATED, VALVE_DUPLICATED, VALVE_DELETED,
    GET_FERTILIZER_HUBS, GET_FERTILIZER_HUB, SELECT_FERTILIZER_HUB, DELETE_FERTILIZER_HUB, CLEAR_FERTILIZER_HUB, LIST_WATER_SYS_ACCOUNTS, UPDATE_FERTILIZER_HUB_VALVES,IMPORT_ACCUMULATIONS, SELECT_VALVE, SET_ACTIVE_VALVES

} from './types';
import { restGet, restPost, restPut, restDelete, directPost, directPut } from './util/RestUtil';
import { asLocalDate } from '../utils';

const BASE_URL = 'api/watersys/'


export function saveFertilizerHub(entity) {
    entity.validThrough = asLocalDate(entity.validThrough, true);
    if (entity.id) {
        return directPut(`${BASE_URL}ferthub`, entity);
    } else {
        return directPost(`${BASE_URL}ferthub`, entity);
    }
}
export function deleteFertilizerHub(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}ferthub/${id}`, dispatch, DELETE_FERTILIZER_HUB);
    };
}

export function getFertilizerHubs() {
    return function (dispatch) {
        restGet(`${BASE_URL}ferthub`, dispatch, GET_FERTILIZER_HUBS);
    };
}
export function getFertilizerHub(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}ferthub/${id}`, dispatch, GET_FERTILIZER_HUB);
    };
}

export function selectFertilizerHub(entity) {
    return {
        type: SELECT_FERTILIZER_HUB,
        payload: entity
    };
}
export function clearFertilizerHub() {
    return {
        type: CLEAR_FERTILIZER_HUB,
    };
}
export function clearWaterSystem() {
    return {
        type: CLEAR_WATER_SYS,
    };
}

export function selectValve(valve) {
    return {
        type: SELECT_VALVE,
        payload: valve,
    };
}

export function saveValve(valve) {
    return function (dispatch) {
        restPut(`${BASE_URL}valve`, valve, dispatch, UPDATE_VALVE);
    };
}

export function duplicateValve(valveId) {
    return function (dispatch) {
        restGet(`${BASE_URL}valve/duplicate/${valveId}`, dispatch, VALVE_DUPLICATED);
    };
}

export function deletedValve(valveId) {
    return function (dispatch) {
        restDelete(`${BASE_URL}valve/${valveId}`, dispatch, VALVE_DELETED);
    };
}


export function saveWaterSystemConfig(configParam) {
    if (configParam.id) {
        return function (dispatch) {
            restPut(`${BASE_URL}config`, configParam, dispatch, WATER_SYS_CONFIG_UPDATE);
        };
    } else {
        return function (dispatch) {
            restPost(`${BASE_URL}config`, configParam, dispatch, WATER_SYS_CONFIG_CREATE);
        };
    }
}

export function deleteWaterSystemConfig(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}config/${id}`, dispatch, DELETE_WATER_SYS_CONFIG);
    };
}

export function getWaterSystem(system) {
    return function (dispatch) {
        restGet(`${BASE_URL}${system.toUpperCase()}`, dispatch, GET_WATER_SYS);
    };
}

export function listWaterSystemAccounts() {
    return function (dispatch) {
        restGet(`${BASE_URL}accounts`, dispatch, LIST_WATER_SYS_ACCOUNTS);
    };
}


export function syncWaterSystem(system) {
    return function (dispatch) {
        restGet(`${BASE_URL}sync/${system.toUpperCase()}`, dispatch, SYNC_WATER_SYS);
    };
}

export function importAccumulations(system, days) {
    return function (dispatch) {
        dispatch({
            type: IMPORT_ACCUMULATIONS,
        });
        restGet(`${BASE_URL}import/accumulations/${system.toUpperCase()}/${days}`, dispatch, '');
    };
}


export function updateFertilizerHubValves(id, valves) {
    return directPut(`${BASE_URL}/ferthub/valves/${id}`, valves);

}


export function setActiveValves(value) {
    return {
        type: SET_ACTIVE_VALVES,
        payload: value,
    };
}
