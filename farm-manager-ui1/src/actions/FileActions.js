import axios from 'axios';
import {directDownload, directPostHeaders, postHeaders, restGet, restDelete, restPut} from './util/RestUtil';
import {getJwtToken,} from "./util/JwtUtil";
import {UPLOAD_FILE, UPLOAD_FILES,GET_FILES, DELETE_FILE, UPLOADING, MOVE_FILE} from "./types";
import { newDate, asLocalDate } from '../utils';
import { isEmpty } from '../utils/StringUtil';

const BASE_URL = 'api/file/';

export function getGuidance(uuid, lang) {
    return directDownload(`${BASE_URL}guidance/${uuid}/${newDate().getTime()}/${lang}`);
}

export function getOperationInfo(uuid, addFields, lang) {
    return directDownload(`${BASE_URL}operationinfo/${uuid}/${newDate().getTime()}/${addFields}/${lang}`);
}


export function getReport(name, lang, format, start, end, filter, sorting, freeText, onFinish) {
    
    let search = filter ? '?filter=' + filter.map((e => e.value)).join(',')  : '' ;
    const time = newDate().getTime();
    const s = start ? asLocalDate(start) : '1';
    const e = end ? asLocalDate(end) : '1';
    let sort = ''
    if(sorting){
        sort = `/${sorting.columnName}/${sorting.direction}`

    }

    if(!isEmpty(freeText)){
        const freeTextFilter = 'freeText_' + freeText;
        if(isEmpty(search)){
            search = '?filter=' + freeTextFilter
        } else {
            search = search+","+freeTextFilter;
        }
    }
    return directDownload(`${BASE_URL}report/${name}/${time}/${lang}/${format}/${s}/${e}${sort}${search}`, onFinish);
}

export function getFile(id) {
    return directDownload(`${BASE_URL}/${id}`);
}

export function getFiles(module, year) {
    const URL = year ? `${BASE_URL}module/${module}/${year}` : `${BASE_URL}module/${module}`
    return function (dispatch) {
        restGet(URL, dispatch,GET_FILES);
    };
}

export function getGisFile(type) {
    return directDownload(`${BASE_URL}/download/gis/${type}`);
}






export function moveFile(id, folder, year) {
    return function (dispatch) {
        restPut(`${BASE_URL}move/${id}/${folder}/${year}`,"", dispatch, MOVE_FILE);
    };
}

export function deleteFile(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_FILE);
    };
}


export function uploadFile(module, file, owner) {
    const URL = `${BASE_URL}upload/linked/${module}/${owner}`;
    var config = {
        headers: {
            'Cache-Control': 'no-cache',
            'X-Authorization': 'Bearer ' + getJwtToken(),
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('file', file)
    formData.append("timestamp", (Date.now() / 1000) | 0);

    return function (dispatch) {
        dispatch({
            type: UPLOADING,
        });

        return directPostHeaders(URL, formData, config).then(response => {
            dispatch({
                type: UPLOAD_FILE,
                payload: response.data,
            });
        })
    };
}

export function uploadFiles(module, category, folder, files, year) {
    const URL =  `${BASE_URL}upload/${module}/${category}/${folder}/${year ? year : 0}`;
    return function (dispatch) {
        dispatch({
            type: UPLOADING,
        });
        var config = {
            headers: {
                'Cache-Control': 'no-cache',
                'X-Authorization': 'Bearer ' + getJwtToken(),
                'Content-Type': 'multipart/form-data'
            }
        };

        let count = 0;
        const uploaded = [];
        const uploaders = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return directPostHeaders(URL, formData, config).then(response => {
                const data = response.data;
                uploaded.push(data);
                count++;
            })
        });

        axios.all(uploaders).then(() => {
            dispatch({
                type: UPLOAD_FILES,
                payload: uploaded
            });
        });
    }

}