import {
    GET_REPORT_META_DATA,
    GET_GLOBAL_DATA,
    INVALIDATE_USER,
    GET_DATA_MODULES,
    IMPORT_FILE,
    CLEAR_IMPORT_EXPORT_RESULT,
} from '../actions/types';


const INITIAL_STATE = {

    dataModules: [],
    importResult: [],
    uploadResult: null,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }

        case GET_DATA_MODULES: {
            return {
                ...state,
                dataModules: action.payload,
            }
        }
        case IMPORT_FILE: {            
            return {
                ...state,
                uploadResult: action.payload,
            }
        }

        case CLEAR_IMPORT_EXPORT_RESULT: {
            return {
                ...state,
                uploadResult: null,
            }
        }

        default:
            return state;
    }
}