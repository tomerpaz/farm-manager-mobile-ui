import {
    CLEAR_FIELD,
    DELETE_DOMAIN,
    DELETE_FIELD,
    DOMAIN_CREATED,
    DOMAIN_END_CROP, DOMAIN_SPLITTED,
    DOMAIN_START_CROP,
    DOMAIN_UPDATED,
    FIELD_CREATED,
    FIELD_UPDATED, GET_DOMAINS_BY_YEAR,
    GET_FIELD,
    GET_FIELDS,
    INVALIDATE_USER,
    SELECT_FIELD,
    TOGGLE_FIELD_LAYER,
    SET_MAP_BASE_LAYER,
    SET_DOMAIN_STATUS_FILTER,
    GET_GLOBAL_DATA,
    GET_PEST_GEO_JSON,
    SET_MAP_TIME_RANGE,
    SET_MAP_INFECTION_LEVEL,
    SET_MAP_REF_DATE,
    SET_MAP_PESTS,
    GET_WAYPOINTS_GEO_JSON,
    SET_MAP_ACTIVITIES,
    GET_TRACKER_GPS,
} from '../actions/types';

import { buildDomainFilter } from "../components/filters/filterUtil";
import { newDate } from '../utils';

const INITIAL_STATE = {
    fields: [],
    domains: [],
    selectedField: null,
    selectedDomain: null,
    sortColumn: 'name',
    domainFilterOption: [],
    selectedDomainFilter: [],
    domainStatusFilter: '',
    loadMap: false,
    createNewField: false,
    showFieldNames: false,
    showCropNames: false,
    showBaseFields: false,
    mapBaseLayer: 'google',
    showNdvi: false,
    showWind: false,
    ventusky: false,
    showRainRadar: false,
    showGovmap: false,
    showPests: false,
    pestsGeoJson: [],
    showWaypoints: false,
    waypointsGeoJson: [],
    showTracker: false,
    trackerGps: [],
    mapRefDate: newDate(),
    mapInfectionLevel: 'Low',
    mapPests: [],
    mapTimeRange: '1m',
    mapActivities: [],

};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {


        case GET_GLOBAL_DATA:
            return {
                ...state,
                domainStatusFilter: action.payload.user.domainStatus,
                mapBaseLayer: action.payload.user.mapProvider,
            }

        case SET_MAP_BASE_LAYER: {
            return {
                ...state,
                mapBaseLayer: action.payload,
            };
        }
        
        case SET_DOMAIN_STATUS_FILTER: {
            return {
                ...state,
                domainStatusFilter: action.payload,
            };
        }

        case TOGGLE_FIELD_LAYER: {            
            const showPests = action.payload === 'pest' ? !state.showPests : state.showPests;
            const showTracker = action.payload === 'tracker' ? !state.showTracker : state.showTracker;
            const showWaypoints = action.payload === 'waypoints' ? !state.showWaypoints : state.showWaypoints;
            const showFieldNames = action.payload === 'field' ? !state.showFieldNames : state.showFieldNames;
            const showCropNames = action.payload === 'crop' ? !state.showCropNames : state.showCropNames;
            const showNdvi = action.payload === 'ndvi' ? !state.showNdvi : state.showNdvi;
            const showBaseFields = action.payload === 'baseFields' ? !state.showBaseFields : state.showBaseFields;
            const showGovmap = action.payload === 'govmap' ? !state.showGovmap : false;

            let showWind = state.showWind;
            let showRainRadar = state.showRainRadar;
            let ventusky = state.ventusky;
            
            if (action.payload === 'showWind') {
                showWind = !state.showWind;
                showRainRadar = false;
                ventusky = false;
            }
            else if (action.payload === 'showRainRadar') {
                showRainRadar = !state.showRainRadar;
                showWind = false;
                ventusky = false;
                
            } 
            else if (action.payload === 'ventusky') {
                ventusky = !state.ventusky;
                showWind = false;
                showRainRadar = false;
            }
            else {
                showWind = false;
                showRainRadar = false;
                ventusky = false;
            }

            return {
                ...state,
                showFieldNames,
                showCropNames,
                showNdvi,
                showBaseFields,
                showPests,
                showWaypoints,
                showTracker,
                showGovmap,
                showRainRadar,
                showWind,
                ventusky,
            };
        }
        case GET_DOMAINS_BY_YEAR:
            const domains = action.payload;
            domains.forEach(e=>{
                e.fieldName = e.field.name;
                e.cropName = e.variety.category
                e.varietyName = e.variety.name

            })
            return {
                ...state,
                domains: domains,
                domainFilterOption: buildDomainFilter(action.payload),
            };
        case GET_FIELDS:
            return {
                ...state,
                fields: action.payload,
            };
        case GET_PEST_GEO_JSON: {
            return {
                ...state,
                pestsGeoJson: action.payload,
            };
        }

        case GET_TRACKER_GPS: {
            return {
                ...state,
                trackerGps: action.payload,
            };
        }

        case GET_WAYPOINTS_GEO_JSON: {
            return {
                ...state,
                waypointsGeoJson: action.payload,
            };
        }

        case GET_FIELD:
            return {
                ...state,
                selectedField: action.payload,
                createNewField: false,
            };

        case SELECT_FIELD:

            return {
                ...state,
                selectedField: action.payload,
                createNewField: false,
            };
        case CLEAR_FIELD:
            return {
                ...state,
                selectedField: null,
                createNewField: true,
            };
        case DELETE_FIELD:
            const fields = state.fields.filter((field) => field.id !== action.payload);
            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                createNewField: true,
                fields,
            };
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case FIELD_UPDATED:
        case FIELD_CREATED: {
            const fields = state.fields.filter((field) => field.id !== action.payload.id);
            fields.unshift(action.payload);
            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                createNewField: true,
                fields,
            }
        }

        case DOMAIN_CREATED:
        case DOMAIN_UPDATED: {
            let domains = null;
            if (Array.isArray(action.payload)) {
                const domainIDs = action.payload.map((domain) => domain.id);
                domains = action.payload.concat(state.domains.filter((domain) => domainIDs.indexOf(domain.id) < 0));
            } else {
                const e = action.payload;
                e.fieldName = e.field.name;
                e.cropName = e.variety.category
                e.varietyName = e.variety.name
                domains = state.domains.filter((domain) => domain.id !== action.payload.id);
                domains.unshift(e);
            }

            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                domains,
            }
        }

        case DELETE_DOMAIN: {
            const domains = state.domains.filter((domain) => domain.id !== action.payload);
            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                domains
            };
        }
        case DOMAIN_END_CROP: {
            const domainIDs = action.payload.map((domain) => domain.id);

            const domains = state.domains.filter((domain) => domainIDs.indexOf(domain.id) < 0).concat(action.payload);

            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                domains
            };
        }

        case DOMAIN_SPLITTED: {
            const newDomains = action.payload;
            const domainIDs = newDomains.map((domain) => domain.id);
            const domains = action.payload.concat(state.domains.filter((domain) => domainIDs.indexOf(domain.id) < 0));

            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                domains
            };
        }

        case DOMAIN_START_CROP: {
            const domains = state.domains;
            const newDomains = action.payload;
            newDomains.forEach(newDomain => {
                domains.unshift(newDomain);
            });
            return {
                ...state,
                selectedField: null,
                selectedDomain: null,
                domains
            };
        }

        case SET_MAP_PESTS: {

            return {
                ...state,
                mapPests: action.payload,
            };
        }

        case SET_MAP_ACTIVITIES: {

            return {
                ...state,
                mapActivities: action.payload,
            };
        }
        case SET_MAP_REF_DATE: {
            return {
                ...state,
                mapRefDate: action.payload,
            };
        }

        case SET_MAP_INFECTION_LEVEL: {
            return {
                ...state,
                mapInfectionLevel: action.payload,
            };
        }

        case SET_MAP_TIME_RANGE: {
            return {
                ...state,
                mapTimeRange: action.payload,
            };
        }

        default:
            return state;
    }
}

