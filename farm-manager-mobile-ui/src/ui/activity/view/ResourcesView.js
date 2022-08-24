import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectLang } from '../../../features/auth/authSlice'
import { isArrayEmpty } from '../../FarmUtil'
import InfoLine from '../../field/InfoLine'

const ResourcesView = ({ activity }) => {

    const text = useSelector(selectLang)


    
    if (isArrayEmpty(activity.resources)) {
        return <Fragment />
    }
    return (
        <Box>
            <Typography variant='h6'>
                {text.resources}
            </Typography>
            {activity.resources.map((e, index) =>
                <InfoLine key={index} title={e.resource.name} value={e.resource.usageUnit} />
            )}

        </Box>)
}

export default ResourcesView