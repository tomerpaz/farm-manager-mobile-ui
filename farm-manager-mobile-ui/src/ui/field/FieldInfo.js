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
import { daysDiffToday, parseDate } from '../FarmUtil'

const FieldInfo = ({ field }) => {

    const { fieldId } = useParams()

    const text = useSelector(selectLang)

    const { data: user } = useGetUserDataQuery()



    const height = (window.innerHeight - 120) / 2;

    const src = 'map'
    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} />}
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

            <ActionSpeedDial bottom={100} map={true} plan={false} fieldId={fieldId} />

        </Box>
    )
}

export default FieldInfo