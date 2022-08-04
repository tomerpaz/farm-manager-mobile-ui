import * as React from 'react';
import MainTabs from './tabs/MainTabs';
import { Box } from '@mui/material';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import FieldsMap from './maps/FieldsMap';
import FmAppBar from './appbar/FmAppBar';



const AppFrame = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <FmAppBar />
      <MainTabs/>
      <Routes>
        {/* <Route path="/" element={<FieldsMap />} /> */}
        <Route path="/map" element={<Outlet/>}/>
        <Route path="/fields" element={<Outlet/>} />
        <Route path="/activities" element={<Outlet/>}/>
      </Routes>
      
    </Box>

  );
}


export default AppFrame;