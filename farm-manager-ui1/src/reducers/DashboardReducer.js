import {

    CLEAR_DASHBOARD,
    GET_DASHBOARD_PLANTATION, GET_DASHBOARD_DOMAIN, GET_DASHBOARD_FINANCIAL,GET_DASHBOARD_FINANCIAL2, INVALIDATE_USER,
    GET_DASHBOARD_QUANTITATIVE, GET_DASHBOARD_QUANTITATIVE2, GET_CROP_ROTATION, SET_FETCHING_FINANCIAL_DASHBOARD,
    SET_FETCHING_QUANTITATIVE_DASHBOARD,
    SAVE_SEASON_DATA,
    SET_SEASON_PARAM,
} from '../actions/types';


const INITIAL_STATE = {

    dashboard: null,
    financialDashboard: null,
    financialDashboard2: null,
    fetchingFinancialDashboard: false,
    fetchingFinancialDashboard2: false,

    quantitativeDashboard: null,
    quantitativeDashboard2: null,
    fetchingQuantitativeDashboard: false,
    fetchingQuantitativeDashboard2: false,
    cropRotations: null,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case GET_DASHBOARD_PLANTATION:
        case GET_DASHBOARD_DOMAIN: {
            return {
                ...state,
                dashboard: action.payload,
            }
        }

        // case SAVE_SEASON_DATA:{
        //     const seasonData = action.payload;

        //     console.log(action.payload)    

        //     const dashboard = state.dashboard;
        //     if(dashboard){
        //         dashboard.seasonData = seasonData;
        //     }
        //     return {
        //         ...state,
        //         dashboard,
        //     }
        // }

        case SET_SEASON_PARAM: {
            const dashboard = state.dashboard;
            dashboard.seasonData[action.payload.key] = action.payload.value;
            // console.log(action.payload)
            // console.log(action.payload.key)
            // console.log(action.payload.value)
            // console.log(dashboard)

            
            return {
                ...state,
                dashboard,
            }
        }

        case CLEAR_DASHBOARD: {
            return {
                ...state,
                dashboard: null,
                financialDashboard: null,
                financialDashboard2: null
            }
        }
        case SET_FETCHING_QUANTITATIVE_DASHBOARD: {

            const fetchingQuantitativeDashboard = !action.payload ? true : state.fetchingQuantitativeDashboard;
            const fetchingQuantitativeDashboard2 = action.payload ? true : state.fetchingQuantitativeDashboard2;
            return {
                ...state,
                fetchingQuantitativeDashboard,
                fetchingQuantitativeDashboard2
            }  
        }
        case SET_FETCHING_FINANCIAL_DASHBOARD: {            
            const fetchingFinancialDashboard = !action.payload ? true : state.fetchingFinancialDashboard;
            const fetchingFinancialDashboard2 = action.payload ? true : state.fetchingFinancialDashboard2;
            return {
                ...state,
                fetchingFinancialDashboard,
                fetchingFinancialDashboard2
            } 
        }
        case GET_DASHBOARD_FINANCIAL: {
            return {
                ...state,
                financialDashboard: action.payload,
                fetchingFinancialDashboard: false,
                
            } 
        }
        case GET_DASHBOARD_FINANCIAL2: {
            return {
                ...state,
                financialDashboard2: action.payload,
                fetchingFinancialDashboard2: false,
            } 
        }

        case GET_DASHBOARD_QUANTITATIVE: {
            return {
                ...state,
                quantitativeDashboard: action.payload,
                fetchingQuantitativeDashboard:false,
            } 
        }

        case GET_DASHBOARD_QUANTITATIVE2: {
            return {
                ...state,
                quantitativeDashboard2: action.payload,
                fetchingQuantitativeDashboard2: false,
            } 
        }

        case GET_CROP_ROTATION: {
            return {
                ...state,
                cropRotations: action.payload,
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