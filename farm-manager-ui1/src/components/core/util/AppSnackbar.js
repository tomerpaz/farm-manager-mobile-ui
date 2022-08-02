import React from 'react';
import Snackbar from '@mui/material/Snackbar';

import { Alert } from '@mui/material';

const BaseSnackbars = (props) => {
    const { open, onClose, message, dir, variant } = props;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: dir === 'ltr' ? 'left' : 'right',
            }}
            open={open}
            autoHideDuration={variant === 'error' ? 9000 : 4500}
            onClose={onClose}
        >
            <Alert variant="filled" onClose={onClose} severity={variant ? variant : "success"} sx={{ width: 300 }}>
                {message}
            </Alert>
        </Snackbar>
    );
}


export default BaseSnackbars;
