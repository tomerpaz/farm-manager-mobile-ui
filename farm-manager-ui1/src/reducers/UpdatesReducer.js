import {
    INVALIDATE_USER, FETCH_UPDATES, CLEAR_UPDATES,EXECUTE_UPDATES
} from '../actions/types';

const INITIAL_STATE = {
    updates: [],

};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CLEAR_UPDATES:
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case FETCH_UPDATES: {
            return {
                ...state,
                updates: action.payload,
            }
        }
        case EXECUTE_UPDATES: {
            return {
                ...state,
                updates: [],
            }
        }
        default:
            return state;
    }
}