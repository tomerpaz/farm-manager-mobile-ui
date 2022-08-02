import {EXECUTORS, SPRAY, SPRAYER_ACTIVITIES, WATERSOURCE_ACTIVITES} from "../../../modules/activity/types";
import {EQUIPMENT, PESTICIDE, WATER} from "../../../reducers/ResourceReducer";
import {INVENTORY_TYPES} from "../../../reducers/InventoryReducer";

export const required = (value, allValues, props) => {
    return (!value ? props.text.requiredField  : undefined);
}

export const requiredArray = (value, allValues, props) => {
    const result =  (!value || value.length === 0  ? props.text.requiredField  : undefined);
    return result;
}

export const maxValue = (max) => value =>
    value && value >= max ? `${max}` : undefined

export const requiredFieldsArray = (value, allValues, props) => {
    const result =  (value && value.length === 0  ? props.text.select + ': ' + props.text.fields : undefined);
    return result;
}

export const requiredActivityResources = (value, allValues, props) => {
    // console.log(value, allValues, props)

    if(SPRAYER_ACTIVITIES.includes(allValues.activityType)){
        const sprayer = validateSprayer(value);
        const pesticide = validatePesticide(value);
        const executor = validateExecutor(value);

        const errors = [];
        if(sprayer) {
            errors.unshift(props.text[sprayer])
        }
        if(pesticide) {
            errors.unshift(props.text[pesticide])
        }
        if(executor) {
            errors.unshift(props.text[executor])
        }
        // console.log('requiredActivityResources',value, sprayer, pesticide)
        const result =  (errors.length > 0 ?props.text.select + ': ' + errors.join(',') : undefined);
        return result;
    }
    if(WATERSOURCE_ACTIVITES.includes(allValues.activityType)){
        const errors = [];
        const waterSource = validateWaterSource(value);
        if(waterSource) {
            errors.unshift(props.text[waterSource])
        }
        const result =  (errors.length > 0 ?props.text.select + ': ' + errors.join(',') : undefined);
        return result;
    }
}
function validateSprayer(value){
    const result =  (value && value.filter(e => e.resource.type === EQUIPMENT && e.resource.category === 'SPRAYER').length === 0  ? 'sprayer'  : undefined);
    return result;
}

function validatePesticide(value){
    const result =  (value && value.filter(e => e.resource.type === PESTICIDE).length === 0  ? 'pesticide'  : undefined);
    return result;
}

function validateExecutor(value){
    const result =  (value && value.filter(e => EXECUTORS.indexOf(e.resource.type) >= 0).length === 0  ? 'executor'  : undefined);
    return result;
}

function validateWaterSource(value){
    const result =  (value && value.filter(e => e.resource.type === WATER).length === 0  ? 'waterSource'  : undefined);
    return result;
}

export const requiredResourceWarehouse = (value, allValues, props) => {
    const result = (!value && allValues.resources && allValues.resources.filter(e=>INVENTORY_TYPES.indexOf(e.resource.type) >= 0).length > 0 ? props.text.requiredField :undefined  );
    return result;
}