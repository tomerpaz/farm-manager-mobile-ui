import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog'

import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Typography } from '@mui/material';


import { TextField } from '../../components';
import { WORKER_GROUP } from "../../reducers/ResourceReducer";

import { DialogActions } from '../../components/dialog';

const ResourceEditGroupAmountDialog = (props) => {

    const { ru, activityArea, open, setResourceEditGroupAmount,
        text, rowIndex, areaUnit } = props;

    const [isGroup, setIsGroup] = useState(ru.resourceType === WORKER_GROUP);
    const [workerCount, setWorkerCount] = useState(!ru.workerCount ? 1 : ru.workerCount);
    const [hoursPerWorker, setHoursPerWorker] = useState(ru.groupAmount > 0 && ru.workerCount > 0 ? (ru.groupAmount / workerCount).toFixed(2) : 0);
    const [amountPerAreaUnit, setAmountPerAreaUnit] = useState(activityArea > 0 ? (ru.groupAmount / activityArea).toFixed(2) : 0);
    const [disabled, setDisabled] = useState(true)


    function changeWorkerCount(e) {
        const enteredValue = Number(e.target.value);
        if (isGroup === true) {
            const value = !isNaN(enteredValue) && enteredValue > 0 ? enteredValue : 1;
            setWorkerCount(value.toFixed(0));
        } else {
            const value = !isNaN(enteredValue) && enteredValue > 0 ? enteredValue : 0;
            setAmountPerAreaUnit(value);
        }
        setDisabled(false)
    }

    function changeHoursPerWorker(e) {
        const enteredValue = Number(e.target.value);
        const value = workerCount * !isNaN(enteredValue) && enteredValue > 0 ? enteredValue : 0;
        setHoursPerWorker(value);
        setDisabled(false)

    }

    const groupAmount = isGroup ? hoursPerWorker * workerCount : amountPerAreaUnit * activityArea;
    const perAmount = isGroup ? workerCount : amountPerAreaUnit;
    const perAmountLabel = isGroup === true ? text.workers : text['qtyPer' + areaUnit];

    const action = (yes) => {
        if (yes) {
            setResourceEditGroupAmount(ru, groupAmount.toFixed(2), perAmount, rowIndex);
        } else {
            setResourceEditGroupAmount(null);
        }
    }

    return (
        <Dialog

            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title">{`${text[ru.resourceType.toLowerCase()]} - ${ru.resource.name}`}</DialogTitle>
            <DialogContent style={{ minWidth: 300, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {!isGroup && <Typography variant={'h6'}>{activityArea} {text[areaUnit]}</Typography>}

                <TextField
                    type="number"
                    value={perAmount}
                    label={perAmountLabel}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => changeWorkerCount(e)}
                />
                {isGroup && <TextField
                    type="number"
                    value={hoursPerWorker}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => changeHoursPerWorker(e)}
                    label={text.qtyPerWorker}
                />}
            </DialogContent>
            <DialogActions
                action={action}
                yesText={text.save}
                noText={text.cancel}
            />
        </Dialog>
    );
}


export default ResourceEditGroupAmountDialog;