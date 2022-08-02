import {GET_FILES, UPLOAD_FILES,UPLOAD_FILE, UPLOADING, DELETE_FILE, MOVE_FILE, INVALIDATE_USER, IMPORT_FILE} from '../actions/types';


const INITIAL_STATE = {
    files: [],
    uploading: false,
    fetchFiles: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case GET_FILES: {
            return {
                ...state,
                files: action.payload,
                uploading: false,
                fetchFiles: false,
            }
        }

        case IMPORT_FILE:{
            return {
                ...state,
                uploading: false,
            }
        }
        case UPLOAD_FILES: {
            const files = action.payload.concat(state.files)
            return {
                ...state,
                uploading: false,
                files,
            }
        }
        case UPLOAD_FILE: {
            return {
                ...state,
                uploading: false,
            }
        }
        case MOVE_FILE:{
            // console.log(action)
            // const files = state.files.filter((file) => file.id !== action.payload.id);
            // files.push(action.payload);
            return {
                ...state,
                fetchFiles: true,
            }
        }
        case DELETE_FILE: {
            const files = state.files.filter((file) => file.id !== action.payload);
            return {
                ...state,
                uploading: false,
                files
            }
        }
        case UPLOADING: {
            return {
                ...state,
                uploading: true,
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