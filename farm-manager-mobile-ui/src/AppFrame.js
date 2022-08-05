import * as React from 'react';
import MainTabs from './tabs/MainTabs';
import { Box } from '@mui/material';
import { Routes, Route, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import FieldsMap from './maps/FieldsMap';
import FmAppBar from './appbar/FmAppBar';
import Login from './system/Login';
import ProtectedRoutes from './router/ProtectedRoutes';
import PublicRoutes from './router/PublicRoutes';



const AppFrame = () => {
  const [value, setValue] = React.useState(0);

  // let navigate = useNavigate();

  // const {pathname} = useLocation();

  // if("/"=== pathname){
  //   navigate("/map")
  // }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display={'flex'} flex={1} flexDirection={'column'}>
      <FmAppBar />

      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
        <Route path='/' element={<MainTabs />} />

          <Route path='/map' element={<MainTabs />} />
          <Route path='/fields' element={<MainTabs />} />
          <Route path='/activities' element={<MainTabs />} />

        </Route>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

    </Box>

  );
}


export default AppFrame;