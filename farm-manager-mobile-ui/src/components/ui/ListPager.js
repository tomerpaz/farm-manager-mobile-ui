import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'

const ListPager = ({bottom, page, totalPages, setPage}) => {
    
    const {direction} = useTheme();

    return (
        <Box 
        sx={{ position: 'fixed', zIndex:10000, bottom: bottom, left: 0, right: 0,  backgroundColor: 'white' }}
        margin={1} display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} paddingTop={1}
        >
            <Button size='large' disabled={totalPages === 0 || page === 0} onClick={() => setPage(page - 1)} color='secondary' variant="outlined" disableElevation>
                {direction === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
            </Button>
            <Typography>
                {page + 1}/{totalPages}
            </Typography>
            <Button size='large' disabled={totalPages === 0 || page === totalPages - 1} onClick={() => setPage(page + 1)} color='secondary' variant="outlined" disableElevation>
                {direction === 'rtl' ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
            </Button >
        </Box>
    )
}

export default ListPager