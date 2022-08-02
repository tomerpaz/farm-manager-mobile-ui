import {
    CLEAR_MAINTENANCE,
    DELETE_MAINTENANCE,
    DUPLICATE_MAINTENANCE,
    GET_MAINTENANCE,
    MAINTENANCE_CREATED,
    MAINTENANCE_UPDATED,
    SELECT_MAINTENANCE,
    SET_FETCH_MAINTENANCE,
    INVALIDATE_USER,
} from '../actions/types';
import {getSuggestionsNameElement} from "../components/core/optionsUtil";
import { newDate } from '../utils';


const INITIAL_STATE = {
    selectedMaintenance: null,
    fetchMaintenance: false,
    createNewMaintenance : false,
};



export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case DUPLICATE_MAINTENANCE:
        case GET_MAINTENANCE: {
            const selectedMaintenance = action.payload;
            if (selectedMaintenance && selectedMaintenance.equipment) {
                selectedMaintenance.selectedEquipment = getSuggestionsNameElement(selectedMaintenance.equipment,'resource');
                selectedMaintenance.equipment = null;
            }

            if (selectedMaintenance && selectedMaintenance.executor) {
                selectedMaintenance.selectedExecutor = getSuggestionsNameElement(selectedMaintenance.executor,'resource');
                selectedMaintenance.executor = null;


            }
            if (action.type === DUPLICATE_MAINTENANCE){
                selectedMaintenance.id = null;
                selectedMaintenance.deletable = false;
                selectedMaintenance.date = newDate();
            }

            return {
                ...state,
                selectedMaintenance,
                fetchMaintenance: false,
                createNewMaintenance: false,

            };
        }
        case DELETE_MAINTENANCE: {
            return {
                ...state,
                selectedMaintenance: null,
                fetchMaintenance: true,
                createNewMaintenance: true,
            };
        }
        case SELECT_MAINTENANCE:
            return {
                ...state,
                selectedMaintenance: action.payload,
                createNewMaintenance: false,
            };
        case CLEAR_MAINTENANCE:
            return {
                ...state,
                selectedMaintenance: null,
                createNewMaintenance: true,
            };
        case MAINTENANCE_CREATED:
        case MAINTENANCE_UPDATED:
            return {
                ...state,
                selectedMaintenance: null,
                fetchMaintenance: true,
                createNewMaintenance: true,

            };
        case SET_FETCH_MAINTENANCE: {
            return {
                ...state,
                fetchMaintenance: action.payload
            };
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

