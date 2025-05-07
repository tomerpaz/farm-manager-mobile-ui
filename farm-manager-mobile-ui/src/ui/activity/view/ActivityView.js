import {  Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import Loading from '../../../components/Loading'
import { useGetActivityByIdQuery } from '../../../features/activities/activitiesApiSlice'
import { GENERAL, GENERAL_PLAN, HARVEST, IRRIGARION_TYPES, IRRIGATION, IRRIGATION_PLAN, MARKET, SCOUT, SPRAY, SPRAY_PLAN, SPRAY_TYPES, parseISOOrNull } from '../../FarmUtil'
import ActivityForm from '../form/ActivityForm'
import { parseISO } from 'date-fns'

const SUPPORTED_TYPES = [GENERAL, HARVEST, IRRIGATION, SPRAY, MARKET, GENERAL_PLAN,IRRIGATION_PLAN,SPRAY_PLAN, SCOUT]

const ActivityView = () => {

  const { activityId, src } = useParams()
  const navigate = useNavigate()


  const { data: activity, isLoading, isSuccess, isError, error } = useGetActivityByIdQuery(activityId)

  if (isLoading) return <Loading />

  if (activity && isSuccess) {


    if (SUPPORTED_TYPES.includes(activity.type)) {
      // const isPlan = activity.type.includes("_PLAN")
      const fields = activity.fields.map(e => {
        return { ...e, actualExecution: parseISOOrNull(e.actualExecution) }
      });

      const act = { ...activity, fields, marketParams: { ...activity.marketParams } }

      act.execution = parseISO(activity.execution);
      if (IRRIGARION_TYPES.includes(activity.type)) {
        act.executionEnd = parseISO(activity.executionEnd);
      }
      if (SPRAY_TYPES.includes(activity.type)) {
        act.endHour = parseISO(`${activity.execution} ${activity.endHour}`);
      }

      if (MARKET === activity.type && act.marketParams?.sortDate) {
        act.marketParams.sortDate = parseISO(act.marketParams.sortDate);
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

   return (
      <Box margin={1}>
        {activity.type}
      </Box>
    )
  }
}

export default ActivityView