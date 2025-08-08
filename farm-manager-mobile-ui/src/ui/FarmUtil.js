import { grey } from "@mui/material/colors";
import { parseISO } from "date-fns";
import { selectShowInventory } from "../features/app/appSlice";
import { useSelector } from "react-redux";
import { Tooltip } from "react-leaflet";
import { Box, Typography } from "@mui/material";
import { position } from "stylis";
import { fi } from "date-fns/locale";

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
export const PLANS = 'PLANS';


const GROWER_ACTIVITY_TYPES = [GENERAL, SPRAY, SCOUT, IRRIGATION, HARVEST, MARKET];

const GROWER_ACTIVITY_TYPES_MAP = [GENERAL, SPRAY, SCOUT, IRRIGATION, HARVEST, MARKET];//.concat(SCOUT)


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
    { activity: IRRIGATION, types: [WATER, FERTILIZER, PESTICIDE, WORKER, CONTRACTOR, WORKER_GROUP, ACCESSORY] },
    { activity: SCOUT, types: [LIST_PESTICIDE] }

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
    if (!e) {
        return '';
    }
    return e?.activityDef ? e.activityDef?.name : text[e.type.toLowerCase()];
}

export const activityLongText = (e, text) => {
    if (!e) {
        return '';
    }
    if (e.type === SCOUT) {
        return e.scoutParams?.scouts?.map(s => s.finding.name).join(", ")
    } else {
        return e.note
    }
    //  return 'e'
    // return e.activityDef ? e.activityDef.name : text[e.type.toLowerCase()];
}

export const maxLenghtStr = (str, maxLenght) => {
    return !isStringEmpty(str) || str.lenght > maxLenght ? str.slice(0, maxLenght) : str
}

export const displayFieldName = (field) => {
    if (field) {
        return field.alias ? `${field.name}, ${field.alias}` : field.name;
    } else {
        return '';
    }
}

export const mapDisplayFieldName = (field, showName, showAlias, showOfficialFieldId) => {
    var tooltipText = [];
    if (showName) {
        tooltipText.push(field.name)
    }
    if (showAlias && !isStringEmpty(field.alias)) {
        tooltipText.push(field.name)
    }
    if (showOfficialFieldId && !isStringEmpty(field.baseFieldOfficialId)) {
        tooltipText.push(field.baseFieldOfficialId)
    }

    return tooltipText.join(', ')
    // if (showName && !showAlias) {
    //     return field.name;
    // } else if (!showName && showAlias) {
    //     return field.alias ? field.alias : '';
    // } else {
    //     return field.alias ? `${field.name}, ${field.alias}` : field.name;
    // }
}

export const mapTextStyle = {
    color: 'white',
    textShadow: '-1px 1px 0 #000,1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000'
}

export const MAX_PER_MAP = 600;


export const MapToolTip = ({ textArr, large }) => {
    const variant = large ? 'h6' : 'subtitle1';

    return <Tooltip
        className={'empty-tooltip'}
        direction="center" opacity={0.8} permanent>
        {textArr.map((e, index) =>
            <Typography key={index} variant={variant} style={mapTextStyle} >{e}</Typography>
        )}
    </Tooltip>
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

export function asShortStringDateTime(time) {
    if (time !== null) {
        return new Date(time).toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
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

export function setISODate(entity, param) {
    if (entity && entity[param]) {
        entity[param] = parseISOOrNull(entity[param])
    }
}

export function setEmptyIfNull(entity, param) {
    if (entity && !entity[param]) {
        entity[param] = '';
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

export function asLocalDateTime(date, hyphen) {
    if (date && date instanceof Date) {

        var yyyy = date.getFullYear().toString();
        var MM = (date.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = date.getDate().toString();

        var hh = date.getHours().toString();
        var mm = (date.getMinutes()).toString(); // getMonth() is zero-based         
        const space = hyphen ? "-" : "";
        return yyyy + space + (MM[1] ? MM : "0" + MM[0]) + space + (dd[1] ? dd : "0" + dd[0]) + 'T' + (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":00"
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

export function parseDateTime(date) {
    if (date !== null) {
        return asShortStringDateTime(Date.parse(date));
    }
    return null;
}


export function isMatchFieldFilterOptions(field, filterOptions) {
    const matchFilter = filterOptions.find(e => {
        const entry = e.key.split('_');
        const type = entry[0];
        const id = Number(entry[1]);
        const isMatchOption = isFieldMatchOption(field, type, id);
        if (isMatchOption) {
            return e;
        }

    });
    return matchFilter ? true : null;
}

export function isFieldMatchOption(field, type, id) {
    if (type === 'field') {
        return field.baseFieldId === id;
    } else if (type === 'site') {
        return field.siteId === id;
    } else if (type === 'variety') {
        return field.varietyId === id;
    } else if (type === 'crop') {
        return field.cropId === id;
    } else if (type === 'tag1') {
        return field.tag1Id === id;
    } else if (type === 'tag2') {
        return field.tag2Id === id;
    } else if (type === 'parentField') {
        return field.parentFieldId === id;
    } else {
        return false;
    }
}

export function isMatchFreeTextFilter(field, freeText) {
    if (field.alias?.includes(freeText) || field.note?.includes(freeText)) {
        return true;
    }
}

export const ACTIVE = 'active';
export const INACTIVE = 'inactive';
export const ALL = 'all';

export function filterFields(fields, filterOptions, freeText, fieldsViewStatus) {
    let result = fields;
    if (!isStringEmpty(freeText)) {
        result = fields.filter(e => isMatchFreeTextFilter(e, freeText));
    }
    if (!isArrayEmpty(filterOptions)) {
        result = result.filter(e => isMatchFieldFilterOptions(e, filterOptions));
    }
    // if (fieldSiteFilter !== 0) {
    //     result = result.filter(e => fieldSiteFilter === e.siteId);
    // }
    // if (fieldBaseFieldFilter !== 0) {
    //     result = result.filter(e => fieldBaseFieldFilter === e.baseFieldId);
    // }
    if ([ACTIVE, INACTIVE].includes(fieldsViewStatus)) {
        if (ACTIVE === fieldsViewStatus) {
            result = result.filter(e => e.endDate === null);
        } else {
            result = result.filter(e => e.endDate !== null);
        }
    }
    return result;
}

export const buildActiviesFilter = (start, end, freeText, autoComplete) => {
    const filter = autoComplete.map(e => e.key);
    if (!isStringEmpty(start)) {
        filter.push(`start_${start.replaceAll('-', '')}`)
    }
    if (!isStringEmpty(end)) {
        filter.push(`end_${end.replaceAll('-', '')}`)
    }
    if (!isStringEmpty(freeText)) {
        filter.push(`freeText_${freeText}`)
    }
    return filter;
}

//Depricated
export const buildActiviyFilter = (start, end, freeText) => {
    const filter = [];
    if (!isStringEmpty(start)) {
        filter.push(`start_${start.replaceAll('-', '')}`)
    }
    if (!isStringEmpty(end)) {
        filter.push(`end_${end.replaceAll('-', '')}`)
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
    return ['weight', 'amount', 'area']
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

export function isInventoryPossible(userConf) {
    return userConf.find(e => e.type === INVENTORY) ? true : false;
}

export function isPlansPossible(userConf) {
    return userConf.find(e => e.type === INVENTORY) ? true : false;
}

export const trap = 'trap';
export const generic = 'generic';
export const tree = 'tree';
export const irrigationHead = 'irrigationHead';


export const pointTypeColor = [{ type: trap, color: "red" }, { type: tree, color: "green" }, { type: irrigationHead, color: "blue" }, { type: generic, color: "orange" }]


export const getPointTypeColor = (type) => {
    return pointTypeColor.find(e => e.type === type)?.color;
}

export function getPointTypes() {
    return [generic, tree, trap, irrigationHead]
}


export function stopMapEventPropagation(e) {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
}

export const FormSpacer = () => {
    return <Box margin={1} />
}

export const getFieldCenter = (center, field) => {
    if (center) {
        return center;
    } else if (field.lat && field.lng) {
        return [field.lat, field.lng];
    } else if (!isArrayEmpty(field.geoPoints)) {
        return field.geoPoints[0];
    }
}

export const countLines = (text) => {
    if (text) {
        const lines = text.split('\n').length;
        return lines;
    }
    return 0;
}

export const getExpieryText = (text, type) => {
    if ([trap].includes(type)) {
        return text.baitExpiry;
    } else {
        return text.expiry;
    }

}

const geoOptions = {
    enableHighAccuracy: true,
    timeOut: 5000
};

export const getGeoCurrentPosition = (setPosition) => {

    if (isMobile() && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, setPosition(-1), geoOptions);
    }
    else {
        setPosition(-2)
    }
}

export const getGeoPosition = (setPosition) => {



    const geoSucces = (position) => {
        setPosition([position.coords.latitude, position.coords.longitude])
    }

    const goFailure = (err) => {
        console.log('Error getCurrentPosition: ' + err);
        setPosition(-1);
    }

    if (isMobile() && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSucces, goFailure, geoOptions);
    }
    else {
        setPosition(-2)
    }
}

export function isPointInPoly(poly, pt) {
    if (isArrayEmpty(poly) || isArrayEmpty(pt)) {
        return false;
    }
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
            && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
            && (c = !c);
    return c;
}

export const buildFieldOptions = (fields) => {
    if (isArrayEmpty(fields)) {
        return [];
    }
    const options =
        (fields.map(e => { return { key: 'field_' + e.baseFieldId, id: e.baseFieldId, label: e.name, element: e } }))
            .concat(fields.map(e => { return { key: 'site_' + e.siteId, id: e.id, label: e.siteName, element: e } }))
            .concat(fields.map(e => { return { key: 'crop_' + e.cropId, id: e.id, label: e.cropName, element: e } }))
            .concat(fields.map(e => { return { key: 'variety_' + e.varietyId, id: e.id, label: e.varietyName, element: e } }))
            .concat(fields.filter(e => e.parentFieldId !== null).map(e => { return { key: 'parentField_' + e.parentFieldId, id: e.parentFieldId, label: e.parentFieldName, element: e } }))
            .concat(fields.filter(e => e.tag1Id !== null).map(e => { return { key: 'tag1_' + e.tag1Id, id: e.tag1Id, label: e.tag1Name, element: e } }))
            .concat(fields.filter(e => e.tag2Id !== null).map(e => { return { key: 'tag2_' + e.tag2Id, id: e.tag2Id, label: e.tag2Name, element: e } }))

    return uniqueArray(options, 'key');
}

const isFieldKey = (key) => {
    const stateList = ['field_','crop_','variety_','parentField_','tag1_','tag2_']
    var result = stateList.filter(e => key.startsWith(e));
    console.log('result',result)
    return result.length !== 0;
}

export const buildActivityOptions = (fields, fieldId, text, isPlan, role) => {
    const options =
        getActivityStatuses(role, isPlan).map(e => {
            return { key: 'status_' + e, id: e, label: getActivityStatusText(e, text), element: e }
        })
            .concat(
                getActivityTypes(role, false, isPlan).map(e => {
                    return { key: 'activityType_' + e, id: e, label: getActivityTypeText(e, text), element: e }
                }))
            .concat( isNaN(fieldId) ? buildFieldOptions(fields) : [])
    return uniqueArray(options, 'key');
}

export const removeRedundantSelectedActivityOptions = (options, fieldId) => {
    return isNaN(Number(fieldId)) ? options : options.filter(e=> !isFieldKey(e.key));
}



const uniqueArray = (array, propertyName) => {
    return [...new Map(array.map(item => [item[propertyName], item])).values()];
    /*
        const attr = isStringEmpty(propertyName) ? 'key' : propertyName;
        return array.reduce((acc, current) => {
            const x = acc.find(item => item[attr] === current[attr]);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);*/
}

const fieldDisplayText = (f) => {
    if (isStringEmpty(f.alias)) {
        return f.name;
    } else {
        return `${f.name} (${f.alias})`
    }
}



/*
export function buildDomainFilter(domains, cropID) {
    const filterDomains = cropID ? domains.filter(domain => domain.variety.cropID === cropID) : domains;

    let fieldFilter = filterDomains.map(domain => (
        {
            value: 'field_' + domain.field.id,
            label: addBusinessName(domain, getFieldName(domain)),
        }
    ));

    let sites = filterDomains.map(domain => {
        if (domain.field.site)
            return (
                {
                    value: 'site_' + domain.field.site.id,
                    label: domain.field.site.name
                }
            )
    });
    let parentField = filterDomains.map(domain => {
        if (domain.field.parentField)
            return (
                {
                    value: 'parentField_' + domain.field.parentField.id,
                    label: domain.field.parentField.name
                }
            )
    });
    let crops = filterDomains.filter(domain => !isEmpty(domain.variety.identification)).map(domain => (
        {
            value: 'crop_' + domain.variety.cropID,
            label: addBusinessName(domain, domain.variety.category),
        }
    ));
    let varieties = filterDomains.filter(domain => !isEmpty(domain.variety.name)).map(domain => {
        return (
            {
                value: 'variety_' + domain.variety.id,
                label: addBusinessName(domain, domain.variety.name),

            }
        )
    });

    let tag1 = filterDomains.map(domain => {
        if (domain.tag1)
            return (
                {
                    value: 'tag1_' + domain.tag1.id,
                    label: domain.tag1.name
                }
            )
    });

    let tag2 = filterDomains.map(domain => {
        if (domain.tag2)
            return (
                {
                    value: 'tag2_' + domain.tag2.id,
                    label: domain.tag2.name
                }
            )
    });

    let all = [];
    if (!cropID) {
        all = all.concat(uniqBy(crops, 'value'));
    }
    all = all.concat(uniqBy(varieties, 'value'));
    all = all.concat(uniqBy(sites, 'value'));
    all = all.concat(uniqBy(parentField, 'value'));
    all = all.concat(uniqBy(fieldFilter, 'value'));
    all = all.concat(uniqBy(tag1, 'value'));
    all = all.concat(uniqBy(tag2, 'value'));

    return all.filter((element) => element !== undefined);
}


export function filterDomainsFreeText(domains, filter) {
    if (isEmpty(filter)) {
        return domains;
    }
    return domains.filter(d =>
        d.field.name.includes(filter) ||
        d.variety.name.includes(filter) ||
        d.variety.category.includes(filter) ||
        (!isEmpty(''+d.year) && (''+d.year).includes(filter)) ||
        (!isEmpty(d.alias) && d.alias.includes(filter)) ||
        (!isEmpty(d.description) && d.description.includes(filter)) ||
        // (d.field.site !== null && d.field.site.name.includes(filter)) ||
        (d.field.parentField !== null && !isEmpty(d.field.parentField.code) && d.field.parentField.code.includes(filter))
    );
}

*/