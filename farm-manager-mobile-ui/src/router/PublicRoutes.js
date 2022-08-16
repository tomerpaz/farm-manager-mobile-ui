import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const  PublicRoutes = () =>{
  const token=localStorage.getItem('token')
  
  return token?<Navigate to="/map"/>: <Outlet/>
}

export default PublicRoutes;

