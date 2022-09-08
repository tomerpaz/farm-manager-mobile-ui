export const GENERAL = 'GENERAL';
export const GENERAL_PLAN = 'GENERAL_PLAN';
export const SPRAY = 'SPRAY';
export const SPRAY_PLAN = 'SPRAY_PLAN';
export const MARKET = 'MARKET';
export const HARVEST = 'HARVEST';
export const SCOUT = 'SCOUTING';
export const IRRIGATION = 'IRRIGATION';
export const IRRIGATION_PLAN = 'IRRIGATION_PLAN';

const CONTACROR = 'CONTACROR';


const GROWER_ACTIVITY_TYPES = [GENERAL, SPRAY, IRRIGATION, HARVEST, SCOUT, MARKET]

const GROWER_PLAN_TYPES = [GENERAL_PLAN, SPRAY, SPRAY_PLAN, IRRIGATION_PLAN]


export function getActivityTypes(role, isPlan) {
    if (isPlan) {
        return GROWER_PLAN_TYPES
    } else {
        return GROWER_ACTIVITY_TYPES;
    }
}

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
    if (SCOUT === type) {
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


export function dateToString(date) {
    if (date && date instanceof Date && !isNaN(date.valueOf())) {
        return date.toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "2-digit" })
    }
    return date;
}

export function asLocalDate(date, hyphen) {
    if (date && date instanceof Date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = date.getDate().toString();
        const space = hyphen ? "-" : "";
        return yyyy + space + (mm[1] ? mm : "0" + mm[0]) + space + (dd[1] ? dd : "0" + dd[0]);
    } else {
        return date;
    }
}



export function parseDate(date) {
    if (date !== null) {
        return asShortStringDate(Date.parse(date));
    }
    return null;
}

export function isMatchFreeTextFilter(field, freeText) {

    if (field.name.includes(freeText)) {
        return true;
    } else if (field.siteName.includes(freeText)) {
        return true;
    } else if (field.alias?.includes(freeText)) {
        return true;
    } else if (field.cropName.includes(freeText)) {
        return true;
    } else if (field.varietyName.includes(freeText)) {
        return true;
    } else {
        return false;
    }
}

export function filterFields(fields, freeText, fieldSiteFilter, fieldBaseFieldFilter) {
    let result = fields;
    if (!isStringEmpty(freeText)) {
        result = fields.filter(e => isMatchFreeTextFilter(e, freeText));
    }
    if (fieldSiteFilter !== 0) {
        result = result.filter(e => fieldSiteFilter === e.siteId);
    }
    if (fieldBaseFieldFilter !== 0) {
        result = result.filter(e => fieldBaseFieldFilter === e.baseFieldId);
    }
    return result;
}

export const buildActiviyFilter = (start, end, activityType, freeText) => {
    const filter = [];
    if (!isStringEmpty(start)) {
        filter.push(`start_${start.replaceAll('-', '')}`)
    }
    if (!isStringEmpty(end)) {
        filter.push(`end_${end.replaceAll('-', '')}`)
    }
    if (!isStringEmpty(activityType)) {
        filter.push(`activityType_${activityType}`)
    }
    if (!isStringEmpty(freeText)) {
        filter.push(`freeText_${freeText}`)
    }
    return filter;
}

export const formatNumber = (value) => {

    if (!isNaN(value)) {
        return value.toLocaleString('en-US')
    } 
    return value;
}

const thisYear =  newDate().getFullYear();
const yearOptions = [thisYear + 2, thisYear + 1, thisYear , thisYear -1, thisYear - 2, thisYear - 3];
export const getYearArray = () => {
    return yearOptions;
}

