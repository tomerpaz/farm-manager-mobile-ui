
import {
    GET_REPORT_META_DATA,EMAIL_REPORT
} from './types';
import {directDownload, restGet, directGet} from "./util/RestUtil";
import {isEmpty} from "../utils/StringUtil";
import { newDate, asLocalDate } from '../utils';

const BASE_URL = 'api/report/';

export function getReportMetaData() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_REPORT_META_DATA);
    };
}

export function downloadReport(name, lang, format, start, end, season, filter, uncheckedColumns, fontSize, onFinish) {
    if(!fontSize){
        fontSize = 12;
    }
    const search = buildParams(filter,uncheckedColumns)
    const time = newDate().getTime();
    let s = start ? asLocalDate(start) : '1';
    let e = end ? asLocalDate(end) : '1';
    const year = season === '' ? 0 : season;
        
    return directDownload(`${BASE_URL}download/${name}/${time}/${lang}/${format}/${s}/${e}/${year}/${fontSize}${search}`, onFinish);
}

export function getReportUrl(name, lang, format, start, end, season, filter, uncheckedColumns, fontSize) {
    if(!fontSize){
        fontSize = 12;
    }
    const search = buildParams(filter,uncheckedColumns)
    const time = newDate().getTime();
    let s = start ? asLocalDate(start) : '1';
    let e = end ? asLocalDate(end) : '1';
    const year = season === '' ? 0 : season;
        
    return `${BASE_URL}download/${name}/${time}/${lang}/${format}/${s}/${e}/${year}/${fontSize}${search}`;
}

export function getUncheckedColumns(reportName) {
   return directGet(`${BASE_URL}uncheckedColumns/${reportName}`);
}

export function emailReport(name, lang, format, start, end,season, filter,uncheckedColumns, fontSize) {


    const search = buildParams(filter,uncheckedColumns)
    const time = newDate().getTime();
    const s = start ? asLocalDate(start) : '1';
    const e = end ? asLocalDate(end) : '1';
    const year = season === '' ? 0 : season;

    return function (dispatch) {
        restGet(`${BASE_URL}email/${name}/${time}/${lang}/${format}/${s}/${e}/${year}/${fontSize}${search}`, dispatch,EMAIL_REPORT);
    };
}

function buildParams(filter, uncheckedColumns){
    if(!isEmpty(filter) ||  !isEmpty(uncheckedColumns)){
        let search = '?';
        let add = '';

        if(!isEmpty(filter)){
            search = search + 'filter='  + filter;
            add = '&';

        }
        if(!isEmpty(uncheckedColumns)){
            search = search + add +'uncheckedColumns='  + uncheckedColumns;

        }
        return search;
    }
    return ''
}
