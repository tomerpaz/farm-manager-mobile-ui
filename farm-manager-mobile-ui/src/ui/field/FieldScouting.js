import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/app/appSlice';
import ScoutDialog from '../scout/ScoutDialog';

const FieldScouting = ({ field }) => {

    const { fieldId } = useParams()

    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()

    const [open, setOpen] = React.useState(false);


    const height = (window.innerHeight - 180);


    const onScoutMapClick = (event, f, type) => {
        console.log(type);
        setOpen(type !== null)

    }
    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} onClick={onScoutMapClick} />}
            <ScoutDialog open={false} onClose={()=>setOpen(false)} />
        </Box>
    )
}

export default FieldScouting