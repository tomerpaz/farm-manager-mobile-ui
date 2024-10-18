import { BottomNavigation, BottomNavigationAction, Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLang, setSnackbar } from '../../../features/app/appSlice'
import { PESTICIDE, PLAN, SCOUT, asLocalDate, asLocalTime, daysDif, daysDiff } from '../../FarmUtil'
import ActivityHeaderView from './header/ActivityHeaderView'
import { useForm, Controller, useWatch } from "react-hook-form";
import { Cancel, CheckCircleOutline, ControlPointDuplicate, Delete, Save } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import ActivityFields from './fields/ActivityFields'
import ActivityWaypoints from './waypoints/ActivityWaypoints'

import ActivityResources from './resources/ActivityResources'
import { useCreateActivityMutation, useDeleteActivityMutation, useUpdateActivityMutation } from '../../../features/activities/activitiesApiSlice'
import { useGetCropsQuery } from '../../../features/crops/cropsApiSlice'
import { CUSTOMER, useGetResourcesQuery } from '../../../features/resources/resourcesApiSlice'
import Loading from '../../../components/Loading'
import { useGetActivityDefsQuery } from '../../../features/activityDefs/activityDefsApiSlice'
import ActionApprovalDialog from '../../../components/ui/ActionApprovalDialog'
import { useGetResourcesTariffQuery } from '../../../features/tariff/tariffApiSlice'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { getReference, getTotalActivityArea, isSkipTariffFetch } from './ActivityUtil'
import ActivityScouts from './scouts/ActivityScouts'

const ActivityForm = ({ activity }) => {

  const navigate = useNavigate()
  const text = useSelector(selectLang)
  const [createActivity] = useCreateActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();
  const { data: user } = useGetUserDataQuery();

  const { data: activityDefs, isSuccess: isActivityDefsSuccess } = useGetActivityDefsQuery()
  const { data: crops, isSuccess: isCropsSuccess } = useGetCropsQuery()
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isExecutePlan, setIsExecutePlan] = useState(false);



  const [openWaypointSelection, setOpenWaypointSelection] = useState(false);
  const dispatch = useDispatch()

  const {
    data: customers,
    // isLoading,
    isSuccess: isCustomersSuccess,
    isError,
    error
  } = useGetResourcesQuery({ type: CUSTOMER })

  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields }, reset, setValue, trigger
  } = useForm({ defaultValues: activity, });



  const execution = useWatch({ control, name: "execution" })
  const activityDef = useWatch({ control, name: "activityDef" })
  const resources = useWatch({ control, name: "resources" })
  const fields = useWatch({ control, name: "fields" })
  const uuid = useWatch({ control, name: "uuid" })
  const reference = useWatch({ control, name: "reference" })
  const executionEnd = useWatch({ control, name: "executionEnd" })
  const irrigationParams = useWatch({ control, name: "irrigationParams" })
  const days = daysDiff(execution, executionEnd);
  const sprayParams = useWatch({ control, name: "sprayParams" })
  const crop = useWatch({ control, name: "sprayParams.crop" })
  const activityArea = getTotalActivityArea(fields);
  const editable = useWatch({ control, name: "editable" })
  const type = useWatch({ control, name: "type" })

  const scoutParams = useWatch({ control, name: "scoutParams" })



  const tariffResourceIds = resources.filter(e => e.manualTariff === false).map(e => e.resource.id);
  const { data: tariffs, isSuccess: isTariffsSuccess, isLoading: isTariffLoading, } = useGetResourcesTariffQuery({
    activityType: activity.type,
    date: asLocalDate(execution),
    reference: getReference(activity.type, resources, activityDef),
    resources: tariffResourceIds
  }, { skip: isSkipTariffFetch(isDirty, user.financial, tariffResourceIds) });

  if (!isCropsSuccess || !isActivityDefsSuccess || !isCustomersSuccess) {
    return <Loading />
  }

  const saveActivity = (data) => {
    data.execution = asLocalDate(data.execution, true);
    data.executionEnd = asLocalDate(data.executionEnd, true);
    data.endHour = asLocalTime(data.endHour, true);


    if (data.uuid) {
      return updateActivity(data).unwrap();
    } else {
      data.src = 'MUI'
      console.log('create', data)

      return createActivity(data).unwrap();
    }
  }

  const duplicate = () => {
    setValue('uuid', null);
    setValue('planUuid', null);
    setValue('reference', null);
    setValue('editable', true);
    setValue('status', null);

    setIsDuplicate(true);
  }

  const executePlan = () => {
    setValue('planUuid', uuid);
    setValue('uuid', null);
    setValue('editable', true);
    setValue('type', type.replaceAll('_PLAN', ''));
    setValue('status', 'EXECUTING');
    setIsExecutePlan(true);
  }

  const onCropCHange = () => {
    setValue('fields', []);
    setValue('resources', resources.filter(e => e.resource.type !== PESTICIDE));
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
    try {
      const result = await saveActivity(data);
      dispatch(setSnackbar({ msg: data.uuid ? text.recordUpdated : text.recordCreated, severity: 'success' }))
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Box sx={{ maxHeight: window.innerHeight - 130, overflow: 'auto' }}>
      <Box margin={1}>
        <form onSubmit={handleSubmit(onSubmit)} >
          {/* <Box
            {...register(`uuid`)}
            {...register(`reference`)} /> */}


          <ActivityHeaderView control={control} register={register} type={type} activity={activity} errors={errors} crops={crops} activityDefs={activityDefs} customers={customers} reference={reference} isDuplicate={isDuplicate} isExecutePlan={isExecutePlan}
            execution={execution} days={days} crop={crop} onCropCHange={onCropCHange} />
          <ActivityFields control={control} register={register} activity={activity} getValues={getValues} activityArea={activityArea} errors={errors} crop={crop}
            openWaypointSelection={openWaypointSelection} setOpenWaypointSelection={setOpenWaypointSelection}
          />

          {openWaypointSelection && <ActivityWaypoints
            control={control} register={register} activity={activity} getValues={getValues} errors={errors} crop={crop}
            openWaypointSelection={openWaypointSelection} setOpenWaypointSelection={setOpenWaypointSelection}

          />}
          {activity.type === SCOUT && <ActivityScouts control={control} register={register} activity={activity} getValues={getValues} />}

          <ActivityResources control={control} register={register} activity={activity} activityDef={activityDef}
            errors={errors} tariffs={tariffs} activityArea={activityArea} days={days}
            irrigationParams={irrigationParams} setValue={setValue} trigger={trigger}
            fieldsCount={fields.length} sprayParams={sprayParams}
          />
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
          <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingTop: 2, paddingBottom: 2, borderTop: 1, borderTopColor: 'lightGray', backgroundColor: 'white', zIndex: 1000 }} value={-1}
            showLabels>
            {/* <BottomNavigationAction
              label={<Typography>{text.cancel}</Typography>}
              onClick={() => navigate(-1)}
              icon={<Cancel fontSize='large' />}
            /> */}
            {activity.editable && uuid && <BottomNavigationAction
              label={<Typography>{text.delete}</Typography>}
              onClick={() => setDeleteOpen(true)}
              icon={<Delete fontSize='large' />}
            />}
            {uuid && <BottomNavigationAction
              label={<Typography>{text.duplicate}</Typography>}
              onClick={duplicate}
              icon={<ControlPointDuplicate fontSize='large' />}
            />}
            {uuid && activity.status === PLAN && <BottomNavigationAction

              label={<Typography >{text.execute}</Typography>}
              onClick={executePlan}
              icon={<CheckCircleOutline fontSize='large' />}
            />}
            {editable && <BottomNavigationAction disabled={!isDirty} sx={{ color: !isDirty ? 'lightGray' : null }}
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