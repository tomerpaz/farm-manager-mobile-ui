import * as React from 'react';
import MainTabs from './tabs/MainTabs';
import { Box } from '@mui/material';
import { Routes, Route, Outlet, Link } from "react-router-dom";



const AppFrame = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>



      <MainTabs />
    </Box>

  );
}


export default AppFrame;