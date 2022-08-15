import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import AppBar from '../appbar/AppBar'
import { useGetUserMutation, useGetUserDataQuery } from '../features/auth/authApiSlice'
import { selectUser, setUserData } from '../features/auth/authSlice'

const UserRoutes = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser);


    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error } = useGetUserDataQuery()


    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserData({
                user: data, token: localStorage.getItem('token')
            }))
        }
    }, [isSuccess])

    if (user) {
        return <Outlet />
    } else {
        return <div>Loading...</div>
    }
}

export default UserRoutes