import {LOAD_TRANSLATION} from '../actions/types';
import { getGetdir, getLanguage, setLanguage } from '../utils';

const INITIAL_STATE = {dir: getGetdir(), lang: getLanguage(), translation: null};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {


        case LOAD_TRANSLATION:
            let align = action.payload.dir === 'rtl' ? 'right' : 'left';
            setLanguage(action.payload.lang);
            return {
                ...state,
                dir: action.payload.dir,
                lang: action.payload.lang,
                text: action.payload,
                align: align
            };

        default:
            return state;

    }
}
