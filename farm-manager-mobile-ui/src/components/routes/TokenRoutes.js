import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../Loading'


const TokenRoutes = () => {

    const token = localStorage.getItem('token');

    console.log('TokenRoutes',token)
    return token ? <Outlet /> : <Loading />

}

export default TokenRoutes