import {
    SET_FIELD_FILTER, SET_YEAR_FILTER, INVALIDATE_USER, SET_DOMAIN_VIEW_SIZE,
    SET_FIELD_FREE_TEXT,
    GET_GLOBAL_DATA
} from '../actions/types';
import { getCurrentYear } from '../utils';


const INITIAL_STATE = {
    viewSize: 200,
    viewSizeOptions: [25,50,100,200],
    fieldFilter: [null],
    fieldFreeText: '',
    yearFilter: getCurrentYear(),
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case SET_FIELD_FILTER: {
            return {
                ...state,
                fieldFilter: action.payload,
            }
        }
        case SET_FIELD_FREE_TEXT: {
            return {
                ...state,
                fieldFreeText: action.payload,
            }
        }
        case SET_YEAR_FILTER: {
            return {
                ...state,
                yearFilter: action.payload,
            }

        }
        case SET_DOMAIN_VIEW_SIZE:{
            return {
                ...state,
                viewSize: action.payload,
            }
        }
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE 
            }
        }
        case GET_GLOBAL_DATA:
            const businessYear = action.payload.user.business.activitySeason;
            const userYear =  action.payload.user.activitySeason;

            const yearValue = businessYear ? businessYear : userYear;

            const yearFilter = 
                    yearValue ? 
                    yearValue : 
                    state.yearFilter;


            return {
                ...state,
                yearFilter,             
            };

        default:
            return state;
    }
}