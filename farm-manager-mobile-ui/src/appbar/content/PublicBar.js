import { AppBar, Toolbar, Typography } from '@mui/material'

const PublicBar = () => {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-around' }}>
                <Typography  noWrap fontWeight={600} letterSpacing={1.5} variant="h6">
                    Farm Manager
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default PublicBar