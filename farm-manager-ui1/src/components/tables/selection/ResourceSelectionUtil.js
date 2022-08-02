import {
    COMPOST,
    DISINFECTANT,
    EQUIPMENT,
    PROCUREMENT,
} from '../../../modules/activity/types'
import { getUnitText, newDate } from "../../../utils";
import { PESTICIDE_LIST_PESTICIDES, VARIETIES, EXECUTORS, FERTILIZERS, ACCESSORIES, WATERSOURCES, PESTICIDES, ENERGIES } from './ResourceSelectionTable';
import { buildPesticideFilterOptions } from '../../filters/filterUtil';
import { getMinDosage } from '../../../modules/activity/ActivityUtil';
import { WORKER_GROUP } from '../../../reducers/ResourceReducer';

export function getTableColumns(text, areaUnit, selectedTab) {

    switch (selectedTab) {
        case FERTILIZERS: {
            const columns = [
                { name: 'name', title: text.name, width: 200 },
                {
                    name: 'usageUnit', title: text.unit, width: 150,
                    getCellValue: row => getUnitText(row.usageUnit, text, areaUnit),
                },
                {
                    name: 'category', title: text.type,
                    getCellValue: row => text[row.category.toLowerCase()],
                    width: 30
                },

                {
                    name: 'specificGravity', title: text.specificGravity,
                    width: 30
                },


                { name: 'n', title: 'N', width: 30 },

                { name: 'p', title: 'P', width: 30 },

                { name: 'k', title: 'K', width: 30 },
            ];
            return columns;
        }
        case EQUIPMENT: {
            const columns = [
                { name: 'name', title: text.name, width: 200 },
                {
                    name: 'type',
                    title: text.type,
                    getCellValue: row => text[row.type.toLowerCase()],
                    width: 40
                },
                {
                    name: 'category', title: text.category,
                    getCellValue: row => text[row.category.toLowerCase()],
                    width: 30
                },

            ];
            return columns;
        }
        case VARIETIES: {
            const columns = [
                { name: 'name', title: text.name, width: 200 },
                {
                    name: 'type',
                    title: text.type,
                    getCellValue: row => text[row.type.toLowerCase()],
                    width: 40
                },
                {
                    name: 'identification', title: text.crop,
                    getCellValue: row => row.category.toLowerCase(),
                    width: 30
                },

            ];
            return columns;
        }
        case PESTICIDE_LIST_PESTICIDES: {
            const columns = [
                { name: 'name', title: text.name, getCellValue: row => row.resource.name },
                {
                    name: 'category', title: text.type,
                    getCellValue: row => row.resource.identification,
                    width: 30
                },

                { name: 'pestText', title: text.pests, width: 30 },
                { name: 'interval', title: text.interval, width: 30 },
                { name: 'unit', title: text.unit, getCellValue: row => text[row.unit.toLowerCase()], },
                { name: 'dosage', title: text.dosage, width: 30 },

            ];
            return columns;
        }
        case EXECUTORS: {
            const columns = [
                { name: 'name', title: text.name, width: 200 },
                {
                    name: 'usageUnit', title: text.unit, width: 150,
                    getCellValue: row => getUnitText(row.usageUnit, text, areaUnit),
                },

                {
                    name: 'type',
                    title: text.type,
                    getCellValue: row => text[row.type.toLowerCase()],
                    width: 40
                },
            ];
            return columns;
        }
        default: {
            const columns = [
                { name: 'name', title: text.name, width: 115 },
                {
                    name: 'usageUnit', title: text.unit, width: 150,
                    getCellValue: row => getUnitText(row.usageUnit, text, areaUnit),
                },
                {
                    name: 'type',
                    title: text.type,
                    getCellValue: row => text[row.type.toLowerCase()],
                    width: 40
                },
            ];
            return columns;
        }


    }
}

export function getResourceOptions(props, selectedTab) {
    const {
        executorTypeOptions, executorOptions, equipmentCategoryOptions, equipmentOptions, compostOptions, disinfectantOptions,
        pesticideOptions, fertilizerOptions, accessoryOptions, varietyResourceOptions, cropOptions, waterSourceOptions, listPesticides,
        energyOptions
    } = props;
    // const {selectedTab} = this.state;
    //EXECUTORS, EQUIPMENT, COMPOST, DISINFECTANT, PESTICIDES, FERTILIZERS, ACCESSORIES, VARIETIES
    if (selectedTab === EXECUTORS) {
        return executorTypeOptions.concat(executorOptions);
    } else if (selectedTab === EQUIPMENT) {
        return equipmentCategoryOptions.concat(equipmentOptions);
    } else if (selectedTab === COMPOST) {
        return compostOptions;
    } else if (selectedTab === DISINFECTANT) {
        return disinfectantOptions;
    } else if (selectedTab === PESTICIDES) {
        return pesticideOptions;
    } else if (selectedTab === FERTILIZERS) {
        return fertilizerOptions;
    } else if (selectedTab === ACCESSORIES) {
        return accessoryOptions;
    } else if (selectedTab === VARIETIES) {
        return cropOptions.concat(varietyResourceOptions);
    } else if (selectedTab === WATERSOURCES) {
        return waterSourceOptions;
    } else if (selectedTab === PESTICIDE_LIST_PESTICIDES) {
        return buildPesticideFilterOptions(listPesticides);
    } else if (selectedTab === ENERGIES) {
        return energyOptions;
    }
}

export function getResourceRows(props, selectedTab) {
    const {
        executors, equipment, composts, disinfectants,
        pesticides, fertilizers, accessories, varieties, waterSources, listPesticides, energies
    } = props;

    //EXECUTORS, EQUIPMENT, COMPOST, DISINFECTANT, PESTICIDES, FERTILIZERS, ACCESSORIES, VARIETIES
    if (selectedTab === EXECUTORS) {
        return executors;
    } else if (selectedTab === EQUIPMENT) {
        return equipment;
    } else if (selectedTab === COMPOST) {
        return composts;
    } else if (selectedTab === DISINFECTANT) {
        return disinfectants;
    } else if (selectedTab === PESTICIDES) {
        return pesticides;
    } else if (selectedTab === FERTILIZERS) {
        return fertilizers;
    } else if (selectedTab === ACCESSORIES) {
        return accessories;
    } else if (selectedTab === VARIETIES) {
        return varieties;
    } else if (selectedTab === WATERSOURCES) {
        return waterSources;
    } else if (selectedTab === PESTICIDE_LIST_PESTICIDES) {
        return listPesticides;
    } else if (selectedTab === ENERGIES) {
        return energies;
    }
}

export function buildResultItem(activityType, resource, user, text) {
    if (PROCUREMENT === activityType) {
        return {
            resource: resource,
            itemName: resource.name,
            resourceType: resource.type,
            description: text[resource.type.toLowerCase()],
            waybillDate: newDate(),
            updateTariff: true,
            unit: resource.inventoryUnit ? resource.inventoryUnit : resource.usageUnit,
            tariff: { effectiveFrom: newDate() }

        }
    } else {
        let pesticide = null;
        if (resource.resource) {
            pesticide = resource;
            resource = resource.resource;
        }
        const resourceUsage = {
            resource: resource,
            resourceId: resource.id,
            pesticide: pesticide,
            resourceName: resource.name,
            resourceType: resource.type,
            unit: resource.usageUnit,
            usageAmount: 0,
            groupAmount: 0,
            workerCount: resource.type === WORKER_GROUP ? 1 : null,
            totalCost: 0,
            manualTariff: false,
            costPerDomainUnit: 0,
            resourceCategory: resource.category,
            useInCostReport: true,
            dosage: pesticide ? getMinDosage(pesticide.pest) : null,
            pestNames: pesticide ? pesticide.pestText : null,
            intervalDays: pesticide ? pesticide.interval : null,
            pests: pesticide ? pesticide.pest.map(pestLink => pestLink.pest.id) : null,
            pesticideId: pesticide ? pesticide.id : null,
            warehouseId: user.warehouse ? user.warehouse.id : null,
        }
        return resourceUsage;
    }

}
export function buildResult(props, selectedResourceIDs, tabs) {
    const { activityType, text, user } = props;

    const result = [];
    for (let resourceType = 0; resourceType < selectedResourceIDs.length; resourceType++) {
        let currentResourceIdArray = selectedResourceIDs[resourceType];
        for (let i = 0; i < currentResourceIdArray.length; i++) {
            let resource = getResourceRows(props, tabs[resourceType]).filter(resource => currentResourceIdArray[i] === resource.id)[0];
            const resourceUsage = buildResultItem(activityType, resource, user, text)
            result.push(resourceUsage)
        }
    }
    return result;
}

// export function resourceSelectionStyle(theme) {

//     return {

//         root: {
//             margin: 0,
//             backgroundColor: theme.palette.secondary.light
//         },
//         dialog: {
//             padding: 0,
//             margin: 0,
//         },
//         dialogTitle: {
//             padding: theme.spacing(1),
//             paddingLeft: theme.spacing(2),
//             paddingRight: theme.spacing(2),
//         },
//         dialogContent: {
//             padding: 0,
//             paddingTop: 0,
//             backgroundColor: theme.palette.secondary.light
//         },
//         tabContent: {
//             padding: theme.spacing(2),

//         },
//         tabsRoot: {
//             borderBottom: `1px solid ${BORDER_COLOR}`,
//         },
//         tabsIndicator: {
//             backgroundColor: theme.palette.primary.dark,

//         },

//         tabRoot: {
//             textTransform: 'initial',
//             minWidth: 100,
//             fontSize: theme.typography.fontSize + 2,

//             fontWeight: theme.typography.fontWeightMedium,
//             '&:hover': {
//                 color: theme.palette.primary.dark,
//                 opacity: 1,
//             },
//             '&$tabSelected': {
//                 color: theme.palette.primary.dark,
//                 fontWeight: theme.typography.fontWeightBold,

//             },
//             '&:focus': {
//                 color: theme.palette.primary.dark,
//             },

//         },
//         tabSelected: {},

//         spacer: {
//             marginLeft: theme.spacing(1),
//             marginRight: theme.spacing(1),
//         },

//         filterBar: {
//             marginTop: theme.spacing(1),
//             marginBottom: theme.spacing(1),
//             marginLeft: theme.spacing(2),
//             marginRight: theme.spacing(2),

//             display: 'flex',
//             flex: 1,
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         bodyElement: {
//             marginLeft: theme.spacing(2),
//             marginRight: theme.spacing(2),
//             backgroundColor: theme.palette.common.white,

//             display: 'flex',
//             flex: 1,
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         dialogActions: {
//             backgroundColor: theme.palette.secondary.light
//         },
//     }
// }