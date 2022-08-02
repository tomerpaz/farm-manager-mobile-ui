import {CLEAR_LINK, DELETE_LINK, GET_LINK, GET_LINKS, SELECT_LINK, LINK_CREATE, LINK_UPDATE, INVALIDATE_USER, GET_GLOBAL_DATA} from '../actions/types';

const INITIAL_STATE = {
    links: [],
    selectedLink: null,
    createNewLink: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_LINK:
        case SELECT_LINK: {
            return {
                ...state,
                selectedLink: action.payload,
                createNewLink: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_LINKS: {
            return {
                ...state,
                links: action.payload,
            }
        }
        case GET_GLOBAL_DATA: {
            return {
                ...state,
                links: action.payload.links,
            }
        }

        case DELETE_LINK: {
            const links = state.links.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedLink: null,
                createNewLink: true,
                links
            }
        }
        case LINK_UPDATE:
        case LINK_CREATE: {
            const links = state.links.filter((e) => e.id !== action.payload.id);
            links.push(action.payload);
            return {
                ...state,
                selectedLink: null,
                createNewLink: true,
                links,
            }
        }
        case CLEAR_LINK: {
            return {
                ...state,
                selectedLink: null,
                createNewLink: true,
            }
        }
        default:
            return state;
    }
}