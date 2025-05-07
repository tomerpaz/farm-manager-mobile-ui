import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ActivityTypeIcon from '../../icons/ActivityTypeIcon';
import { getActivityTypeText, getActivityTypes } from '../../ui/FarmUtil';
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, setActivityType } from '../../features/app/appSlice';
import { createSearchParams, useNavigate } from 'react-router';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';


const actions = (role, map, plan, text) =>
  getActivityTypes(role, map, plan).map(e => {
    return (
      {
        icon: <ActivityTypeIcon type={e} />,
        type: e,
        name: getActivityTypeText(e.replaceAll('_PLAN', ""), text)
      }
    )
  })


const ActionSpeedDial = ({ role, plan, map, bottom, fieldId }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()


  const { data: user } = useGetUserDataQuery()
  const actionTypes = user.userConf.filter(e => e.write).map(e => e.type);
  const handleAction = (e) => {
    //  console.log('new',e, 'map',map)

    //  console.log('handleAction',fieldId)
    const searchParams = fieldId ?
      createSearchParams({ fid: fieldId }).toString() :
      null


    dispatch(setActivityType(e.type));
    navigate(
      {
        pathname: `/activity/new/${e.type}`,
        search: searchParams
      }
    )


    setOpen(false);
  }

  const text = useSelector(selectLang)

  const userActions = actions(role, map, plan, text).filter(e => actionTypes.includes(e.type));

  if (userActions.length === 0) {
    return <React.Fragment />
  }

  return (
    <Box >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Activity tooltip example"
        sx={{ position: 'fixed', bottom: bottom ? bottom : 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {userActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleAction(action)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default ActionSpeedDial;
