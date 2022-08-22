import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const ListPager = ({dir, page, totalPages, setPage}) => {
    
    return (
        <Box margin={1}
            display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'}
        >
            <Button size='large' disabled={page === 0} onClick={() => setPage(page - 1)} color='secondary' variant="outlined" disableElevation>
                {dir === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
            </Button>
            <Typography>
                {page + 1}/{totalPages}
            </Typography>
            <Button size='large' disabled={page === totalPages - 1} onClick={() => setPage(page + 1)} color='secondary' variant="outlined" disableElevation>
                {dir === 'rtl' ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
            </Button >
        </Box>
    )
}

export default ListPager