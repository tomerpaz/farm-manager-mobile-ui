import {
    GET_SELECTION_DOMAINS_BY_YEAR, SET_SELECTION_YEAR_FILTER, INVALIDATE_USER
} from '../actions/types';

import { buildDomainFilter } from "../components/filters/filterUtil";
import { getCurrentYear } from '../utils';

const INITIAL_STATE = {
    selectionDomains: [],
    selectionDomainFilterOption: [],
    selectionYearFilter: getCurrentYear(),
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
 
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }

        case GET_SELECTION_DOMAINS_BY_YEAR:
            return {
                ...state,
                selectionDomains: action.payload,
                selectionDomainFilterOption: buildDomainFilter(action.payload),
            };
        case SET_SELECTION_YEAR_FILTER: {

            return {
                ...state,
                selectionYearFilter: action.payload,
            };
        }
        default:
            return state;
    }
}

