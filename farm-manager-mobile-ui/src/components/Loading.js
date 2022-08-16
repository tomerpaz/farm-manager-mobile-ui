import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <Box display={'flex'} flex={1} justifyContent={'space-around'} marginTop={15}>
            <CircularProgress />
        </Box>
    )
}

export default Loading