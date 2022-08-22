import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';

const FieldInfo = () => {

    const { fieldId } = useParams()


    const { data: user } = useGetUserDataQuery()

    const field = useFieldsById(user.year,Number(fieldId))



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