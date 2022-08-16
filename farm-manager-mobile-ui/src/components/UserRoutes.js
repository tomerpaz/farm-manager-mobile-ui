import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../features/auth/authApiSlice'
import { selectUser, setUserData } from '../features/auth/authSlice'
import Loading from './Loading'

const UserRoutes = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser);

    const { data, isLoading, isSuccess: isUserSucess, isError, error } = useGetUserDataQuery()

    useEffect(() => {
        if (isUserSucess) {
            dispatch(setUserData({
                user: data, token: localStorage.getItem('token')
            }))
        }
    }, [isUserSucess])

    return user ? <Outlet /> : <Loading />

}

export default UserRoutes