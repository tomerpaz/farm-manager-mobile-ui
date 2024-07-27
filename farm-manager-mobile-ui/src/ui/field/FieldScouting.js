import { Box, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/app/appSlice';
import ScoutDialog from '../scout/ScoutDialog';
import { useGetFieldPointsQuery } from '../../features/points/pointsApiSlice';
import FieldPointDialog from '../point/FieldPointDialog';

const FieldScouting = ({ field }) => {

    const { fieldId } = useParams()

    const [point, setPoint] = useState(null);


    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()

    const { data: points } = useGetFieldPointsQuery({ fieldId })


    console.log('points', points);
    const [open, setOpen] = React.useState(false);


    const height = (window.innerHeight - 180);


    const onScoutMapClick = (event, f, type) => {
        console.log(type, event);
        if (type !== 'point') {
            const p = { lat: event.latlng.lat, lng: event.latlng.lng, fieldId, name: 'trap', active: true, type: 'trap' };
            setPoint(p);

        }

    }
    console.log(point)

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} onClick={onScoutMapClick} points={points} />}
            {point && <FieldPointDialog open={true} defaultValues={point} handleClose={() => setPoint(null)} />}
        </Box>
    )
}

export default FieldScouting