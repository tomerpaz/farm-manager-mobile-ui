import { Alert, BottomNavigation, BottomNavigationAction, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLang, setSnackbar } from '../../../features/app/appSlice'
import { parseDate } from '../../FarmUtil'
import ActivityHeaderView from './ActivityHeaderView'
import { useForm, Controller } from "react-hook-form";
import TextFieldBase from '../../../components/ui/TextField'
import { Cancel, Delete, HighlightOffRounded, Save } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import ActivityFields from './ActivityFields'
import ActivityResources from './ActivityResources'
import { useCreateActivityMutation, useDeleteActivityMutation, useUpdateActivityMutation } from '../../../features/activities/activitiesApiSlice'
import { useGetCropsQuery } from '../../../features/crops/cropsApiSlice'
import { CUSTOMER, useGetResourcesQuery } from '../../../features/resources/resourcesApiSlice'
import Loading from '../../../components/Loading'
import { useGetActivityDefsQuery } from '../../../features/activityDefs/activityDefsApiSlice'
import ActionApprovalDialog from '../../../components/ui/ActionApprovalDialog'

const ActivityForm = ({ activity }) => {

  const { type, src } = useParams()
  const navigate = useNavigate()
  const text = useSelector(selectLang)
  const [createActivity] = useCreateActivityMutation();
  const [updateActivity] = useUpdateActivityMutation()
  const [deleteActivity] = useDeleteActivityMutation()

  const { data: activityDefs, isSuccess: isActivityDefsSuccess } = useGetActivityDefsQuery()
  const { data: crops, isSuccess: isCropsSuccess } = useGetCropsQuery()
  const [showSnack, setShowSnack] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useDispatch()

  const {
    data: customers,
    // isLoading,
    isSuccess: isCustomersSuccess,
    isError,
    error
  } = useGetResourcesQuery({ type: CUSTOMER })

  const { control, register, handleSubmit, getValues, formState: { errors },
    formState: { isDirty, dirtyFields },
  } = useForm({ defaultValues: activity, });

  console.log('isDirty', isDirty);

  if (!isCropsSuccess || !isActivityDefsSuccess || !isCustomersSuccess) {
    return <Loading />
  }

  const saveActivity = (data) => {
    if (data.uuid) {
      return updateActivity(data).unwrap();
    } else {
      createActivity(data).unwrap();
    }
  }

  const deleteAction = () => {
    setDeleteOpen(true)
  }

  const handleDelete = (value) => {
    setDeleteOpen(false)
    if (value) {
      deleteActivity(activity.uuid);
      navigate(-1)
      dispatch(setSnackbar({ msg: text.recordDeleted }))

    }
  }

  const onSubmit = async (data) => {
    console.log('data', data);

    try {
      const result = await saveActivity(data);
      dispatch(setSnackbar({ msg: data.uuid ? text.recordUpdated : text.recordCreated, severity: 'success' }))
      navigate(-1)
    } catch (err) {

      console.log(err);
      // if (!err?.originalStatus) {
      //     // isLoading: true until timeout occurs
      //     setErrMsg('No Server Response');
      // } else if (err.originalStatus === 400) {
      //     setErrMsg('Missing Username or Password');
      // } else if (err.originalStatus === 401) {
      //     setErrMsg('Unauthorized');
      // } else {
      //     setErrMsg('Login Failed');
      // }
      // errRef.current.focus();
    }

  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ActivityHeaderView control={control} register={register} activity={activity} errors={errors} crops={crops} activityDefs={activityDefs} customers={customers} />
        <ActivityFields control={control} register={register} activity={activity} getValues={getValues} errors={errors} />
        <ActivityResources control={control} register={register} activity={activity} errors={errors} />
        <Box padding={1}>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextField
                id="activity-note"
                size='small'
                label={text.note} fullWidth multiline rows={4} {...field} />
            )}
          />
        </Box>
        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={-1}
          showLabels>
          {activity.editable && <BottomNavigationAction disabled={!isDirty} sx={{ color: !isDirty ? 'lightGray' : null }}
            type="submit"
            label={<Typography >{text.save}</Typography>}
            icon={<Save fontSize='large' />}
          />}
          {activity.editable && activity.uuid && <BottomNavigationAction
            label={<Typography>{text.delete}</Typography>}
            onClick={() => setDeleteOpen(true)}
            icon={<Delete fontSize='large' />}
          />}
          <BottomNavigationAction
            label={<Typography>{text.cancel}</Typography>}
            onClick={() => navigate(-1)}
            // to={`/field/${src}/${fieldId}/dash`} component={Link}
            icon={<Cancel fontSize='large' />}
          />
        </BottomNavigation>
        <ActionApprovalDialog open={deleteOpen} handleClose={handleDelete}
          title={text.deleteFormTitle} body={text.deleteFormBody} okText={text.delete} cancelText={text.cancel} />
      </form>
    </>
  );
};
export default ActivityForm