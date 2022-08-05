import * as React from 'react';
import MainTabs from './tabs/MainTabs';
import { Box } from '@mui/material';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import FieldsMap from './maps/FieldsMap';
import FmAppBar from './appbar/FmAppBar';
import Signin from './system/Signin';



const AppFrame = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box  display={'flex'} flex={1} flexDirection={'column'}>
      <FmAppBar />
      
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/map" element={<MainTabs />} />
        <Route path="/fields" element={<MainTabs />} />
        <Route path="/activities" element={<MainTabs />} />
      </Routes>

    </Box>

  );
}


export default AppFrame;