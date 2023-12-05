import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { selectCurrentYear } from '../../../features/app/appSlice'
import ActivityForm from '../form/ActivityForm'
import { firstDayOfThisMonth, getWinds, lastDayOfThisMonth, newDate, startOfDay } from '../../FarmUtil'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { useFieldsById } from '../../../features/fields/fieldsApiSlice'
import { parseISO } from 'date-fns'

const NewActivity = () => {

  const { type, src } = useParams()
  let [searchParams, setSearchParams] = useSearchParams();


  const { data: user, isLoading } = useGetUserDataQuery()
  const currentYear = useSelector(selectCurrentYear)
  const fid = searchParams.get("fid");
  const field = useFieldsById(currentYear, Number(fid));

  const isPlan = type.includes("_PLAN")
  const isSpray = type.includes("SPRAY")
  const isIrrigation = type.includes("IRRIGATION")

  const wind = isSpray ? getWinds()[0] : null;

  const fields = field ? [{ field, activityArea: field.area, fieldNote: null, actualExecution: null }] : [];
  const activity = {
    type, plan: isPlan,
    execution: firstDayOfThisMonth(),
    executionEnd : isIrrigation ? lastDayOfThisMonth() : null,
    irrigationParams: null,
    activityDef: null, year: user.year, wind, customer: null, fields, resources: [], note: '', invoice: '', editable: true, waybill: ''
  };

  return (
    <Box >
      <ActivityForm activity={activity} />
    </Box>
  )
}

export default NewActivity