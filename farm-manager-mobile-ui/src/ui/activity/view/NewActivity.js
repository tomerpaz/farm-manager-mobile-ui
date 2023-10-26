import { BottomNavigation, BottomNavigationAction, Box, Divider, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { useCreateActivityMutation, useGetActivityByIdQuery } from '../../../features/activities/activitiesApiSlice'
import { selectLang } from '../../../features/app/appSlice'
import InfoLine from '../../field/InfoLine'
import ResourcesView from './ResourcesView'
import FieldsView from './FieldsView'
import ActivityHeaderView from './ActivityHeaderView'
import { ControlPointDuplicate, Delete, DeleteForever, DeleteOutline, DeleteRounded, Save, Task, HighlightOffRounded } from '@mui/icons-material'
import TextFieldBase from '../../../components/ui/TextField'
import ActivityForm from '../form/ActivityForm'
import { getWinds, newDate } from '../../FarmUtil'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'

const NewActivity = () => {

  const { type, src } = useParams()
  const navigate = useNavigate()

  const { data: user, isLoading } = useGetUserDataQuery()

  const text = useSelector(selectLang)

  // const { data: activity, isLoading, isSuccess, isError, error } = useGetActivityByIdQuery(activityId)

  console.log('year', user.year);

  // if (activity && isSuccess) {

  const isPlan = type.includes("_PLAN")

  const isSpray = type.includes("SPRAY")

  const wind = isSpray ? getWinds()[0] : null;



  return (
    <Box margin={1}>
      <ActivityForm activity={{ type, plan: isPlan, execution: newDate(), activityDef: null, year: user.year, wind, customer: null, fields: [], resources: [], note: null }} />
    </Box>
  )

}

export default NewActivity