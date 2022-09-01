import { AppBar, Toolbar, IconButton } from '@mui/material'
import {  Share } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import AppBarMenu from '../components/AppBarMenu'
import ShareLocationMenu from '../components/ShareLocationMenu'

const FieldViewBar = () => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <ShareLocationMenu/>
                {/* <IconButton 
               // href='https://wa.me/1XXXXXXXXXX?text=Im%20interested%20in%20your%20car%20for%20sale'
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => console.log('click')}
                    sx={{ mr: 2 }}
                >
                    <Share />
                </IconButton> */}
                <AppBarMenu />

            </Toolbar>
        </AppBar>
    )
}

export default FieldViewBar

