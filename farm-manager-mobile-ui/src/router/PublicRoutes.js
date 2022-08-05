import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

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

  return auth?<Navigate to="/map"/>: <Outlet/>
}

export default PublicRoutes;

