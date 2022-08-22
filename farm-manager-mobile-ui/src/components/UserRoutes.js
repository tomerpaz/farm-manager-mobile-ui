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
    console.log('UserRoutes',user, isLoading, isSuccess, isError, error);

    const token = localStorage.getItem('token');
    console.log('UserRoutes', token);
    useEffect(() => {

       // console.log(he);
        if (isSuccess) {
            // console.log(data.lang)

            dispatch(setLang(en));
            
        } 
    }, [ user, isLoading, isSuccess, isError])

    if(isError){
        console.log(error)
        return <Login/>
    }
    return user ? <Outlet /> : <Loading />

}

export default UserRoutes