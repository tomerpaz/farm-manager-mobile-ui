import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { Layers, Share } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import AppBarMenu from '../components/AppBarMenu'
import ShareLocationMenu from '../components/ShareLocationMenu'

const FieldViewBar = ({ layers }) => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display={'flex'} flexDirection={'row'}>
                    <ShareLocationMenu />
                    {layers && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => console.log('click')}
                        sx={{ mr: 1 }}
                    >
                        <Layers />
                    </IconButton>}
                </Box>
                <AppBarMenu />

            </Toolbar>
        </AppBar>
    )
}

export default FieldViewBar

