import {
    SET_MESSAGE,SET_MESSAGE_VARIANT
} from './types';


export function setMessage(message) {

    return function (dispatch) {
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
    };
}

export function setErrorMessage(message) {

    return function (dispatch) {
        dispatch({
            type: SET_MESSAGE_VARIANT,
            payload: {variant: 'error', message : message}
        });
    };
}

export function setWarnMessage(message) {

    return function (dispatch) {
        dispatch({
            type: SET_MESSAGE_VARIANT,
            payload: {variant: 'warning', message : message}
        });
    };
}