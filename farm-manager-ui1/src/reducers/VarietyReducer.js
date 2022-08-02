import {
    GET_GLOBAL_DATA, INVALIDATE_USER,
} from '../actions/types';


const INITIAL_STATE = {
    varieties: [],
    selectedVariety: null,
    reloadVarieties: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_GLOBAL_DATA: {
            return {
                ...state,
                varieties: action.payload.varieties,
            }
        }

        default:
            return state;
    }
}