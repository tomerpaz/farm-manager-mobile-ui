import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const InfoLine = ({ value, title }) => {
    if (value) {
        return (
            <>
            <Box marginTop={1} marginLeft={1} marginRight={1} display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} >
                <Typography variant="subtitle1" color="text.secondary">
                    {title}:
                </Typography>
                <Box paddingLeft={1}/>
                <Typography variant="subtitle1" >
                    {value}
                </Typography>
                
            </Box>
            <Divider/>
            </>
        )
    }
}

export default InfoLine