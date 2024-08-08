import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, Checkbox, DialogActions, DialogContent, FormControlLabel, IconButton, InputAdornment, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, setSnackbar } from '../../features/app/appSlice';
import TextFieldBase from '../../components/ui/TextField';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useCreateFieldPointMutation, useDeleteFieldPointMutation, useUpdateFieldPointMutation } from '../../features/points/pointsApiSlice';
import { Controller, useForm } from 'react-hook-form';
import { Cancel, Close, Delete, Save } from '@mui/icons-material';
import { getPointTypes, UI_SIZE } from '../FarmUtil';

const FieldPointDialog = ({ defaultValues, open, handleClose, deletable }) => {

  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()


  const [createFieldPoint] = useCreateFieldPointMutation();
  const [updateFieldPoint] = useUpdateFieldPointMutation()
  const [deleteFieldPoint] = useDeleteFieldPointMutation()

  const dispatch = useDispatch()

  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields }, reset, setValue, trigger
  } = useForm({ defaultValues });


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
      handleClose('save',result);
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


  return (

    <Dialog fullWidth open={open}>
        <AppBar sx={{ position: 'relative' }} elevation={0}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {`${text.waypoint}`}
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
        </AppBar>      <form onSubmit={handleSubmit(onSubmit)} >

        <DialogContent>
          <Typography variant='h6'>{text.waypoint}</Typography>
          {/* <DialogContentText>
          {`${text.field} ${fieldName}`}
        </DialogContentText> */}

          {/* <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
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
                  {getPointTypes().map((option) => (
                    <MenuItem key={option} value={option}>
                      {text[option]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box> */}
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

          <Button size='large' disabled={!isDirty} endIcon={<Save />} disableElevation={true} variant='contained' type="submit" >
            {text.save}
          </Button>
        </DialogActions>
      </form >

    </Dialog>
  );

}
export default FieldPointDialog;
