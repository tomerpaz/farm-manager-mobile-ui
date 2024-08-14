import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { AppBar, Autocomplete, Box, DialogActions, DialogContent, IconButton, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, setSnackbar } from '../../features/app/appSlice';
import TextFieldBase from '../../components/ui/TextField';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { Controller, useForm } from 'react-hook-form';
import { Close, Delete, Save } from '@mui/icons-material';
import { getYearArray, isMobile, UI_SIZE } from '../FarmUtil';
import { useGetInfectionLevelsQuery, useGetPestsQuery, useGetPestStagesQuery, useGetPlantLocationsQuery } from '../../features/pests/pestsApiSlice';
import { DatePicker } from '@mui/x-date-pickers';
import { useCreateFieldScoutMutation, useDeleteFieldScoutMutation, useUpdateFieldScoutMutation } from '../../features/scout/scoutsApiSlice';
import ActionApprovalDialog from '../../components/ui/ActionApprovalDialog';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScoutingForm = ({ defaultValues, open, handleClose }) => {

  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()

  const { data: pests, isLoading: isPestsLoading } = useGetPestsQuery();
  const { data: infectionLevels } = useGetInfectionLevelsQuery()
  const { data: stages } = useGetPestStagesQuery()
  const { data: plantLocations } = useGetPlantLocationsQuery()
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [createFieldScout] = useCreateFieldScoutMutation();
  const [updateFieldScout] = useUpdateFieldScoutMutation()
  const [deleteFieldScout] = useDeleteFieldScoutMutation()

  const dispatch = useDispatch()

  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields }, reset, setValue, trigger
  } = useForm({ defaultValues });


  const saveFieldScout = (data) => {
    console.log('saveFieldScout', data)
    if (data.id === null) {
      return createFieldScout(data).unwrap();
    } else {
      return updateFieldScout(data).unwrap();
    }
  }

  const onSubmit = async (data) => {
    try {
      const result = await saveFieldScout(data);

      dispatch(setSnackbar({ msg: data.id ? text.recordUpdated : text.recordCreated, severity: 'success' }))
      handleClose(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = (value) => {
    setDeleteOpen(false)
    if (value) {
      deleteFieldScout({ id: defaultValues.id });
      handleClose(false);
      dispatch(setSnackbar({ msg: text.recordDeleted }))
    }
  }
  return (

    <Dialog fullScreen={isMobile()} fullWidth={!isMobile()} open={open} /*TransitionComponent={Transition}*/ >
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {text.scouting}
          </Typography>
          <IconButton
            edge="start"
            onClick={() => handleClose(false)}
            color="inherit"
            aria-label="done"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)} >

        <DialogContent>
          {/* <DialogContentText>
          {`${text.field} ${fieldName}`}
        </DialogContentText> */}
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>


            <Controller
              name="date"
              control={control}
              render={({ field }) =>
                <DatePicker label={text.date}
                  closeOnSelect
                  showToolbar={false}
                  rules={{ required: true }}

                  localeText={{
                    cancelButtonLabel: text.cancel,
                    okButtonLabel: text.save
                  }}
                  slotProps={{
                    textField: { size: UI_SIZE, variant: 'outlined', sx: { flex: 1 } },
                    actionBar: { actions: ["cancel" /*, "clear"*/] }
                  }}
                  {...field} />}
            />

            <Box margin={1} />
            <Controller
              control={control}
              name="year"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="scout-select-year"
                  select
                  sx={{ flex: 1 }}
                  {...field}
                  size={UI_SIZE}
                  label={text.year}
                >
                  <MenuItem value={0}>{text.perennial}</MenuItem>
                  {getYearArray().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box marginTop={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>

            <Controller
              name="finding"
              control={control}
              rules={{ required: true }}
              render={({ field: { ref, onChange, ...field } }) => <Autocomplete
                // disablePortal
                onChange={(_, data) => onChange(data)}
                options={pests}
                sx={{ flex: 3 }}
                size={UI_SIZE}
                getOptionLabel={(option) => option ? option.name : ''}
                isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                renderInput={(params) => <TextFieldBase
                  error={errors.finding ? true : false}
                  sx={{ marginTop: 0.5 }} {...params} label={text.pest} />}
                {...field} />}
            />
          </Box>
          {/* <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field: { ref, onChange, ...field } }) => <Autocomplete
              // disablePortal
              onChange={(_, data) => onChange(data)}
              options={plantLocations}
              // sx={{ flex: 1.6 }}
              // fullWidth
              size={UI_SIZE}
              getOptionLabel={(option) => option ? option.name : ''}
              isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
              renderInput={(params) => <TextFieldBase  {...params} label={text.location} />}
              {...field} />}
          /> */}

          <Box marginTop={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <TextField
                  id="scout-location"
                  select
                  {...field}
                  size={UI_SIZE}
                  label={text.location}
                  fullWidth
                >
                  {plantLocations.map((option) => (
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
              name="infectionLevel"
              render={({ field }) => (
                <TextField
                  id="scout-infectionLevel"
                  select
                  {...field}
                  size={UI_SIZE}
                  label={text.infectionLevel}
                  fullWidth
                >
                  {infectionLevels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {text[option]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box marginTop={1} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="stage.id"
              render={({ field }) => (
                <TextField
                  id="scout-pest-stage"
                  select
                  {...field}
                  size={UI_SIZE}
                  label={text.phenologicalStage}
                  fullWidth
                >
                  {stages.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Box margin={1} />

            <Controller
              control={control}
              name="value"
              render={({ field: { ref, ...field } }) => (
                <TextFieldBase
                  type='number'
                  id="scout-value"
                  size={UI_SIZE}
                  label={text.qty} fullWidth {...field} />
              )}
            />
          </Box>
          <Box marginTop={1} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="note"
              render={({ field: { ref, ...field } }) => (
                <TextFieldBase
                  id="scout-note"
                  size={UI_SIZE}
                  multiline rows={2}
                  label={text.note} fullWidth {...field} />
              )}
            />
          </Box>





        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {defaultValues.id && <Button size='large' endIcon={<Delete />} variant='outlined' onClick={() => setDeleteOpen(true)}>{text.delete}</Button>}
          <Button size='large' disabled={!isDirty} endIcon={<Save />} disableElevation={true} variant='contained' type="submit" >
            {text.save}
          </Button>
        </DialogActions>
      </form >
      <ActionApprovalDialog open={deleteOpen} handleClose={handleDelete}
        title={text.deleteFormTitle} body={text.deleteFormBody} okText={text.delete} cancelText={text.cancel} />

    </Dialog>
  );

}
export default ScoutingForm;
