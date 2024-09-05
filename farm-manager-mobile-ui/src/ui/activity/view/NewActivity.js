import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { selectCurrentYear } from '../../../features/app/appSlice'
import ActivityForm from '../form/ActivityForm'
import { IRRIGARION_TYPES, MARKET, SCOUT, SPRAY, SPRAY_TYPES, firstDayOfThisMonth, getWinds, lastDayOfThisMonth, newDate, startOfDay } from '../../FarmUtil'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { useFieldsById } from '../../../features/fields/fieldsApiSlice'
import { parseISO } from 'date-fns'
import { fi } from 'date-fns/locale'
import { newFieldMarketParams } from '../form/fields/ActivityFields'

const NewActivity = () => {

  const { type, src } = useParams()
  let [searchParams, setSearchParams] = useSearchParams();


  const { data: user, isLoading } = useGetUserDataQuery()
  const currentYear = useSelector(selectCurrentYear)
  const fid = searchParams.get("fid");
  const field = useFieldsById(currentYear, Number(fid));

  const isPlan = type.includes("_PLAN")
  const isSpray = SPRAY_TYPES.includes(type);
  const isIrrigation = IRRIGARION_TYPES.includes(type);
  const isMarket = MARKET === type;
  const isScout = SCOUT === type;

  const wind = isSpray ? getWinds()[0] : null;

  const fields = field ? [{
    field, activityArea: field.area, fieldNote: null, actualExecution: null,
    fieldMarketParams: isMarket ? newFieldMarketParams() : null
  }] : [];

  const crop = field ? { id: field?.cropId, name: field?.cropName } : null;
  const activity = {
    type, plan: isPlan,
    execution: isIrrigation ? firstDayOfThisMonth() : new Date(),
    executionEnd: isIrrigation ? lastDayOfThisMonth() : null,
    endHour: isSpray ? new Date() : null,
    irrigationParams: isIrrigation ? {} : null,
    sprayParams: isSpray || isScout ? { volumePerAreaUnit: '', volume: '', wind, crop } : null,
    scoutParams: isScout ? { scouts: [] } : null,
    marketParams: isMarket ? { incomeCalc: '', sortDate: null, sortReference: '' } : null,
    activityDef: null, year: user.year, customer: null, fields, resources: [], note: '', invoice: '', editable: true, waybill: ''
  };

  return (
    <Box >
      <ActivityForm activity={activity} />
    </Box>
  )
}

export default NewActivity