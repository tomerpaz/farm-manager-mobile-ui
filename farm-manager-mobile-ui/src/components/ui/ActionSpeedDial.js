import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ActivityTypeIcon from '../../icons/ActivityTypeIcon';
import { getActivityTypeText, getActivityTypes } from '../../ui/FarmUtil';
import { useSelector } from 'react-redux';
import { selectLang } from '../../features/app/appSlice';


const actions = (role, plan, text) =>
  getActivityTypes(role, plan).map(e => {
    return (
      { icon: <ActivityTypeIcon type={e} />, name: getActivityTypeText(e.replaceAll('_PLAN', ""), text) }
    )
  })


const ActionSpeedDial = ({ role, plan, bottom }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const text = useSelector(selectLang)


  return (
    <Box >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Activity tooltip example"
        sx={{ position: 'absolute', bottom: bottom ? bottom : 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions(role, plan, text).map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default ActionSpeedDial;