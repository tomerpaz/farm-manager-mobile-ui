import {CLEAR_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, GET_PRODUCT_CATEGORY, GET_PRODUCT_CATEGORIES, SELECT_PRODUCT_CATEGORY, PRODUCT_CATEGORY_CREATE, PRODUCT_CATEGORY_UPDATE, INVALIDATE_USER, GET_GLOBAL_DATA} from '../actions/types';

const INITIAL_STATE = {
    productCategories: [],
    selectedProduceCategory: null,
    createNewProductCategory: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_PRODUCT_CATEGORY:
        case SELECT_PRODUCT_CATEGORY: {
            return {
                ...state,
                selectedProduceCategory: action.payload,
                createNewProductCategory: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_PRODUCT_CATEGORIES: {
            return {
                ...state,
                productCategories: action.payload,
            }
        }

        case DELETE_PRODUCT_CATEGORY: {
            const productCategories = state.productCategories.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedProduceCategory: null,
                createNewProductCategory: true,
                productCategories
            }
        }
        case PRODUCT_CATEGORY_UPDATE:
        case PRODUCT_CATEGORY_CREATE: {
            const productCategories = state.productCategories.filter((e) => e.id !== action.payload.id);
            productCategories.push(action.payload);
            return {
                ...state,
                selectedProduceCategory: null,
                createNewProductCategory: true,
                productCategories,
            }
        }
        case CLEAR_PRODUCT_CATEGORY: {
            return {
                ...state,
                selectedProduceCategory: null,
                createNewProductCategory: true,
            }
        }
        default:
            return state;
    }
}