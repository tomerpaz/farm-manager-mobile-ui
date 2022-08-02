import {
    GET_REPORT_META_DATA,
    GET_GLOBAL_DATA,
    INVALIDATE_USER,
    GET_DATA_MODULES,
    IMPORT_FILE,
} from '../actions/types';


const INITIAL_STATE = {
    reports: [],
    reportFontSize: 12,
    dataModules: [],
    importResult: [],
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }

        case GET_REPORT_META_DATA: {
            return {
                ...state,
                reports: action.payload,
            }
        }
        case GET_GLOBAL_DATA: {
            return {
                ...state,
                reportFontSize: action.payload.reportFontSize,
            }
        }

        case GET_DATA_MODULES: {
            return {
                ...state,
                dataModules: action.payload,
            }
        }
        case IMPORT_FILE: {

        }
        default:
            return state;
    }
}