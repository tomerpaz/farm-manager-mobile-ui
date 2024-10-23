import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AppBar, Autocomplete, Box, Checkbox, DialogActions, DialogContent, FormControlLabel, IconButton, InputAdornment, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, setSnackbar } from '../../features/app/appSlice';
import TextFieldBase from '../../components/ui/TextField';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useCreateFieldPointMutation, useDeleteFieldPointMutation, useUpdateFieldPointMutation } from '../../features/points/pointsApiSlice';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Cancel, Close, Delete, PestControl, Save } from '@mui/icons-material';
import { FormSpacer, getPointTypes, trap, UI_SIZE } from '../FarmUtil';
import { useGetPestsQuery } from '../../features/pests/pestsApiSlice';
import { DatePicker } from '@mui/x-date-pickers';

const FieldPointDialog = ({ defaultValues, open, handleClose, deletable,/*, types*/ }) => {

  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()

  const { data: pests, isLoading: isPestsLoading } = useGetPestsQuery();

  const [createFieldPoint] = useCreateFieldPointMutation();
  const [updateFieldPoint] = useUpdateFieldPointMutation()
  const [deleteFieldPoint] = useDeleteFieldPointMutation()

  const dispatch = useDispatch()

  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields }, reset, setValue, trigger
  } = useForm({ defaultValues });

  //const type = useWatch({ control, name: "type" })
  // const [type, setType] = useState(defaultValues.type);

  //  console.log(type);
  const saveFieldPoint = (data) => {
    if (data.id === null) {
      return createFieldPoint(data).unwrap();
    } else {
      return updateFieldPoint(data).unwrap();
    }
  }

  const onSubmit = async (data) => {
    try {
      const result = await saveFieldPoint(data);

      dispatch(setSnackbar({ msg: data.id ? text.recordUpdated : text.recordCreated, severity: 'success' }))
      handleClose('save', result);
    } catch (err) {
      console.log(err);
    }
  }

  const onAction = (action) => {
    if (action === 'delete') {
      deleteFieldPoint({ id: defaultValues.id })
    }
    handleClose('delete');
    //  setOpen(false)
  }

  if (defaultValues.type === trap && isPestsLoading) {
    return <></>
  }

  return (

    <Dialog fullWidth open={open}>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`${text[defaultValues.type]}`}
          </Typography>
          <IconButton
            edge="start"
            onClick={() => handleClose(null)}
            color="inherit"
            aria-label="done"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)} >

        <DialogContent>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...field } }) => (
                <TextFieldBase
                  id="point-name"
                  size={UI_SIZE}
                  label={text.name} fullWidth {...field} />
              )}
            />
          </Box>
          {/* <Box margin={2} />
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <TextField
                  id="field-point-type"
                  select
                  {...field}
                  size={UI_SIZE}
                  label={text.type}
                  fullWidth
                >
                  {types.map((option) => (
                    <MenuItem key={option} value={option}>
                      {text[option]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box> */}
          {defaultValues.type === trap &&
            <Fragment>

              <FormSpacer/>

              <Controller
                name="pest"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, onChange, ...field } }) => <Autocomplete
                  // disablePortal
                  onChange={(_, data) => onChange(data)}
                  options={pests.filter(e => e.active)}

                  // fullWidth
                  size={UI_SIZE}
                  sx={{ flex: 2 }}
                  getOptionLabel={(option) => option ? option.name : ''}
                  isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                  renderInput={(params) => <TextFieldBase error={errors.pest ? true : false} sx={{ marginTop: 0.5 }} {...params} label={text.pest} />}
                  {...field} />}
              />
              <FormSpacer/>
              <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>

                <Controller
                  name="expiry"
                  control={control}
                  render={({ field }) =>
                    <DatePicker label={text.expiry}
                      closeOnSelect
                      showToolbar={false}
                      localeText={{
                        cancelButtonLabel: text.cancel,
                        clearButtonLabel: text.clear,
                        okButtonLabel: text.save
                      }}
                      slotProps={{
                        textField: { size: UI_SIZE, variant: 'outlined', sx: { marginTop: 0.5, flex: 1 } },
                        actionBar: { actions: ["cancel", "clear"] }
                      }}
                      {...field} />}
                />
              </Box>
            </Fragment>
          }

          {defaultValues.id !== null && <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="active"
              render={({ field: { ref, value, onChange, ...field } }) => (
                <FormControlLabel control={
                  <Checkbox checked={value} onChange={onChange} />
                } label={text.active} />

              )}
            />
          </Box>}





        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {defaultValues.id && deletable && <Button size='large' endIcon={<Delete />} variant='outlined' onClick={() => onAction('delete')}>{text.delete}</Button>}

          <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' type="submit" >
            {text.save}
          </Button>
          {/* {!defaultValues.id &&
            <Button size='large' endIcon={<PestControl />} variant='contained' type="submit" onClick={() => console.log('save +')}>{`${text.save} +`}</Button>
          } */}

        </DialogActions>
      </form >

    </Dialog>
  );

}
export default FieldPointDialog;
