import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useGetFieldPointsQuery } from '../../features/points/pointsApiSlice';
import FieldPointDialog from '../point/FieldPointDialog';
import ScoutingFieldPoint from '../scout/ScoutingFieldPoint';
import { useGetFieldScoutsQuery } from '../../features/scout/scoutsApiSlice';
import { isArrayEmpty } from '../FarmUtil';
import { buildScoutPoints } from '../scout/ScoutingUtil';
import { useGetInfectionLevelsQuery, useGetPestsQuery, useGetPestStagesQuery, useGetPlantLocationsQuery } from '../../features/pests/pestsApiSlice';
import Loading from '../../components/Loading';

const FieldScouting = ({ field }) => {

    const { fieldId } = useParams()

    const [point, setPoint] = useState(null);
    //  const [reloadMap, setReloadMap] = useState(false);
    const [map, setMap] = useState(null);



    const { data: user } = useGetUserDataQuery()

    const { data: points, isLoading: isLoadingPoints, isFetching: isFetchingPoints } = useGetFieldPointsQuery({ fieldId });
    const { data: scouts, isLoading: isLoadingScouts, isFetching: isFetchingScouts } = useGetFieldScoutsQuery({ fieldId });
    const { data: stages, isLoading: isLoadingStages, isFetching: isFetchingStages } = useGetPestStagesQuery();
    const { data: plantLocations, isLoading: isLoadingPlantLocations } = useGetPlantLocationsQuery();
    const { data: infectionLevels , isLoading: isLoadingInfectionLevels} = useGetInfectionLevelsQuery()

    const { data: pests, isLoading: isLoadingPests } = useGetPestsQuery();


    const [dialog, setDialog] = React.useState(null);


    const height = (window.innerHeight - 180);


    if (isLoadingInfectionLevels || isLoadingPlantLocations || isLoadingPests || isLoadingPoints || isLoadingScouts || isFetchingPoints || isFetchingScouts || isLoadingStages || isFetchingStages) {
        return <Loading/>
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
            setDialog('pointScouting')
        }

    }

    
    const clear = () => {
        setDialog(null);
        setPoint(null);
    }

    const pointScouts = point ? scouts.filter(e => e.point.id === point.id) : [];

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} onClick={onScoutMapClick} points={buildScoutPoints(points, scouts)} setMap={setMap} />}
            {point && <FieldPointDialog open={dialog === 'point'} deletable={isArrayEmpty(pointScouts)} defaultValues={point} handleClose={clear} />}
            {point && <ScoutingFieldPoint stages={stages} open={dialog === 'pointScouting'} point={point} scouts={pointScouts} handleClose={() => clear(null)} setPoint={setPoint} />}
        </Box>
    )
}

export default FieldScouting