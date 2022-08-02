import { isEmpty } from 'lodash';
import {
    CROP_GENUS_CREATE,
    CROP_GENUS_UPDATE,
    DELETE_CROP_GENUS,
    PRODUCT_CATEGORY_CREATE,
    PRODUCT_CATEGORY_UPDATE,
    DELETE_PRODUCT_CATEGORY,
    DELETE_ACTIVE_INGREDIENT,
    ACTIVE_INGREDIENT_CREATE,
    ACTIVE_INGREDIENT_UPDATE,
    ACCESSORY_CREATED,
    ACCESSORY_UPDATED,
    ACTIVITY_CREATED,
    ACTIVITY_DEF_CREATED,
    ACTIVITY_DEF_TYPE_CREATED,
    ACTIVITY_DEF_TYPE_UPDATED,
    ACTIVITY_DEF_UPDATED,
    ACTIVITY_UPDATED,
    BUSINESS_CREATED,
    BUSINESS_UPDATED,
    COMPOST_CREATED,
    COMPOST_UPDATED,
    CONTAINER_CREATED,
    CONTAINER_UPDATED,
    CROP_CREATED,
    CROP_UPDATED,
    CUSTOMER_OR_SUPPLIER_CREATED,
    CUSTOMER_OR_SUPPLIER_UPDATED,
    DELETE_ACCESSORY,
    DELETE_ACTIVITY,
    DELETE_ACTIVITY_DEF,
    DELETE_ACTIVITY_DEF_TYPE,
    DELETE_BUSINESS,
    DELETE_COMPOST,
    DELETE_CONTAINER,
    DELETE_CROP,
    DELETE_CUSTOMER_OR_SUPPLIER,
    DELETE_DISINFECTANT,
    DELETE_DOMAIN,
    DELETE_EQUIPMENT,
    DELETE_EXECUTOR,
    DELETE_FERTILIZER,
    DELETE_FIELD,
    DELETE_FILE,
    DELETE_INVENTORY_UPDATE,
    DELETE_MAINTENANCE,
    DELETE_PARENT_FIELD,
    DELETE_PEST,
    DELETE_PESTICIDE,
    DELETE_PESTICIDE_LIST,
    DELETE_PESTICIDE_LIST_PESTICIDE,
    DELETE_PROCUREMENT,
    DELETE_PRODUCT,
    DELETE_RISK,
    DELETE_RISK_ASSESSMENT,
    DELETE_SITE,
    DELETE_TARIFF,
    DELETE_VARIETY,
    DELETE_WAREHOUSE,
    DELETE_WATER_SOURCE,
    DELETE_WATER_SYS_CONFIG,
    DISINFECTANT_CREATED,
    DISINFECTANT_UPDATED,
    DOMAIN_CREATED,
    DOMAIN_END_CROP,
    DOMAIN_UPDATED,
    DUPLICATE_MAINTENANCE,
    DUPLICATE_PESTICIDE_LIST,
    EMAIL_REPORT,
    EQUIPMENT_CREATED,
    EQUIPMENT_UPDATED,
    EXECUTOR_CREATED,
    EXECUTOR_UPDATED,
    FERTILIZER_CREATED,
    FERTILIZER_UPDATED,
    FIELD_CREATED,
    FIELD_UPDATED,
    INVENTORY_UPDATE_CREATED,
    INVENTORY_UPDATE_UPDATED,
    LOAD_TRANSLATION,
    MAINTENANCE_CREATED,
    MAINTENANCE_UPDATED,
    MOVE_FILE,
    PARENT_FIELD_CREATED,
    PARENT_FIELD_UPDATED,
    PEST_CREATED,
    PEST_UPDATED,
    PESTICIDE_CREATED,
    PESTICIDE_LIST_CREATED,
    PESTICIDE_LIST_PESTICIDE_CREATED,
    PESTICIDE_LIST_PESTICIDE_UPDATED,
    PESTICIDE_LIST_UPDATED,
    PESTICIDE_UPDATED,
    PROCUREMENT_CREATED,
    PROCUREMENT_UPDATED,
    PRODUCT_CREATED,
    PRODUCT_UPDATED,
    RISK_ASSESSMENT_CREATED,
    RISK_ASSESSMENT_UPDATED,
    RISK_CREATED,
    RISK_UPDATED,
    SET_MESSAGE,
    SET_MESSAGE_VARIANT,
    SITE_CREATE,
    SITE_UPDATE,
    SYNC_WATER_SYS,
    TARIFF_CREATED,
    TARIFF_UPDATED,
    UPDATE_VALVE,
    UPLOAD_FILES,
    UPLOAD_FILE,
    VARIETY_CREATED,
    VARIETY_UPDATED,
    WAREHOUSE_CREATED,
    WAREHOUSE_UPDATED,
    WATER_SOURCE_CREATED,
    WATER_SOURCE_UPDATED,
    WATER_SYS_CONFIG_CREATE,
    WATER_SYS_CONFIG_UPDATE,
    BUSINESS_USER_UPDATED, BUSINESS_USER_CREATED, DELETE_BUSINESS_USER,
    DOMAIN_SPLITTED,
    BY_BUSINESS_UPDATED,
    SET_USER_MAP_CENTER, USER_SAVED,
    PASSWORD_UPDATED,
    DUPLICATE_TARIFF,
    SET_SUPPLIER_MONTH_INVOICE,
    VALVE_DELETED,
    VALVE_DUPLICATED,
    FERTILIZER_HUB_VALVES_UPDATED,
    FERTILIZER_HUB_CREATED,
    FERTILIZER_HUB_UPDATED,
    DELETE_FERTILIZER_HUB,
    SET_GIS_POLYGON_ID,
    SET_GIS_POLYGON_NAME,
    DELETE_GIS_DATA,
    RESET_IMAGERY,
    DELETE_TAG,
    TAG_UPDATE,
    TAG_CREATE,
    APPROVAL_UPDATED,
    IMPORT_ACCUMULATIONS,
    GET_DOMAIN_ESTIMATE_PRODUCE,
    SAVE_SEASON_DATA,
    INGREDIENT_UPDATED,
    INGREDIENT_CREATED,
    DELETE_COMPOUND,
    UPDATE_COMPOUND,
    CREATE_COMPOUND,
    DELETE_ALERT,
    ALERT_UPDATE,
    ALERT_CREATE,
    SET_EXECUTE_ALERT,
    EXECUTE_UPDATES,
    SAVE_USER_TAGS,
    DELETE_RESOURCE_EXTERNAL_CODE,
    RESOURCE_EXTERNAL_CODE_UPDATE,
    RESOURCE_EXTERNAL_CODE_CREATE,
    SET_ACTIVITY_TABLE_FREE_TEXT_DEEP_SEARCH,
} from '../actions/types';



const INITIAL_STATE = {
    message: null,
    variant: null,
    text: null,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case SET_MESSAGE: {
            return {
                ...state,
                message: action.payload,
                variant: action.payload === null ? state.variant : null,
            }
        }
        case SET_MESSAGE_VARIANT: {
            return {
                ...state,
                message: action.payload.message,
                variant: action.payload.variant,
            }
        }
        case LOAD_TRANSLATION:

            return {
                ...state,
                text: action.payload,
                variant: null,
            };

        case SET_ACTIVITY_TABLE_FREE_TEXT_DEEP_SEARCH: {
            if (action.payload === true) {
                return {
                    ...state,
                    message: state.text.deepSearch,
                    variant: 'warning',
                }
            } else {
                return state;
            }
        }

        case DOMAIN_SPLITTED: {
            return {
                ...state,
                message: state.text.domainSplitted,
                variant: 'warning',
            }
        }

        case IMPORT_ACCUMULATIONS: {
            return {
                ...state,
                message: state.text.requestSent,
                variant: 'warning',
            }
        }
        case VALVE_DUPLICATED:
        case DUPLICATE_PESTICIDE_LIST:
        case DUPLICATE_TARIFF:
        case DUPLICATE_MAINTENANCE: {
            return {
                ...state,
                message: state.text.recordDuplicate,
                variant: 'warning',
            }
        }

        case DELETE_RESOURCE_EXTERNAL_CODE:
        case DELETE_COMPOUND:
        case DELETE_PRODUCT_CATEGORY:
        case DELETE_ACTIVE_INGREDIENT:
        case DELETE_CROP_GENUS:
        case DELETE_TAG:
        case DELETE_ALERT:
        case DELETE_GIS_DATA:
        case DELETE_FERTILIZER_HUB:
        case VALVE_DELETED:
        case DELETE_BUSINESS_USER:
        case DELETE_BUSINESS:
        case DELETE_PESTICIDE_LIST:
        case DELETE_PESTICIDE_LIST_PESTICIDE:
        case DELETE_PEST:
        case DELETE_RISK:
        case DELETE_RISK_ASSESSMENT:
        case DELETE_MAINTENANCE:
        case DELETE_TARIFF:
        case DELETE_WATER_SYS_CONFIG:
        case DELETE_WAREHOUSE:
        case DELETE_INVENTORY_UPDATE:
        case DELETE_CUSTOMER_OR_SUPPLIER:
        case DELETE_PROCUREMENT:
        case DELETE_ACTIVITY:
        case DELETE_CONTAINER:
        case DELETE_CROP:
        case DELETE_ACTIVITY_DEF_TYPE:
        case DELETE_ACTIVITY_DEF:
        case DELETE_WATER_SOURCE:
        case DELETE_EXECUTOR:
        case DELETE_VARIETY:
        case DELETE_EQUIPMENT:
        case DELETE_FERTILIZER:
        case DELETE_PRODUCT:
        case DELETE_PESTICIDE:
        case DELETE_ACCESSORY:
        case DELETE_DISINFECTANT:
        case DELETE_COMPOST:
        case DELETE_SITE:
        case DELETE_PARENT_FIELD:
        case DELETE_FIELD:
        case DELETE_DOMAIN: {
            return {
                ...state,
                message: state.text.recordDeleted,
                variant: null,
            }
        }

        case RESOURCE_EXTERNAL_CODE_UPDATE:
        case SET_EXECUTE_ALERT:
        case UPDATE_COMPOUND:
        case GET_DOMAIN_ESTIMATE_PRODUCE:
        case SET_GIS_POLYGON_ID:
        case SET_GIS_POLYGON_NAME:
        case FERTILIZER_HUB_UPDATED:
        case FERTILIZER_HUB_VALVES_UPDATED:
        case PASSWORD_UPDATED:
        case USER_SAVED:
        case BY_BUSINESS_UPDATED:
        case BUSINESS_USER_UPDATED:
        case BUSINESS_UPDATED:
        case PESTICIDE_LIST_UPDATED:
        case PESTICIDE_LIST_PESTICIDE_UPDATED:
        case PEST_UPDATED:
        case RISK_UPDATED:
        case RISK_ASSESSMENT_UPDATED:
        case MAINTENANCE_UPDATED:
        case TARIFF_UPDATED:
        case WATER_SYS_CONFIG_UPDATE:
        case UPDATE_VALVE:
        case WAREHOUSE_UPDATED:
        case INVENTORY_UPDATE_UPDATED:
        case CUSTOMER_OR_SUPPLIER_UPDATED:
        case PROCUREMENT_UPDATED:
        case ACTIVITY_UPDATED:
        case CONTAINER_UPDATED:
        case CROP_UPDATED:
        case ACTIVITY_DEF_TYPE_UPDATED:
        case ACTIVITY_DEF_UPDATED:
        case EXECUTOR_UPDATED:
        case VARIETY_UPDATED:
        case EQUIPMENT_UPDATED:
        case FERTILIZER_UPDATED:
        case WATER_SOURCE_UPDATED:
        case PRODUCT_UPDATED:
        case PESTICIDE_UPDATED:
        case ACCESSORY_UPDATED:
        case DISINFECTANT_UPDATED:
        case COMPOST_UPDATED:
        case INGREDIENT_UPDATED:
        case SITE_UPDATE:
        case PARENT_FIELD_UPDATED:
        case FIELD_UPDATED:
        case TAG_UPDATE:
        case ALERT_UPDATE:
        case APPROVAL_UPDATED:
        case DOMAIN_UPDATED:
        case PRODUCT_CATEGORY_UPDATE:
        case ACTIVE_INGREDIENT_UPDATE:
        case CROP_GENUS_UPDATE:
        case SAVE_SEASON_DATA:
        case SAVE_USER_TAGS:
            {
                return {
                    ...state,
                    message: state.text.recordUpdated,
                    variant: null,
                }
            }

        case RESOURCE_EXTERNAL_CODE_CREATE:
        case CREATE_COMPOUND:
        case FERTILIZER_HUB_CREATED:
        case BUSINESS_USER_CREATED:
        case BUSINESS_CREATED:
        case PESTICIDE_LIST_CREATED:
        case PESTICIDE_LIST_PESTICIDE_CREATED:
        case PEST_CREATED:
        case RISK_CREATED:
        case RISK_ASSESSMENT_CREATED:
        case MAINTENANCE_CREATED:
        case TARIFF_CREATED:
        case WATER_SYS_CONFIG_CREATE:
        case WAREHOUSE_CREATED:
        case INVENTORY_UPDATE_CREATED:
        case CUSTOMER_OR_SUPPLIER_CREATED:
        case PROCUREMENT_CREATED:
        case ACTIVITY_CREATED:
        case CONTAINER_CREATED:
        case CROP_CREATED:
        case ACTIVITY_DEF_TYPE_CREATED:
        case ACTIVITY_DEF_CREATED:
        case EXECUTOR_CREATED:
        case EQUIPMENT_CREATED:
        case FERTILIZER_CREATED:
        case VARIETY_CREATED:
        case WATER_SOURCE_CREATED:
        case PRODUCT_CREATED:
        case PESTICIDE_CREATED:
        case ACCESSORY_CREATED:
        case COMPOST_CREATED:
        case INGREDIENT_CREATED:
        case DISINFECTANT_CREATED:
        case SITE_CREATE:
        case PARENT_FIELD_CREATED:
        case FIELD_CREATED:
        case TAG_CREATE:
        case ALERT_CREATE:
        case PRODUCT_CATEGORY_CREATE:
        case ACTIVE_INGREDIENT_CREATE:
        case CROP_GENUS_CREATE:
        case DOMAIN_CREATED:
            {
                const message = Array.isArray(action.payload) ? `${action.payload.length} ${state.text.recordsCreated}` : state.text.recordCreated
                return {
                    ...state,
                    message,
                    variant: null,
                }
            }

        case DELETE_FILE: {
            return {
                ...state,
                message: state.text.fileDeleted,
                variant: null,
            }
        }

        case SET_USER_MAP_CENTER:
        case SYNC_WATER_SYS: {
            return {
                ...state,
                message: state.text.executed,
                variant: null,
            }
        }
        case MOVE_FILE: {
            return {
                ...state,
                message: state.text.fileMoved,
                variant: null,
            }
        }

        case EMAIL_REPORT: {
            return {
                ...state,
                message: action.payload.message,
                variant: null,
            }
        }

        case UPLOAD_FILE:
            return {
                ...state,
                variant: null,
                message: state.text.fileUploaded,
            }

        case UPLOAD_FILES: {
            const message = action.payload.length > 1 ? `${action.payload.length} ${state.text.filesUploaded}` : state.text.fileUploaded
            return {
                ...state,
                variant: null,
                message,
            }
        }

        case EXECUTE_UPDATES: {
            console.log('action', action)

            const message = `${action.payload.count} ${state.text.recordsUpdated}`;
            return {
                ...state,
                variant: null,
                message,
            }
        }

        case SET_SUPPLIER_MONTH_INVOICE:
        case DOMAIN_END_CROP: {

            const message = Array.isArray(action.payload) ? `${action.payload.length} ${state.text.recordsUpdated}` : state.text.recordUpdated
            return {
                ...state,
                variant: null,
                message,
            }
        }

        default:
            return state;
    }
}