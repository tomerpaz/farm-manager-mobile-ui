import {

    GET_RISK_ASSESSMENT,
    SET_RISK_ASSESSMENT,
    GET_RISKS, GET_RISK, SELECT_RISK, DELETE_RISK
} from './types';


import {buildSearch, directDelete, directGet, directPost, directPut, restDelete, restGet} from './util/RestUtil';
import { asLocalDate } from '../utils';

const BASE_URI = 'api/riskassessment/';

export function getRiskAssessment(id, duplicate) {
    const mid = duplicate === true ? 'd/' : ''
    return function (dispatch) {
        restGet(`${BASE_URI}${mid}${id}`, dispatch, GET_RISK_ASSESSMENT);
    };
}

export function deleteRiskAssessment(id) {
    return directDelete(`${BASE_URI}${id}`);
}


export function getRisks() {
    return function (dispatch) {
        restGet(`${BASE_URI}riskitem`, dispatch,GET_RISKS);
    };
}

export function getRisk(id) {
    return function (dispatch) {
        restGet(`${BASE_URI}riskitem/${id}`, dispatch,GET_RISK);
    };
}

export function selectRisk(entity) {
    return {
        type: SELECT_RISK,
        payload: entity
    };
}

export function saveRiskAssessment(entity) {
    entity.date = asLocalDate(entity.date, true)
    if (entity.id) {
        return directPut(`${BASE_URI}`, entity)
    } else {
        return directPost(`${BASE_URI}`, entity);
    }
}

export function getRiskAssessments(page, size, orderBy, dir, filter, start, end) {
    const search = buildSearch(filter, start, end, null, true);
    return directGet(`${BASE_URI}${page}/${size}/${orderBy}/${dir}${search}`);
}

export function getListRisks(riskList) {
    return directGet(`${BASE_URI}risks/${riskList}`);
}


export function setRiskAssessment(entity) {
    return function (dispatch) {
        dispatch({
            type: SET_RISK_ASSESSMENT,
            payload: entity
        });
    };
}

export function saveRisk(risk) {
    if (risk.id) {
        return directPut(`${BASE_URI}riskitem`, risk)
    } else {
        return directPost(`${BASE_URI}riskitem`, risk);
    }
}

export function deleteRisk(id) {
    return function (dispatch) {
        restDelete(`${BASE_URI}riskitem/${id}`, dispatch, DELETE_RISK);
    };
}