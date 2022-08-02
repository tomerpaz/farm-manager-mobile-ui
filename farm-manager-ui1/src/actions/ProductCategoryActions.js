import {SELECT_PRODUCT_CATEGORY, GET_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, GET_PRODUCT_CATEGORIES, CLEAR_PRODUCT_CATEGORY} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';


const BASE_URL = 'api/food/safety/productcategory/'
export function selectProductCategory(e) {
    return {
        type: SELECT_PRODUCT_CATEGORY,
        payload: e
    };
}

export function clearProductCategory() {
    return {
        type: CLEAR_PRODUCT_CATEGORY,
    };
}

export function saveProductCategory(tag) {
    if(tag.id) {
        return directPut(BASE_URL, tag);
    } else {
        return directPost(BASE_URL,tag);
    }
}


export function deleteProductCategory(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_PRODUCT_CATEGORY);
    };
}

export function getProductCategory(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_PRODUCT_CATEGORY);
    };
}

export function getProductCategories() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_PRODUCT_CATEGORIES);
    };
}