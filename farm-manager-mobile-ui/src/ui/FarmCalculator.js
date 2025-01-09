// import { FERTILIZER } from "../reducers/ResourceReducer";
// import { PER_LIT, PER_KG, PER_M3, PER_CONTAINER } from "./Units";
// import { sumBy } from 'lodash';
// import { CONTRACTOR, WORKER, WORKER_GROUP } from "../modules/activity/types";

import { el } from "date-fns/locale";
import { CONTRACTOR, WORKER, WORKER_GROUP } from "./FarmUtil";


export function calcNPK(quntity, specificGravity, value, usageUnit) {
    let result = ((quntity * value) / 100) * specificGravity;
    if (result) {
        if ('m3' === usageUnit) {
            result = result * 1000;
        }
        return result.toFixed(2);
    }
    return 0;
}


export function calcIrrigationDays(days, frequency) {
    if (days && frequency) {
        return (days / frequency).toFixed(0);
    }
    return 1;
}

export function calcTotalWaterQtyUtilFunc(irrigationMtd, waterQty, area, daysInPeriod, irrigationDays, numberOfFields) {

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

export const PER_WATER_UNIT = 'perM3Water'
export const PER_AREA_UNIT_PER_DAY = 'perAreaUnitPerDay'
export const PER_AREA_UNIT_PER_IRREGATION_DAY = 'perAreaUnitPerIrrigationDay'
export const TOTAL_PER_AREA_UNIT = 'totalPerAreaUnit'
export const TOTAL_PER_FIELD = 'totalPerField'


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

export function calacTotalPesticideVolume(unit, pesticideDosage, sprayVolumePerAreaUnit, area) {

    const sprayVolumeValue = sprayVolumePerAreaUnit ? sprayVolumePerAreaUnit : 0;
    const point = 2;
    console.log(sprayVolumeValue,unit)
    switch (unit) {
        case 'PERCENT': {
            return toFixed((((pesticideDosage * sprayVolumeValue) / 100) * area), point);
        }
        case 'CC': {
            return toFixed((area * pesticideDosage) / 1000, point);;
        }
        case 'GRM': {
            return toFixed((area * pesticideDosage) / 1000, point);
        }
        case 'LIT': {
            return toFixed(area * pesticideDosage, toFixed(), point);
        }
        case 'KG': {
            return toFixed(area * pesticideDosage, point);
        }
        // case 'PPM': {
        //     return ((pesticideDosage * sprayVolume * 0.001) / 1000) * area;
        // }
        case 'UNIT': {
            return toFixed(area * pesticideDosage, point);
        }
        default: {
            return 0;
        }
    }
}

function toFixed(value, floatingPoint) {
    if (value) {
        return Number(value.toFixed(floatingPoint));
    } else {
        return 0;
    }

}

export function convertKelvin(value, toUnit) {
    const result = value - 273.15;
    return result.toFixed(1);
}

// export function adjustUsageAmountForTariff(amount, ru) {
//     if (ru && ru.resource && amount && amount !== 0) {
//         const r = ru.resource;
//         if (FERTILIZER === r.type && r.specificGravity !== null && r.usageUnit === LIT && r.inventoryUnit === KG) {
//             return amount * r.specificGravity;
//         }
//     }
//     return amount;
// }

// export function getTotalWeight(activityDomains) {
//     const totalWight = Number(sumBy(activityDomains, 'netWeight')).toFixed(2);
//     return totalWight;
// }



// export function isContainerResource(e, activityDef) {
//     if (e.resource) {
//         if ([WORKER, WORKER_GROUP].includes(e.resource.type) && e.resource.usageUnit === PER_CONTAINER) {
//             return true;
//         } else if ([CONTRACTOR].includes(e.resource.type) && activityDef && activityDef.unit === PER_CONTAINER) {
//             return true;
//         }
//     }
//     return false;
// }
// export function getTotalContainers(resources, selectedActivityDefOption) {
//     const activityDef = selectedActivityDefOption ? selectedActivityDefOption.element : null;
//     resources.forEach(element => {
//         if (element.groupAmount) {
//             element.groupAmount = Number(element.groupAmount);
//         }
//     });
//     const containers = Number(sumBy(resources.filter(e => isContainerResource(e, activityDef)), 'groupAmount')).toFixed(2);
//     return containers;
// }


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

export function calcSprayVolumePerArea(volume, area) {
    if (volume && area && area > 0) {
        return (volume / area).toFixed(2);
    }
}

export function calcSprayVolume(volumePerArea, area) {
    if (volumePerArea && area) {
        return (volumePerArea * area).toFixed(0);
    }
}

