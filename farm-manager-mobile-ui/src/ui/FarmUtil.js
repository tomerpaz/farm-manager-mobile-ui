import { grey } from "@mui/material/colors";
import { parseISO } from "date-fns";
import { selectShowInventory } from "../features/app/appSlice";
import { useSelector } from "react-redux";

export const UI_SIZE = 'medium';

export const GENERAL = 'GENERAL';
export const GENERAL_PLAN = 'GENERAL_PLAN';
export const SPRAY = 'SPRAY';
export const SPRAY_PLAN = 'SPRAY_PLAN';
export const MARKET = 'MARKET';
export const HARVEST = 'HARVEST';
export const SCOUT = 'SCOUTING';
export const IRRIGATION = 'IRRIGATION';
export const IRRIGATION_PLAN = 'IRRIGATION_PLAN';

export const INVENTORY = 'INVENTORY';


const GROWER_ACTIVITY_TYPES = [GENERAL, SPRAY, IRRIGATION, HARVEST, MARKET];

const GROWER_ACTIVITY_TYPES_MAP = [GENERAL, SPRAY, IRRIGATION, HARVEST, MARKET];//.concat(SCOUT)


const GROWER_PLAN_TYPES = [GENERAL_PLAN, SPRAY_PLAN, IRRIGATION_PLAN];

export const CUSTOMER_TYPES = [HARVEST, MARKET]


export const SPRAY_TYPES = [SPRAY, SPRAY_PLAN]
export const IRRIGARION_TYPES = [IRRIGATION, IRRIGATION_PLAN]
export const ACTIVITY_DEF_TYPES = [GENERAL, GENERAL_PLAN, HARVEST]


export const WORKER = 'WORKER';
export const CONTRACTOR = 'CONTRACTOR';
export const WORKER_GROUP = 'WORKER_GROUP';
export const FERTILIZER = 'FERTILIZER';
export const PESTICIDE = 'PESTICIDE';
export const ENERGY = 'ENERGY';
export const ACCESSORY = 'ACCESSORY';
export const VARIETY = 'VARIETY';
export const COMPOST = 'COMPOST';
export const EQUIPMENT = 'EQUIPMENT';
export const DISINFECTANT = 'DISINFECTANT';
export const WATER = 'WATER';

export const SPRAYER = 'SPRAYER';
export const LIST_PESTICIDE = 'listPesticide';

export const WAREHOUSE_RESOURCE_TYPE = [PESTICIDE, FERTILIZER, ACCESSORY, VARIETY]
export const QTY_PER_AREA_UNIT_RESOURCE_TYPE = [PESTICIDE, FERTILIZER, ACCESSORY, VARIETY, COMPOST, DISINFECTANT]
export const SECONDARY_QTY_RESOURCES = [
    { type: WATER, label: 'publicSource', lessThanQty: true, gg: true },
    { type: ENERGY, label: 'renewable', lessThanQty: true, gg: true }]


export const ACTIVITY_RESOURCES = [
    { activity: GENERAL, types: [WORKER, CONTRACTOR, WORKER_GROUP, EQUIPMENT, PESTICIDE, FERTILIZER, ACCESSORY, VARIETY, COMPOST, DISINFECTANT, ENERGY] },
    { activity: SPRAY, types: [SPRAYER, LIST_PESTICIDE, WORKER, CONTRACTOR, WORKER_GROUP, EQUIPMENT, FERTILIZER] },
    { activity: HARVEST, types: [WORKER, CONTRACTOR, WORKER_GROUP, EQUIPMENT, ACCESSORY] },
    { activity: IRRIGATION, types: [WATER, FERTILIZER, PESTICIDE, WORKER, CONTRACTOR, WORKER_GROUP, ACCESSORY] }
]

export const tableHeaderSx = { fontWeight: 'bold', padding: 0.5 };
export const tableCellSx = { padding: 0.5 };


export function getBottomNavigationSx(disabled) {
    return disabled ? { color: grey[400] } : null;
}

export function getActivityTypes(role, isMap, isPlan) {
    if (isMap) {
        return GROWER_ACTIVITY_TYPES_MAP
    } else if (isPlan) {
        return GROWER_PLAN_TYPES
    } else {
        return GROWER_ACTIVITY_TYPES;
    }
}

export const PLAN = 'PLAN';
export const EXECUTED = 'EXECUTED';

export function getActivityStatuses(role, isPlan) {
    if (isPlan) {
        return [PLAN, EXECUTED]
    } else {
        return [];
    }
}

export const activityDescription = (e, text) => {
    return e.activityDef ? e.activityDef.name : text[e.type.toLowerCase()];
}

export const maxLenghtStr = (str, maxLenght) => {
    return !isStringEmpty(str) || str.lenght > maxLenght ? str.slice(0, maxLenght) : str
}

export const displayFieldName = (field) => {
    return field.alias ? `${field.name}, ${field.alias}` : field.name;
}

export const displayFieldArea = (field, areaUnit, text) => {
    return `${field.area} ${text[areaUnit]}`;
}
export const AREA_UNIT = "area_unit";
export const HOUR = "hour";

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

export const getActivityStatusText = (type, text) => {
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
    if (activityDef && CONTRACTOR === resource.type) {
        return activityDef.unit;
    }
    return resource.usageUnit;
}

export const getActivityTypeText = (type, text, long) => {
    if (SCOUT === type) {
        return text.scouting;
    }
    if (long) {
        if (IRRIGARION_TYPES.includes(type)) {
            return `${text[type.toLowerCase()]} ${text.and}${text.fertilization}`
        }
    }
    return [GENERAL].includes(type) ? text.activity : text[type.toLowerCase()];

}


export function isArrayEmpty(filterValue, filterNulls) {
    if (filterNulls) {
        return !filterValue || filterValue.filter(e => e !== null).length === 0;
    } else {
        return !filterValue || filterValue.length === 0;
    }
}

export function isStringEmpty(str, print) {
    if (print) {
        console.log('isStringEmpty', str, print)
    }
    return (!str || /^\s*$/.test(str));
}


export function toUTCDate(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), 0, 0) / 1000;//minutes,seconds,milliseconds
}

export function newDate() {
    var date = new Date();
    return date;
}
export function startOfDay(date) {
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

export function endOfDay(date) {
    date.setUTCHours(23, 59, 59, 999);;
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

export function asLocalTime(date, hyphen) {
    if (date && date instanceof Date) {
        var hh = date.getHours().toString();
        var mm = (date.getMinutes()).toString(); // getMonth() is zero-based         
        const space = hyphen ? "-" : "";
        return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":00"
    } else {
        return date;
    }
}

export function parseISOOrNull(date) {
    return date ? parseISO(date) : null;
}


export const daysDiff = (before, after) => {
    if (before && after) {
        let difference = (endOfDay(after).getTime()) - (startOfDay(before).getTime());
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }
    return 0;
}

export const daysDiffToday = (before) => {
    const after = newDate()
    if (before) {
        let difference = (endOfDay(after).getTime()) - (startOfDay(before).getTime());
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }
    return 0;
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

export const ACTIVE = 'active';
export const INACTIVE = 'inactive';
export const ALL = 'all';

export function filterFields(fields, freeText, fieldSiteFilter, fieldBaseFieldFilter, fieldsViewStatus) {
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
    if ([ACTIVE, INACTIVE].includes(fieldsViewStatus)) {
        if (ACTIVE === fieldsViewStatus) {
            result = result.filter(e => e.endDate === null);
        } else {
            result = result.filter(e => e.endDate !== null);
        }
    }
    return result;
}

export const buildActiviyFilter = (start, end, activityType, freeText, status) => {
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
    if (!isStringEmpty(status)) {
        filter.push(`status_${status}`)
    }
    return filter;
}

export const formatNumber = (value) => {

    if (!isNaN(value)) {
        return value.toLocaleString('en-US')
    }
    return value;
}

const thisYear = newDate().getFullYear();
const yearOptions = [thisYear + 2, thisYear + 1, thisYear, thisYear - 1, thisYear - 2, thisYear - 3];
export const getYearArray = () => {
    return yearOptions;
}


export function getOpacity(field) {
    return field.endDate ? 1 : 0.3;
}

export function getFillColor(field) {
    if (field.endDate) {
        return '#FFFFFF';
    } else {
        return field.color;
    }
}

export function getWinds() {
    return ['windSpeedNone', 'windSpeedCalm', 'windSpeedStrong']
}

export function getMarketingDestinations() {
    return ['noneDestination', 'exportDestination', 'localMarketDestination', 'industryDestination']
}

export function getMarketingIncomeCalcOptions() {
    return ['weight','amount','area']
}


export function safeDiv(numerator, denominator) {
    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 0;
    }

    else return (numerator / denominator).toFixed(2)
}

export function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

export function getMinDateWidth() {
    return isMobile() ? 115 : 150;
}

export function firstDayOfThisMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
}

export function lastDayOfThisMonth() {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;

}

export function isInventoryPossible(userConf){
    return userConf.find(e=>e.type === INVENTORY) ? true : false;
}

// export function daysDif(before, after){
//     if(after && before){
//         return (((after.getTime() - before .getTime())/(1000 * 3600 * 24))+2).toFixed(0) 
//     }
//     return 0;

// }