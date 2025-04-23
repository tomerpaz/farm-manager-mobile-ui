import React, { useEffect, useState } from 'react'
import { selectAccuracy, selectActiveGPS, selectOpenSettings, setAccuracy, setLatitude, setLongitude } from '../../features/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { getGeoCurrentPosition } from '../../ui/FarmUtil';

function Accuracy() {
    const accuracy = useSelector(selectAccuracy);
    const activeGPS = useSelector(selectActiveGPS);
    const open = useSelector(selectOpenSettings)
    
    const dispatch = useDispatch()

    const [positionCallCount, setPositionCallCount] = useState(0);
  
  
    const setDispatchPosition = (p) => {
      if (p?.coords) {
        dispatch(setAccuracy(p.coords.accuracy));
        dispatch(setLatitude(p.coords.latitude.toFixed(5)));
        dispatch(setLongitude(p.coords.longitude.toFixed(5)));
      }
      setPositionCallCount(positionCallCount+1)
    }
  
    const getNewPosition = () => {
      if (activeGPS) {
        getGeoCurrentPosition(setDispatchPosition)
      }
    }
  
    useEffect(() => {
        console.log('positionCallCount',positionCallCount)

      if (activeGPS) {
        setTimeout(getNewPosition, 3000)
      }
    }, [positionCallCount,activeGPS])
  

    if ( activeGPS && accuracy) {
        return <Typography>{`${accuracy?.toFixed(1)}m`}</Typography>

    }
}

export default Accuracy