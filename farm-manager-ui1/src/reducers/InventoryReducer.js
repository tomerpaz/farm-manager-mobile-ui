import {
    DELETE_INVENTORY_UPDATE,
    GET_INVENTORY,
    GET_INVENTORY_UPDATE,
    INVENTORY_UPDATE_CREATED,
    INVENTORY_UPDATE_UPDATED,
    SELECT_INVENTORY_UPDATE,
    SET_FETCH_INVENTORY_UPDATE,
    CLEAR_INVENTORY_UPDATE,
    INVALIDATE_USER,
    GET_STOCK_MOVEMENTS,
} from '../actions/types';
import {ACCESSORY, FERTILIZER, PESTICIDE, VARIETY} from "./ResourceReducer";
import { getSuggestionsNameElement } from '../components/core';


const INITIAL_STATE = {
    selectedInventoryUpdate: null,
    fetchInventoryUpdate: false,
    inventory: [],
    stockMovments: [],
    createNewInventoryUpdate: false,


};

export const INVENTORY_TYPES = [PESTICIDE, FERTILIZER, ACCESSORY, VARIETY]

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_INVENTORY_UPDATE:
        case SELECT_INVENTORY_UPDATE: {
            // console.log(action)
            const record = action.payload;
            if (record) {
                record.resourceType = ''
                record.selectedWarehouse = ''
                if (record.resource) {
                    record.selectedResource = getSuggestionsNameElement(record.resource, 'reource');
                    record.resourceType = record.resource.type;

                }
                if (record.warehouse) {
                    record.selectedWarehouse = record.warehouse.id
                }
            }


            return {
                ...state,
                selectedInventoryUpdate: record,
                createNewInventoryUpdate: false,
                fetchInventoryUpdate: false,
            }
        }

        case GET_INVENTORY: {
            const inventoryFlat = action.payload;
            inventoryFlat.forEach(e =>{
                e.resourceName = e.resource.name;
                e.resourceType = e.resource.type;
                e.warehouseName = e.warehouse.name;
            })
            return {
                ...state,
                inventory: inventoryFlat,
            }
        }

        case GET_STOCK_MOVEMENTS: {
            
            return {
                ...state,
                stockMovments: action.payload,
            }
        }
        case DELETE_INVENTORY_UPDATE: {
            return {
                ...state,
                selectedInventoryUpdate: null,
                fetchInventoryUpdate: true,
                createNewInventoryUpdate: true,
            }
        }
        case INVENTORY_UPDATE_CREATED:
        case INVENTORY_UPDATE_UPDATED: {
            console.log(action);
            return {
                ...state,
                selectedInventoryUpdate: null,
                fetchInventoryUpdate: true,
                createNewInventoryUpdate: true,
            }
        }
        case SET_FETCH_INVENTORY_UPDATE: {
            return {
                ...state,
                fetchInventoryUpdate: action.payload,
            }

        }
        case CLEAR_INVENTORY_UPDATE: {
            return {
                ...state,
                selectedInventoryUpdate: null,
                createNewInventoryUpdate: true,
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