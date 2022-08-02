import { DRAW_MODE, SET_POLYGON } from './types';


export function setDrawPolygonMode(isDraw) {
	return {
        type: DRAW_MODE,
        payload: isDraw
    };
}

export function setDrawPolygon(polygon) {
    return {
        type: SET_POLYGON,
        payload: polygon
    };
}
