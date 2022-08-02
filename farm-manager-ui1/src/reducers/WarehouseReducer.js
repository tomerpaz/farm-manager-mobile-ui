import {
    GET_WAREHOUSES,
    GET_WAREHOUSE,
    SELECT_WAREHOUSE,
    WAREHOUSE_CREATED,
    WAREHOUSE_UPDATED,
    DELETE_WAREHOUSE,
    GET_GLOBAL_DATA, CLEAR_WAREHOUSE, INVALIDATE_USER
} from '../actions/types';


const INITIAL_STATE = {
    warehouses: [],
    selectedWarehouse: null,
    defaultWarehouse: null,
    createNewWarehouse: true,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_GLOBAL_DATA: {
            return {
                ...state,
                defaultWarehouse: action.payload.user.warehouse,
            }
        }
        case GET_WAREHOUSES: {
            return {
                ...state,
                warehouses: action.payload,
                createNewWarehouse: false,

            }
        }
        case GET_WAREHOUSE:
        case SELECT_WAREHOUSE: {
            return {
                ...state,
                selectedWarehouse: action.payload,
                createNewWarehouse: false,
            }
        }


        case DELETE_WAREHOUSE: {
            const warehouses = state.warehouses.filter((e) => e.id !== action.payload);
            let defaultWarehouse = state.defaultWarehouse;
            if(state.defaultWarehouse && state.defaultWarehouse.id === action.payload){
                defaultWarehouse = null;
            }
            return {
                ...state,
                selectedWarehouse: null,
                createNewWarehouse: true,
                defaultWarehouse,
                warehouses
            }
        }
        case WAREHOUSE_CREATED:
        case WAREHOUSE_UPDATED: {

            const warehouses = state.warehouses.filter((e) => e.id !== action.payload.id);
            let defaultWarehouse = state.defaultWarehouse;

            if(action.payload.defaultWarehouse === true){
                defaultWarehouse = action.payload;
            }

            warehouses.unshift(action.payload);
            return {
                ...state,
                selectedWarehouse: null,
                createNewWarehouse: true,
                warehouses,
                defaultWarehouse,
            }
        }
        case CLEAR_WAREHOUSE: {
            return {
                ...state,
                selectedWarehouse: null,
                createNewWarehouse: true,
            }
        }
        default:
            return state;
    }
}