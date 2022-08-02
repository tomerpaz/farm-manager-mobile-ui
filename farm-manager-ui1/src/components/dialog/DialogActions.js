import React from 'react';
import { DialogActions, Box } from '@mui/material';
import { OutlinedButton, ContainedButton } from '../core';

const DialogActionsTemplate = (props) => {
    const { action, yesText, noText } = props;
    return (
        <Box display={'flex'} flex={1} justifyContent={'center'} backgroundColor={props.backgroundColor ? props.backgroundColor : 'inherit'}>
            <DialogActions>
                <ContainedButton type="button"
                    onClick={() => action(true)}
                >
                    {yesText}
                </ContainedButton>
                <OutlinedButton type="button"
                    onClick={() => action(false)}
                >
                    {noText}
                </OutlinedButton>
            </DialogActions>
        </Box>
    );
}
export default DialogActionsTemplate;