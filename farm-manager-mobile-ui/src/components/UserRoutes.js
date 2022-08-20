import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { selectUser, setUserData } from '../features/auth/authSlice'
import Login from '../features/auth/Login'
import Loading from './Loading'

const UserRoutes = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser);

    const { data, isLoading, isSuccess, isError, error } = useGetUserDataQuery()

    useEffect(() => {

        if (isSuccess) {
            dispatch(setUserData({user: data, token: localStorage.getItem('token')})); 
        } 
    }, [ data, isLoading, isSuccess, isError])

    if(isError){
        return <Login/>
    }
    return user ? <Outlet /> : <Loading />

}

export default UserRoutes