import {
    SEARCH_AGROMONITORING,INVALIDATE_USER, NDVI_HISTORY, 
    GET_SOIL_DATA,GET_WEATHER,GET_UVI, 
    GET_ACCUMUATED_PRECIP,GET_ACCUMUATED_TEMP,
    SELECT_DOMAIN,
    ADD_NDVI_HISTORY,
    CHANGE_IMAGERY_DATE,
    CHANGE_NDVI_PALETTE

} from '../actions/types';

import { orderBy } from 'lodash';
import { asShortStringDate, fromUDCDate } from '../utils';
import { polygon } from 'leaflet';


const INITIAL_STATE = {
    agromonitoringImagerySearch: [],
    ndviHistory: [],
    polygonSoilData: null,
    polygonUvi: null,
    polygonAccumulatedTemp: [],
    polygonAccumulatedPrecip: [],
    polygonWeather: null,
    polygonsHistory: [],
    imageryDate: null,
    paletteid: 3,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case SEARCH_AGROMONITORING: {
            const agromonitoringImagerySearch = orderBy(action.payload, 'dt', 'desc');
            return {
                ...state,
                agromonitoringImagerySearch,
            }
        }

        case CHANGE_IMAGERY_DATE: {
            return {
                ...state,
                imageryDate: action.payload,                
            };
        }

        case CHANGE_NDVI_PALETTE: {
            return {
                ...state,
                paletteid: action.payload,                
            };

            
        }
        case NDVI_HISTORY: {
            const ndviHistory = orderBy(action.payload, 'dt', 'asc');
            return {
                ...state,
                ndviHistory,
            }
        }

        case ADD_NDVI_HISTORY: {

           const singlePolygonData = action.payload;

            let polygonsHistory = state.polygonsHistory;
            singlePolygonData.history.forEach(e => {
                let dateObservations =  polygonsHistory.find(h => h.dt === e.dt)
                if(!dateObservations){
                    dateObservations = {
                        dt: e.dt,
                        data: []
                    }
                    polygonsHistory.push(dateObservations);
                }

                dateObservations.data.push({
                    imageryId: singlePolygonData.imageryId,
                    imagery: e,
                });             
            })
            polygonsHistory = orderBy(polygonsHistory, 'dt', 'desc');
            let imageryDate = state.imageryDate;

            if(!imageryDate && polygonsHistory && polygonsHistory.length > 0){
                imageryDate =  polygonsHistory[0].dt;
            }
            return {
                ...state,
                polygonsHistory,
                imageryDate,
            }
        }

        case GET_SOIL_DATA: {
            // const ndviHistory = orderBy(action.payload, 'dt', 'asc');
            return {
                ...state,
                polygonSoilData: action.payload,
            }
        }

        case GET_WEATHER: {
            return {
                ...state,
                polygonWeather: action.payload,
            }
        }
        
        case GET_UVI: {
            return {
                ...state,
                polygonUvi: action.payload,
            }
        }

        case GET_ACCUMUATED_PRECIP: {

            const polygonAccumulatedPrecip = action.payload;

            polygonAccumulatedPrecip.forEach(e => e.dt = asShortStringDate(fromUDCDate(e.dt)));

            return {
                ...state,
                polygonAccumulatedPrecip,
            }
        }

        case GET_ACCUMUATED_TEMP: {
            const polygonAccumulatedTemp = action.payload;

            return {
                ...state,
                polygonAccumulatedTemp,
            }
        }

        case SELECT_DOMAIN: {
            if(!action.payload){
                return {
                    ...state,
                    polygonUvi: null,
                    polygonWeather: null,
                    polygonSoilData: null,
                    polygonAccumulatedPrecip:[],
                    polygonAccumulatedTemp: []

                }
            }
        };

        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        default:
            return state;
    }
}

