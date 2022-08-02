import {
    ACCESSORY_CREATED,
    ACCESSORY_UPDATED,
    ACTIVITY_DEF_CREATED,
    ACTIVITY_DEF_TYPE_CREATED,
    ACTIVITY_DEF_TYPE_UPDATED,
    ACTIVITY_DEF_UPDATED,
    CONTAINER_CREATED,
    CONTAINER_UPDATED,
    CROP_CREATED,
    CROP_UPDATED,
    CUSTOMER_OR_SUPPLIER_CREATED,
    CUSTOMER_OR_SUPPLIER_UPDATED,
    DELETE_ACCESSORY,
    DELETE_ACTIVITY_DEF,
    DELETE_ACTIVITY_DEF_TYPE,
    DELETE_CONTAINER,
    DELETE_CROP,
    DELETE_CUSTOMER_OR_SUPPLIER,
    DELETE_EQUIPMENT,
    DELETE_EXECUTOR,
    DELETE_FERTILIZER,
    DELETE_FIELD,
    DELETE_PARENT_FIELD,
    DELETE_PRODUCT,
    DELETE_SITE,
    DELETE_VARIETY,
    DELETE_WAREHOUSE,
    DELETE_WATER_SOURCE,
    EQUIPMENT_CREATED,
    EQUIPMENT_UPDATED,
    EXECUTOR_CREATED,
    EXECUTOR_UPDATED,
    FERTILIZER_CREATED,
    FERTILIZER_UPDATED,
    FIELD_CREATED,
    FIELD_UPDATED,
    GET_ACCESSORIES,
    GET_ACTIVITY_DEF_TYPES,
    GET_ACTIVITY_DEFS, GET_BASE_CROPS,
    GET_COMPOSTS,
    GET_CONTAINERS,
    GET_CROPS,
    GET_CUSTOMER_AND_SUPPLIERS,
    GET_DISINFECTANTS,
    GET_EQUIPMENTS,
    GET_EXECUTORS,
    GET_FERTILIZERS,
    GET_FIELD_IN_POLYGONS,
    GET_FIELD_IN_PRODUCTS,
    GET_FIELDS,
    GET_PARENT_FIELDS,
    GET_PESTICIDE_LISTS,
    GET_PESTICIDES,
    GET_PRODUCTS,
    GET_SITES,
    GET_VARIETIES,
    GET_WAREHOUSES,
    GET_WATER_SOURCES,
    INVALIDATE_USER,
    LOAD_TRANSLATION,
    PARENT_FIELD_CREATED,
    PARENT_FIELD_UPDATED,
    PRODUCT_CREATED,
    PRODUCT_UPDATED,
    SITE_CREATE,
    SITE_UPDATE,
    VARIETY_CREATED,
    VARIETY_UPDATED,
    WAREHOUSE_CREATED,
    WAREHOUSE_UPDATED,
    WATER_SOURCE_CREATED,
    WATER_SOURCE_UPDATED,
    GET_PESTS,
    GET_GLOBAL_DATA,
    GET_ENERGIES,
    GET_INGREDIENTS,
    GET_COMPOUNDS
} from '../actions/types';
import {getActivityTypeFilter} from "../components/filters/filterUtil";
import {buildTableFilterOptions} from "../modules/utilities/fields/tableUtil";
import {
    getSuggestionsNameId,
    tableSuggestionsAliasIdPrefix,
    tableSuggestionsNameIdPrefix,
    tableSuggestionsVarieties,
    getCustomerOptions,
    tableSuggestionsExecutorNameIdPrefix,
    tableSuggestionsResourceNameTypeIdPrefix
} from "../components/core/optionsUtil";
import {TARIFF_TYPES} from "./TariffReducer";
import {EXECUTOR_TYPES, CUSTOMER} from "./ResourceReducer";
import {EQUIPMENT_TYPES} from "../modules/resources/equipment/EquipmentForm";
import { getUserDisplayName } from '../utils/FarmUtil';


const INITIAL_STATE = {

    execActivityTypeFilterOptions: [],
    planActivityTypeFilterOptions: [],

    activityTypeFilterOptions: [],
    executorOptions: [],
    pesticideOptions: [],
    fieldOptions: [],
    equipmentOptions: [],
    waterSourceOptions: [],
    fertilizerOptions: [],
    compostOptions: [],
    disinfectantOptions: [],
    accessoryOptions: [],
    varietyOptions: [],
    varietyResourceOptions: [],
    energyOptions: [],
    ingredientOptions: [],
    
    cropOptions: [],
    execActivityTableOptions: [],
    planActivityTableOptions: [],
    inventoryOptions: [],
    fieldInProductOptions: [],
    fieldInPolygonOptions: [],
    productOptions: [],
    activityDefOptions: [],
    activityDefTypeOptions: [],

    resourceTypeOptions: [],

    parentFieldOptions: [],
    siteOptions: [],
    warehouseOptions: [],
    customerAndSupplierOptions: [],
    containerOptions: [],
    pesticideListOptions: [],
    executorTypeOptions: [],
    equipmentCategoryOptions: [],
    baseCropOptions: [],
    activeOptions: [],
    pestOptions: [],
    text: null, 
    growerOptions: [],

    compoundOptions:[],
};


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_FIELD_IN_PRODUCTS: {
            return {
                ...state,
                fieldInProductOptions: getSuggestionsNameId(action.payload),
            };
        }

        case GET_FIELD_IN_POLYGONS: {

            return {
                ...state,
                fieldInPolygonOptions: getSuggestionsNameId(action.payload),
            };
        }

        case GET_GLOBAL_DATA: {
            const users = action.payload.user.users;
            const growerOptions = users ? users.map(e => ({id: 'grower_' + e.username, value: 'grower_' + e.username, label: getUserDisplayName(e), element: e})) : [];

            return {
                ...state,
                growerOptions,
            } 
        }
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE,
                execActivityTypeFilterOptions : state.execActivityTypeFilterOptions,
                planActivityTypeFilterOptions : state.planActivityTypeFilterOptions,
                resourceTypeOptions: state.resourceTypeOptions,
                equipmentCategoryOptions: state.equipmentCategoryOptions,
                executorTypeOptions: state.executorTypeOptions,
                text: state.text,

            }
        }
        case LOAD_TRANSLATION:
            const execActivityTypeFilterOptions = getActivityTypeFilter(false, action.payload);
            const planActivityTypeFilterOptions = getActivityTypeFilter(true, action.payload);



            const activeOptions = [{
                id: 'true',
                value: 'active_true',
                label: action.payload.active,
                element: true,
            },
            {
                id: 'false',
                value: 'active_false',
                label: action.payload.inactive,
                element: false,
            }
        ]

            const resourceTypeOptions = TARIFF_TYPES.map(type => ({
                id: 'resourceType_' + type,
                value: 'resourceType_' + type,
                label: action.payload[type.toLowerCase()],
                element: type,
            }));
            const executorTypeOptions = EXECUTOR_TYPES.map(type => ({
                id: 'resourceType_' + type,
                value: 'resourceType_' + type,
                label: action.payload[type.toLowerCase()],
                element: type,
            }));
            const equipmentCategoryOptions = EQUIPMENT_TYPES.map(type => ({
                id: 'category_' + type,
                value: 'category_' + type,
                label: action.payload[type.toLowerCase()],
                element: type,
            }));


            const options = state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
                .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
                .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
                .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);

            return {
                ...state,
                execActivityTypeFilterOptions,
                planActivityTypeFilterOptions,
                resourceTypeOptions,
                equipmentCategoryOptions,
                executorTypeOptions,
                execActivityTableOptions: execActivityTypeFilterOptions.concat(options),
                planActivityTableOptions: planActivityTypeFilterOptions.concat(options),
                activeOptions,
                text: action.payload,
            };

        case GET_FIELDS: {
            const fieldOptions = buildTableFilterOptions(action.payload.filter(e => e.active === true));
            const options = buildFieldOptions(fieldOptions, state);
            return fieldOptionState(state, fieldOptions, options);
        }

        case DELETE_FIELD: {
            const fieldOptions = state.fieldOptions.filter(e => e.id !== action.payload);
            const options = buildFieldOptions(fieldOptions, state);
            return fieldOptionState(state, fieldOptions, options);
        }

        case FIELD_UPDATED:
        case FIELD_CREATED: {
            const fieldOptions = state.fieldOptions.filter(e => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                fieldOptions.unshift(buildNameElement(element, 'field'));
            }
            const options = buildFieldOptions(fieldOptions, state);
            return fieldOptionState(state, fieldOptions, options);
        }

        // ----------------- EXECUTORS -----------------
        case GET_EXECUTORS: {
            const executorOptions = tableSuggestionsResourceNameTypeIdPrefix(action.payload.filter(e => e.active === true), 'resource', state.text)
            const options = buildExecutorOptions(executorOptions, state);
            return executorOptionState(state, executorOptions, options)
        }

        case DELETE_EXECUTOR: {
            const executorOptions = state.executorOptions.filter((executor) => executor.id !== action.payload);
            const options = buildExecutorOptions(executorOptions, state);
            return executorOptionState(state, executorOptions, options)
        }

        case EXECUTOR_UPDATED:
        case EXECUTOR_CREATED: {
            const executorOptions = state.executorOptions.filter((executor) => executor.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                executorOptions.unshift(buildResourceElement(element, state.text));
            }
            const options = buildExecutorOptions(executorOptions, state);
            return executorOptionState(state, executorOptions, options)
        }
        // ----------------- EXECUTORS END -----------------
        // ----------------- EQUIPMENT -----------------

        case GET_EQUIPMENTS: {
            const equipmentOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = buildEquipmentOptions(equipmentOptions, state);
            return equipmentOptionState(state, equipmentOptions, options);
        }

        case DELETE_EQUIPMENT: {
            const equipmentOptions = state.equipmentOptions.filter((e) => e.id !== action.payload);
            const options = buildEquipmentOptions(equipmentOptions, state);
            return equipmentOptionState(state, equipmentOptions, options);
        }

        case EQUIPMENT_UPDATED:
        case EQUIPMENT_CREATED: {
            const equipmentOptions = state.equipmentOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                equipmentOptions.unshift(buildResourceElement(element));
            }
            const options = buildEquipmentOptions(equipmentOptions, state);
            return equipmentOptionState(state, equipmentOptions, options);
        }
        // ----------------- EQUIPMENT END -----------------

        // ----------------- PARENT_FIELDS -----------------

        case GET_PARENT_FIELDS: {
            const parentFieldOptions = tableSuggestionsNameIdPrefix(action.payload, 'parentField')
            return {
                ...state,
                parentFieldOptions,
            };
        }

        case DELETE_PARENT_FIELD: {
            const parentFieldOptions = state.parentFieldOptions.filter((e) => e.id !== action.payload);
            return {
                ...state,
                parentFieldOptions,
            };
        }

        case PARENT_FIELD_UPDATED:
        case PARENT_FIELD_CREATED: {
            const parentFieldOptions = state.parentFieldOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            parentFieldOptions.unshift(buildNameElement(element, 'parentField'));

            return {
                ...state,
                parentFieldOptions,
            };
        }
        // ----------------- SITES -----------------

        case GET_SITES: {
            const siteOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'site')
            return {
                ...state,
                siteOptions,
            };
        }

        case DELETE_SITE: {
            const siteOptions = state.siteOptions.filter((e) => e.id !== action.payload);
            return {
                ...state,
                siteOptions,
            };
        }

        case SITE_UPDATE:
        case SITE_CREATE: {
            const siteOptions = state.siteOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                siteOptions.unshift(buildNameElement(element, 'site'));
            }
            return {
                ...state,
                siteOptions,
            };
        }

        case GET_BASE_CROPS: {
            const baseCropOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'baseCrop')
            return {
                ...state,
                baseCropOptions,
            };
        }

        // ----------------- WAREHOUSES -----------------

        case GET_WAREHOUSES: {
            const warehouseOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'warehouse', true)
            return {
                ...state,
                warehouseOptions,
            };
        }

        case DELETE_WAREHOUSE: {
            const warehouseOptions = state.warehouseOptions.filter((e) => e.id !== action.payload);
            return {
                ...state,
                warehouseOptions,
            };
        }

        case WAREHOUSE_UPDATED:
        case WAREHOUSE_CREATED: {
            const warehouseOptions = state.warehouseOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                warehouseOptions.unshift(buildNameElement(element, 'warehouse'));
            }
            return {
                ...state,
                warehouseOptions,
            };
        }
        // ----------------- CONTAINERS -----------------

        case GET_CONTAINERS: {
            const containerOptions = tableSuggestionsNameIdPrefix(action.payload, 'container')
            return {
                ...state,
                containerOptions,
            };
        }

        case DELETE_CONTAINER: {
            const containerOptions = state.warehouseOptions.filter((e) => e.id !== action.payload);
            return {
                ...state,
                containerOptions,
            };
        }

        case CONTAINER_UPDATED:
        case CONTAINER_CREATED: {
            const containerOptions = state.containerOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                containerOptions.unshift(buildNameElement(element, 'container'));
            }
            return {
                ...state,
                containerOptions,
            };
        }

        // ----------------- PESTICIDE_LISTS -----------------

        case GET_PESTICIDE_LISTS: {
            const pesticideListOptions = tableSuggestionsNameIdPrefix(action.payload, 'pesticideList')
            return {
                ...state,
                pesticideListOptions,
            };
        }



        case GET_PESTS: {
            const pestOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'pest')
            return {
                ...state,
                pestOptions,
                execActivityTableOptions: state.execActivityTableOptions.concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(pestOptions),
            }
        }

        case GET_PESTICIDES: {
            const pesticideOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
                .concat(pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
                .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
                .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);

            return {
                ...state,
                pesticideOptions,
                execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
                planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
            };
        }

        // ----------------- WATER_SOURCE -----------------

        case GET_WATER_SOURCES: {
            const waterSourceOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = buildWaterSourceOptions(waterSourceOptions, state);
            return waterSourceOptionState(state, waterSourceOptions, options);
        }

        case DELETE_WATER_SOURCE: {
            const waterSourceOptions = state.waterSourceOptions.filter((e) => e.id !== action.payload);
            const options = buildEquipmentOptions(waterSourceOptions, state);
            return equipmentOptionState(state, waterSourceOptions, options);
        }

        case WATER_SOURCE_UPDATED:
        case WATER_SOURCE_CREATED: {
            const waterSourceOptions = state.waterSourceOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                waterSourceOptions.unshift(buildResourceElement(element));
            }
            const options = buildWaterSourceOptions(waterSourceOptions, state);
            return waterSourceOptionState(state, waterSourceOptions, options);
        }

        // ----------------- FERTILIZERS -----------------

        case GET_FERTILIZERS: {
            const fertilizerOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = buildFertilizerOptions(fertilizerOptions, state);
            return fertilizerOptionState(state, fertilizerOptions, options)
        }

        case DELETE_FERTILIZER: {
            const fertilizerOptions = state.fertilizerOptions.filter((e) => e.id !== action.payload);
            const options = buildEquipmentOptions(fertilizerOptions, state);
            return equipmentOptionState(state, fertilizerOptions, options);
        }

        case FERTILIZER_UPDATED:
        case FERTILIZER_CREATED: {
            const fertilizerOptions = state.fertilizerOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                fertilizerOptions.unshift(buildResourceElement(element));
            }
            const options = buildWaterSourceOptions(fertilizerOptions, state);
            return waterSourceOptionState(state, fertilizerOptions, options);
        }

        // ----------------- COMPOSTS -----------------

        case GET_COMPOSTS: {
            const compostOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
                .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
                .concat(compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
                .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);

            return {
                ...state,
                compostOptions,
                execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
                planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
            };
        }

        // ----------------- ELEMENTS -----------------

        case GET_INGREDIENTS: {
            const ingredientOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
 
            return {
                ...state,
                ingredientOptions,
            };
        }

        // ----------------- COMPOUNDS -----------------

        case GET_COMPOUNDS: {
            const compoundOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'compound')
 
            return {
                ...state,
                compoundOptions,
            };
        }

        // ----------------- DISINFECTANTS -----------------

        case GET_DISINFECTANTS: {
            const disinfectantOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
                .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
                .concat(state.compostOptions).concat(disinfectantOptions).concat(state.accessoryOptions)
                .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);

            return {
                ...state,
                disinfectantOptions,
                execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
                planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
            };
        }

        case GET_ENERGIES: {
            const energyOptions =  tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource');
            return {
                ...state,
                energyOptions,
            };
        }

        // ----------------- ACCESSORIES -----------------

        case GET_ACCESSORIES: {
            const accessoryOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')

            const options = buildAccessoryOptions(accessoryOptions, state)
            return accessoryOptionsState(state, accessoryOptions, options)
        }

        case DELETE_ACCESSORY: {
            const accessoryOptions = state.accessoryOptions.filter((e) => e.id !== action.payload);
            const options = buildAccessoryOptions(accessoryOptions, state)
            return accessoryOptionsState(state, accessoryOptions, options)

        }

        case ACCESSORY_UPDATED:
        case ACCESSORY_CREATED: {
            const accessoryOptions = state.accessoryOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                accessoryOptions.unshift(buildResourceElement(element));
            }
            const options = buildAccessoryOptions(accessoryOptions, state)
            return accessoryOptionsState(state, accessoryOptions, options)

        }

        // ----------------- CUSTOMER_AND_SUPPLIERS -----------------

        case GET_CUSTOMER_AND_SUPPLIERS: {
            const customerAndSupplierOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            return {
                ...state,
                customerAndSupplierOptions,
            };
        }
        case DELETE_CUSTOMER_OR_SUPPLIER: {
            const customerAndSupplierOptions = state.customerAndSupplierOptions.filter((e) => e.id !== action.payload);
            return {
                ...state,
                customerAndSupplierOptions,
            };
        }

        case CUSTOMER_OR_SUPPLIER_UPDATED:
        case CUSTOMER_OR_SUPPLIER_CREATED: {
            const customerAndSupplierOptions = state.customerAndSupplierOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                customerAndSupplierOptions.unshift(buildResourceElement(element));
            }
         //   const execActivityTableOptions = state.execActivityTypeFilterOptions.filter((e) => e.id !== action.payload.id && e.element.type === CUSTOMER);
            return {
                ...state,
                customerAndSupplierOptions,
            };
        }





        // ----------------- PRODUCTS -----------------

        case GET_PRODUCTS: {
            const productOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource')
            const options = buildProductOptions(productOptions, state)
            return productOptionState(state, productOptions, options)

        }

        case DELETE_PRODUCT: {
            const productOptions = state.productOptions.filter((e) => e.id !== action.payload);
            const options = buildProductOptions(productOptions, state)
            return productOptionState(state, productOptions, options)

        }

        case PRODUCT_UPDATED:
        case PRODUCT_CREATED: {
            const productOptions = state.productOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                productOptions.unshift(buildResourceElement(element));
            }
            const options = buildProductOptions(productOptions, state)
            return productOptionState(state, productOptions, options)

        }
        // ----------------- VARIETIES -----------------

        case GET_VARIETIES: {
            const varietyOptions = tableSuggestionsVarieties(action.payload.filter(e => e.active === true), 'variety')
            const varietyResourceOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'resource');
            const options = buildVarietyOptions(varietyOptions, state)
            return varietyOptionState(state, varietyOptions, varietyResourceOptions, options)
        }


        case DELETE_VARIETY: {
            const varietyOptions = state.varietyOptions.filter((e) => e.id !== action.payload);
            const varietyResourceOptions = state.varietyResourceOptions.filter((e) => e.id !== action.payload);

            const options = buildVarietyOptions(varietyOptions, state)
            return varietyOptionState(state, varietyOptions, varietyResourceOptions, options)

        }

        case VARIETY_UPDATED:
        case VARIETY_CREATED: {
            const varietyOptions = state.varietyOptions.filter((e) => e.id !== action.payload.id);
            const varietyResourceOptions = state.varietyResourceOptions.filter((e) => e.id !== action.payload.id);

            const element = action.payload;
            if (element.active === true) {
                varietyOptions.unshift(buildNameElement(element, 'variety'));
                varietyResourceOptions.unshift(buildResourceElement(element));
            }
            const options = buildVarietyOptions(varietyOptions, state)
            return varietyOptionState(state, varietyOptions, varietyResourceOptions, options)

        }

        // ----------------- CROPS -----------------

        case GET_CROPS: {
            const cropOptions = tableSuggestionsAliasIdPrefix(action.payload.filter(e => e.active === true), 'crop')
            const options = buildCropOptions(cropOptions, state)
            return cropOptionState(state, cropOptions, options)
        }

        case DELETE_CROP: {
            const cropOptions = state.cropOptions.filter((e) => e.id !== action.payload);
            const options = buildCropOptions(cropOptions, state)
            return cropOptionState(state, cropOptions, options)
        }

        case CROP_UPDATED:
        case CROP_CREATED: {
            const cropOptions = state.cropOptions.filter((e) => e.id !== action.payload.id);

            const element = action.payload;
            if (element.active === true) {
                cropOptions.unshift(buildAliasElement(element, 'crop'));
            }
            const options = buildCropOptions(cropOptions, state)
            return cropOptionState(state, cropOptions, options)
        }

        // ----------------- ACTIVITY_DEF_TYPES -----------------

        case GET_ACTIVITY_DEF_TYPES: {
            const activityDefTypeOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'activityDefType')
            const options = buildActivityDefTypeOptions(activityDefTypeOptions, state)
            return activityDefTypeOptionState(state,activityDefTypeOptions, options)
        }

        case DELETE_ACTIVITY_DEF_TYPE: {
            const activityDefTypeOptions = state.activityDefTypeOptions.filter((e) => e.id !== action.payload);
            const options = buildActivityDefTypeOptions(activityDefTypeOptions, state)
            return activityDefTypeOptionState(state,activityDefTypeOptions, options)

        }

        case ACTIVITY_DEF_TYPE_UPDATED:
        case ACTIVITY_DEF_TYPE_CREATED: {
            const activityDefTypeOptions = state.activityDefTypeOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                activityDefTypeOptions.unshift(buildNameElement(element, 'activityDefType'));
            }
            const options = buildActivityDefTypeOptions(activityDefTypeOptions, state)
            return activityDefTypeOptionState(state,activityDefTypeOptions, options)
        }
        // ----------------- ACTIVITY_DEFS -----------------

        case GET_ACTIVITY_DEFS: {
            const activityDefOptions = tableSuggestionsNameIdPrefix(action.payload.filter(e => e.active === true), 'activityDef')
            const options = buildActivityDefOptions(activityDefOptions, state);
            return activityDefOptionState(state, activityDefOptions, options);
        }

        case DELETE_ACTIVITY_DEF: {
            const activityDefOptions = state.activityDefOptions.filter((e) => e.id !== action.payload);
            const options = buildActivityDefOptions(activityDefOptions, state);
            return activityDefOptionState(state, activityDefOptions, options);
        }

        case ACTIVITY_DEF_UPDATED:
        case ACTIVITY_DEF_CREATED: {
            const activityDefOptions = state.activityDefOptions.filter((e) => e.id !== action.payload.id);
            const element = action.payload;
            if (element.active === true) {
                activityDefOptions.unshift(buildNameElement(element, 'activityDef'));
            }
            const options = buildActivityDefOptions(activityDefOptions, state);
            return activityDefOptionState(state, activityDefOptions, options);
        }
        // ----------------- ACTIVITY_DEFS -----------------


        default:
            return state;
    }
}

function buildResourceElement(element, text) {
    return {
        id: element.id,
        key: `resource_${element.id}`,
        value: `resource_${element.id}`,        
        label:   text ? `${element.name}/${text[element.type.toLowerCase()]}` : element.name,
        element: element,
    }
}

function buildNameElement(element, prefix) {
    return {
        id: element.id,
        key: `${prefix}_${element.id}`,
        value: `${prefix}_${element.id}`,
        label: element.name,
        element: element,
    }
}

function buildAliasElement(element, prefix) {
    return {
        id: element.id,
        key: `${prefix}_${element.id}`,
        value: `${prefix}_${element.id}`,
        label: element.alias,
        element: element,
    }
}

function buildExecutorOptions(executorOptions, state) {
    return state.fieldOptions.concat(executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function executorOptionState(state, executorOptions, options) {
    return {
        ...state,
        executorOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildEquipmentOptions(equipmentOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function equipmentOptionState(state, equipmentOptions, options) {
    return {
        ...state,
        equipmentOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildFieldOptions(fieldOptions, state) {
    return fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function fieldOptionState(state, fieldOptions, options) {
    return {
        ...state,
        fieldOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildWaterSourceOptions(waterSourceOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function waterSourceOptionState(state, waterSourceOptions, options) {
    return {
        ...state,
        waterSourceOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildFertilizerOptions(fertilizerOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function fertilizerOptionState(state, fertilizerOptions, options) {
    return {
        ...state,
        fertilizerOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildActivityDefOptions(activityDefOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(activityDefOptions).concat(state.activityDefTypeOptions).concat(state.activityDefTypeOptions);
}

function activityDefOptionState(state, activityDefOptions, options) {
    return {
        ...state,
        activityDefOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildActivityDefTypeOptions(activityDefTypeOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(activityDefTypeOptions);
}

function activityDefTypeOptionState(state, activityDefTypeOptions, options) {
    return {
        ...state,
        activityDefTypeOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildCropOptions(cropOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function cropOptionState(state, cropOptions, options) {
    return {
        ...state,
        cropOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildVarietyOptions(varietyOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function varietyOptionState(state, varietyOptions, varietyResourceOptions, options) {
    return {
        ...state,
        varietyOptions,
        varietyResourceOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}


function buildProductOptions(productOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(state.accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);
}

function productOptionState(state, productOptions, options) {
    return {
        ...state,
        productOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}

function buildAccessoryOptions(accessoryOptions, state) {
    return state.fieldOptions.concat(state.executorOptions).concat(state.equipmentOptions)
        .concat(state.pesticideOptions).concat(state.waterSourceOptions).concat(state.fertilizerOptions)
        .concat(state.compostOptions).concat(state.disinfectantOptions).concat(accessoryOptions)
        .concat(state.varietyOptions).concat(state.cropOptions).concat(state.productOptions).concat(state.activityDefOptions).concat(state.activityDefTypeOptions);

}

function accessoryOptionsState(state, accessoryOptions, options) {
    return {
        ...state,
        accessoryOptions,
        execActivityTableOptions: state.execActivityTypeFilterOptions.concat(options).concat(getCustomerOptions(state.customerAndSupplierOptions)).concat(state.pestOptions),
        planActivityTableOptions: state.planActivityTypeFilterOptions.concat(options),
    };
}
