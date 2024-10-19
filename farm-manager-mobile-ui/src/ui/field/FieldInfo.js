import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/app/appSlice';
import InfoLine from './InfoLine'
import ActionSpeedDial from '../../components/ui/ActionSpeedDial'
import { daysDiffToday, displayFieldName, getPointTypeColor, getPointTypes, parseDate, trap } from '../FarmUtil'
import { useGetFieldPointsQuery } from '../../features/points/pointsApiSlice'
import LayersDialog from '../layers/LayersDialog'
import FieldPointDialog from '../point/FieldPointDialog'

const FieldInfo = ({ field }) => {

    const { fieldId } = useParams()

    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()


    const { data: points, isLoading: isLoadingPoints, isFetching: isFetchingPoints } = useGetFieldPointsQuery({ fieldId });


    const [point, setPoint] = useState(null);
    const [dialog, setDialog] = React.useState(null);

    const onFieldMapClick = (event, element, type) => {
        // console.log('onFieldMapClick', /*event, element*/ type);
        // if (type === 'map') {
        //     const p = { id: null, lat: event.latlng.lat, lng: event.latlng.lng, fieldId, 
        //         name: `${displayFieldName(field)} - ${points.length+1} `, 
        //         pest: null,
        //         expiry: null,
        //         active: true, type: getPointTypes()[0] };
        //     setPoint(p);
        //     //setDialog('point')
        // }
        // if (type === 'point') {
        //     event.originalEvent.view.L.DomEvent.stopPropagation(event)
        //     setPoint(element);
        // }
    }

    const handleCloseEditPoint = (action, e) => {
       // setEditPoint(false);
      // console.log(action)
        if (action === 'delete') {
          //handleClose(null);
        } else if ((action === 'save')) {
          setPoint(null);
        }
       setPoint(null);
    
      }

    const height = (window.innerHeight - 120) / 2;

const buildFieldPoints = (arr)=> {
    return arr?.map(e => {

        const val = { ...e, color: getPointTypeColor(e.type), fillColor: getPointTypeColor(e.type) }
        return val;
    });
   
}

    const src = 'map'
    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} onClick={onFieldMapClick}  points={[]/*buildFieldPoints(points)*/} />}
            {!field.plantation && !field.endDate && <InfoLine value={daysDiffToday(new Date(field.startDate))} title={text.daysSinceSeedling} />}
            <InfoLine value={field.siteName} title={text.site} />
            <InfoLine value={field.parentFieldName} title={text.parentField} />
            <InfoLine value={field.season} title={text.season} />
           {field.endDate && <InfoLine value={`${parseDate(field.endDate)}`} title={text.end} />}
            <InfoLine value={field.tag1Name} title={field.tag1Type} />
            <InfoLine value={field.tag2Name} title={field.tag2Type} />
            {field.maturity &&  <InfoLine value={`${parseDate(field.maturity)}`} title={text.maturity} />}
            <InfoLine value={field.density} title={text.density} />
            <InfoLine value={field.plantSpacing} title={text.plantSpacing} />
            <InfoLine value={field.rowSpacing} title={text.rowSpacing} />
            <InfoLine value={field.note} title={text.note} />
            <Box height={150}/>
            {point && <FieldPointDialog open={point !== null} deletable={true} defaultValues={point} handleClose={handleCloseEditPoint} types={getPointTypes()} />}

            <ActionSpeedDial bottom={100} map={true} plan={false} fieldId={fieldId} />
            {/* <LayersDialog/> */}
        </Box>
    )
}

export default FieldInfo