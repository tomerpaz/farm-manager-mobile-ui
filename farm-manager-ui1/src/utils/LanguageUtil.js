export function getLanguage() {

    let lang = localStorage.getItem('lang');
    if(lang == null){
        lang = 'en';
    }
    return lang;
}

export function setLanguage(lang) {
    localStorage.setItem('lang', lang);
}

export function getGetdir() {

    let lang = localStorage.getItem('lang');
    if(lang === 'he'){
        return 'rtl'
    }
    return 'ltr';
}
