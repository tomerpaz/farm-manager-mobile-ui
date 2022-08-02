
export function isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

export const reverseString = (str, dir) => {
    return str;
    // if (!isEmpty(str) && dir === 'rtl') {
    //     return str.split("").reverse().join("");
    // }
    // else {
    //     return str
    // }
}


export const getMaxText = (str, max) => {
    if (isEmpty(str)) {
        return '';
    } else if (str.length > max) {
        return str.slice(0, max) + '...'
    } else { 
        return str 
    }
}   