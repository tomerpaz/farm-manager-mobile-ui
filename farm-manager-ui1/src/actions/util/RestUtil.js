import axios from 'axios';
import FileSaver from 'file-saver';
import {getBackendURL} from '../../config';
import {getAuthConfig, resetTokenInactive} from './JwtUtil';
import {INVALIDATE_USER} from '../types';
import { asLocalDate } from '../../utils';


export const STATUS_OK = 200;

export function postHeaders(uri, data, dispatch, actionType, config) {
    if (config !== null) {
        axios.post(`${getBackendURL()}/${uri}`, data, config)
            .then(response => {

                dispatch({
                    type: actionType,
                    payload: response.data
                });
            })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}

export function directPost(uri, data) {
    return axios.post(`${getBackendURL()}/${uri}`, data, getAuthConfig());
}

export function directPostHeaders(uri, data, config) {
    return axios.post(`${getBackendURL()}/${uri}`, data, config);
}

export function directGet(uri) {
    return axios.get(`${getBackendURL()}/${uri}`, getAuthConfig());
}

export function httpGet(url, config) {
    return axios.get(`${url}`, config);
}

export function directDownload(uri, onFinish) {
    const authConfig = getAuthConfig();
    authConfig.responseType  = 'arraybuffer';
    return axios.get(`${getBackendURL()}/${uri}`, authConfig)
        .then(response => {
            let fileName = response.headers['x-suggested-filename'];
            const type = response.headers['content-type'];
            FileSaver.saveAs(new Blob([response.data], {type: type}), decodeURI(fileName).replace( /\+/g, ' ' ));
            if(onFinish){
                onFinish()
            }

        })
        .catch(error => {
            if(onFinish){
                onFinish()
            }
            console.log('directGetBlob',error);
        })
}


export function directPut(uri, data) {
    return axios.put(`${getBackendURL()}/${uri}`, data, getAuthConfig());
}

export function directDelete(uri) {
    return axios.delete(`${getBackendURL()}/${uri}`,getAuthConfig());
}

export function putHeaders(uri, data, dispatch, actionType, config) {
    if (config !== null) {
        axios.put(`${getBackendURL()}/${uri}`, data, config)
            .then(response => {
                dispatch({
                    type: actionType,
                    payload: response.data
                });
            })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}

export function restDeleteHeaders(uri, dispatch, actionType, config) {
    if (config !== null) {
        axios.delete(`${getBackendURL()}/${uri}`, config)
            .then(response => {
                dispatch({
                    type: actionType,
                    payload: response.data
                });
            })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}

export function restPost(uri, data, dispatch, actionType) {
    postHeaders(uri, data, dispatch, actionType, getAuthConfig());
    resetTokenInactive();
}


export function restPut(uri, data, dispatch, actionType) {
    putHeaders(uri, data, dispatch, actionType, getAuthConfig());
    resetTokenInactive();
}


export function restDelete(uri, dispatch, actionType) {
    restDeleteHeaders(uri, dispatch, actionType, getAuthConfig());
    resetTokenInactive();
}

export function handleError(dispatch, error) {
    console.log(error);
    if (error.response.status === 401) {
        //location.reload();
        dispatch({
            type: INVALIDATE_USER
        });
    }
}

export function restGet(uri, dispatch, actionType) {
    let config = getAuthConfig();
    let queryString = window.location.search;
    if (config !== null) {
        axios.get(`${getBackendURL()}/${uri}${queryString}`, config).then(response => {
            resetTokenInactive();
            dispatch({
                type: actionType,
                payload: response.data
            });
        })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}


export function buildSearch(filterArr, start, end, freeText, localDate, deepSearch){

    if(start || end || filterArr || freeText){
        let all = [];
        if(filterArr){
            all = all.concat(filterArr);
        }
        if(start){
            if(localDate){
                all.push({value: 'start_'+asLocalDate(start)});
            } else {
                all.push({value: 'start_'+start.getTime()});
            }
        }
        if(end){
             if(localDate){                
                all.push({value: 'end_'+asLocalDate(end)});
             } else {
                all.push({value: 'end_'+end.getTime()});
             }
        }
        if(freeText){
            all.push({value: 'freeText_'+freeText});
        }
        if(deepSearch){
            all.push({value: 'deepSearch_'+deepSearch});
        }

        let search =  '?filter=' + all.map((e => e.value)).join(',');
        return search;
    }
    return '';
}