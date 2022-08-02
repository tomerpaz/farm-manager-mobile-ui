import axios from 'axios';
import {directDownload, directPostHeaders, postHeaders, restGet, restDelete, restPut} from './util/RestUtil';
import {getJwtToken,} from "./util/JwtUtil";
import {IMPORT_FILE, UPLOADING, GET_DATA_MODULES, CLEAR_IMPORT_EXPORT_RESULT} from "./types";


const BASE_URL = 'api/importexport/';

export function importDataModule( format, module) {
    return directDownload(`${BASE_URL}download/${format}/${module}`);
}


export function listDataModules() {
    return function (dispatch) {
        restGet(`${BASE_URL}modules`, dispatch, GET_DATA_MODULES);
    };
}


export function uploadDataModule(module, file) {
    const URL = `${BASE_URL}upload/${module}`;
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
                type: IMPORT_FILE,
                payload: response.data,
            });
        })
    };
}

export function clearUploadResult() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_IMPORT_EXPORT_RESULT,
        });
    };
}
