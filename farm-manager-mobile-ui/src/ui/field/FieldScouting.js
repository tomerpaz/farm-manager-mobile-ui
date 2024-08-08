import { Box, CircularProgress, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectCurrentYear, selectLang } from '../../features/app/appSlice';
import ScoutingForm from '../scout/ScoutingForm';
import { useGetFieldPointsQuery } from '../../features/points/pointsApiSlice';
import FieldPointDialog from '../point/FieldPointDialog';
import ScoutOptionDialog from '../scout/ScoutOptionDialog';
import ScoutFieldHistoryDialog from '../scout/ScoutFieldHistoryDialog';
import { useGetFieldScoutsQuery } from '../../features/scout/scoutsApiSlice';
import { getInfectionLevelColor, isArrayEmpty, newDate } from '../FarmUtil';
import { buildScoutPoints } from '../scout/ScoutingUtil';
import { useGetPestStagesQuery } from '../../features/pests/pestsApiSlice';

const FieldScouting = ({ field }) => {

    const { fieldId } = useParams()

    const [point, setPoint] = useState(null);
  //  const [reloadMap, setReloadMap] = useState(false);
    const [map, setMap] = useState(null);


    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()

    const currentYear = useSelector(selectCurrentYear)


    const { data: points, isLoading: isLoadingPoints, isFetching:  isFetchingPoints } = useGetFieldPointsQuery({ fieldId })
    const { data: scouts, isLoading: isLoadingScouts, isFetching:  isFetchingScouts } = useGetFieldScoutsQuery({ fieldId })

    const { data: stages, isLoading: isLoadingStages, isFetching:  isFetchingStages  } = useGetPestStagesQuery()


    const [open, setOpen] = React.useState(false);

    const [dialog, setDialog] = React.useState(null);


    const height = (window.innerHeight - 180);


    if (isLoadingPoints || isLoadingScouts || isFetchingPoints || isFetchingScouts || isLoadingStages || isFetchingStages) {
       return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    }

 

    const onScoutMapClick = (event, element, type) => {
        console.log('onScoutMapClick', type, event);
        if (type === 'map') {
            const p = { id: null, lat: event.latlng.lat, lng: event.latlng.lng, fieldId, name: '', active: true, type: 'scout' };
            setPoint(p);
            setDialog('point')
        }
        if (type === 'point') {
            event.originalEvent.view.L.DomEvent.stopPropagation(event)
            setPoint(element);
            setDialog('options')
        }

    }

    const clear = (value) => {
        setDialog(null);
        setPoint(null);
    }

    const selectOption = (e) => {
        if (e === null) {
            clear();
        } else {
            setDialog(e);
        }
    }

    const pointScouts = point ? scouts.filter(e => e.point.id === point.id) : [];

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon  && <FieldMap field={field} height={height} onClick={onScoutMapClick} points={buildScoutPoints(points, scouts)} setMap={setMap} />}
            {point &&  <FieldPointDialog open={dialog === 'point'} deletable={isArrayEmpty(pointScouts)} defaultValues={point} handleClose={clear} />}
            {point && <ScoutOptionDialog open={dialog === 'options'} scouts={pointScouts} point={point} handleClose={selectOption} />}
            {point && <ScoutFieldHistoryDialog open={dialog === 'history'} point={point} scouts={pointScouts} handleClose={() => clear(null)} />}
            {point && <ScoutingForm open={dialog === 'scouting'} defaultValues={{ id: null, point: point, date: newDate(), note: '', finding: null, location: 'none', infectionLevel: "none", value: '', year: currentYear, stage: stages[0] }} handleClose={clear} />}

        </Box>
    )
}

export default FieldScouting