import {
    GET_ACTIVITY,
    GET_WAYBILLS,
    NEW_ACTIVITY,
    SET_ACTIVITY, SET_ACTIVITY_TABLE_FILTER, SET_ACTIVITY_TABLE_FREE_TEXT_DEEP_SEARCH,
    SET_WAYBILLS,
    SET_ACTIVITY_TABLE_START, SET_ACTIVITY_TABLE_END, SET_ACTIVITY_TABLE_FREE_TEXT, SET_ACTIVITY_TABLE_FETCH,
    SET_ACTIVITY_TABLE_SORTING, SET_ACTIVITY_TABLE_CURRENT_PAGE, 
    GET_ACTIVITIES, GET_PLAN_ACTIVITIES, SET_FETCHING_ACTIVITIES, 
    SET_FETCHING_PLAN_ACTIVITIES,
    SET_PLAN_ACTIVITY_TABLE_FILTER,
    SET_PLAN_ACTIVITY_TABLE_FREE_TEXT,
    SET_PLAN_ACTIVITY_TABLE_START,
    SET_PLAN_ACTIVITY_TABLE_END,
    SET_PLAN_ACTIVITY_TABLE_SORTING,
    SET_PLAN_ACTIVITY_TABLE_CURRENT_PAGE,
    GET_PEST_GEO_JSON,
    GET_WAYPOINTS_GEO_JSON,
    GET_TRACKER_GPS,
    CLEAR_ACTIVITIES,
    GET_APPROVAL, CLEAR_APPROVAL, UPDATE_APPROVAL_PRINTED, SET_DOMAIN_HISTORY_TABLE_FILTER
} from './types';


import { buildSearch, directDelete, directGet, directPost, directPut, restGet } from './util/RestUtil';
import { newDate, asLocalDate, asLocalHour} from '../utils';
import { PEST_MONITOR, GENERAL } from '../modules/activity/types';

const BASE_URI = 'api/activity/';

export function getActivity(uuid, mode) {
    const mid = mode ? mode + '/' : '';
    return function (dispatch) {
        restGet(`${BASE_URI}${mid}${uuid}`, dispatch, GET_ACTIVITY);
    };
}

export function getPestGeoJson(fromDate, toDate) {
    
    return function (dispatch) {
        restGet(`${BASE_URI}geojson/${PEST_MONITOR}/${asLocalDate(fromDate, true)}/${asLocalDate(toDate, true)}`, dispatch, GET_PEST_GEO_JSON);
    };
}


export function getTrackerGps(fromDate, toDate) {
    return function (dispatch) {
        restGet(`${BASE_URI}trackergps/${asLocalDate(fromDate, true)}/${asLocalDate(toDate, true)}`, dispatch, GET_TRACKER_GPS);
    };
}


export function getWaypointsGeoJson(fromDate, toDate) {
    
    return function (dispatch) {
        restGet(`${BASE_URI}geojson/${GENERAL}/${asLocalDate(fromDate, true)}/${asLocalDate(toDate, true)}`, dispatch, GET_WAYPOINTS_GEO_JSON);
    };
}

export function getNewActivity(type) {
    return function (dispatch) {
        restGet(`${BASE_URI}new/${type}`, dispatch, NEW_ACTIVITY);
    };
}

export function deleteActivity(uuid) {
    return directDelete(`${BASE_URI}${uuid}`);
}


export function saveActivity(activity) {
    activity.domains = activity.activityDomains;
    activity.execution = asLocalDate(activity.execution, true);
    activity.end = asLocalDate(activity.end, true);
    activity.hour=   asLocalHour(activity.hour);
    activity.pestId=   null;
    
    if (activity.uuid) {
        return directPut(`${BASE_URI}`, activity)
    } else {
        return directPost(`${BASE_URI}`, activity);
    }
}

export function getResourceTariff(activityType, date, resourceIdArr, referenceId) {
    let urlParams = null;
    resourceIdArr.forEach((r, index, arr) => {
        if (!urlParams) {
            if (r) {
                urlParams = 'r=' + r;
            }
        } else {
            if (r) {
                urlParams += '&r=' + r;
            }
        }
    });
    if (referenceId) {
        urlParams += '&ref=' + referenceId;
    }
    return directGet(`${BASE_URI}getTariff/${activityType}/${date}?${urlParams}`);

}


export function clearActivity() {
    return function (dispatch) {
        dispatch({
            type: GET_ACTIVITY,
            payload: null
        });
    };
}


export function clearActivities() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_ACTIVITIES,
            payload: null
        });
    };
}




export function getDomainActivitiesDirect(domainId, page, size, isPlane, orderBy, dir, filter) {
    let search = filter ? '?filter=' + filter.map((e => e.value)).join(',') : '';
    return directGet(`${BASE_URI}domain/${domainId}/${page}/${size}/${isPlane}/${orderBy}/${dir}${search}`);
}

export function getActivities(page, size, orderBy, dir, filter, start, end, freeText, deepSearch) {
    const search = buildSearch(filter, start, end, freeText, true, deepSearch);
    const time = newDate().getTime();

    return function (dispatch) {
        dispatch({
            type: SET_FETCHING_ACTIVITIES,
            payload: time,
        });
        restGet(`${BASE_URI}groups/${time}/${page}/${size}/${false}/${orderBy}/${dir}${search}`, dispatch,GET_ACTIVITIES);
    };
}

export function getPlanActivities(page, size, orderBy, dir, filter, start, end, freeText) {
    const search = buildSearch(filter, start, end, freeText, true);
    const time = newDate().getTime();

    return function (dispatch) {
        dispatch({
            type: SET_FETCHING_PLAN_ACTIVITIES,
            payload: time,
        });
        restGet(`${BASE_URI}groups/${time}/${page}/${size}/${true}/${orderBy}/${dir}${search}`, dispatch,GET_PLAN_ACTIVITIES);
    };
}

export function getDomainActivityGpsLog(domain, uuid) {
    return directGet(`${BASE_URI}gps/${domain}/${uuid}`);
}

export function getWaybills(start, end, filter, waybill) {
    const search = buildSearch(filter, null, null, waybill, true);

    return function (dispatch) {
        restGet(`${BASE_URI}waybills/${asLocalDate( start, true)}/${ asLocalDate( end, true)}${search}`, dispatch, GET_WAYBILLS);
    };
}


export function setWaybills(waybills) {

    return function (dispatch) {
        dispatch({
            type: SET_WAYBILLS,
            payload: waybills
        });
    };
}

export function setActivity(activity) {

    return function (dispatch) {
        if(activity === null){
            dispatch({
                type: SET_FETCHING_ACTIVITIES,
                payload: newDate().getTime(),
            });
            dispatch({
                type: SET_FETCHING_PLAN_ACTIVITIES,
                payload: newDate().getTime(),
            });
        }
        dispatch({
            type: SET_ACTIVITY,
            payload: activity
        });
    };
}

export function setActivityTableFilter(filter) {
    return {
        type: SET_ACTIVITY_TABLE_FILTER,
        payload: filter,
    };
}

export function setDomainHistoryTableFilter(filter) {
    return {
        type: SET_DOMAIN_HISTORY_TABLE_FILTER,
        payload: filter,
    };
}

export function setActivityTableFilterDeepSearch(value) {
    return {
        type: SET_ACTIVITY_TABLE_FREE_TEXT_DEEP_SEARCH,
        payload: value,
    };
}



export function setPlanActivityTableFilter(filter) {
    return {
        type: SET_PLAN_ACTIVITY_TABLE_FILTER,
        payload: filter,
    };
}




export function setActivityTableStart(filter) {
    return {
        type: SET_ACTIVITY_TABLE_START,
        payload: filter,
    };
}

export function setPlanActivityTableStart(filter) {
    return {
        type: SET_PLAN_ACTIVITY_TABLE_START,
        payload: filter,
    };
}



export function setActivityTableEnd(filter) {
    return {
        type: SET_ACTIVITY_TABLE_END,
        payload: filter,
    };
}

export function setPlanActivityTableEnd(filter) {
    return {
        type: SET_PLAN_ACTIVITY_TABLE_END,
        payload: filter,
    };
}


export function setActivityTableFreeText(filter) {
    return {
        type: SET_ACTIVITY_TABLE_FREE_TEXT,
        payload: filter,
    };
}

export function setPlanActivityTableFreeText(filter) {
    return {
        type: SET_PLAN_ACTIVITY_TABLE_FREE_TEXT,
        payload: filter,
    };
}


export function setActivityTableFetch(value) {
    return {
        type: SET_ACTIVITY_TABLE_FETCH,
        payload: value,
    };
}



export function setActivityTableSorting(value) {
    return {
        type: SET_ACTIVITY_TABLE_SORTING,
        payload: value,
    };
}

export function setPlanActivityTableSorting(value) {
    return {
        type: SET_PLAN_ACTIVITY_TABLE_SORTING,
        payload: value,
    };
}


export function setActivityTableCurrentPage(value) {
    return {
        type: SET_ACTIVITY_TABLE_CURRENT_PAGE,
        payload: value,
    };
}
export function setPlanActivityTableCurrentPage(value) {
    return {
        type: SET_PLAN_ACTIVITY_TABLE_CURRENT_PAGE,
        payload: value,
    };
}

export function getApproval(uuid) {
    return function (dispatch) {
        restGet(`${BASE_URI}approval/${uuid}`, dispatch, GET_APPROVAL);
    };
}

export function clearApproval() {
    return {
        type: CLEAR_APPROVAL,
        payload: null,
    };
}


export function updateApproval(approval) {
        return directPut(`${BASE_URI}approval`, approval);
}

export function updateApprovalPrinted(uuid, value ) {
    return function (dispatch) {
        restGet(`${BASE_URI}approval/printed/${uuid}/${value}`, dispatch, UPDATE_APPROVAL_PRINTED);
    };
}

