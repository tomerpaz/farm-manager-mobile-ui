import { useSelector } from "react-redux";
import { useGetUserDataQuery } from "../features/auth/authApiSlice";
import { selectLang } from "../features/auth/authSlice";

const GENERAL = 'GENERAL';
const GENERAL_PLAN = 'GENERAL_PLAN';

export const displayFieldName = (field) =>{
    return field.alias ? `${field.name}, ${field.alias}` : field.name;
}

export const displayFieldArea = (field, areaUnit, text) =>{
    return `${field.area} ${text[areaUnit]}`;
}

export const getActivityTypeText = (type, text) =>{
  return [GENERAL,GENERAL_PLAN].includes(type) ? text.activity : text[type.toLowerCase()];
   
}

export function isArrayEmpty(filterValue, filterNulls){
    if(filterNulls){
        return  !filterValue || filterValue.filter(e => e !== null).length === 0;
    } else {
        return  !filterValue || filterValue.length === 0;
    }
}

export function isStringEmpty(str) {
    return (!str || /^\s*$/.test(str));
}
