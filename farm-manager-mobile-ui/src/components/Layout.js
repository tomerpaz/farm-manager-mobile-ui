import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from '../appbar/AppBar'

const Layout = () => {

    return (
        <>
            <AppBar />
            <main className='App'>

                <Outlet />
            </main>
        </>
    )
}

export default Layout