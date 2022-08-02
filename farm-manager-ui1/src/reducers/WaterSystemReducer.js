import {
    GET_WATER_SYS,
    CLEAR_WATER_SYS,
    UPDATE_VALVE,
    WATER_SYS_CONFIG_CREATE,
    WATER_SYS_CONFIG_UPDATE,
    DELETE_WATER_SYS_CONFIG,
    SYNC_WATER_SYS,
    INVALIDATE_USER,
    VALVE_DELETED,
    VALVE_DUPLICATED,
    GET_FERTILIZER_HUBS,GET_FERTILIZER_HUB,SELECT_FERTILIZER_HUB,DELETE_FERTILIZER_HUB, FERTILIZER_CREATED, CLEAR_FERTILIZER_HUB, 
    FERTILIZER_HUB_CREATED, FERTILIZER_HUB_UPDATED, LIST_WATER_SYS_ACCOUNTS, FERTILIZER_HUB_VALVES_UPDATED, SELECT_VALVE,
    SET_ACTIVE_VALVES,

} from '../actions/types';
import {getSuggestionsNameElement, tableSuggestionsAliasIdPrefix} from "../components/core/optionsUtil";


const INITIAL_STATE = {
    waterSystem: null,
    fertilizerHubs: [],
    selectedFertilizerHub: null,
    createNewFertilizerHub: false,
    waterSysAccounts: [],
    selectedValve: null,
    activeValves: 'all',
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }

        case GET_FERTILIZER_HUBS: {
            return {
                ...state,
                fertilizerHubs: action.payload,
            };
        }
        
        case SET_ACTIVE_VALVES: {
            return {
                ...state,
                activeValves: action.payload,
            };
        }
        case SELECT_VALVE: {
            return {
                ...state,
                selectedValve: action.payload,
            };
        }
        

        case LIST_WATER_SYS_ACCOUNTS: {
            return {
                ...state,
                waterSysAccounts: action.payload,
            };
        }

        case SELECT_FERTILIZER_HUB:
        case GET_FERTILIZER_HUB: {
            return {
                ...state,
                selectedFertilizerHub: action.payload,
                createNewFertilizerHub: false,
            };
        }

        case FERTILIZER_HUB_CREATED:
        case FERTILIZER_HUB_UPDATED: {
            const fertilizerHubs = state.fertilizerHubs.filter((e) => e.id !== action.payload.id);
            fertilizerHubs.unshift(action.payload);
            return {
                ...state,
                fertilizerHubs,
                selectedFertilizerHub: null,
                createNewFertilizerHub: true,
            }
        }
        case DELETE_FERTILIZER_HUB: {
            const fertilizerHubs = state.fertilizerHubs.filter((e) => e.id !== action.payload);
            return {
                ...state,
                fertilizerHubs,
                selectedFertilizerHub: null,
                createNewFertilizerHub: true,
            }
        }
        case CLEAR_FERTILIZER_HUB: {
            return {
                ...state,
                selectedFertilizerHub: null,
                createNewFertilizerHub: true,
            }
        }


        case VALVE_DUPLICATED : 
        {
            const waterSystem = state.waterSystem;
            if( waterSystem && waterSystem.valves) {
                const valves = waterSystem.valves;
                valves.push(action.payload);
            }
            return {
                ...state,
                ...waterSystem
            };
        }
        case VALVE_DELETED : {
            const waterSystem = state.waterSystem;
            if( waterSystem && waterSystem.valves) {
                waterSystem.valves = waterSystem.valves.filter(e => e.id !== action.payload );
            }
            return {
                ...state,
                ...waterSystem
            };
        }

        case GET_WATER_SYS:
        case SYNC_WATER_SYS: {
            const waterSystem = action.payload;
            if( waterSystem && waterSystem.valves) {
                const valves = waterSystem.valves;
                valves.forEach(e=>{
                    if(e.domain) {
                        e.domain.name = e.domain.field.name;
                        e.selectedDomainOption = getSuggestionsNameElement(e.domain, 'domain');
                    }
                })
            }

            return {
                ...state,
                waterSystem: action.payload,
            }
        }
        case CLEAR_WATER_SYS: {
            return {
                ...state,
                waterSystem: null,
                selectedValve: null,
            }
        }


        case UPDATE_VALVE: {

            const updatedValve = action.payload;
            if(updatedValve.domain) {
                updatedValve.domain.name = updatedValve.domain.field.name;;
                updatedValve.selectedDomainOption = getSuggestionsNameElement(updatedValve.domain, 'domain');
            }
            const valves = state.waterSystem.valves
                .map(e => e.id === updatedValve.id ? updatedValve : e );
            const waterSystem = state.waterSystem;
            waterSystem.valves = valves;
            return {
                ...state,
                waterSystem,
            }
        }

        case DELETE_WATER_SYS_CONFIG: {

            const config = state.waterSystem.config.filter((site) => site.id !== action.payload);
            const waterSystem = state.waterSystem;
            waterSystem.config = config;
            return {
                ...state,
                waterSystem,
            }
        }
        case WATER_SYS_CONFIG_CREATE:
        case WATER_SYS_CONFIG_UPDATE: {
            const config = state.waterSystem.config.filter((site) => site.id !== action.payload);
            config.unshift(action.payload);
            const waterSystem = state.waterSystem;
            waterSystem.config = config;

            return {
                ...state,
                waterSystem,
            }
        }

        default:
            return state;
    }
}