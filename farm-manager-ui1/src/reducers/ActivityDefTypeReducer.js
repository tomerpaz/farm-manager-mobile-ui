import {
    GET_ACTIVITY_DEF_TYPES, GET_ACTIVITY_DEF_TYPE,
    SELECT_ACTIVITY_DEF_TYPE, DELETE_ACTIVITY_DEF_TYPE,
    ACTIVITY_DEF_TYPE_CREATED, ACTIVITY_DEF_TYPE_UPDATED, INVALIDATE_USER,
    CLEAR_ACTIVITY_DEF_TYPE

} from '../actions/types';


const INITIAL_STATE = {
    activityDefTypes: [],
    selectedActivityDefType: null,
    createNewActivityDefType: true,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_ACTIVITY_DEF_TYPES: {
            return {
                ...state,
                activityDefTypes: action.payload,
            }
        }
        case GET_ACTIVITY_DEF_TYPE: {
            return {
                ...state,
                selectedActivityDefType: action.payload,
                createNewActivityDefType: false,
            }
        }
        case SELECT_ACTIVITY_DEF_TYPE: {
            return {
                ...state,
                selectedActivityDefType: action.payload,
                createNewActivityDefType: false,
            }
        }
        case DELETE_ACTIVITY_DEF_TYPE: {
            const activityDefTypes = state.activityDefTypes.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedActivityDefType: null,
                createNewActivityDefType: true,
                activityDefTypes
            }
        }
        case ACTIVITY_DEF_TYPE_UPDATED:
        case ACTIVITY_DEF_TYPE_CREATED: {
            const activityDefTypes = state.activityDefTypes.filter((e) => e.id !== action.payload.id);
            activityDefTypes.unshift(action.payload);
            return {
                ...state,
                selectedActivityDefType: null,
                createNewActivityDefType: true,
                activityDefTypes,
            }
        }
        case CLEAR_ACTIVITY_DEF_TYPE: {
            return {
                ...state,
                selectedActivityDefType: null,
                createNewActivityDefType: true,
            };
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

