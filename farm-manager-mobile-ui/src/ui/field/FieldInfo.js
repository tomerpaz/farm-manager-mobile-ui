import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectFieldById } from '../../features/fields/fieldSlice'
import FieldMap from './FieldMap'

const FieldInfo = () => {

    const { fieldId } = useParams()

    const field = useSelector((state) => selectFieldById(state, Number(fieldId)));

    const height = (window.window.innerHeight - 120) / 2;

    const src = 'map'
    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} />}
            <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography>
        </Box>
    )
}

export default FieldInfo