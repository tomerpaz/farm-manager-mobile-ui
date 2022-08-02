import {
    GET_CUSTOMER_AND_SUPPLIERS, GET_CUSTOMER_OR_SUPPLIER, SELECT_CUSTOMER_OR_SUPPLIER, DELETE_CUSTOMER_OR_SUPPLIER,
    GET_EXECUTORS, GET_EXECUTOR, SELECT_EXECUTOR, DELETE_EXECUTOR,
    GET_EQUIPMENTS, GET_EQUIPMENT, SELECT_EQUIPMENT, DELETE_EQUIPMENT,
    GET_VARIETIES, GET_VARIETY, SELECT_VARIETY, DELETE_VARIETY,
    GET_FERTILIZERS, GET_FERTILIZER, SELECT_FERTILIZER, DELETE_FERTILIZER,
    GET_WATER_SOURCES, GET_WATER_SOURCE, SELECT_WATER_SOURCE, DELETE_WATER_SOURCE,
    GET_PRODUCTS, GET_PRODUCT, SELECT_PRODUCT, DELETE_PRODUCT,
    GET_PESTICIDES, GET_PESTICIDE, SELECT_PESTICIDE, DELETE_PESTICIDE,
    GET_ACCESSORIES, GET_ACCESSORY, SELECT_ACCESSORY, DELETE_ACCESSORY,
    GET_COMPOSTS, GET_COMPOST, SELECT_COMPOST, DELETE_COMPOST,
    GET_DISINFECTANTS, GET_DISINFECTANT, SELECT_DISINFECTANT, DELETE_DISINFECTANT,
    GET_BASE_CROPS, GET_BASE_CROP, SELECT_BASE_CROP, DELETE_BASE_CROP, CLEAR_RESOURCE, WATER_SOURCE_CREATED,
    EQUIPMENT_CREATED, EXECUTOR_CREATED, ACCESSORY_CREATED,
    GET_FIELD_IN_PRODUCTS,
    GET_ENERGIES, GET_FIELD_IN_CUTIVARS, DELETE_INGREDIENT, GET_INGREDIENTS, GET_INGREDIENT, SELECT_INGREDIENT

} from './types';
import {directPut, directPost, restDelete, restGet, restPost} from './util/RestUtil';
import {ACCESSORY, EQUIPMENT, EXECUTOR_TYPES, WATER} from "../reducers/ResourceReducer";
import { asLocalDate } from '../utils';


const BASE_URL = 'api/resources/'

export function saveResource(resource) {
    resource.date1 = asLocalDate(resource.date1, true)
    resource.date2 = asLocalDate(resource.date2, true)

    if(resource.id) {
        return directPut(BASE_URL, resource);
    } else {
        return directPost(BASE_URL,resource);
    }
}

function getActionType(resourceType){
    if(resourceType === WATER) {
        return WATER_SOURCE_CREATED;
    } else if(resourceType === EQUIPMENT) {
        return EQUIPMENT_CREATED;
    } else if(EXECUTOR_TYPES.includes(resourceType)) {
        return EXECUTOR_CREATED;
    } else if(resourceType === ACCESSORY) {
        return ACCESSORY_CREATED;
    }
}
export function quickSaveResource(resource) {
    const actionType = getActionType(resource.type);
    if(actionType){
        return function (dispatch) {
            restPost(`${BASE_URL}`,resource, dispatch, actionType);
        };
    } else {
        console.log('no quickSaveResource support for: ', resource)
    }
}

export function clearResource(value) {
    return {
        type: CLEAR_RESOURCE,
        payload: value,
    };
}

//------- CUSTOMER & SUPPLIER  --------
export function deleteCustomerOrSupplier(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_CUSTOMER_OR_SUPPLIER);
    };
}

export function getCustomersAndSuppliers() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/CUSTOMER,SUPPLIER`, dispatch,GET_CUSTOMER_AND_SUPPLIERS);
    };
}
export function getCustomerOrSupplier(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_CUSTOMER_OR_SUPPLIER);
    };
}

export function selectCustomerOrSupplier(resource) {
    return {
        type: SELECT_CUSTOMER_OR_SUPPLIER,
        payload: resource
    };
}


//------- EXECUTORS  --------
export function deleteExecutor(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_EXECUTOR);
    };
}

export function getExecutors() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/CONTRACTOR,WORKER,WORKER_GROUP`, dispatch,GET_EXECUTORS);
    };
}
export function getExecutor(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_EXECUTOR);
    };
}

export function selectExecutor(resource) {
    return {
        type: SELECT_EXECUTOR,
        payload: resource
    };
}
//--------------------------------
//------- EQUIPMENTS  --------
export function deleteEquipment(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_EQUIPMENT);
    };
}

export function getEquipments() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/EQUIPMENT`, dispatch,GET_EQUIPMENTS);
    };
}
export function getEquipment(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_EQUIPMENT);
    };
}

export function selectEquipment(resource) {
    return {
        type: SELECT_EQUIPMENT,
        payload: resource
    };
}
//--------------------------------
//------- VARIETIES  --------
export function deleteVariety(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_VARIETY);
    };
}

export function getVarieties() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/VARIETY`, dispatch,GET_VARIETIES);
    };
}
export function getVariety(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_VARIETY);
    };
}

export function selectVariety(resource) {
    return {
        type: SELECT_VARIETY,
        payload: resource
    };
}
//--------------------------------
//------- FERTILIZERS  --------
export function deleteFertilizer(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_FERTILIZER);
    };
}

export function getFertilizers() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/FERTILIZER`, dispatch,GET_FERTILIZERS);
    };
}
export function getFertilizer(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_FERTILIZER);
    };
}

export function selectFertilizer(resource) {
    return {
        type: SELECT_FERTILIZER,
        payload: resource
    };
}
//--------------------------------
//------- WATER_SOURCES  --------
export function deleteWaterSource(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_WATER_SOURCE);
    };
}

export function getWaterSources() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/WATER`, dispatch,GET_WATER_SOURCES);
    };
}
export function getWaterSource(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_WATER_SOURCE);
    };
}

export function selectWaterSource(resource) {
    return {
        type: SELECT_WATER_SOURCE,
        payload: resource
    };
}
//--------------------------------
//------- PRODUCTS  --------
export function deleteProduct(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_PRODUCT);
    };
}

export function getProducts() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/PRODUCT`, dispatch,GET_PRODUCTS);
    };
}
export function getProduct(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_PRODUCT);
    };
}

export function selectProduct(resource) {
    return {
        type: SELECT_PRODUCT,
        payload: resource
    };
}
//--------------------------------
//------- PESTICIDES  --------
export function deletePesticide(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_PESTICIDE);
    };
}

export function getPesticides() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/PESTICIDE`, dispatch,GET_PESTICIDES);
        restGet(`${BASE_URL}fieldin/products`, dispatch,GET_FIELD_IN_PRODUCTS);

    };
}
export function getPesticide(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_PESTICIDE);
    };
}

export function selectPesticide(resource) {
    return {
        type: SELECT_PESTICIDE,
        payload: resource
    };
}
//--------------------------------
//------- ACCESSORIES  --------
export function deleteAccessory(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_ACCESSORY);
    };
}

export function getAccessories() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/ACCESSORY`, dispatch,GET_ACCESSORIES);
    };
}
export function getAccessory(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_ACCESSORY);
    };
}

export function selectAccessory(resource) {
    return {
        type: SELECT_ACCESSORY,
        payload: resource
    };
}
//--------------------------------
//------- BASE_CROP  --------
export function deleteBaseCrop(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_BASE_CROP);
    };
}
export function getBaseCrops() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/CROP`, dispatch,GET_BASE_CROPS);
    };
}
export function getBaseCrop(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_BASE_CROP);
    };
}


export function selectBaseCrop(resource) {
    return {
        type: SELECT_BASE_CROP,
        payload: resource
    };
}
//--------------------------------
//------- BASE_COMPOST  --------
export function deleteCompost(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_COMPOST);
    };
}
export function getComposts() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/COMPOST`, dispatch,GET_COMPOSTS);
    };
}
export function getCompost(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_COMPOST);
    };
}

export function selectCompost(resource) {
    return {
        type: SELECT_COMPOST,
        payload: resource
    };
}
//--------------------------------
//------- INGREDIENT  --------
export function deleteIngredient(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_INGREDIENT);
    };
}
export function getIngredients() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/INGREDIENT`, dispatch,GET_INGREDIENTS);
    };
}
export function getIngredient(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_INGREDIENT);
    };
}

export function selectIngredient(resource) {
    return {
        type: SELECT_INGREDIENT,
        payload: resource
    };
}
//--------------------------------

//------- BASE_COMPOST  --------
export function deleteDisinfectant(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_DISINFECTANT);
    };
}
export function getDisinfectants() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/DISINFECTANT`, dispatch,GET_DISINFECTANTS);
    };
}
export function getDisinfectant(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_DISINFECTANT);
    };
}

export function selectDisinfectant(resource) {
    return {
        type: SELECT_DISINFECTANT,
        payload: resource
    };
}
//--------------------------------

export function getEnergies() {
    return function (dispatch) {
        restGet(`${BASE_URL}type/ENERGY`, dispatch,GET_ENERGIES);
    };
}


export function getFieldInCultivars(cropId){
    return function (dispatch) {
        restGet(`${BASE_URL}fieldin/cultivars/${cropId}`, dispatch,GET_FIELD_IN_CUTIVARS);
    };
}