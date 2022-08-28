import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom'
import { DEFAULT_ROUTE } from '../App';
import { selectCurrentToken } from '../features/auth/authSlice';

const  PublicRoutes = () =>{
	const token = useSelector(selectCurrentToken);
  return token?<Navigate to={DEFAULT_ROUTE}/>: <Outlet/>
}

export default PublicRoutes;

