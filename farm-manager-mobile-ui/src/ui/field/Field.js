import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Field = () => {
  const [value, setValue] = useState('recents');

  const { fieldId } = useParams()


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: '100%' }} flexGrow={1} display={'flex'} flex={1} alignItems={'stretch'} alignContent={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
      <Box sx={{ height: '100%' }} display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
        <Typography>Field Data</Typography>
        <Typography> { fieldId }</Typography>

      </Box>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
      </BottomNavigation>
    </Box>
  );

}

export default Field

// export default function LabelBottomNavigation() {

// }