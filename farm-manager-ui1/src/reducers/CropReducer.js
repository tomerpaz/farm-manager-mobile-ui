import {
    GET_CROPS, GET_CROP, SELECT_CROP, CROP_CREATED, CROP_UPDATED, DELETE_CROP, INVALIDATE_USER, CLEAR_CROP
} from '../actions/types';


const INITIAL_STATE = {
    crops: [],
    selectedCrop: null,
    createNewCrop: false,

};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case GET_CROPS: {
            return {
                ...state,
                crops: action.payload,
            }
        }
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            }
        }
        case GET_CROP:
        case SELECT_CROP: {
            const selectedCrop = action.payload;
            if(selectedCrop && selectedCrop.substance) {
                selectedCrop.selectedCropOption = {value: selectedCrop.substance.id, label: selectedCrop.substance.name}
            }

            return {
                ...state,
                selectedCrop,
                createNewCrop: false,

            }
        }

        case CROP_CREATED:
        case CROP_UPDATED: {
            const crops = state.crops.filter((e) => e.id !== action.payload.id);
            crops.unshift(action.payload);
            return {
                ...state,
                crops,
                selectedCrop: null,
                createNewCrop: true,
            }
        }
        case DELETE_CROP: {
            const crops = state.crops.filter((e) => e.id !== action.payload);
            return {
                ...state,
                crops,
                selectedCrop: null,
                createNewCrop: true,
            }
        }
        case CLEAR_CROP: {
            return {
                ...state,
                selectedCrop: null,
                createNewCrop: true,
            }
        }
        default:
            return state;
    }
}