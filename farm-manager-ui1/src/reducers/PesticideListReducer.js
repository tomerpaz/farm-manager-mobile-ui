import {
    CLEAR_PESTICIDE_LIST,
    DELETE_PESTICIDE_LIST,
    DELETE_PESTICIDE_LIST_PESTICIDE,
    DUPLICATE_PESTICIDE_LIST,
    GET_PESTICIDE_LIST,
    GET_PESTICIDE_LISTS,
    PESTICIDE_LIST_CREATED,
    PESTICIDE_LIST_PESTICIDE_CREATED,
    PESTICIDE_LIST_PESTICIDE_UPDATED,
    PESTICIDE_LIST_UPDATED,
    SELECT_PESTICIDE_LIST,
    SELECT_PESTICIDE_LIST_PESTICIDE,
    INVALIDATE_USER
} from '../actions/types';


const INITIAL_STATE = {
    selectedPesticideList: null,
    pesticideLists: [],
    selectedPesticideListPesticide: null,
    createNewPesticideList: false,

};
export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_PESTICIDE_LISTS:
            return {
                ...state,
                pesticideLists: action.payload,

            };

        case DELETE_PESTICIDE_LIST: {
            const pesticideLists = state.pesticideLists.filter((e) => e.id !== action.payload);
            return {
                ...state,
                pesticideLists,
                selectedPesticideList: null,
                createNewPesticideList: true,

            };
        }

        case SELECT_PESTICIDE_LIST_PESTICIDE: {
            console.log(action)

            const selectedPesticideListPesticide = action.payload;
            if (selectedPesticideListPesticide && selectedPesticideListPesticide.resource) {
                selectedPesticideListPesticide.selectedResource = {
                    value: selectedPesticideListPesticide.resource.id,
                    label: selectedPesticideListPesticide.resource.name
                }
            }
            return {
                ...state,
                selectedPesticideListPesticide,
            };
        }


        case CLEAR_PESTICIDE_LIST:
            return {
                ...state,
                selectedPesticideList: null,
                createNewPesticideList: true,
            };

        case GET_PESTICIDE_LIST:
        case SELECT_PESTICIDE_LIST:
            return {
                ...state,
                selectedPesticideList: action.payload,
                selectedPesticideListPesticide: null,
                createNewPesticideList: false,

            };

        case DUPLICATE_PESTICIDE_LIST:
        case PESTICIDE_LIST_CREATED:
        case PESTICIDE_LIST_UPDATED:

            const pesticideLists = state.pesticideLists.filter((e) => e.id !== action.payload.id);
            pesticideLists.unshift(action.payload);

            return {
                ...state,
                pesticideLists,
                selectedPesticideList: null,
                selectedPesticideListPesticide: null,
                createNewPesticideList: true,


            };
        case PESTICIDE_LIST_PESTICIDE_CREATED:
        case PESTICIDE_LIST_PESTICIDE_UPDATED:

            const pesticides = state.selectedPesticideList.pesticides.filter((e) => e.id !== action.payload.id);
            pesticides.unshift(action.payload);
            const selectedPesticideList = state.selectedPesticideList;
            selectedPesticideList.pesticides = pesticides;
            return {
                ...state,
                selectedPesticideList,
                selectedPesticideListPesticide: null,
            };

        case DELETE_PESTICIDE_LIST_PESTICIDE: {
            const pesticides = state.selectedPesticideList.pesticides.filter((e) => e.id !== action.payload);
            const selectedPesticideList = state.selectedPesticideList;
            selectedPesticideList.pesticides = pesticides;
            return {
                ...state,
                selectedPesticideList,
                selectedPesticideListPesticide: null,
            };
        }
        default:
            return state;
    }
}