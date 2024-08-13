import { Close } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

function DialogAppBar({title, onClose}) {
    return (
        <AppBar sx={{ position: 'relative' }} elevation={0}>
            <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {title}
                </Typography>
                <IconButton
                    edge="start"
                    onClick={onClose}
                    color="inherit"
                    aria-label="done"
                >
                    <Close />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default DialogAppBar