import { FERTILIZER } from "../reducers/ResourceReducer";
import { PER_LIT, PER_KG, PER_M3, PER_CONTAINER } from "./Units";
import { sumBy } from 'lodash';
import { CONTRACTOR, WORKER, WORKER_GROUP } from "../modules/activity/types";


export function calcNPK(quntity, specificGravity, value, usageUnit) {
    let result = ((quntity * value) / 100) * specificGravity;
    if (result) {
        if (PER_M3 === usageUnit) {
            result = result * 1000;
        }
        return result.toFixed(2);
    }
    return 0;
}


export function calcTotalWaterQtyUtilFunc(irrigationMtd, waterQty, area, daysInPeriod, irrigationDays, numberOfFields) {
    // if (IrrigationMethod.PER_AREA_UNIT_PER_DAY.equals(irrigationMtd)) {
    //     return waterQty * area * daysInPeriod;
    // } else if (IrrigationMethod.PER_AREA_UNIT_PER_IRREGATION_DAY.equals(irrigationMtd)) {
    //     return waterQty * area * irrigationDays;
    // } else if (IrrigationMethod.TOTAL_PER_AREA_UNIT.equals(irrigationMtd)) {
    //     return waterQty * area;
    // } else if (IrrigationMethod.TOTAL_PER_FIELD.equals(irrigationMtd)) {
    //     return waterQty * numberOfFields;
    // }
    switch (irrigationMtd) {

        case PER_AREA_UNIT_PER_DAY: {
            return waterQty * area * daysInPeriod;
        }
        case PER_AREA_UNIT_PER_IRREGATION_DAY: {
            return waterQty * area * irrigationDays;
        }
        case TOTAL_PER_AREA_UNIT: {
            return waterQty * area;
        }
        case TOTAL_PER_FIELD: {
            return waterQty * numberOfFields;
        }
        default: {
            return waterQty;
        }
    }
}

export const PER_WATER_UNIT = 'PER_WATER_UNIT'
export const PER_AREA_UNIT_PER_DAY = 'PER_AREA_UNIT_PER_DAY'
export const PER_AREA_UNIT_PER_IRREGATION_DAY = 'PER_AREA_UNIT_PER_IRREGATION_DAY'
export const TOTAL_PER_AREA_UNIT = 'TOTAL_PER_AREA_UNIT'
export const TOTAL_PER_FIELD = 'TOTAL_PER_FIELD'
export const TOTAL_IN_FIELDS = 'TOTAL_IN_FIELDS'


export function calcTotalFertilizerQty(fertilizeMethod, fertilizerQty, totalWaterQty, area, daysInPeriod, irrigationDays, numberOfFields) {
    switch (fertilizeMethod) {
        case PER_WATER_UNIT: {
            return fertilizerQty * totalWaterQty;
        }
        case PER_AREA_UNIT_PER_DAY: {
            return fertilizerQty * area * daysInPeriod;
        }
        case PER_AREA_UNIT_PER_IRREGATION_DAY: {
            return fertilizerQty * area * irrigationDays;
        }
        case TOTAL_PER_AREA_UNIT: {
            return fertilizerQty * area;
        }
        case TOTAL_PER_FIELD: {
            return fertilizerQty * numberOfFields;
        }
        default: {
            return fertilizerQty * 1;
        }
    }
}

export function calcSprayerCount(area, sprayerCapacity, sprayVolume) {
    if (area && sprayerCapacity && sprayVolume && sprayerCapacity > 0) {
        return (area * sprayVolume) / sprayerCapacity;
    } else {
        return 0;
    }
}

export function calacTotalPesticideVolume(unit, pesticideDosage, sprayVolume, area) {

    switch (unit) {
        case 'PERCENT': {
            return ((pesticideDosage * sprayVolume) / 100) * area;
        }
        case 'CC': {
            return (area * pesticideDosage) / 1000;
        }
        case 'GRM': {
            return (area * pesticideDosage) / 1000;
        }
        case 'LIT': {
            return area * pesticideDosage;
        }
        case 'KG': {
            return area * pesticideDosage;
        }
        // case 'PPM': {
        //     return ((pesticideDosage * sprayVolume * 0.001) / 1000) * area;
        // }
        case 'UNIT': {
            return area * pesticideDosage;
        }
        default: {
            return 0;
        }
    }
}

export function convertKelvin(value, toUnit) {
    const result = value - 273.15;
    return result.toFixed(1);
}

export function adjustUsageAmountForTariff(amount, ru) {
    if (ru && ru.resource && amount && amount !== 0) {
        const r = ru.resource;
        if (FERTILIZER === r.type && r.specificGravity !== null && r.usageUnit === PER_LIT && r.inventoryUnit === PER_KG) {
            return amount * r.specificGravity;
        }
    }
    return amount;
}

export function getTotalWeight(activityDomains) {
    const totalWight = Number(sumBy(activityDomains, 'netWeight')).toFixed(2);
    return totalWight;
}



export function isContainerResource(e, activityDef) {
    if (e.resource) {
        if ([WORKER, WORKER_GROUP].includes(e.resource.type) && e.resource.usageUnit === PER_CONTAINER) {
            return true;
        } else if ([CONTRACTOR].includes(e.resource.type) && activityDef && activityDef.unit === PER_CONTAINER) {
            return true;
        }
    }
    return false;
}
export function getTotalContainers(resources, selectedActivityDefOption) {
    const activityDef = selectedActivityDefOption ? selectedActivityDefOption.element : null;
    resources.forEach(element => {
        if (element.groupAmount) {
            element.groupAmount = Number(element.groupAmount);
        }
    });
    const containers = Number(sumBy(resources.filter(e => isContainerResource(e, activityDef)), 'groupAmount')).toFixed(2);
    return containers;
}


export function withinPerscentRange(first, second, percentage) {
    if (first !== null && second !== null) {
        if (first === second) {
            return true;
        }
        if (first === 0 && second > 0) {
            return false;
        }
        if (second === 0 && first > 0) {
            return false;
        }
        if (first >= second) {
            return first < (second * Number("1." + percentage));
        } else {
            return second < first * Number("1." + percentage);
        }
    } if (first == null && second == null) {
        return true;
    }
    return false;
}