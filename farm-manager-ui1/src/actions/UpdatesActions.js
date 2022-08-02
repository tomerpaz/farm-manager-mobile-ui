import {
    FETCH_UPDATES, CLEAR_UPDATES,EXECUTE_UPDATES} from './types';
import { restPost, restPut} from './util/RestUtil';


const BASE_URL = 'api/updates/';

export function fetchUpdates(context){
    console.log('context',context);
    return function (dispatch) {
        restPost(`${BASE_URL}`,context, dispatch,FETCH_UPDATES);
    };
}

export function executehUpdates(context){
    console.log('context',context);
    return function (dispatch) {
        restPut(`${BASE_URL}`,context, dispatch,EXECUTE_UPDATES);
    };
}

export function clearUpdates() {
    return {
        type: CLEAR_UPDATES,
        payload: null
    };
}
