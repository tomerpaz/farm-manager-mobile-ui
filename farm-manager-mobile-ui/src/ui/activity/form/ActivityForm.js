import { BottomNavigation, BottomNavigationAction, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLang } from '../../../features/app/appSlice'
import { parseDate } from '../../FarmUtil'
import ActivityHeaderView from './ActivityHeaderView'
import { useForm, Controller } from "react-hook-form";
import TextFieldBase from '../../../components/ui/TextField'
import { HighlightOffRounded, Save } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import ActivityFields from './ActivityFields'
import ActivityResources from './ActivityResources'
import { useCreateActivityMutation } from '../../../features/activities/activitiesApiSlice'
import { useGetCropsQuery } from '../../../features/crops/cropsApiSlice'
import { CUSTOMER, useGetResourcesQuery } from '../../../features/resources/resourcesApiSlice'
import Loading from '../../../components/Loading'
import { useGetActivityDefsQuery } from '../../../features/activityDefs/activityDefsApiSlice'

const ActivityForm = ({ activity }) => {

  const { type, src } = useParams()
  const navigate = useNavigate()

  const text = useSelector(selectLang)

  
  const [createActivity] = useCreateActivityMutation()

  const { data: activityDefs, isSuccess: isActivityDefsSuccess } = useGetActivityDefsQuery()

  const { data: crops, isSuccess: isCropsSuccess } = useGetCropsQuery()

  const {
    data: customers,
    // isLoading,
    isSuccess: isCustomersSuccess,
    isError,
    error
  } = useGetResourcesQuery({ type: CUSTOMER })




  const { control, register, handleSubmit, getValues,formState: { errors }, setValue } = useForm(
    {
      defaultValues: activity,
    }
  );

  if (!isCropsSuccess || !isActivityDefsSuccess || !isCustomersSuccess) {
    return <Loading/>
  }
  const onSubmit = async (data) => {
    console.log('data',data);

    try {
      const result = await createActivity(data).unwrap()
      console.log('result', result);
     // dispatch(setCredentials(loginData))
     // navigate(DEFAULT_ROUTE)
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
        <ActivityHeaderView control={control} register={register} activity={activity} errors={errors} crops={crops} activityDefs={activityDefs} customers={customers}/>
        <ActivityFields control={control} register={register} activity={activity} getValues={getValues} errors={errors} setValue={setValue} />
        <ActivityResources control={control} register={register} activity={activity} />
        <TextFieldBase fullWidth multiline rows={4} />


        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={-1}
          showLabels>
          <BottomNavigationAction /*sx={{ color: 'lightGray' }}*/
            type="submit"
            label={text.save}
            icon={<Save fontSize='large'/>}
          />
          <BottomNavigationAction
            color='blue'
            label={text.cancel}
            onClick={() => navigate(-1)}
            // to={`/field/${src}/${fieldId}/dash`} component={Link}
            icon={<HighlightOffRounded fontSize='large'/>}
          />
        </BottomNavigation>
      </form>
    </>
  );
};
export default ActivityForm