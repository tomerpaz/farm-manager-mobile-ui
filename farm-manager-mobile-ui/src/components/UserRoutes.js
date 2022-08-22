import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { setLang, setUserData } from '../features/auth/authSlice'
import Login from '../features/auth/Login'
import Loading from './Loading'
import he from "../lang/he.json";
import en from "../lang/en.json";

const UserRoutes = () => {

    const dispatch = useDispatch()

    const { data: user, isLoading, isSuccess, isError, error } = useGetUserDataQuery()

    useEffect(() => {

       // console.log(he);
        if (isSuccess) {
            // console.log(data.lang)

            dispatch(setUserData({user: user, token: localStorage.getItem('token')})); 
            dispatch(setLang(en));
            
        } 
    }, [ user, isLoading, isSuccess, isError])

    if(isError){
        return <Login/>
    }
    return user ? <Outlet /> : <Loading />

}

export default UserRoutes