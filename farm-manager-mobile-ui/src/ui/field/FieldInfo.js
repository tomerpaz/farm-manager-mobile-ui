import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/auth/authSlice';
import InfoLine from './InfoLine'

const FieldInfo = ({ field }) => {

    const { fieldId } = useParams()

    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()




    const height = (window.window.innerHeight - 120) / 2;

    const src = 'map'

    console.log(field);
    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} />}
            <InfoLine value={field.siteName} title={text.site} />
            <InfoLine value={field.parentFieldName} title={text.parentField} />
            <InfoLine value={field.season} title={text.season} />
            <InfoLine value={field.endDate} title={text.endDate} />
            <InfoLine value={field.tag1Name} title={field.tag1Type} />
            <InfoLine value={field.tag2Name} title={field.tag2Type} />
            <InfoLine value={field.maturity} title={text.maturity} />            
            <InfoLine value={field.density} title={text.density} />
            <InfoLine value={field.plantSpacing} title={text.plantSpacing} />
            <InfoLine value={field.rowSpacing} title={text.rowSpacing} />
            <InfoLine value={field.note} title={text.note} />



            {/* <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography> */}
        </Box>
    )
}

export default FieldInfo