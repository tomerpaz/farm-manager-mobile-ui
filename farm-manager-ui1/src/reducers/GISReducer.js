import {
    GET_GIS_POLYGONS,SET_GIS_POLYGON_ID,GET_GIS_POLYGON_ID,SET_GIS_POLYGON_NAME,GET_GIS_POLYGON_NAME,INVALIDATE_USER,
    GET_GIS_POLYGON_ATTRIBUTES,
    DELETE_GIS_DATA

} from '../actions/types';


const INITIAL_STATE = {
    gisPolygons: [],
    gisPolygonNameAttr: '',
    gisPolygonIdAttr: '',
    gisPolygonAttributes: [],
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_GIS_POLYGONS: {
            return {
                ...state,
                gisPolygons: action.payload,
            }
        }

        case DELETE_GIS_DATA: {
            return {
                ...state,
                gisPolygons: [],
            }
        }

        case GET_GIS_POLYGON_ATTRIBUTES: {
            return {
                ...state,
                gisPolygonAttributes: action.payload,
            }
        }

         
 
        case SET_GIS_POLYGON_ID:
        case GET_GIS_POLYGON_ID: {
            return {
                ...state,
                gisPolygonIdAttr: action.payload
            }
        }

        case SET_GIS_POLYGON_NAME:
        case GET_GIS_POLYGON_NAME: {
            return {
                ...state,
                gisPolygonNameAttr: action.payload
            }
        }
        default:
            return state;
    }
}