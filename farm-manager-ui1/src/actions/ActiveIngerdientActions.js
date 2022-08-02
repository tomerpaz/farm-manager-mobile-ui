import {SELECT_ACTIVE_INGREDIENT, GET_ACTIVE_INGREDIENT, DELETE_ACTIVE_INGREDIENT, GET_ACTIVE_INGREDIENTS, CLEAR_ACTIVE_INGREDIENT} from './types';
import {directPut, directPost, restDelete, restGet} from './util/RestUtil';


const BASE_URL = 'api/food/safety/activeingredient/'
export function selectActiveIngredient(e) {
    return {
        type: SELECT_ACTIVE_INGREDIENT,
        payload: e
    };
}

export function clearActiveIngredient() {
    return {
        type: CLEAR_ACTIVE_INGREDIENT,
    };
}

export function saveActiveIngredient(tag) {
    if(tag.id) {
        return directPut(BASE_URL, tag);
    } else {
        return directPost(BASE_URL,tag);
    }
}


export function deleteActiveIngredient(id) {
    return function (dispatch) {
        restDelete(`${BASE_URL}${id}`, dispatch, DELETE_ACTIVE_INGREDIENT);
    };
}

export function getActiveIngredient(id) {
    return function (dispatch) {
        restGet(`${BASE_URL}${id}`, dispatch,GET_ACTIVE_INGREDIENT);
    };
}

export function getActiveIngredients() {
    return function (dispatch) {
        restGet(`${BASE_URL}`, dispatch,GET_ACTIVE_INGREDIENTS);
    };
}