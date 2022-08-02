import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog'

import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Typography } from '@mui/material';
import { getUnitText } from "../../utils/Units";
import { DialogActions } from '../../components/dialog';

import { TextField } from '../../components';
import { ENERGY, WATER } from "../../reducers/ResourceReducer";

const useStyles = makeStyles(theme => ({

    textField: {
        width: 150
        //margin: theme.spacing(1),
    },
    unitText: {
        //   flex: 1,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),

    }
}));

const ZERO_INIT_SECONDARY_GROUP_AMOUNT = [ENERGY]
const EQUAL_OR_LESS_SECONDARY_GROUP_AMOUNT = [ENERGY, WATER]

function getMessage(ru, text) {
    console.log(ru.resourceType.toLowerCase() + 'Info');
    return text[ru.resourceType.toLowerCase() + 'Info']
}
function getInitialSecondaryGroupAmount(ru) {
    console.log('getInitialSecondaryGroupAmount');
    if (ZERO_INIT_SECONDARY_GROUP_AMOUNT.includes(ru.resourceType)) {
        return 0;
    } else {
        return ru.groupAmount;
    }
}

const ResourceEditGroupAmountDialog = (props) => {

    const classes = useStyles();
    const { ru, activityArea, open, setResourceEditGroupAmount,
        text, rowIndex, areaUnit, secondary } = props;

    const [value, setValue] = useState(ru.secondaryGroupAmount ? ru.secondaryGroupAmount : getInitialSecondaryGroupAmount(ru));
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        setDisabled(false);
    }, [value])

    console.log(value);
    console.log(ru.secondaryGroupAmount);

    const setActualValue = (newValue) => {
        if (EQUAL_OR_LESS_SECONDARY_GROUP_AMOUNT.includes(ru.resourceType) && newValue > ru.groupAmount) {
            setValue(ru.groupAmount);
        }
        else {
            setValue(newValue < 0 ? 0 : newValue);
        }
    }

    const action = (yes) => {
        if (yes) {
            setResourceEditGroupAmount(ru, value, null, rowIndex, true);
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
            <DialogContent /*style={{ minWidth: 300, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}*/>
                <Typography >{getMessage(ru, text)}</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextField
                        type="number"
                        className={classes.textField}
                        value={value}
                        // label={perAmountLabel}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setActualValue(Number(e.target.value))}
                    />
                    <Typography className={classes.unitText}>{getUnitText(ru.resource.usageUnit, text, areaUnit)}</Typography>

                </div>
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