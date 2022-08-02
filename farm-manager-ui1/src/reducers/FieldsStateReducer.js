import {
    GET_FIELD_STATES,
    SELECT_FIELD,
    EDIT_FIELD_POLYGON,
    RELOADING_MAP,
    SET_SELECTED_FIELD_INDEX,
    POST_FIELD,
    INVALIDATE_USER,
} from '../actions/types';

const INITIAL_STATE = {
    fieldStateList: [],
    selectedField: null,
    editFieldPolygon: false,
    reloadingMap: false,
    selectedFieldIndex: null,
};


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_FIELD_STATES:
            return {
                ...state,
                fieldStateList: action.payload.content,
                selectedField: null
            };
        case SELECT_FIELD:
            return {
                ...state,
                selectedField: action.payload,
            };
        case EDIT_FIELD_POLYGON:
        {
            return {
                ...state,
                editFieldPolygon: action.payload
            };
        }
        case RELOADING_MAP:
        {
            return {
                ...state,
                reloadingMap: action.payload
            };
        }
        case  SET_SELECTED_FIELD_INDEX:
        {
            return {
                ...state,
                selectedFieldIndex: action.payload
            };
        }
        case POST_FIELD:
        {
            return {
                ...state,
            };
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        default:
            return state;
    }
}