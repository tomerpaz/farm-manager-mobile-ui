import { useSelector } from "react-redux";
import { useGetUserDataQuery } from "../features/auth/authApiSlice";
import { selectLang } from "../features/auth/authSlice";

export const displayFieldName = (field) =>{
    return field.alias ? `${field.name}, ${field.alias}` : field.name;
}

export const displayFieldArea = (field, areaUnit, text) =>{
    return `${field.area} ${text[areaUnit]}`;
}