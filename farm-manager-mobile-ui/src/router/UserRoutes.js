import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { setFieldsViewStatus, setCurrentYear, setLang } from '../features/app/appSlice'
import Loading from '../components/Loading'
import he from "../lang/he.json";
import en from "../lang/en.json";


const getUserLang = (lang) =>{
   if( lang === 'he'){
    return he;
   }

   return en;

}

const UserRoutes = () => {

    const dispatch = useDispatch()
    
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserDataQuery()

    useEffect(() => {
        if (isSuccess) {
            console.log('user',user)
            dispatch(setLang(getUserLang(user.lang)));
            dispatch(setCurrentYear(user.year));
            dispatch(setFieldsViewStatus(user.fieldsViewStatus));

            
        } 
    }, [ user, isLoading, isSuccess, isError])

    return user ? <Outlet /> : <Loading />

}

export default UserRoutes