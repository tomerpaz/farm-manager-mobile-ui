import {
    CUSTOMER_OR_SUPPLIER_CREATED,
    CUSTOMER_OR_SUPPLIER_UPDATED,
    DELETE_CUSTOMER_OR_SUPPLIER, DELETE_EXECUTOR,
    EXECUTOR_CREATED,
    EXECUTOR_UPDATED,
    GET_CUSTOMER_AND_SUPPLIERS,
    GET_CUSTOMER_OR_SUPPLIER, GET_EXECUTOR, GET_EXECUTORS,
    INVALIDATE_USER,
    SELECT_CUSTOMER_OR_SUPPLIER,
    SELECT_EXECUTOR,
    GET_EQUIPMENTS, GET_EQUIPMENT, SELECT_EQUIPMENT, DELETE_EQUIPMENT, EQUIPMENT_CREATED, EQUIPMENT_UPDATED,
    GET_VARIETIES, GET_VARIETY, SELECT_VARIETY, DELETE_VARIETY, VARIETY_CREATED, VARIETY_UPDATED,
    GET_FERTILIZERS, GET_FERTILIZER, SELECT_FERTILIZER, DELETE_FERTILIZER, FERTILIZER_CREATED, FERTILIZER_UPDATED,
    GET_WATER_SOURCES, GET_WATER_SOURCE, SELECT_WATER_SOURCE, DELETE_WATER_SOURCE, WATER_SOURCE_CREATED,
    WATER_SOURCE_UPDATED,
    GET_PRODUCTS, GET_PRODUCT, SELECT_PRODUCT, DELETE_PRODUCT, PRODUCT_CREATED, PRODUCT_UPDATED,
    GET_PESTICIDES, GET_PESTICIDE, SELECT_PESTICIDE, DELETE_PESTICIDE, PESTICIDE_CREATED, PESTICIDE_UPDATED,
    GET_ACCESSORIES, GET_ACCESSORY, SELECT_ACCESSORY, DELETE_ACCESSORY, ACCESSORY_CREATED, ACCESSORY_UPDATED,
    GET_COMPOSTS, GET_COMPOST, SELECT_COMPOST, DELETE_COMPOST, COMPOST_CREATED, COMPOST_UPDATED,
    GET_INGREDIENTS, GET_INGREDIENT, SELECT_INGREDIENT, DELETE_INGREDIENT, INGREDIENT_CREATED, INGREDIENT_UPDATED,

    GET_DISINFECTANTS, GET_DISINFECTANT, SELECT_DISINFECTANT, DELETE_DISINFECTANT, DISINFECTANT_CREATED,
    DISINFECTANT_UPDATED,
    GET_BASE_CROPS, GET_BASE_CROP, SELECT_BASE_CROP, DELETE_BASE_CROP, CROP_BASE_CREATED, CROP_BASE_UPDATED,
    CLEAR_RESOURCE, GET_ENERGIES, GET_FIELD_IN_CUTIVARS

} from '../actions/types';


export const CUSTOMER = 'CUSTOMER';
export const SUPPLIER = 'SUPPLIER';
export const WORKER = 'WORKER';
export const CONTRACTOR = 'CONTRACTOR';
export const WORKER_GROUP = 'WORKER_GROUP';
export const EQUIPMENT = 'EQUIPMENT';
export const FERTILIZER = 'FERTILIZER';
export const ACCESSORY = 'ACCESSORY';
export const VARIETY = 'VARIETY';
export const DISINFECTANT = 'DISINFECTANT';
export const COMPOST = 'COMPOST';
export const PESTICIDE = 'PESTICIDE';
export const WATER = 'WATER';
export const PRODUCT = 'PRODUCT';
export const WATER_SOURCE = 'WATER_SOURCE';
export const CROP = 'CROP';
export const ENERGY = 'ENERGY';
export const INGREDIENT = 'INGREDIENT';


export const EXECUTOR_TYPES = [WORKER, CONTRACTOR, WORKER_GROUP];
export const DISABLED_BY_PRIME_CONTRACTOR = [WORKER, EQUIPMENT, WORKER_GROUP];

const INITIAL_STATE = {
    equipment: [],
    executors: [],
    substances: [],
    varieties: [],
    customers: [],
    products: [],
    suppliers: [],
    pesticides: [],
    accessories: [],
    waterSources: [],
    composts: [],
    disinfectants: [],
    crops: [],
    baseCrops: [],
    fertilizers: [],
    defaultProduct: null,
    selectedCustomerOrSupplier: null,
    selectedExecutor: null,
    selectedEquipment: null,
    selectedVariety: null,
    selectedFertilizer: null,
    selectedWaterSource: null,
    selectedProduct: null,
    selectedPesticide: null,
    selectedAccessory: null,
    selectedCompost: null,
    selectedDisinfectant: null,
    selectedBaseCrop: null,
    createNewResource: false,
    energies: [],
    fieldInCultivars: [],
    ingredients: [],
    selectedIngredient: null,



};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE

            };
        }
        case GET_CUSTOMER_AND_SUPPLIERS: {
            return {
                ...state,
                customers: action.payload.filter((e) => e.type === CUSTOMER),
                suppliers: action.payload.filter((e) => e.type === SUPPLIER),

            };
        }
        case GET_CUSTOMER_OR_SUPPLIER: {
            return {
                ...state,
                selectedCustomerOrSupplier: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_CUSTOMER_OR_SUPPLIER: {
            const customers = state.customers.filter((customer) => customer.id !== action.payload);
            const suppliers = state.suppliers.filter((supplier) => supplier.id !== action.payload);

            return {
                ...state,
                customers,
                suppliers,
                selectedCustomerOrSupplier: null,
                createNewResource: true,

            };
        }

        case CUSTOMER_OR_SUPPLIER_UPDATED:
        case CUSTOMER_OR_SUPPLIER_CREATED: {
            const customers = state.customers.filter((customer) => customer.id !== action.payload.id);
            if (action.payload.type === CUSTOMER) {
                customers.unshift(action.payload);
            }
            const suppliers = state.suppliers.filter((supplier) => supplier.id !== action.payload.id);
            if (action.payload.type === SUPPLIER) {
                suppliers.unshift(action.payload);
            }
            return {
                ...state,
                suppliers: suppliers,
                customers: customers,
                selectedCustomerOrSupplier: null,
                createNewResource: true,

            }
        }

        case SELECT_CUSTOMER_OR_SUPPLIER: {
            return {
                ...state,
                selectedCustomerOrSupplier: action.payload,
                createNewResource: false,
            };
        }
        //------------ EXECUTORS -----------------

        case GET_EXECUTORS: {
            return {
                ...state,
                executors: action.payload,
            };
        }
        case GET_EXECUTOR: {
            return {
                ...state,
                selectedExecutor: action.payload,
                createNewResource: false,

            };
        }

        case DELETE_EXECUTOR: {
            const executors = state.executors.filter((executor) => executor.id !== action.payload);
            return {
                ...state,
                executors,
                selectedExecutor: null,
                createNewResource: true,
            };
        }
        case SELECT_EXECUTOR: {
            return {
                ...state,
                selectedExecutor: action.payload,
                createNewResource: false,
            };
        }
        case EXECUTOR_UPDATED:
        case EXECUTOR_CREATED: {
            const executors = state.executors.filter((executor) => executor.id !== action.payload.id);
            executors.unshift(action.payload);
            return {
                ...state,
                executors,
                selectedExecutor: null,
                createNewResource: true,

            }
        }
        //------------ EXECUTORS END -----------------


        //------------ EQUIPMENT -----------------

        case GET_EQUIPMENTS: {
            return {
                ...state,
                equipment: action.payload,
            };
        }
        case GET_EQUIPMENT: {
            return {
                ...state,
                selectedEquipment: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_EQUIPMENT: {
            const equipment = state.equipment.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                equipment,
                selectedEquipment: null,
                createNewResource: true,

            };
        }
        case SELECT_EQUIPMENT: {
            return {
                ...state,
                selectedEquipment: action.payload,
                createNewResource: false,
            };
        }
        case EQUIPMENT_UPDATED:
        case EQUIPMENT_CREATED: {
            const equipment = state.equipment.filter((entity) => entity.id !== action.payload.id);
            equipment.unshift(action.payload);
            return {
                ...state,
                equipment,
                selectedEquipment: null,
                createNewResource: true,

            }
        }
        //------------ EXECUTORS END -----------------
        //------------ VARIETIES -----------------

        case GET_VARIETIES: {
            return {
                ...state,
                varieties: action.payload,
            };
        }
        case GET_VARIETY: {
            return {
                ...state,
                selectedVariety: action.payload,
                createNewResource: false,

            };
        }

        case DELETE_VARIETY: {
            const varieties = state.varieties.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                varieties,
                selectedVariety: null,
                createNewResource: true,

            };
        }
        case SELECT_VARIETY: {
            return {
                ...state,
                selectedVariety: action.payload,
                createNewResource: false,
            };
        }
        case VARIETY_UPDATED:
        case VARIETY_CREATED: {
            const varieties = state.varieties.filter((entity) => entity.id !== action.payload.id);
            varieties.unshift(action.payload);
            return {
                ...state,
                varieties,
                selectedVariety: null,
                createNewResource: true,

            }
        }
        //------------ VARIETIES END -----------------
        //------------ FERTILIZERS -----------------

        case GET_FERTILIZERS: {
            return {
                ...state,
                fertilizers: action.payload,
            };
        }
        case GET_FERTILIZER: {

            return {
                ...state,
                selectedFertilizer: action.payload,
                createNewResource: false,

            };
        }

        case DELETE_FERTILIZER: {
            const fertilizers = state.fertilizers.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                fertilizers,
                selectedFertilizer: null,
                createNewResource: true,
            };
        }
        case SELECT_FERTILIZER: {
            return {
                ...state,
                selectedFertilizer: action.payload,
                createNewResource: false,
            };
        }
        case FERTILIZER_UPDATED:
        case FERTILIZER_CREATED: {
            const fertilizers = state.fertilizers.filter((entity) => entity.id !== action.payload.id);
            fertilizers.unshift(action.payload);
            return {
                ...state,
                fertilizers,
                selectedFertilizer: null,
                createNewResource: true,
            }
        }
        //------------ FERTILIZERS END -----------------
        //------------ WATER_SOURCES -----------------

        case GET_WATER_SOURCES: {
            return {
                ...state,
                waterSources: action.payload,
            };
        }
        case GET_WATER_SOURCE: {
            return {
                ...state,
                selectedWaterSource: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_WATER_SOURCE: {
            const waterSources = state.waterSources.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                waterSources,
                selectedWaterSource: null,
                createNewResource: true,
            };
        }
        case SELECT_WATER_SOURCE: {
            return {
                ...state,
                selectedWaterSource: action.payload,
                createNewResource: false,
            };
        }
        case WATER_SOURCE_UPDATED:
        case WATER_SOURCE_CREATED: {
            const waterSources = state.waterSources.filter((entity) => entity.id !== action.payload.id);
            waterSources.unshift(action.payload);
            return {
                ...state,
                waterSources,
                selectedWaterSource: null,
                createNewResource: true,
            }
        }
        //------------ WATER_SOURCES END -----------------
        //------------ PRODUCTS -----------------

        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload,
            };
        }
        case GET_PRODUCT: {
            return {
                ...state,
                selectedProduct: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_PRODUCT: {
            const products = state.products.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                products,
                selectedProduct: null,
                createNewResource: true,

            };
        }
        case SELECT_PRODUCT: {
            return {
                ...state,
                selectedProduct: action.payload,
                createNewResource: false,
            };
        }
        case PRODUCT_UPDATED:
        case PRODUCT_CREATED: {
            const products = state.products.filter((entity) => entity.id !== action.payload.id);
            products.unshift(action.payload);
            return {
                ...state,
                products,
                selectedProduct: null,
                createNewResource: true,
            }
        }
        //------------ PRODUCTS END -----------------
        //------------ PESTICIDE -----------------

        case GET_PESTICIDES: {
            return {
                ...state,
                pesticides: action.payload,
            };
        }
        case GET_PESTICIDE: {
            return {
                ...state,
                selectedPesticide: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_PESTICIDE: {
            const pesticides = state.pesticides.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                pesticides,
                selectedPesticide: null,
                createNewResource: true,
            };
        }
        case SELECT_PESTICIDE: {
            return {
                ...state,
                selectedPesticide: action.payload,
                createNewResource: false,
            };
        }
        case PESTICIDE_UPDATED:
        case PESTICIDE_CREATED: {
            const pesticides = state.pesticides.filter((entity) => entity.id !== action.payload.id);
            pesticides.unshift(action.payload);
            return {
                ...state,
                pesticides,
                selectedPesticide: null,
                createNewResource: true,
            }
        }
        //------------ PESTICIDE END -----------------
        //------------ ACCESSORIES -----------------

        case GET_ACCESSORIES: {
            return {
                ...state,
                accessories: action.payload,
            };
        }
        case GET_ACCESSORY: {
            return {
                ...state,
                selectedAccessory: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_ACCESSORY: {
            const accessories = state.accessories.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                accessories,
                selectedAccessory: null,
                createNewResource: true,

            };
        }
        case SELECT_ACCESSORY: {
            return {
                ...state,
                selectedAccessory: action.payload,
                createNewResource: false,
            };
        }
        case ACCESSORY_UPDATED:
        case ACCESSORY_CREATED: {
            const accessories = state.accessories.filter((entity) => entity.id !== action.payload.id);
            accessories.unshift(action.payload);
            return {
                ...state,
                accessories,
                selectedAccessory: null,
                createNewResource: true,

            }
        }
        //------------ ACCESSORY END -----------------
        //------------ COMPOSTS -----------------

        case GET_COMPOSTS: {
            return {
                ...state,
                composts: action.payload,
            };
        }
        case GET_COMPOST: {
            return {
                ...state,
                selectedCompost: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_COMPOST: {
            const composts = state.composts.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                composts,
                selectedCompost: null,
                createNewResource: true,

            };
        }
        case SELECT_COMPOST: {
            return {
                ...state,
                selectedCompost: action.payload,
                createNewResource: false,
            };
        }
        case COMPOST_UPDATED:
        case COMPOST_CREATED: {
            const composts = state.composts.filter((entity) => entity.id !== action.payload.id);
            composts.unshift(action.payload);
            return {
                ...state,
                composts,
                selectedCompost: null,
                createNewResource: true,
            }
        }
        //------------ COMPOST END -----------------

        //------------ INGREDIENTS -----------------

        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.payload,
            };
        }
        case GET_INGREDIENT: {
            return {
                ...state,
                selectedIngredient: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_INGREDIENT: {
            const ingredients = state.ingredients.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                ingredients,
                selectedIngredient: null,
                createNewResource: true,

            };
        }
        case SELECT_INGREDIENT: {
            return {
                ...state,
                selectedIngredient: action.payload,
                createNewResource: false,
            };
        }
        case INGREDIENT_UPDATED:
        case INGREDIENT_CREATED: {
            const ingredients = state.ingredients.filter((entity) => entity.id !== action.payload.id);
            ingredients.unshift(action.payload);
            return {
                ...state,
                ingredients,
                selectedIngredient: null,
                createNewResource: true,
            }
        }
        //------------ INGREDIENT END -----------------

        //------------ DISINFECTANT -----------------

        case GET_DISINFECTANTS: {
            return {
                ...state,
                disinfectants: action.payload,
            };
        }
        case GET_DISINFECTANT: {
            return {
                ...state,
                selectedDisinfectant: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_DISINFECTANT: {
            const disinfectants = state.disinfectants.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                disinfectants,
                selectedDisinfectant: null,
                createNewResource: true,

            };
        }
        case SELECT_DISINFECTANT: {
            return {
                ...state,
                selectedDisinfectant: action.payload,
                createNewResource: false,

            };
        }
        case DISINFECTANT_UPDATED:
        case DISINFECTANT_CREATED: {
            const disinfectants = state.disinfectants.filter((entity) => entity.id !== action.payload.id);
            disinfectants.unshift(action.payload);
            return {
                ...state,
                disinfectants,
                selectedDisinfectant: null,
                createNewResource: true,
            }
        }
        //------------ DISINFECTANT END -----------------
        //------------ BASE_CROPS -----------------

        case GET_BASE_CROPS: {
            const baseCrops = action.payload;
            return {
                ...state,
                baseCrops,

            };
        }
        case GET_BASE_CROP: {
            return {
                ...state,
                selectedBaseCrop: action.payload,
                createNewResource: false,
            };
        }

        case DELETE_BASE_CROP: {
            const baseCrops = state.baseCrops.filter((entity) => entity.id !== action.payload);
            return {
                ...state,
                baseCrops,
                selectedBaseCrop: null,
                createNewResource: true,

            };
        }
        case SELECT_BASE_CROP: {
            return {
                ...state,
                selectedBaseCrop: action.payload,
                createNewResource: false,
            };
        }
        case CROP_BASE_CREATED:
        case CROP_BASE_UPDATED: {
            const baseCrops = state.baseCrops.filter((entity) => entity.id !== action.payload.id);
            baseCrops.unshift(action.payload);
            return {
                ...state,
                baseCrops,
                selectedBaseCrop: null,
                createNewResource: true,

            }
        }
        case GET_ENERGIES: {
            return {
                ...state,
                energies: action.payload,
            };
        }
        case GET_FIELD_IN_CUTIVARS: {
            return {
                ...state,
                fieldInCultivars: action.payload,
            };
        }
        case CLEAR_RESOURCE:
            if (action.payload === true) {
                return {
                    ...state,
                    selectedCustomerOrSupplier: null,
                    selectedExecutor: null,
                    selectedEquipment: null,
                    selectedVariety: null,
                    selectedFertilizer: null,
                    selectedWaterSource: null,
                    selectedProduct: null,
                    selectedPesticide: null,
                    selectedAccessory: null,
                    selectedCompost: null,
                    selectedDisinfectant: null,
                    selectedBaseCrop: null,
                    createNewResource: true,
                    selectedIngredient: null,

                };
            }


            else {
                return {
                    ...state,
                    createNewResource: false,
                };
            }
        default:
            return state;
    }


}


