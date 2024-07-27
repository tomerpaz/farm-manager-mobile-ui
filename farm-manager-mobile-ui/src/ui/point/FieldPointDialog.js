import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, DialogActions, DialogContent, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, setSnackbar } from '../../features/app/appSlice';
import TextFieldBase from '../../components/ui/TextField';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useCreateFieldPointMutation, useUpdateFieldPointMutation } from '../../features/points/pointsApiSlice';
import { Controller, useForm } from 'react-hook-form';
import { Cancel, Save } from '@mui/icons-material';
import { getPointTypes, UI_SIZE } from '../FarmUtil';

const FieldPointDialog = ({ defaultValues, open, handleClose }) => {

  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()


  const [createFieldPoint] = useCreateFieldPointMutation();
  const [updateFieldPoint] = useUpdateFieldPointMutation()

  const dispatch = useDispatch()

  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields }, reset, setValue, trigger
  } = useForm({ defaultValues });


  const saveFieldPoint = (data) => {
    if (data.id) {
      return createFieldPoint(data).unwrap();
    } else {
      return updateFieldPoint(data).unwrap();
    }
  }

  const onSubmit = async (data) => {
    try {
      const result = await saveFieldPoint(data);

      dispatch(setSnackbar({ msg: data.id ? text.recordUpdated : text.recordCreated, severity: 'success' }))
      handleClose(null);
    } catch (err) {
      console.log(err);
    }
  }

  const onAction = (save) => {
    handleClose(null);
    //  setOpen(false)
  }


  return (

    <Dialog open={open}>
      <DialogTitle>{"point"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} >

        <DialogContent>
          {/* <DialogContentText>
          {`${text.field} ${fieldName}`}
        </DialogContentText> */}

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
                  {getPointTypes().map((option) => (
                    <MenuItem key={option} value={option}>
                      {text[option]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
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





        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
          <Button size='large' disabled={!isDirty} endIcon={<Save />} disableElevation={true} variant='contained' type="submit" >
            {text.save}
          </Button>
        </DialogActions>
      </form >

    </Dialog>
  );

}
export default FieldPointDialog;
