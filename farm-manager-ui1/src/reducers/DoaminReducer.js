import {
    SELECT_DOMAIN,
    DELETE_DOMAIN,
    GET_DOMAIN,
} from '../actions/types';


const INITIAL_STATE = {
    selectedDomain: null,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_DOMAIN: {
            return {
                ...state,
                selectedDomain: action.payload,
            }
        }
        case SELECT_DOMAIN: {
            return {
                ...state,
                selectedDomain: action.payload,
            }
        } case DELETE_DOMAIN: {
            return {
                ...state,
                selectedDomain: null,
            }
        }
        default:
            return state;
    }
}