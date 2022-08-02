import * as React from 'react';
import MainTabs from './tabs/MainTabs';
import ActivityForm from './activity/ActivityForm';
import { Box } from '@mui/material';

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