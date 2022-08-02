import React from 'react'


export function typeDisabled(id, deletable){
    return !(id === 'undefined' || id === null || deletable);
}

export function scrollToFirstErrorLocation(errors, fieldLocations) {
    const firstError = Object.keys(errors)[0];
    // console.log('firstError',firstError);

    const location = fieldLocations.find(e => e.name === firstError);
    if (location && location.location) {
        // console.log('location', location, location.name);
        const el = document.querySelector(`[name="${location.location}"]`);
        const position = el.getBoundingClientRect().top + document.documentElement.scrollTop;
        const offset = 200;
        window.scrollTo({ top: (position - offset), behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0 , behavior: 'smooth' });

    }
}

export function scrollToFirstError(errors) {
    const firstError = Object.keys(errors)[0];
    console.log('firstError', firstError)
    if(firstError) {
        const el = document.querySelector(`[name="${firstError}"]`);
       // console.log('el',el);
        if(el) {
            const position = el.getBoundingClientRect().top;

            const offset = 0;

            window.scrollTo({top: position - offset, behavior: 'smooth'});
        }
    }

}

export function deleteRef(params){
    delete params.ref;
    return params;
}