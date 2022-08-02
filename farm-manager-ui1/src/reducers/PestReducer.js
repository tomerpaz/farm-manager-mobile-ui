import {
    GET_PESTS,
    GET_PEST,
    SELECT_PEST,
    PEST_CREATED,
    PEST_UPDATED,
    DELETE_PEST,
    CLEAR_PEST,
    INVALIDATE_USER
} from '../actions/types';


const INITIAL_STATE = {
    pests: [],
    selectedPest: null,
    createNewPest: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        
        case GET_PESTS: {
            return {
                ...state,
                pests: action.payload,
            }
        }
        case GET_PEST: {
            return {
                ...state,
                selectedPest: action.payload,
                createNewPest: false,

            }
        }
        case SELECT_PEST: {
            return {
                ...state,
                selectedPest: action.payload,
                createNewPest: false,

            }
        }

        case DELETE_PEST: {
            const pests = state.pests.filter((e) => e.id !== action.payload);

            return {
                ...state,
                selectedPest: null,
                pests,
                createNewPest: true,

            }
        }
        case PEST_CREATED:
        case PEST_UPDATED: {

            const pests = state.pests.filter((e) => e.id !== action.payload.id);
            pests.unshift(action.payload);
            return {
                ...state,
                selectedPest: null,
                pests,
                createNewPest: true,

            }
        }
        case CLEAR_PEST: {
            return {
                ...state,
                selectedPest: null,
                createNewPest: true,

            }
        }
        default:
            return state;
    }
}