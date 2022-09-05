import { HighlightOffRounded, KeyboardBackspaceOutlined } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectLang } from '../../../features/app/appSlice'
import ActivityTypeIcon from '../../../icons/ActivityTypeIcon'
import { getActivityTypeText, isArrayEmpty, parseDate } from '../../FarmUtil'
import InfoLine from '../../field/InfoLine'

const ActivityHeaderView = ({ activity }) => {
  const navigate = useNavigate()

  const text = useSelector(selectLang)


  return (
    <Box margin={1}>
      <Box  display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
        <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'} >
          <Typography variant='h6'>{ getActivityTypeText(activity.type, text)}</Typography>
          <Avatar sx={{ bgcolor: 'white' }}>
            <ActivityTypeIcon type={activity.type} />
          </Avatar>
        </Box>
        <Typography flex={1} variant='h6'>{activity.reference}</Typography>
        <IconButton  flex={1} color='secondary' aria-label="settings" onClick={() => navigate(-1)}>
          <HighlightOffRounded fontSize='large'  />
        </IconButton>
      </Box>
      <Box  display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
        {activity.activityDef && <Typography variant="subtitle1" color="text.secondary">{activity.activityDef.name}</Typography>}
        {activity.crop && <Typography variant="subtitle1" color="text.secondary">{activity.crop.name}</Typography>}

        <Typography variant='subtitle1' color="text.secondary">{parseDate(activity.execution)}</Typography>
      </Box>
      <Box  display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
         {activity.year && <Typography variant="subtitle1" color="text.secondary">{activity.year}</Typography>}

        {/* <Typography variant='subtitle1' color="text.secondary">{activity.execution}</Typography> */}
      </Box>
      <Divider />

      
    </Box>)
}

export default ActivityHeaderView