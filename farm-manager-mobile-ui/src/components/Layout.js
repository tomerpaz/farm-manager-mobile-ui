import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from '../appbar/AppBar'

const Layout = () => {

    return (
        <>
            <AppBar />
            <main>

                <Outlet />
            </main>
        </>
    )
}

export default Layout