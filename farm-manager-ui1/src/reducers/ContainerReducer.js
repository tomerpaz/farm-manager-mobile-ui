import {
    GET_CONTAINER, GET_CONTAINERS, SELECT_CONTAINER, CONTAINER_UPDATED, CONTAINER_CREATED, DELETE_CONTAINER,
    CLEAR_CONTAINER,
    INVALIDATE_USER
} from '../actions/types';


const INITIAL_STATE = {
    containers: [],
    selectedContainer: null,
    createNewContainer: false,

};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_CONTAINERS: {
            return {
                ...state,
                containers: action.payload,
            }
        }
        case GET_CONTAINER:
        case SELECT_CONTAINER:
            {
            return {
                ...state,
                selectedContainer: action.payload,
                createNewContainer: false,
            }
        }

        case CONTAINER_UPDATED:
        case CONTAINER_CREATED: {
            const containers = state.containers.filter((e) => e.id !== action.payload.id);
            containers.unshift(action.payload);
            return {
                ...state,
                selectedContainer: null,
                createNewContainer: true,
                containers,
            }
        }

        case DELETE_CONTAINER: {
            const containers = state.containers.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedContainer: null,
                createNewContainer: true,
                containers,
            }
        }

        case CLEAR_CONTAINER: {
            return {
                ...state,
                selectedContainer: null,
                createNewContainer: true,
            }
        }

        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        default:
            return state;
    }
}