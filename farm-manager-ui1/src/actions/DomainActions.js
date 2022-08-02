import {
    SELECT_DOMAIN, DELETE_DOMAIN, GET_DOMAIN, GET_DOMAINS_BY_YEAR, GET_SELECTION_DOMAINS_BY_YEAR, GET_DOMAIN_ESTIMATE_PRODUCE,
    SPLIT_DOMAIN,
    SAVE_SEASON_DATA,
    SET_SEASON_PARAM
} from './types';
import { directPut, directPost, restDelete, restGet, directGet, restPut, restPost } from './util/RestUtil';
import { asLocalDate } from '../utils';
import { isEmpty } from 'lodash';


const BASE_URL = 'api/domain/';


export function selectDomain(domain) {
    return {
        type: SELECT_DOMAIN,
        payload: domain
    };
}


export function saveDomain(domain) {
    domain.plant = asLocalDate(domain.plant, true);
    domain.root = asLocalDate(domain.root, true);
    if (domain.id) {
        return directPut(BASE_URL, domain);
    } else {
        return directPost(BASE_URL, domain);
    }
}


export function endCrop(multiDomainRequest) {
    return directPost(`${BASE_URL}endCrop/`, multiDomainRequest);
}

export function startCrop(multiDomainRequest) {
    return directPost(`${BASE_URL}startCrop/`, multiDomainRequest);
}

export function splitDomain(id, splitArea) {
    return directGet(`${BASE_URL}split/${id}/${splitArea}`);

}


export function deleteDomain(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_DOMAIN);
    };
}

export function getDomain(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch, GET_DOMAIN);
    };
}

export function setEstimateProduce(id, year, value) {
    return function (dispatch) {
        restGet(`${BASE_URL}produce/${id}/${year}/${isEmpty(value) ? -1 : value}`, dispatch, GET_DOMAIN_ESTIMATE_PRODUCE);
    };
}

export function setSeasonDataParam(value) {
    return {
        type: SET_SEASON_PARAM,
        payload: value
    };
}

export function saveSeasonData(id, year, seasonData) {

    if (seasonData.flash) {
        seasonData.flash = asLocalDate(seasonData.flash, true);
    }
    if (seasonData.ripe) {
        seasonData.ripe = asLocalDate(seasonData.ripe, true);
    }
    const url = `${BASE_URL}season/data/${id}/${year}`;

    return function (dispatch) {
        if (seasonData.id) {
            return restPut(url, seasonData, dispatch, SAVE_SEASON_DATA);
        } else {
            return restPost(url, seasonData, dispatch, SAVE_SEASON_DATA);
        }
    };
}


export function getDomainsByYear(year) {
    return function (dispatch) {
        restGet(`${BASE_URL}year/${year}`, dispatch, GET_DOMAINS_BY_YEAR);
    };
}

export function getSelectionDomainsByYear(year) {
    return function (dispatch) {
        restGet(`${BASE_URL}year/${year}`, dispatch, GET_SELECTION_DOMAINS_BY_YEAR);
    };
}

