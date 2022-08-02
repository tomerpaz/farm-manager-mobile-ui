import { DRAW_MODE, SET_POLYGON, INVALIDATE_USER } from '../actions/types';

const INITIAL_STATE = {
    polygon: [],
    drawMode: null,
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case DRAW_MODE:
            return { ...state, drawMode: action.payload };
        case SET_POLYGON:{
            return { ...state, polygon: action.payload };
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