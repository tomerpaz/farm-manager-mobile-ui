import {CLEAR_TAG, DELETE_TAG, GET_TAG, GET_TAGS, SELECT_TAG, TAG_CREATE, TAG_UPDATE, INVALIDATE_USER} from '../actions/types';

const INITIAL_STATE = {
    tags: [],
    selectedTag: null,
    createNewTag: false,
    genericTags: [],
};

export const GENETRIC_TAGS = 10;

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_TAG:
        case SELECT_TAG: {
            return {
                ...state,
                selectedTag: action.payload,
                createNewTag: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_TAGS: {
            return {
                ...state,
                tags: action.payload,
                genericTags: action.payload.filter(e=>e.type === GENETRIC_TAGS)
            }
        }

        case DELETE_TAG: {
            const tags = state.tags.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedTag: null,
                createNewTag: true,
                tags,
                genericTags: tags.filter(e=>e.type === GENETRIC_TAGS)

            }
        }
        case TAG_UPDATE:
        case TAG_CREATE: {
            const tags = state.tags.filter((e) => e.id !== action.payload.id);
            tags.push(action.payload);
            return {
                ...state,
                selectedTag: null,
                createNewTag: true,
                tags,
                genericTags: tags.filter(e=>e.type === GENETRIC_TAGS)

            }
        }
        case CLEAR_TAG: {
            return {
                ...state,
                selectedTag: null,
                createNewTag: true,
            }
        }
        default:
            return state;
    }
}