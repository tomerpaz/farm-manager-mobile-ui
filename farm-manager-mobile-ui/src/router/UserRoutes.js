import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { setFieldsViewStatus, setCurrentYear, setLang } from '../features/app/appSlice'
import Loading from '../components/Loading'
import he from "../lang/he.json";
import en from "../lang/en.json";
import pt from "../lang/pt.json";


const langs = {
    'he':  he,
    'pt':  pt,
    'en':  en,
}
export const getUserLang = (lang) =>{
   return langs[lang];
}

const UserRoutes = () => {

    const dispatch = useDispatch()
    
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserDataQuery()

    useEffect(() => {
        if (isSuccess) {
            // console.log('user',user)
            const lang  = localStorage.getItem('lang') ? localStorage.getItem('lang') : user.lang;
            dispatch(setLang(getUserLang(lang)));
            dispatch(setCurrentYear(user.year));
            dispatch(setFieldsViewStatus(user.fieldsViewStatus));

            
        } 
    }, [ user, isLoading, isSuccess, isError])

    return user ? <Outlet /> : <Loading />

}

export default UserRoutes