import {
    SET_FIELD_FILTER, SET_YEAR_FILTER, SET_SELECTION_YEAR_FILTER, SET_DOMAIN_VIEW_SIZE,
    SET_FIELD_FREE_TEXT
} from './types';



export function setFieldFilter(filter) {
    return {
        type: SET_FIELD_FILTER,
        payload: filter
    };
}

export function setFieldFilterFreeText(freeText) {
    return {
        type: SET_FIELD_FREE_TEXT,
        payload: freeText
    };
}
export function setDomainViewSize(size) {
    return {
        type: SET_DOMAIN_VIEW_SIZE,
        payload: size
    };
}



export function setYearFilter(year) {
    return {
        type: SET_YEAR_FILTER,
        payload: year
    };
}

export function setSelectionYearFilter(year) {
    return {
        type: SET_SELECTION_YEAR_FILTER,
        payload: year
    };
}