import React from 'react';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import FormActions from "../forms/FormActions";

const SubmitConfirmation = (props) => {

    const {text, open, cancel, title, body, pristine, submitting, onSubmit} = props;

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent style={{minWidth: 300}}>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>

            <FormActions
                onSubmit={onSubmit}
                text={text}
                deletable={false}
                editable={true}
                cancelAction={cancel}
                deleteAction={null}
                pristine={pristine}
                submitting={submitting}
            />
        </Dialog>
    );
}
export default SubmitConfirmation;