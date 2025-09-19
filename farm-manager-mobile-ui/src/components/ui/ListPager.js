import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { selectLang } from '../../features/app/appSlice'
import { useSelector } from 'react-redux'

const ListPager = ({ bottom, page, totalPages, setPage }) => {

    const { dir } = useSelector(selectLang)
    return (
        <Box
            padding={1} display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} paddingTop={1}
        >
            <Button size='large' disabled={totalPages === 0 || page === 0} onClick={(e) => setPage(page - 1, e)} color='secondary' variant="outlined" disableElevation>
                {dir === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
            </Button>
            <Typography>
                {page + 1}/{totalPages}
            </Typography>
            <Button size='large' disabled={totalPages === 0 || page === totalPages - 1} onClick={(e) => setPage(page + 1, e)} color='secondary' variant="outlined" disableElevation>
                {dir === 'rtl' ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
            </Button >
        </Box>
    )
}

export default ListPager