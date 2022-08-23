import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useGetActivityByIdQuery } from '../../features/activities/activitiesApiSlice'
import { selectLang } from '../../features/auth/authSlice'
import InfoLine from '../field/InfoLine'

const Activity = () => {

  const { activityId, src } = useParams()
  const text = useSelector(selectLang)

  const { data: activity, isLoading, isSuccess, isError, error } = useGetActivityByIdQuery(activityId)

  console.log('data', activity);
  if (isLoading) return <Loading />


  if (activity && isSuccess) {
    return (
      <Box>
        <InfoLine title={text.date} value={activity.type} />
        <InfoLine title={text.date} value={activity.execution} />
        <Typography variant='h6'>
          {text.fields}
        </Typography >
        {activity.fields.map((e, index) =>
          <InfoLine key={index} title={e.field.name} value={e.field.cropName} />
        )}

        <Typography variant='h6'>
          {text.resources}
        </Typography>
        {activity.resources.map((e, index) =>
          <InfoLine key={index} title={e.resource.name} value={e.resource.usageUnit} />
        )}

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

export default Activity