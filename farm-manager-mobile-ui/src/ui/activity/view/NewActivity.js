import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { selectCurrentYear, selectNewActivityGeo } from '../../../features/app/appSlice'
import ActivityForm from '../form/ActivityForm'
import { IRRIGARION_TYPES, MARKET, SCOUT, SPRAY, SPRAY_TYPES, asLocalDateTime, firstDayOfThisMonth, getGeoPosition, getLocalitation, getLocation, getWinds, isArrayEmpty, isPointInPoly, lastDayOfThisMonth, newDate, startOfDay, testIsPointInPoly } from '../../FarmUtil'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { useFields, useFieldsById } from '../../../features/fields/fieldsApiSlice'
import { parseISO } from 'date-fns'
import { fi } from 'date-fns/locale'
import { newFieldMarketParams } from '../form/fields/ActivityFields'
import { useGetPointQuery } from '../../../features/points/pointsApiSlice'
import Loading from '../../../components/Loading'
import { useState } from 'react'


export function getFieldsByLocation(data, pt) {

  if (data) {
    if (pt && Array.isArray(pt)) {
      const inFields = data.filter(e => e.endDate === null && isPointInPoly(e.geoPoints, pt));
      return inFields;
    }
  }
  return [];
}

const prepareFields = (activityFields, isMarket) => {
  if (isArrayEmpty(activityFields)) {
    return [];
  } else {
    return activityFields.map(field => {
      return {
        field, activityArea: field.area, fieldNote: null, actualExecution: null,
        fieldMarketParams: isMarket ? newFieldMarketParams() : null
      }
    }
    );
  }

  // const fields = field ? [{
  //   field, activityArea: field.area, fieldNote: null, actualExecution: null,
  //   fieldMarketParams: isMarket ? newFieldMarketParams() : null
  // }] : [];

}

const NewActivity = () => {

  const { type, src } = useParams()
  let [searchParams, setSearchParams] = useSearchParams();


  const { data: user, isLoading } = useGetUserDataQuery()
  const currentYear = useSelector(selectCurrentYear)
  const fid = searchParams.get("fid");
  const data = useFields(currentYear)

  const [position, setPosition] = useState(0);

  const newActivityGeo = useSelector(selectNewActivityGeo);

console.log('newActivityGeo',newActivityGeo)
  //testIsPointInPoly();

  const field = useFieldsById(currentYear, Number(fid));
  // console.log('data',data) 

  const isLoadingPosition = (fid === null && position === 0 && newActivityGeo);

  if (isLoadingPosition) {
    getGeoPosition(setPosition)
  }

  const pid = searchParams.get("pid");

  const { data: point, isLoading: isLoadingPoint, isFetching: isFetchingPoint } = useGetPointQuery({ id: pid }, { skip: !pid });

  if (isLoadingPoint || isFetchingPoint || isLoadingPosition) {
    return <Loading />
  }

  console.log('field: ', field);

  if (!field) {
    const fieldsByLocation = getFieldsByLocation(data, position);
  }


  const isPlan = type.includes("_PLAN")
  const isSpray = SPRAY_TYPES.includes(type);
  const isIrrigation = IRRIGARION_TYPES.includes(type);
  const isMarket = MARKET === type;
  const isScout = SCOUT === type;

  const wind = isSpray ? getWinds()[0] : null;

  const fields = prepareFields(field ? [field] : getFieldsByLocation(data, position), isMarket)




  const points = point ? [{
    point, note: '', createTime: asLocalDateTime(newDate(), true)
  }] : [];

  const scouts = isScout && point?.pest ? [{
    finding: point.pest, note: '', location: 'none', infectionLevel: 'none', value: ''
  }] : [];

  const crop = field ? { id: field?.cropId, name: field?.cropName } : null;
  const activity = {
    type, plan: isPlan,
    execution: isIrrigation ? firstDayOfThisMonth() : new Date(),
    executionEnd: isIrrigation ? lastDayOfThisMonth() : null,
    endHour: isSpray ? new Date() : null,
    irrigationParams: isIrrigation ? {} : null,
    sprayParams: isSpray || isScout ? { volumePerAreaUnit: '', volume: '', wind, crop } : null,
    scoutParams: isScout ? { scouts } : null,
    marketParams: isMarket ? { incomeCalc: '', sortDate: null, sortReference: '' } : null,
    activityDef: null, year: user.year, customer: null, fields, resources: [], note: '', invoice: '', editable: true, waybill: '',
    points
  };

  return (
    <Box >
      <ActivityForm activity={activity} />
    </Box>
  )
}

export default NewActivity