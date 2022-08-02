import {
    SELECT_SEASON,
    SELECT_SITE,
    RELOADING_MAP,
    EDIT_MAP,
    GET_FIELD_FOR_MAP,
    INVALIDATE_USER
} from '../actions/types';

const INITIAL_STATE = {
    selectedSite: null,
    selectedSeason: null,
    reloadingMap: false,
    updatedSite: null,
    editingMap: false,
    selectedSiteValue: null,
    selectedSeasonValue: null,
    fields: []
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case SELECT_SEASON:
            return {
                ...state,
                selectedSeasonValue: { value: action.payload.id, label: action.payload.name },
                selectedSeason: action.payload
            };


        case RELOADING_MAP:
        {
            return {
                ...state,
                reloadingMap: action.payload
            };
        }

        case EDIT_MAP:
        {
            return {
                ...state,
                editingMap: action.payload
            };
        }
        case GET_FIELD_FOR_MAP: {
            return {
                ...state,
                fields: action.payload
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