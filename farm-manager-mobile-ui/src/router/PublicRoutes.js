import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { DEFAULT_ROUTE } from '../App';

const  PublicRoutes = () =>{
  const token=localStorage.getItem('token')
  
  return token?<Navigate to={DEFAULT_ROUTE}/>: <Outlet/>
}

export default PublicRoutes;

