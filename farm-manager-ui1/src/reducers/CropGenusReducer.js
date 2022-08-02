import {CLEAR_CROP_GENUS, DELETE_CROP_GENUS, GET_CROP_GENUS, GET_CROP_GENUSES, SELECT_CROP_GENUS, CROP_GENUS_CREATE, CROP_GENUS_UPDATE, INVALIDATE_USER, GET_GLOBAL_DATA} from '../actions/types';

const INITIAL_STATE = {
    cropGenuses: [],
    selectedCropGenus: null,
    createNewCropGenus: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_CROP_GENUS:
        case SELECT_CROP_GENUS: {
            return {
                ...state,
                selectedCropGenus: action.payload,
                createNewCropGenus: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_CROP_GENUSES: {
            return {
                ...state,
                cropGenuses: action.payload,
            }
        }

        case DELETE_CROP_GENUS: {
            const cropGenuses = state.cropGenuses.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedCropGenus: null,
                createNewCropGenus: true,
                cropGenuses
            }
        }
        case CROP_GENUS_UPDATE:
        case CROP_GENUS_CREATE: {
            const cropGenuses = state.cropGenuses.filter((e) => e.id !== action.payload.id);
            cropGenuses.push(action.payload);
            return {
                ...state,
                selectedCropGenus: null,
                createNewCropGenus: true,
                cropGenuses,
            }
        }
        case CLEAR_CROP_GENUS: {
            return {
                ...state,
                selectedCropGenus: null,
                createNewCropGenus: true,
            }
        }
        default:
            return state;
    }
}