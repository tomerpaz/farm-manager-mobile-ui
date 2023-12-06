import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const AlertDialog = ({ open, message, varieant, handleClose, buttonText }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {message}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size='large' disableElevation={true} variant='contained' onClick={handleClose} autoFocus>
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default AlertDialog