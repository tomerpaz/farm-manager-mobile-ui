import React from 'react';
import { useSelector } from 'react-redux';

import {Navigate, Outlet} from 'react-router-dom'
import { selectUser } from '../features/auth/authSlice';

const useAuth=()=>{
  const user=localStorage.getItem('token')
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=(props) =>{

  const auth=useAuth()
	const user = useSelector(selectUser)

  const ok = auth && user;
  
  return auth?<Navigate to="/map"/>: <Outlet/>
}

export default PublicRoutes;

