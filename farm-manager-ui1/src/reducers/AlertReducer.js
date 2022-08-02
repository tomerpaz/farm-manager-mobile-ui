import {CLEAR_ALERT, DELETE_ALERT, GET_ALERT, GET_ALERTS, SELECT_ALERT, ALERT_CREATE, ALERT_UPDATE, INVALIDATE_USER} from '../actions/types';
import { getSuggestionsNameElement } from '../components/core';

const INITIAL_STATE = {
    alerts: [],
    selectedAlert: null,
    createNewAlert: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_ALERT:
        case SELECT_ALERT: {
            if (action.payload && action.payload.resource) {
                action.payload.resourceOption = getSuggestionsNameElement(action.payload.resource, 'resource');
            }
            return {
                ...state,
                selectedAlert: action.payload,
                createNewAlert: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_ALERTS: {
            return {
                ...state,
                alerts: action.payload,
            }
        }

        case DELETE_ALERT: {
            const alerts = state.alerts.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedAlert: null,
                createNewAlert: true,
                alerts
            }
        }
        case ALERT_UPDATE:
        case ALERT_CREATE: {
            const alerts = state.alerts.filter((e) => e.id !== action.payload.id);
            alerts.push(action.payload);
            return {
                ...state,
                selectedAlert: null,
                createNewAlert: true,
                alerts,
            }
        }
        case CLEAR_ALERT: {
            return {
                ...state,
                selectedAlert: null,
                createNewAlert: true,
            }
        }
        default:
            return state;
    }
}