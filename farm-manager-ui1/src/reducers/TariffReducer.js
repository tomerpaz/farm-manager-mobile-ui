import {
    GET_TARIFF,
    SELECT_TARIFF,
    SET_FETCH_TARIFFS,
    TARIFF_CREATED,
    TARIFF_UPDATED,
    CLEAR_TARIFF,
    INVALIDATE_USER,
    DELETE_TARIFF,
    DUPLICATE_TARIFF,
} from '../actions/types';
import {
    ACCESSORY,
    COMPOST,
    CONTRACTOR,
    DISINFECTANT,
    EQUIPMENT,
    FERTILIZER,
    PESTICIDE,
    VARIETY, WATER,
    WATER_SOURCE,
    WORKER,
    WORKER_GROUP,
    
} from "./ResourceReducer";
import {getSuggestionsNameElement} from "../components/core/optionsUtil";
import { newDate } from '../utils';


const INITIAL_STATE = {
    selectedTariff: null,
    fetchTariffs: false,
    createNewTariff: false
};


export const TARIFF_TYPES = [PESTICIDE, FERTILIZER, ACCESSORY, VARIETY, COMPOST, CONTRACTOR, DISINFECTANT, EQUIPMENT, WATER, WORKER, WORKER_GROUP];


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case DUPLICATE_TARIFF:
        case GET_TARIFF:

            const selectedTariff = action.payload;
            if (selectedTariff && selectedTariff.tariffResource) {
                selectedTariff.selectedTariffResource = {
                    value: selectedTariff.tariffResource.id,
                    label: selectedTariff.tariffResource.name
                }
            }

            if (selectedTariff && selectedTariff.tariffResource && selectedTariff.activityDef) {
                selectedTariff.selectedTariffActivityDef = getSuggestionsNameElement(selectedTariff.activityDef,'activityDef');
            }
            if (selectedTariff && selectedTariff.tariffResource && selectedTariff.tariffSecondaryResource) {
                selectedTariff.selectedTariffSecondaryResource = {
                    value: selectedTariff.tariffSecondaryResource.id,
                    label: selectedTariff.tariffSecondaryResource.name
                }
            }

            if (action.type === DUPLICATE_TARIFF){
                selectedTariff.id = null;
                selectedTariff.deletable = false;
                //selectedTariff.effectiveFrom = newDate();
            }
            return {
                ...state,
                selectedTariff,
                fetchTariffs: false,
                createNewTariff: false
            };


        case SELECT_TARIFF:
            return {
                ...state,
                selectedTariff: action.payload,
                createNewTariff: false
            };
        
        case DELETE_TARIFF:
        case TARIFF_CREATED:
        case TARIFF_UPDATED:
            return {
                ...state,
                selectedTariff: null,
                fetchTariffs: true,
                createNewTariff: true

            };
        case SET_FETCH_TARIFFS: {
            return {
                ...state,
                fetchTariffs: action.payload
            };
        }
        case CLEAR_TARIFF: {
            return {
                ...state,
                selectedTariff: null,
                createNewTariff: true
            };
        }
        default:
            return state;
    }
}

