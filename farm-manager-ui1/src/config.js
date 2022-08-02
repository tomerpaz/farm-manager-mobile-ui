export const BACKEND_URL = window.location.port === '3000' ? window.location.protocol +'//'+window.location.hostname +':8080' : window.location.origin;
//export const BACKEND_URL = 'https://aspect-soft.com';

export function getBackendURL() {
    return BACKEND_URL;
}

export const TIME_OUT_REDUX = 50;