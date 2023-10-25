import { HighlightOffRounded, KeyboardBackspaceOutlined } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Typography, Button, Autocomplete, Select, MenuItem, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { selectLang } from '../../../features/app/appSlice'
import ActivityTypeIcon from '../../../icons/ActivityTypeIcon'
import { ACTIVITY_DEF_TYPES, CUSTOMER_TYPES, GENERAL, GENERAL_PLAN, getActivityTypeText, getWinds, getYearArray, HARVEST, IRRIGARION_TYPES, IRRIGATION, IRRIGATION_PLAN, MARKET, parseDate, SPRAY, SPRAY_PLAN, SPRAY_TYPES } from '../../FarmUtil'
import { DatePicker, MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form'
import { useGetActivityDefsQuery } from '../../../features/activityDefs/activityDefsApiSlice'
import TextFieldBase from '../../../components/ui/TextField'
import { useGetCropsQuery } from '../../../features/crops/cropsApiSlice'
import { CUSTOMER, useGetResourcesQuery } from '../../../features/resources/resourcesApiSlice'




const HEADER_CONFIG = [
  { type: GENERAL, date: true, year: true, activity: true, activityType: GENERAL },
  { type: GENERAL_PLAN, date: true, year: true, activity: true, activityType: GENERAL },
  { type: SPRAY, date: true, year: true, endHour: true, startHour: true, crop: true, wind: true },
  { type: SPRAY_PLAN, date: true, year: true, endHour: true,  startHour: true, crop: true, wind: true },
  { type: IRRIGATION, date: true, year: true, endDate: true, },
  { type: IRRIGATION_PLAN, date: true, year: true, endDate: true, },
  { type: HARVEST, date: true, year: true, activity: true, activityType: HARVEST },
  { type: MARKET, date: true, year: true, },
]

const ActivityHeaderView = ({ activity, control }) => {
  // const navigate = useNavigate()


  const [crop, setCrop] = useState(null);


  const text = useSelector(selectLang)
  const { data: activityDefs, isSuccess: isActivityDefsSuccess } = useGetActivityDefsQuery()

  const { data: crops, isSuccess: isCropsSuccess } = useGetCropsQuery()

  const {
    data: customers,
    // isLoading,
    isSuccess: isCustomersSuccess,
    isError,
    error
  } = useGetResourcesQuery({ type: CUSTOMER })

  const config = HEADER_CONFIG.filter(e => activity.type === e.type)[0];

  if (!config || !isCropsSuccess || !isActivityDefsSuccess || !isCustomersSuccess) {
    return <></>
  }


  return (
    <Box margin={1}>
      <Box display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
        <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'} >
          <Typography variant='h6'>{getActivityTypeText(activity.type, text)}</Typography>
          <Avatar sx={{ bgcolor: 'white' }}>
            <ActivityTypeIcon type={activity.type} />
          </Avatar>
        </Box>
        <Typography flex={1} variant='h6'>{activity.reference}</Typography>
        <Controller
          control={control}
          name="year"
          render={({ field }) => (
            <TextField
              id="outlined-select-year"
              select
              {...field}
              // fullWidth

              size='small'
              label={text.year}
            >
              {getYearArray().map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
      <Box display={'flex'} flex={1} alignContent={'center'} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
        <Controller
          name="execution"
          control={control}
          render={({ field }) => <DatePicker label={text.date}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 150, width: 150 } } }}

            {...field} />}
        />
        {config.activity &&
          <Controller
            name="activityDef"
            control={control}

            render={({ field: { ref, onChange, ...field } }) => <Autocomplete
              disablePortal
              onChange={(_, data) => onChange(data)}
              options={activityDefs.filter(e => e.active && config.activityType === e.type)}
              sx={{ width: 300 }}
              // fullWidth
              size='small'
              getOptionLabel={(option) => option ? option.name : ''}
              isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase sx={{ marginTop: 0.5 }} {...params} label={text.activity} />}
              {...field} />}
          />}

{config.endHour &&
  <TimePicker size='small' label={text.endHour}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 150, width: 150 } } }}


          />
}



        {/* <Autocomplete
              disablePortal
              options={activityDefs}
              sx={{ width: 200 }}
              size='small'
              getOptionLabel={(option) => option ? option.name : ''}
              // isOptionEqualToValue={(option, value) => value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase {...params} label={text.activity} />}
               />} */}




        {/* <Typography variant='subtitle1' color="text.secondary">{parseDate(activity.execution)}</Typography>       */}

        {IRRIGARION_TYPES.includes(activity.type) && <Controller
          name="executionEnd"
          control={control}
          render={({ field }) => <DatePicker
            label={text.endDate}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 150, width: 150 } } }}

            {...field} />}
        />}
        {/* {IRRIGARION_TYPES.includes(activity.type) && <Typography variant='subtitle1' color="text.secondary">{`${parseDate(activity.execution)} - ${parseDate(activity.executionEnd)}`}</Typography>} */}

      </Box>
      <Box display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
        {/* {activity.year && <Typography variant="subtitle1" color="text.secondary">{activity.year}</Typography>} */}

        {config.crop && 
            <Autocomplete
          disablePortal
          id="combo-box-demo"
          getOptionLabel={(option) => option.name}
          onChange={(_, data) => setCrop(data)}
          size='small'
          options={crops.filter(e => e.active)}
          value={crop}
          sx={{ width: 150 }}
          renderInput={(params) => <TextFieldBase sx={{ marginTop: 0.5 }} {...params} label={text.crop} />}
          // renderOption={(props, option) => (
          //   <MenuItem key={option.id} value={option.id}>
          //   {option.name}
          // </MenuItem>
          // )}

          renderOption={(props, option) => (
            <Box key={option.id} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

              {option.name}
            </Box>
          )}
        />
        
        }
        {config.wind &&
          <Controller
            control={control}
            name="wind"
            render={({ field }) => (
              <TextField
                id="outlined-select-wind"
                select
                {...field}
                size='small'
                label={text.windSpeed}
              >
                {getWinds().map((option) => (
                  <MenuItem key={option} value={option}>
                    {text[option]}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />}

        {CUSTOMER_TYPES.includes(activity.type) &&


          <Controller
            name="customer.id"
            control={control}

            render={({ field: { ref, onChange, ...field } }) => <Autocomplete
              disablePortal
              onChange={(_, data) => onChange(data)}
              options={customers}
              sx={{ width: 300 }}
              // fullWidth
              size='small'
              getOptionLabel={(option) => option ? option.name : ''}
              isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase sx={{ marginTop: 0.5 }} {...params} label={text.cusomer} />}
              {...field} />}
          />}

        {/* && <Typography variant="subtitle1" color="text.secondary">{activity.endHour}</Typography>} */}

        {/* <Typography variant='subtitle1' color="text.secondary">{activity.execution}</Typography> */}
      </Box>
      {/* <Divider /> */}

    </Box>)
}

export default ActivityHeaderView