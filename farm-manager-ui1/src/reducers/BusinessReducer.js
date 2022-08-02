import {
    BUSINESS_CREATED,
    BUSINESS_UPDATED,
    BUSINESS_USER_CREATED,
    BUSINESS_USER_UPDATED,
    CLEAR_BUSINESS,
    CLEAR_BUSINESS_USER,
    DELETE_BUSINESS,
    DELETE_BUSINESS_USER,
    GET_BUSINESS,
    GET_BUSINESS_USERS,
    GET_BUSINESSES,
    INVALIDATE_USER,
    SELECT_BUSINESS,
    SELECT_BUSINESS_USER,
    GET_FEILDIN_GROUPS,
    GET_FEILDIN_COMPANIES,
    GET_LINKED_GROWERS,
} from '../actions/types';


const INITIAL_STATE = {
    businesses: [],
    selectedBusiness: null,
    createNewBusiness: false,
    selectedUser: null,
    businessUsers: [],
    selectedBusinessUser: null,
    fieldInGroups: [],
    fieldInCompanies: [],
    linkedGrowers: [],
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE,

            }
        }
        case GET_BUSINESSES: {
            return {
                ...state,
                businesses: action.payload,
            }
        }
        case GET_FEILDIN_GROUPS:{
            return {
                ...state,
                fieldInGroups: action.payload,
            }
        }

        case GET_FEILDIN_COMPANIES:{
            return {
                ...state,
                fieldInCompanies: action.payload,
            }
        }

        case GET_LINKED_GROWERS: {
            return {
                ...state,
                linkedGrowers: action.payload,
            }
        }


        case GET_BUSINESS:
        case SELECT_BUSINESS: {

            const selectedBusiness = action.payload;

            if (selectedBusiness && selectedBusiness.links) {
                selectedBusiness.businessLinks = selectedBusiness.links.map(businessId => {
                    const currentBusiness = state.businesses.find(b => b.id === businessId);
                    return {value: businessId, label: currentBusiness.name}
                });
            }

            return {
                ...state,
                selectedBusiness,
                createNewBusiness: false,
                selectedBusinessUser: null,
            }
        }

        case DELETE_BUSINESS: {
            const businesses = state.businesses.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedBusiness: null,
                businessUsers: [],
                selectedBusinessUser: null,
                businesses,
                createNewBusiness: true,
            }
        }
        case GET_BUSINESS_USERS: {
            return {
                ...state,
                businessUsers: action.payload,
                selectedBusinessUser: null,
            }
        }
        case BUSINESS_CREATED:
        case BUSINESS_UPDATED: {

            const businesses = state.businesses.filter((e) => e.id !== action.payload.id);

            businesses.unshift(action.payload);
            return {
                ...state,
                selectedBusiness: null,
                businessUsers: [],
                selectedBusinessUser: null,
                businesses,
                createNewBusiness: true,

            }
        }
        case CLEAR_BUSINESS: {
            return {
                ...state,
                selectedBusiness: null,
                businessUsers: [],
                selectedBusinessUser: null,
                createNewBusiness: true,
            }
        }
        case SELECT_BUSINESS_USER: {
            //const selectedBusinessUser = action.payload;

            return {
                ...state,
                selectedBusinessUser: action.payload,
            }
        }
        case CLEAR_BUSINESS_USER: {
            return {
                ...state,
                selectedBusinessUser: null,
            }
        }
        case BUSINESS_USER_CREATED:
        case BUSINESS_USER_UPDATED: {
            const businessUsers = state.businessUsers.filter((e) => e.username !== action.payload.username);
            businessUsers.unshift(action.payload);
            return {
                ...state,
                selectedBusinessUser: null,
                businessUsers,
            }
        }

        case DELETE_BUSINESS_USER: {
            const businessUsers = state.businessUsers.filter((e) => e.username !== action.payload.username);
            return {
                ...state,
                selectedBusinessUser: null,
                businessUsers,
            }
        }

        default:
            return state;
    }
}