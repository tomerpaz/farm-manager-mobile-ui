import {CLEAR_SITE, DELETE_SITE, GET_SITE, GET_SITES, SELECT_SITE, SITE_CREATE, SITE_UPDATE, INVALIDATE_USER} from '../actions/types';


const INITIAL_STATE = {
    sites: [],
    selectedSite: null,
    reloadSites: false,
    createNewSite: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_SITE:
        case SELECT_SITE: {
            return {
                ...state,
                selectedSite: action.payload,
                createNewSite: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_SITES: {
            return {
                ...state,
                sites: action.payload,
            }
        }

        case DELETE_SITE: {
            const sites = state.sites.filter((site) => site.id !== action.payload);
            return {
                ...state,
                selectedSite: null,
                createNewSite: true,
                sites
            }
        }
        case SITE_UPDATE:
        case SITE_CREATE: {
            const sites = state.sites.filter((site) => site.id !== action.payload.id);
            sites.unshift(action.payload);
            return {
                ...state,
                selectedSite: null,
                createNewSite: true,
                sites,
            }
        }
        case CLEAR_SITE: {
            return {
                ...state,
                selectedSite: null,
                createNewSite: true,
            }
        }
        default:
            return state;
    }
}