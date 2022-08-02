import {
    DELETE_PARENT_FIELD,
    GET_GLOBAL_DATA,
    GET_PARENT_FIELD,
    PARENT_FIELD_CREATED,
    PARENT_FIELD_UPDATED,
    SELECT_PARENT_FIELD,
    GET_PARENT_FIELDS, INVALIDATE_USER, CLEAR_PARENT_FIELD
} from '../actions/types';

const INITIAL_STATE = {
    parentFields: [],
    selectedParentField: null,
    reloadParentFields: false,
    createNewParentField: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case SELECT_PARENT_FIELD:
        case GET_PARENT_FIELD:{
            return {
                ...state,
                selectedParentField: action.payload,
                createNewParentField: false,
            }
        }


        case GET_PARENT_FIELDS: {
            return {
                ...state,
                parentFields: action.payload,
            }
        }


        case PARENT_FIELD_CREATED:
        case PARENT_FIELD_UPDATED: {
            const parentFields = state.parentFields.filter((pf) => pf.id !== action.payload.id);
            parentFields.unshift(action.payload);
            return {
                ...state,
                selectedParentField: null,
                createNewParentField: true,
                parentFields,
            }
        }

        case DELETE_PARENT_FIELD: {
            const parentFields = state.parentFields.filter((parentField) => parentField.id !== action.payload);
            return {
                ...state,
                selectedParentField: null,
                createNewParentField: true,
                parentFields
            }
        }

        case CLEAR_PARENT_FIELD: {
            return {
                ...state,
                selectedParentField: null,
                createNewParentField: true,
            }
        }
        default:
            return state;
    }
}