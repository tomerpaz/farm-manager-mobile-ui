import {CONTRACTOR} from "../reducers/ResourceReducer";

export const PER_AREA_UNIT = 'PER_AREA_UNIT';
export const PER_HOUR = 'PER_HOUR';
export const PER_UNIT = 'PER_UNIT';

export const PER_KG = 'PER_KG';
export const PER_LIT = 'PER_LIT';
export const PER_TONE = 'TONNE';

export const PER_WORKER = 'PER_WORKER';
export const PER_CONTAINER = 'PER_CONTAINER';

export const PER_DAY = 'PER_DAY';
export const PER_M3 = 'PER_M3';
export const PER_WEIGHT_1000 = 'PER_WEIGHT_1000';

export const COMPOST_UNITS = [PER_LIT,PER_KG,PER_UNIT,PER_M3,PER_TONE]

export const FERTILIZER_UNITS = [PER_LIT,PER_KG,PER_UNIT,PER_M3]
export const EXECUTOR_UNITS = [PER_AREA_UNIT,PER_HOUR,PER_UNIT,PER_CONTAINER, PER_DAY]
export const EQUIPMENT_UNITS = [PER_AREA_UNIT,PER_HOUR,PER_UNIT, PER_DAY]
export const WATER_UNITS = [PER_M3, PER_LIT]
export const ACCESSORY_UNITS = [PER_UNIT, PER_LIT, PER_KG]
export const VARIETY_UNITS = [PER_UNIT,PER_KG]

export function getUnitText(unit, text, areaUnit){
    if(unit){
        if(unit === PER_AREA_UNIT && areaUnit){
            return text[areaUnit];
        }
        return text[unit.replace('PER_', '').toLowerCase()];
    }
    return '';
}

// export function getTariffUnit(resource, text){
//     if(resource) {
//         const unit = resource.inventoryUnit ? resource.inventoryUnit : resource.usageUnit
//         if (unit) {
//             return getUnitText(unit, text);
//         }
//     }
//     return '';
// }

export function getTariffUnit(resource, activityDef, areaUnit, text){
    if(resource) {
        if(resource.type === CONTRACTOR && activityDef){
            return getUnitText(activityDef.unit, text,areaUnit);
        }
        const unit = resource.inventoryUnit ? resource.inventoryUnit : resource.usageUnit

        if (unit) {
            return getUnitText(unit, text,areaUnit);
        }
    }
    return '';
}

export function getUnit(resource, activityDef){
    if(resource) {
        if(resource.type === CONTRACTOR && activityDef){
            return activityDef.unit;
        }
        const unit = resource.inventoryUnit ? resource.inventoryUnit : resource.usageUnit
        return unit;

    }
    return '';
}
