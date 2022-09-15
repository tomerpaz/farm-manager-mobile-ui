import { BottomNavigation, BottomNavigationAction, Box, Divider, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { useGetActivityByIdQuery } from '../../../features/activities/activitiesApiSlice'
import { selectLang } from '../../../features/app/appSlice'
import InfoLine from '../../field/InfoLine'
import ResourcesView from './ResourcesView'
import FieldsView from './FieldsView'
import ActivityHeaderView from './ActivityHeaderView'
import { ControlPointDuplicate, Delete, DeleteForever, DeleteOutline, DeleteRounded, Save, Task } from '@mui/icons-material'

const ActivityView = () => {

  const { activityId, src } = useParams()
  const text = useSelector(selectLang)

  const { data: activity, isLoading, isSuccess, isError, error } = useGetActivityByIdQuery(activityId)

  console.log('data', activity);
  if (isLoading) return <Loading />

  if (activity && isSuccess) {

    const isPlan = activity.type.includes("_PLAN")

    return (
      <Box margin={1}>
        <ActivityHeaderView activity={activity} />
        <FieldsView activity={activity} />
        <ResourcesView activity={activity} />
        {activity.note &&
          <Box margin={1}>
            <Typography variant='h6'>
              {text.note}
            </Typography>
            <Typography variant='body1'>
              {activity.note}
            </Typography>
          </Box>}



        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={-1}
          showLabels>
          <BottomNavigationAction sx={{color: 'lightGray'}}

            label={text.save}
            // to={`/field/${src}/${fieldId}/info`} component={Link}
            icon={<Save />}
          />
          <BottomNavigationAction
            color='blue'
            disabled={true}
            label={text.delete}
            // to={`/field/${src}/${fieldId}/dash`} component={Link}
            icon={<DeleteRounded />}
          />
          <BottomNavigationAction 
            label={text.duplicate}
            onClick={() => console.log(text.duplicate)}
            // to={`/field/${src}/${fieldId}/history/0`} component={Link}
            icon={<ControlPointDuplicate/>}
          />
          {isPlan && <BottomNavigationAction
            label={text.execute}
            onClick={() => console.log(text.duplicate)}
            // to={`/field/${src}/${fieldId}/history/0`} component={Link}
            icon={<Task />}
          />}
          {/* <BottomNavigationAction
            disabled={field.imageryId === null}
            label={text.satellite}
            to={`/field/${src}/${fieldId}/imagery`} component={Link}
            icon={<SatelliteAltOutlined />}
          /> */}
        </BottomNavigation>
      </Box>
    )
  }
}

export default ActivityView