import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/app/appSlice'
import { isArrayEmpty } from '../FarmUtil'

const AlertDialog = ({ open, message, varieant, handleClose, buttonText, title, translate }) => {
    const text = useSelector(selectLang)

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {text[title]}
            </DialogTitle>
            {!isArrayEmpty(message) && <DialogContent>
                {message.map((e, index) => <DialogContentText key={index}>{`${index+1}. ${text[e]}`}</DialogContentText>)}
            </DialogContent>}
            <DialogActions>
                <Button size='large' disableElevation={true} variant='contained' onClick={handleClose} autoFocus>
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default AlertDialog