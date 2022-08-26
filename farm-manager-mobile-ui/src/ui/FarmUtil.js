export const GENERAL = 'GENERAL';
export const GENERAL_PLAN = 'GENERAL_PLAN';
export const SPRAY = 'SPRAY';
export const SPRAY_PLAN = 'SPRAY_PLAN';
export const MARKET = 'MARKET';
export const HARVEST = 'HARVEST';
export const SCOUT = 'SCOUT';
export const IRRIGATION = 'IRRIGATION';

const CONTACROR = 'CONTACROR';


export const displayFieldName = (field) => {
    return field.alias ? `${field.name}, ${field.alias}` : field.name;
}

export const displayFieldArea = (field, areaUnit, text) => {
    return `${field.area} ${text[areaUnit]}`;
}
const AREA_UNIT = "area_unit";

export const getUnitText = (unit, areaUnit, text) => {
    if (isStringEmpty(unit)) {
        return '';
    }
    const value = unit.toLowerCase();
    if (value === AREA_UNIT) {
        return text[areaUnit];
    }
    const result = text[value];
    if (isStringEmpty(result)) {
        console.log('Translate: ', value)

        return '';
    } else return result;
}

export const getResourceTypeText = (type, text) => {
    if (isStringEmpty(type)) {
        return '';
    }
    const value = type.toLowerCase();

    const result = text[value];
    if (result) {
        return result;
    }
    else {
        console.log('Translate: ', value)
        return '';
    }
}

export const getResourceUsageUnit = (resource, activityDef) => {
    if (activityDef && CONTACROR === resource.type) {
        return activityDef.unit;
    }
    return resource.usageUnit;
}

export const getActivityTypeText = (type, text) => {
    if(SCOUT === type){
        return text.scouting;
    }
    return [GENERAL, GENERAL_PLAN].includes(type) ? text.activity : text[type.toLowerCase()];

}

export function isArrayEmpty(filterValue, filterNulls) {
    if (filterNulls) {
        return !filterValue || filterValue.filter(e => e !== null).length === 0;
    } else {
        return !filterValue || filterValue.length === 0;
    }
}

export function isStringEmpty(str) {
    return (!str || /^\s*$/.test(str));
}


export function toUTCDate(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), 0, 0) / 1000;//minutes,seconds,milliseconds
}

export function newDate() {
    var date = new Date();
    return date;
}

export function subtractYear(date, years) {
    const val = years ? years : 1;
    const d = new Date(date.getTime());
    d.setYear(d.getFullYear() - val);
    return d;
}

export function subtractDays(date, days) {
    return new Date(date - (1000 * 60 * 60 * 24 * days))
   
}

export function asShortStringDate(time) {
    if (time !== null) {
        return new Date(time).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "2-digit" })
    }
    return null;
}