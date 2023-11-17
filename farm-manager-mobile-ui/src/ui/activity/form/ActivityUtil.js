import { ACTIVITY_DEF_TYPES, SPRAYER, SPRAY_TYPES, isArrayEmpty } from "../../FarmUtil";


export function getReference  (type, resources,activityDef){
    if(SPRAY_TYPES.includes(type)){
      const sprayer = resources.find(e=>e.resource.category === SPRAYER);
      if(sprayer){
        return sprayer.id;
      }
    } else if(ACTIVITY_DEF_TYPES.includes(type) && activityDef){
      return activityDef.id;
    }
  }

  export function isSkipTariffFetch (isDirty, isFinanace, resources){
    if(!isFinanace){
        return true;
    }
    if(!isDirty){
        return true;
    }
    if(isArrayEmpty(resources)){
        return true;
    }
    return false;
  }

  export function getTotalByField (fields, fieldName){
    if(isArrayEmpty(fields)){
      return 0;
    }
    const values =  fields.filter(e=>e[fieldName]).map(e=>e[fieldName])
    if(isArrayEmpty(values)){
      return 0;
    }
    const sum = values.reduce(function(a, b){
      return a + b;
    });
    return sum;
  }

  export function getTotalQty (fields){
    return getTotalByField(fields, 'qty')
  }

  export function getTotalweight (fields){
    return getTotalByField(fields, 'weight')
  }

  export function getTotalActivityArea (fields){
    return getTotalByField(fields, 'activityArea')
  }
