import { SET_DIRECTION, LOAD_TRANSLATION } from './types';
import { restGet } from './util/RestUtil';


export function setDirection(dir) {
	return {
        type: SET_DIRECTION,
        payload: dir
    };
}

export function loadTranslation (lang){
    // console.log('lang',lang)
    if(!lang || lang === 'undefined'){
        lang = 'en';
    }
    return function (dispatch) {
        restGet(`languages/${lang}.json`,dispatch, LOAD_TRANSLATION );
    };
}
