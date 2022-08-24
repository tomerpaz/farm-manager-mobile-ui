import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { useGetActivityByIdQuery } from '../../../features/activities/activitiesApiSlice'
import { selectLang } from '../../../features/auth/authSlice'
import InfoLine from '../../field/InfoLine'
import ResourcesView from './ResourcesView'
import FieldsView from './FieldsView'
import ActivityHeaderView from './ActivityHeaderView'

const ActivityView = () => {

  const { activityId, src } = useParams()
  const text = useSelector(selectLang)

  const { data: activity, isLoading, isSuccess, isError, error } = useGetActivityByIdQuery(activityId)

  console.log('data', activity);
  if (isLoading) return <Loading />



  if (activity && isSuccess) {
    return (
      <Box margin={1}>
        <ActivityHeaderView activity={activity} />
        <FieldsView activity={activity} />
        <ResourcesView activity={activity} />

        {activity.note &&
          <Box>
            <Typography variant='h6'>
              {text.note}
            </Typography>
            <Typography variant='body1'>
              {activity.note}
            </Typography>
          </Box>}
      </Box>
    )
  }
}

export default ActivityView