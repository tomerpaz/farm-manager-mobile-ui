import React from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';

function getHorizontal(align, dir) {
    if (align) {
        return align;
    } else {
        return 'right'
        //return dir === 'rtl' ? 'left' : 'right'
    }
}

const InfoSnackbar = (props) => {


    const { open, message, dir, variant, align, onAction } = props;

    const horizontal = getHorizontal(align, dir)
    const action = !onAction ? null : (
        <IconButton sx={{
            color: 'inherit'
        }} size="small" onClick={onAction} >
            <Close />
        </IconButton>
    );
    return (
        <Snackbar sx={{
            borderStyle: 'solid',
            borderColor: 'white',
            borderRadius: 1,

        }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: horizontal,
            }}
            open={open}
            autoHideDuration={4500}
        >

            <Alert variant="filled" action={action} severity={variant ? variant : "success"} sx={{ width: 300 }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
export default InfoSnackbar;