import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/app/appSlice';
import InfoLine from './InfoLine'
import ActionSpeedDial from '../../components/ui/ActionSpeedDial'

const FieldInfo = ({ field }) => {

    const { fieldId } = useParams()

    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()




    const height = (window.window.innerHeight - 120) / 2;

    const src = 'map'

    // console.log(field);
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

            {/* <ActionSpeedDial bottom={310} plan={false} /> */}

        </Box>
    )
}

export default FieldInfo