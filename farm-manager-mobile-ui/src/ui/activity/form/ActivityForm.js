import { BottomNavigation, BottomNavigationAction, Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLang, setSnackbar } from '../../../features/app/appSlice'
import { ACTIVITY_DEF_TYPES, SPRAYER, SPRAY_TYPES, asLocalDate } from '../../FarmUtil'
import ActivityHeaderView from './ActivityHeaderView'
import { useForm, Controller, useWatch } from "react-hook-form";
import { Cancel, Delete, Save } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import ActivityFields from './ActivityFields'
import ActivityResources from './ActivityResources'
import { useCreateActivityMutation, useDeleteActivityMutation, useUpdateActivityMutation } from '../../../features/activities/activitiesApiSlice'
import { useGetCropsQuery } from '../../../features/crops/cropsApiSlice'
import { CUSTOMER, useGetResourcesQuery } from '../../../features/resources/resourcesApiSlice'
import Loading from '../../../components/Loading'
import { useGetActivityDefsQuery } from '../../../features/activityDefs/activityDefsApiSlice'
import ActionApprovalDialog from '../../../components/ui/ActionApprovalDialog'
import { useGetResourcesTariffQuery } from '../../../features/tariff/tariffApiSlice'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { getReference, isSkipTariffFetch } from './ActivityUtil'

const ActivityForm = ({ activity }) => {

  const { type, src } = useParams()
  const navigate = useNavigate()
  const text = useSelector(selectLang)
  const [createActivity] = useCreateActivityMutation();
  const [updateActivity] = useUpdateActivityMutation()
  const [deleteActivity] = useDeleteActivityMutation()
  const { data: user } = useGetUserDataQuery()

  const { data: activityDefs, isSuccess: isActivityDefsSuccess } = useGetActivityDefsQuery()
  const { data: crops, isSuccess: isCropsSuccess } = useGetCropsQuery()

  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useDispatch()
  const [fetchTariffs, setFetchTariffs] = useState(false);

  const {
    data: customers,
    // isLoading,
    isSuccess: isCustomersSuccess,
    isError,
    error
  } = useGetResourcesQuery({ type: CUSTOMER })


  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields },
  } = useForm({ defaultValues: activity, });

  const execution = useWatch({ control, name: "execution" })
  const activityDef = useWatch({ control, name: "activityDef" })
  const resources = useWatch({ control, name: "resources" })
  const fields = useWatch({ control, name: "fields" })


  const activityArea = fields.map(e => e.activityArea).reduce((accumulator, curValue) => accumulator + curValue, 0)

  const { data: tariffs, isSuccess: isTariffsSuccess, isLoading: isTariffLoading, } = useGetResourcesTariffQuery({
    activityType: activity.type,
    date: asLocalDate(execution),
    reference: getReference(activity.type, resources, activityDef),
    resources: resources.filter(e => e.manualTariff === false).map(e => e.resource.id)
  }, { skip: isSkipTariffFetch(isDirty, user.financial, resources) });

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


  const handleDelete = (value) => {
    setDeleteOpen(false)
    if (value) {
      deleteActivity(activity.uuid);
      navigate(-1)
      dispatch(setSnackbar({ msg: text.recordDeleted }))

    }
  }

  const onSubmit = async (data) => {
    // console.log('data', data);

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

    <Box sx={{ maxHeight: window.innerHeight - 130, overflow: 'auto' }}>
      <Box margin={1}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <ActivityHeaderView control={control} register={register} activity={activity} errors={errors} crops={crops} activityDefs={activityDefs} customers={customers} />
          <ActivityFields control={control} register={register} activity={activity} getValues={getValues} errors={errors} />
          <ActivityResources control={control} register={register} activity={activity}
            errors={errors} tariffs={tariffs} activityArea={activityArea} />
          <Box padding={1}>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <TextField
                  id="activity-note"
                  size='small'
                  label={text.note} fullWidth multiline rows={3} {...field} />
              )}
            />
          </Box>
          <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingTop: 2, borderTop: 1, borderTopColor: 'lightGray', backgroundColor: 'white', zIndex: 1000 }} value={-1}
            showLabels>
            <BottomNavigationAction
              label={<Typography>{text.cancel}</Typography>}
              onClick={() => navigate(-1)}
              // to={`/field/${src}/${fieldId}/dash`} component={Link}
              icon={<Cancel fontSize='large' />}
            />
            {activity.editable && activity.uuid && <BottomNavigationAction
              label={<Typography>{text.delete}</Typography>}
              onClick={() => setDeleteOpen(true)}
              icon={<Delete fontSize='large' />}
            />}

            {activity.editable && <BottomNavigationAction disabled={!isDirty} sx={{ color: !isDirty ? 'lightGray' : null }}
              type="submit"
              label={<Typography >{text.save}</Typography>}
              icon={<Save fontSize='large' />}
            />}
          </BottomNavigation>
          <ActionApprovalDialog open={deleteOpen} handleClose={handleDelete}
            title={text.deleteFormTitle} body={text.deleteFormBody} okText={text.delete} cancelText={text.cancel} />
        </form>
      </Box>
    </Box>

  );
};
export default ActivityForm