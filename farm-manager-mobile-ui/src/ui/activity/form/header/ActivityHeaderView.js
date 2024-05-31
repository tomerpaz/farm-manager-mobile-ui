import { Avatar, Box, Typography, Autocomplete, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLang } from '../../../../features/app/appSlice'
import ActivityTypeIcon from '../../../../icons/ActivityTypeIcon'
import { CUSTOMER_TYPES, GENERAL, GENERAL_PLAN, getActivityTypeText, getMarketingCalcMethods, getMarketingDestinations, getMarketingIncomeCalcOptions, getMinDateWidth, getWinds, getYearArray, HARVEST, IRRIGARION_TYPES, IRRIGATION, IRRIGATION_PLAN, MARKET, SPRAY, SPRAY_PLAN, SPRAY_TYPES } from '../../../FarmUtil'
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form'
import TextFieldBase from '../../../../components/ui/TextField'
import DecoratedBox from '../../../../components/ui/DecoratedBox'

const HEADER_CONFIG = [
  { type: GENERAL, date: true, year: true, activity: true, activityType: GENERAL },
  { type: GENERAL_PLAN, date: true, year: true, activity: true, activityType: GENERAL },
  { type: SPRAY, date: true, year: true, endHour: true, startHour: true, crop: true, wind: true },
  { type: SPRAY_PLAN, date: true, year: true, endHour: true, startHour: true, crop: true, wind: false },
  { type: IRRIGATION, date: true, year: true, endDate: true, },
  { type: IRRIGATION_PLAN, date: true, year: true, endDate: true, },
  { type: HARVEST, date: true, year: true, activity: true, activityType: HARVEST, waybill: true, customer: true },
  { type: MARKET, date: true, year: true, customer: true, marketCalcMethod: true },
]

const getColor = (isDuplicate, isExecutePlan) => {
  if(isDuplicate){
    return '#ffc107';
  } else if(isExecutePlan){
    return '#1ADE5B';
  } else {
    return null;
  }
}

const ActivityHeaderView = ({ activity, control, errors, customers, activityDefs, crops, reference, isDuplicate, execution, days, crop, onCropCHange, isExecutePlan }) => {

  const text = useSelector(selectLang)
  const config = HEADER_CONFIG.filter(e => activity.type === e.type)[0];

  const _onCropChange = (onChange, data) => {
    onChange(data)
    onCropCHange();
    //console.log('onCropChange', data, crop)

  }

  return (
    <Box margin={1} paddingTop={1}>
      <Box display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
        <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'} >
          <Typography sx={{ backgroundColor: getColor(isDuplicate , isExecutePlan), borderRadius: 2, paddingLeft: 1, paddingRight: 1 }} variant='h6'>{getActivityTypeText(activity.type, text, true)}</Typography>
          <Avatar sx={{ bgcolor: 'white' }}>
            <ActivityTypeIcon type={activity.type} />
          </Avatar>
        </Box>
        <Typography flex={1} variant='h6'>{reference}</Typography>
        <Controller
          control={control}
          name="year"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="outlined-select-year"
              select
              {...field}
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
      <Box paddingTop={2} display={'flex'} flex={1} alignContent={'center'} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'} >
        <Controller
          name="execution"
          control={control}
          render={({ field }) =>
            <DatePicker label={config.endDate ? text.start : text.date}
              closeOnSelect
              showToolbar={false}
              localeText={{
                cancelButtonLabel: text.cancel,
                clearButtonLabel: text.clear,
                okButtonLabel: text.save
              }}
              slotProps={{
                textField: { size: 'small', variant: 'outlined', sx: { flex: 1 } },
                actionBar: { actions: ["cancel" /*, "clear"*/] }
              }}
              {...field} />}
        />
        <Box margin={1} />
        {config.endDate &&
          <Controller
            control={control}

            name="executionEnd"
            render={({ field }) => <DatePicker
              closeOnSelect
              showToolbar={false}
              minDate={execution}
              label={text.end}
              localeText={{
                cancelButtonLabel: text.cancel,
                clearButtonLabel: text.clear,
                okButtonLabel: text.save
              }}
              slotProps={{
                textField: { size: 'small', error: (errors?.executionEnd ? true : false), variant: 'outlined', sx: { flex: 1 } },
                actionBar: { actions: ["cancel" /*, "clear"*/] }
              }}
              {...field} />}
            rules={{ required: true, min: execution }}
          />}
        {config.endDate && <Box display={'flex'} justifyContent={'end'}><DecoratedBox value={`${days} ${text.days}`} error={days < 1} /> </Box>}
        {config.activity &&
          <Controller
            name="activityDef"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, onChange, ...field } }) => <Autocomplete
              // disablePortal
              onChange={(_, data) => onChange(data)}
              options={activityDefs.filter(e => e.active && config.activityType === e.type)}
              sx={{ flex: 1.6 }}
              // fullWidth
              size='small'
              getOptionLabel={(option) => option ? option.name : ''}
              isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase error={errors.activityDef ? true : false} sx={{ marginTop: 0.5 }} {...params} label={text.activity} />}
              {...field} />}
          />}

        {/* {(config.endHour) && <Box margin={1} />} */}

        {config.endHour &&
          <Controller
            control={control}

            name="endHour"
            render={({ field }) => <TimePicker
              closeOnSelect
              showToolbar={false}
              label={text.endHour}
              localeText={{
                cancelButtonLabel: text.cancel,
                clearButtonLabel: text.clear,
                okButtonLabel: text.save
              }}
              slotProps={{
                textField: { size: 'small', error: (errors?.endHour ? true : false), variant: 'outlined', sx: { flex: 1 } },
                actionBar: { actions: [/*"cancel", "clear"*/] }
              }}
              {...field} />}
            rules={{ required: true }}
          />}
        {config.type === MARKET &&
          <Controller
            name="customer"
            rules={{ required: true }}
            control={control}
            render={({ field: { ref, onChange, ...field } }) => <Autocomplete
              disablePortal
              onChange={(_, data) => onChange(data)}
              options={customers}
              sx={{ flex: 1 }}
              size='small'
              getOptionLabel={(option) => option ? option.name : ''}
              isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase
                error={errors.customer ? true : false}
                sx={{ marginTop: 0.5 }} {...params} label={text.customer} />}
              {...field} />}
          />

        }

        {/* <TimePicker size='small' label={text.endHour}
          slotProps={{ textField: { size: 'small', sx: { minWidth: 150, width: 150 } } }}


        /> */}

      </Box>
      {SPRAY_TYPES.includes(activity.type) &&
        < Box display={'flex'} marginTop={2} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
          <Controller
            name="sprayParams.crop"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, onChange, ...field } }) => <Autocomplete
              // disablePortal
              onChange={(_, data) => _onCropChange(onChange, data)}
              options={crops.filter(e => e.active)}
              // sx={{ width: 150 }}
              fullWidth
              size='small'
              getOptionLabel={(option) => option ? option.name : ''}
              isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase error={errors.sprayParams?.crop ? true : false} sx={{ marginTop: 0.5 }} {...params} label={text.crop} />}
              {...field} />}
          />
          {config.wind && <Box margin={1} />}
          {config.wind && <Controller
            control={control}
            name="sprayParams.wind"
            render={({ field }) => (
              <TextField
                id="outlined-select-wind"
                select
                {...field}
                size='small'
                label={text.windSpeed}
                fullWidth
              >
                {getWinds().map((option) => (
                  <MenuItem key={option} value={option}>
                    {text[option]}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />}
        </Box>
      }
      {HARVEST === activity.type &&
        <Box marginTop={2} display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
          <Box display={'flex'} flex={1} flexDirection={'row'} alignContent={'center'} alignItems={'center'}>
            <Controller
              control={control}
              name="waybill"
              render={({ field }) => (
                <TextField size='small'
                  sx={{ flex: 1 }}
                  id="activity-waybill"
                  label={text.waybill}  {...field} />
              )}
            />
            <Box margin={1} />
            <Controller
              name="customer"
              rules={{ required: true }}
              control={control}
              render={({ field: { ref, onChange, ...field } }) => <Autocomplete
                disablePortal
                onChange={(_, data) => onChange(data)}
                options={customers}
                sx={{ flex: 1 }}
                size='small'
                getOptionLabel={(option) => option ? option.name : ''}
                isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                renderInput={(params) => <TextFieldBase
                  error={errors.customer ? true : false}
                  sx={{ marginTop: 0.5 }} {...params} label={text.customer} />}
                {...field} />}
            />
          </Box>
        </Box>
      }
      {MARKET === activity.type &&
        <Box marginTop={2} display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >

          {/* <Box display={'flex'} flex={1} flexDirection={'row'} alignContent={'center'} alignItems={'center'}>
          
          

          </Box> */}

          <Controller
            control={control}
            name="invoice"
            render={({ field }) => (
              <TextField size='small'
                sx={{ flex: 1 }}
                id="activity-invoice"
                label={text.invoice}  {...field} />
            )}
          />
          <Box margin={1} />
          <Controller
            name="marketParams.sortDate"
            control={control}
            render={({ field }) =>
              <DatePicker label={text.sort}
                closeOnSelect
                showToolbar={false}
                localeText={{
                  cancelButtonLabel: text.cancel,
                  clearButtonLabel: text.clear,
                  okButtonLabel: text.save
                }}
                slotProps={{
                  textField: { size: 'small', variant: 'outlined', sx: { flex: 1 }/*sx: { maxWidth: getMinDateWidth() } */ },
                  actionBar: { actions: ["cancel", "clear"] }
                }}
                {...field} />}
          />


        </Box>
      }
      {MARKET === activity.type &&
        <Box marginTop={2} display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >

          <Controller
            control={control}
            name="marketParams.incomeCalc"
            render={({ field }) => (
              <TextField
                id="outlined-select-incomeCalc"
                select
                {...field}
                size='small'
                label={text.incomeCalc}
                sx={{ flex: 1 }}
              >
                <MenuItem key={''} value={''}>
                  <em >
                    {text.none}
                  </em>
                </MenuItem>
                {getMarketingIncomeCalcOptions().map((option) => (
                  <MenuItem key={option} value={option}>
                    {text[option]}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box margin={1} />
          <Controller
            control={control}
            name="marketParams.sortReference"
            render={({ field }) => (
              <TextField size='small'
                sx={{ flex: 1 }}
                id="activity-sortReference"
                label={text.sortReference}  {...field} />
            )}
          />
        </Box>
      }

    </Box >)
}

export default ActivityHeaderView