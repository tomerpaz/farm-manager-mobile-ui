import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import AppBar from '../appbar/AppBar'
import { selectUser } from '../features/auth/authSlice';

const Layout = () => {
    const user = useSelector(selectUser);

    return (
        <>
           {user &&  <AppBar /> }
            <main>

                <Outlet />
            </main>
        </>
    )
}

export default Layout