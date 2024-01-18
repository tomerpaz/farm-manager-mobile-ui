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
import { ControlPointDuplicate, Delete, DeleteForever, DeleteOutline, DeleteRounded, Save, Task, HighlightOffRounded } from '@mui/icons-material'
import TextFieldBase from '../../../components/ui/TextField'
import { GENERAL, HARVEST, IRRIGARION_TYPES, IRRIGATION, SPRAY, SPRAY_TYPES, parseISOOrNull } from '../../FarmUtil'
import ActivityForm from '../form/ActivityForm'
import { parseISO } from 'date-fns'

const SUPPORTED_TYPES = [GENERAL, HARVEST, IRRIGATION, SPRAY]

const ActivityView = () => {

  const { activityId, src } = useParams()
  const navigate = useNavigate()

  const text = useSelector(selectLang)

  const { data: activity, isLoading, isSuccess, isError, error } = useGetActivityByIdQuery(activityId)

  if (isLoading) return <Loading />

  if (activity && isSuccess) {


    if (SUPPORTED_TYPES.includes(activity.type)) {

      const fields = activity.fields.map(e => {
        return { ...e, actualExecution: parseISOOrNull(e.actualExecution) }
      });

      const act = { ...activity, fields }
     // console.log(activity);

      act.execution = parseISO(activity.execution);
      if (IRRIGARION_TYPES.includes(activity.type)) {
        act.executionEnd = parseISO(activity.executionEnd);
      }
      if (SPRAY_TYPES.includes(activity.type)) {
        act.endHour = parseISO(`${activity.execution} ${activity.endHour}`);
      }

      act.note = act.note ? act.note : '';
      act.invoice = act.invoice ? act.invoice : ''
      act.year = activity.year ? activity.year : act.execution.getFullYear();
      act.waybill = act.waybill ? act.waybill : '';
      // act.fields.forEach(e => {
      //   e.actualExecution = parseISOOrNull(e.actualExecution);
      // });

      return (
        <Box>
          <ActivityForm activity={act} />
        </Box>
      )
    }

    const isPlan = activity.type.includes("_PLAN")

    return (
      <Box margin={1}>
        <ActivityHeaderView activity={activity} />
        <FieldsView activity={activity} />
        <ResourcesView activity={activity} />

        <Box marginTop={1}>
          {/* <Typography variant='h6'>
            {text.note}
          </Typography> */}
          {/* <Typography variant='body1'>
            {activity.note}
          </Typography> */}
          <TextFieldBase
            value={activity.note ? activity.note : ''}
            label={text.note}
            onChange={e => console.log(e.target.value)}
            multiline={true}
            maxRows={2}
            minRows={2}
            fullWidth
          />
        </Box>



        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={-1}
          showLabels>
          <BottomNavigationAction sx={{ color: 'lightGray' }}

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
            icon={<ControlPointDuplicate />}
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
          <BottomNavigationAction
            color='blue'
            label={text.cancel}
            onClick={() => navigate(-1)}
            // to={`/field/${src}/${fieldId}/dash`} component={Link}
            icon={<HighlightOffRounded />}
          />
        </BottomNavigation>
      </Box>
    )
  }
}

export default ActivityView