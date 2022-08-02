import { ACTIVITY_CREATED, ACTIVITY_UPDATED, ALERT_CREATE, ALERT_UPDATE, DELETE_ACTIVITY, DELETE_ALERT, EQUIPMENT_CREATED, EQUIPMENT_UPDATED, EXECUTOR_CREATED, EXECUTOR_UPDATED, FERTILIZER_HUB_CREATED, FERTILIZER_HUB_UPDATED, GET_NOTIFICATIONS, INVALIDATE_USER, SET_EXECUTE_ALERT, SET_NAVIGATE_ON_CRITICAL, UPDATE_VALVE, VALVE_DELETED, } from '../actions/types';

const INITIAL_STATE = {
    notifications: null,
    fetchNotifications: true,
    navigateOnCtitical: false,

};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case SET_NAVIGATE_ON_CRITICAL: {
            return {
                ...state,
                navigateOnCtitical: action.payload,
            };  
        }
        case GET_NOTIFICATIONS: {
            let  navigateOnCtitical = state.navigateOnCtitical;
            if(state.notifications === null &&  action.payload &&action.payload.critical){
                navigateOnCtitical = true;
            }
            return {
                ...state,
                notifications: action.payload,
                fetchNotifications: false,
                navigateOnCtitical,
            };
        }

        case SET_EXECUTE_ALERT:
        case ALERT_CREATE:
        case ALERT_UPDATE:
        case DELETE_ALERT:
        case UPDATE_VALVE:
        case VALVE_DELETED:
        case FERTILIZER_HUB_CREATED:
        case FERTILIZER_HUB_UPDATED:
        case EXECUTOR_CREATED:
        case EXECUTOR_UPDATED:
        case EQUIPMENT_CREATED:
        case EQUIPMENT_UPDATED:
        case ACTIVITY_CREATED:
        case ACTIVITY_UPDATED:
        case DELETE_ACTIVITY: {
            //   console.log(action);
            return {
                ...state,
                fetchNotifications: true,
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