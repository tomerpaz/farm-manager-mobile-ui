import {CLEAR_ACTIVE_INGREDIENT, DELETE_ACTIVE_INGREDIENT, GET_ACTIVE_INGREDIENT, GET_ACTIVE_INGREDIENTS, SELECT_ACTIVE_INGREDIENT, ACTIVE_INGREDIENT_CREATE, ACTIVE_INGREDIENT_UPDATE, INVALIDATE_USER, GET_GLOBAL_DATA} from '../actions/types';

const INITIAL_STATE = {
    activeIngredients: [],
    selectedActiveIngredient: null,
    createNewActiveIngredient: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_ACTIVE_INGREDIENT:
        case SELECT_ACTIVE_INGREDIENT: {
            return {
                ...state,
                selectedActiveIngredient: action.payload,
                createNewActiveIngredient: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_ACTIVE_INGREDIENTS: {
            console.log(action);
            return {
                ...state,
                activeIngredients: action.payload,
            }
        }

        case DELETE_ACTIVE_INGREDIENT: {
            const activeIngredients = state.activeIngredients.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedActiveIngredient: null,
                createNewActiveIngredient: true,
                activeIngredients
            }
        }
        case ACTIVE_INGREDIENT_UPDATE:
        case ACTIVE_INGREDIENT_CREATE: {
            const activeIngredients = state.activeIngredients.filter((e) => e.id !== action.payload.id);
            activeIngredients.push(action.payload);
            return {
                ...state,
                selectedActiveIngredient: null,
                createNewActiveIngredient: true,
                activeIngredients,
            }
        }
        case CLEAR_ACTIVE_INGREDIENT: {
            return {
                ...state,
                selectedActiveIngredient: null,
                createNewActiveIngredient: true,
            }
        }
        default:
            return state;
    }
}