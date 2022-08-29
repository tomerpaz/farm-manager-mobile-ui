import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { logOut, setLang } from '../features/app/appSlice'
import Login from '../features/auth/Login'
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
            dispatch(setLang(getUserLang(user.lang)));
        } 
    }, [ user, isLoading, isSuccess, isError])

    return user ? <Outlet /> : <Loading />

}

export default UserRoutes