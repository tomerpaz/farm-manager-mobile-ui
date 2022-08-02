import {
    GET_ACTIVITY_DEFS, GET_ACTIVITY_DEF,
    SELECT_ACTIVITY_DEF, DELETE_ACTIVITY_DEF,
    ACTIVITY_DEF_CREATED, ACTIVITY_DEF_UPDATED, INVALIDATE_USER, CLEAR_ACTIVITY_DEF,

} from '../actions/types';


const INITIAL_STATE = {
    activityDefs: [],
    selectedActivityDef: null,
    createNewActivityDef: true,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_ACTIVITY_DEFS: {
            return {
                ...state,
                activityDefs: action.payload,
            }
        }
        case GET_ACTIVITY_DEF: {
            return {
                ...state,
                selectedActivityDef: action.payload,
                createNewActivityDef: false,

            }
        }
        case SELECT_ACTIVITY_DEF: {
            return {
                ...state,
                selectedActivityDef: action.payload,
                createNewActivityDef: false,
            }
        }
        case DELETE_ACTIVITY_DEF: {
            const activityDefs = state.activityDefs.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedActivityDef: null,
                createNewActivityDef: true,
                activityDefs
            }
        }
        case CLEAR_ACTIVITY_DEF: {
            return {
                ...state,
                selectedActivityDef: null,
                createNewActivityDef: true,
            }
        }
        case ACTIVITY_DEF_UPDATED:
        case ACTIVITY_DEF_CREATED: {
            const activityDefs = state.activityDefs.filter((e) => e.id !== action.payload.id);
            activityDefs.unshift(action.payload);
            return {
                ...state,
                selectedActivityDef: null,
                createNewActivityDef: true,
                activityDefs,
            }
        }
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE

            };
        }
        default:
            return state;
    }
}

