import React from 'react';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from './DialogActions';

const YesNoDialog = (props) => {
    const { open, action, yesText, noText, title, body } = props;
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent style={{ minWidth: 300 }}>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                action={action}
                yesText={yesText}
                noText={noText}
            />
        </Dialog>
    );
}
export default YesNoDialog;