import {filter, minBy} from 'lodash';
import {calacTotalPesticideVolume} from "../../utils/FarmCalculator";
import {
    SPRAY, SPRAY_PLAN, VARIETY, FERTILIZE_IRRIGATION_PLAN, FERTILIZE_IRRIGATION, HARVEST,
    MARKET, PEST_MONITOR, GENERAL, GENERAL_PLAN, PESTICIDE, FERTILIZER
} from "./types";
import { isEmpty } from '../../utils/StringUtil';

export const SPRAYER_ACT = [SPRAY,SPRAY_PLAN];

export const SPRAY_ACT = [SPRAY,SPRAY_PLAN, PEST_MONITOR];
export const IRRIGATION_ACT = [FERTILIZE_IRRIGATION_PLAN, FERTILIZE_IRRIGATION];
export const EXTERNAL_REF_ACTIVITIES = [SPRAY,SPRAY_PLAN,GENERAL,GENERAL_PLAN]

export const PENDING = 'PENDING';
export const REJECTED = 'REJECTED';
export const PENDING_NOT_CREATOR = 'PENDING_NOT_CREATOR';
export const APPROVED = 'APPROVED';

export function getResourceInventory(row, inventory, user){
    if(isIvnevtoryCheckForType(user, row.resource.type)){
        const data = inventory.find(e=> (e.resource.id === row.resource.id) && (e.warehouse.id === row.warehouseId));
        return data ? data.current : 0;
    } 
    return '';
}

export function getInventoryColor(row, inventory, user){
    const value = getResourceInventory(row, inventory, user);
    if(Number(row.groupAmount)){
        if(Number(row.groupAmount) <= value){
            return {color: 'green', fontWeight: 'bold'};
        } else {
            return {color:'red',  fontWeight: 'bold'};
        }
    }
    return null;
}

export function isIvnevtoryCheckForType(user, type){
    if(type === PESTICIDE){
        return user.pesticideInventoryWarn;
    } else if (type == FERTILIZER){
        return user.fertilizerInventoryWarn;
    }
    return false;    
}

export function isIvnevtoryCheck(user){
    return user.pesticideInventoryWarn || user.fertilizerInventoryWarn;    
}

export function isPesticides(activityType){
    return SPRAY_ACT.indexOf(activityType) > -1;
}

export function isPlan(activityType){
    return activityType.includes('_PLAN');
}


export function isSprayer(activityType){
    return SPRAYER_ACT.indexOf(activityType) > -1;
}

export function isIrrigation(activityType){
    return IRRIGATION_ACT.indexOf(activityType) > -1;
}

export function getMinDosage(pests) {
    let result = 0;
    if (pests !== null) {
        const pest = minBy(pests, 'dosage');
        if(pest && pest.dosage) {
            result = pest.dosage;
        }
    }
    return result;
}


const allowDuplicate = [HARVEST, MARKET]
export function allowDuplicateDomains(activityType){
    return allowDuplicate.indexOf(activityType ) > -1;
}

export function closeResourceSprayActivity(newResources, resources, activityType, change, activityArea, sprayVolumePerArea) {
    let calcSprayer = false;
    if (activityType === SPRAY) {
        let newSprayers = filter(newResources, (resource) => {
            return resource.resourceCategory === 'SPRAYER'
        });

        if (newSprayers.length > 0) {
            resources = filter(resources, (resource) => {
                return resource.resourceCategory !== 'SPRAYER'
            });
            const sprayer = newSprayers[0];
            resources.push(sprayer)
            change('sprayerID', sprayer.resourceId);
            change('sprayerCapacity', sprayer.resource.capacity);
            calcSprayer = true;
            newResources = filter(newResources, (resource) => {
                return resource.resourceCategory !== 'SPRAYER'
            });
        }

        newResources.forEach(function (resource, index, arr) {
            if (resource.resourceType === 'PESTICIDE') {
                const pesticideAmount = calacTotalPesticideVolume(resource.pesticide.unit, resource.dosage, sprayVolumePerArea, activityArea);
                resource.groupAmount = pesticideAmount.toFixed(2);
            }
        });

    }
    return calcSprayer;
}
//, DomainSelection, ResourcesHeader, ResourceTable
const ActivityHeader = 'ActivityHeader'
const ResourcesHeader = 'ResourcesHeader'

export const fieldLocations =[
    {name: 'selectedActivityDefOption', location: ActivityHeader},
    {name: 'selectedCustomerOption', location: ActivityHeader},
    {name: 'end', location: ActivityHeader},
    {name: 'start', location: ActivityHeader},
    {name: 'invoice', location: ActivityHeader},
    {name: 'selectedCropOption', location: ActivityHeader},
    {name: 'managerID', loaction: ActivityHeader },

    {name: 'activityDomains', location: 'DomainSelection'},
    {name: 'sprayVolumePerArea', location: ResourcesHeader},
    {name: 'irrigationFrequency', location: ResourcesHeader},
    {name: 'totalSprayVolume', location: ResourcesHeader},
    {name: 'sprayerCapacity', location: ResourcesHeader},
    {name: 'resources', location: 'ResourceTable'},
]

export function getActivityDisplayText(activity, text){
    return activity.activityDef ? activity.activityDef.name : text[activity.type.toLowerCase()]
}


export function getDocumentRefText(activityType, documentRef, externalId){
   return externalId && EXTERNAL_REF_ACTIVITIES.includes(activityType) ? documentRef + ' (' + externalId + ')' : documentRef;
}



export function getStatusText(status, text){

    if(isEmpty(status)){
        return '';
    }
    if(status === PENDING_NOT_CREATOR){
        return text[PENDING.toLowerCase()];
    }
    return text[status.toLowerCase()];
}
