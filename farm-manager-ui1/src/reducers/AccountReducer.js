import {
    GET_GLOBAL_DATA, INVALIDATE_USER, BY_BUSINESS_UPDATED, SET_USER_MAP_CENTER,SET_TABLE_PAGE_SIZE,
    USER_SAVED,
    GET_GG_ADMIN_AREAS,SET_CROP_TYPE,
} from '../actions/types';
import { INSPECTOR_APP } from '../components/frame/AppFrame';

const INITIAL_STATE = {
    global: null,
    user: null,
    irrigationMethods: [],
    fertilizeMethods: [],
    defaultMarketDestination : 'export',
    units: null,
    winds: [],
    currency: '',
    acceptUpload: '',
    maintenanceTypes: [],
    riskLists: [],
    languages: [],
    plantParts: [],
    infectionLevels: [],
    pesticideUnits: [],
    isAdmin: false,
    areaUnits: [],
    weightUnits: [],
    currencies: [],
    userTypes: [],
    areaUnit: null,
    waterUnit: null,
    weightUnit: null,
    mapApiKey: 'AIzaSyALZqsOMuo6dt1ABtuvLM0EfgqNqPljjks',
    costing: false,
    fieldCrops: false,
    plantations: false,
    pageSize: 15,
    pageSizes: [15, 25, 50, 100, 150],
    isInspector: false,
    ggAdminAreas: [],
    cropType: 'plantations',
    googleMapKey: null,
    bingMapKey: null,

};


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case USER_SAVED: {
            const user = state.user.username === action.payload.username ? action.payload : state.user;
            return {
                ...state,
                user,
            }
        }
        case GET_GLOBAL_DATA:
            return {
                ...state,
                global: action.payload,
                irrigationMethods: action.payload.irrigationMethods,
                fertilizeMethods: action.payload.fertilizeMethods,
                units: action.payload.units,
                user: action.payload.user,
                isInspector: action.payload.user.role === INSPECTOR_APP,
                isAdmin: action.payload.user.isAdmin,
                winds: action.payload.winds,
                acceptUpload: action.payload.acceptUpload,
                maintenanceTypes: action.payload.maintenanceTypes,
                riskLists: action.payload.riskLists,
                riskTypes: action.payload.riskTypes,
                languages:  action.payload.languages,
                plantParts: action.payload.plantParts,
                infectionLevels: action.payload.infectionLevels,
                marketDestinations: action.payload.marketDestinations,
                pesticideCategories: action.payload.pesticideCategories,
                pesticideUnits: action.payload.pesticideUnits,
                areaUnits: action.payload.areaUnits,
                weightUnits: action.payload.weightUnits,
                currencies:  action.payload.currencies,
                countries:  action.payload.countries,
                userTypes: action.payload.userTypes,
                areaUnit: action.payload.user.business.areaUnit,
                waterUnit: action.payload.user.business.waterUnit,
                autoHour: action.payload.user.business.autoHour,
                autoArea: action.payload.user.business.autoArea,
                currency: action.payload.user.business.currency,
                pageSize: action.payload.user.tablePageSize,
                marketMethods: action.payload.marketMethods,
                weightUnit: action.payload.user.business.weightUnit,
                mapApiKey: action.payload.mapApiKey,
                costing: action.payload.costing,
                fieldCrops: action.payload.fieldCrops,
                plantations: action.payload.plantations,
                cropType: action.payload.defaultCropType,
                googleMapKey: action.payload.googleMapKey,
                bingMapKey: action.payload.bingMapKey,

            };
        case INVALIDATE_USER:
            return {
                ...state,
                ...INITIAL_STATE,

            };

        case SET_USER_MAP_CENTER:{
            return {
                ...state,
                user: action.payload,
            };
        }
        case GET_GG_ADMIN_AREAS:{
            return {
                ...state,
                ggAdminAreas: action.payload,
            };
        }
        case SET_TABLE_PAGE_SIZE: {
            return {
                ...state,
                pageSize: action.payload,
            };
        }

        case SET_CROP_TYPE: {
            return {
                ...state,
                cropType: action.payload,
            };
        }

        case BY_BUSINESS_UPDATED:{
            const user = state.user;
            user.business = action.payload;
            return {
                ...state,
                user,
                areaUnit: user.business.areaUnit,
                autoHour: user.business.autoHour,
                autoArea: user.business.autoArea,
                currency: user.business.currency,
            };
        }
        default:
            return state;
    }
}