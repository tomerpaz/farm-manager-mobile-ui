import {CLEAR_RESOURCE_EXTERNAL_CODE, DELETE_RESOURCE_EXTERNAL_CODE, GET_RESOURCE_EXTERNAL_CODE, 
    GET_RESOURCE_EXTERNAL_CODES, SELECT_RESOURCE_EXTERNAL_CODE, RESOURCE_EXTERNAL_CODE_CREATE, RESOURCE_EXTERNAL_CODE_UPDATE, INVALIDATE_USER} from '../actions/types';

const INITIAL_STATE = {
    resourceExternalCodes: [],
    selectedResourceExternalCode: null,
    createNewResourceExternalCode: false,
};


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_RESOURCE_EXTERNAL_CODE:
        case SELECT_RESOURCE_EXTERNAL_CODE: {
            return {
                ...state,
                selectedResourceExternalCode: action.payload,
                createNewResourceExternalCode: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_RESOURCE_EXTERNAL_CODES: {
            action.payload.forEach(e => {
                e.name = e.resource.name
            });
            return {
                ...state,
                resourceExternalCodes: action.payload,
            }
        }

        case DELETE_RESOURCE_EXTERNAL_CODE: {
            const resourceExternalCodes = state.resourceExternalCodes.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedResourceExternalCode: null,
                createNewResourceExternalCode: true,
                resourceExternalCodes,
            }
        }
        case RESOURCE_EXTERNAL_CODE_UPDATE:
        case RESOURCE_EXTERNAL_CODE_CREATE: {
            const resourceExternalCodes = state.resourceExternalCodes.filter((e) => e.id !== action.payload.id);
            action.payload.name = action.payload.resource.name
            resourceExternalCodes.push(action.payload);
            return {
                ...state,
                selectedResourceExternalCode: null,
                createNewResourceExternalCode: true,
                resourceExternalCodes
            }
        }
        case CLEAR_RESOURCE_EXTERNAL_CODE: {
            return {
                ...state,
                selectedResourceExternalCode: null,
                createNewResourceExternalCode: true,
            }
        }
        default:
            return state;
    }
}