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