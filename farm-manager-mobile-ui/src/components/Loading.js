import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = ({marginTop}) => {
    return (
        <Box display={'flex'} flex={1} justifyContent={'space-around'} marginTop={marginTop? marginTop :15}>
            <CircularProgress />
        </Box>
    )
}

export default Loading