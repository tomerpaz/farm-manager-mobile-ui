import {
    GET_USERS,
    GET_AUTHORIZATIONS,
    TOGGLE_AUTHORIZATION, EDIT_USER, USER_SAVED, INVALIDATE_USER, SAVE_USER_TAGS, GET_USER_TAGS, SET_TAGS_AUTHORIZATIONS, GET_TAGS
} from '../actions/types';
import { isArrayEmpty } from '../components/filters/filterUtil';


const INITIAL_STATE = {
    users: [],
    authorizations: [],
    editUser: null,

    userTags: null,
    tagsAuthorizations: false,

};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case GET_USERS: {
            return {
                ...state,
                users: action.payload,
            }
        }

        case SET_TAGS_AUTHORIZATIONS: {
            return {
                ...state,
                tagsAuthorizations: action.payload,
            }
        }

        case GET_AUTHORIZATIONS: {
            return {
                ...state,
                authorizations: action.payload,
            }
        }

        case GET_USER_TAGS: {
            return {
                ...state,
                userTags: action.payload,

            }
        }
        case GET_TAGS: {
            return {
                ...state,
                tagsAuthorizations: !isArrayEmpty(action.payload)

            }
        }

        case SAVE_USER_TAGS: {
            return {
                ...state,
                userTags: action.payload,
            }
        }

        case EDIT_USER: {
            return {
                ...state,
                editUser: action.payload,
                userTags: null,
            }
        }

        case USER_SAVED: {

            const users = state.users;
            if (!isArrayEmpty(state.users)) {
                const index = state.users.findIndex((user) => user.username === action.payload.username);
                if (index > -1) {
                    users[index] = action.payload;
                }
            }
            return {
                ...state,
                users: users,
                editUser: null,
            }
        }


        case TOGGLE_AUTHORIZATION: {
            return {
                ...state,
                authorizations: action.payload,
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