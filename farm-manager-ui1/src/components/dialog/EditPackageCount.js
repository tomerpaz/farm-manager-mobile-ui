import React, { useState, useEffect } from 'react';
import { Dialog, Stack } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '..';
import { getUnitText } from '../../utils';
import { DialogActions } from '../../components/dialog';

const EditPackageCount = (props) => {
    const { item, close, text, open, save } = props;
    const [unitsInPackage, setUnitsInPackage] = useState((item.packageCount && item.packageCount !== 0 && item.amount) ? (item.amount / item.packageCount).toFixed(2) : '')
    const [packageCount, setPackageCount] = useState(item.packageCount ? item.packageCount : '')
    const unitText = item ? getUnitText(item.resource.inventoryUnit ? item.resource.inventoryUnit : item.resource.usageUnit, text) : ''


    const action = (yes) => {
        if (yes) {
            save(Number(packageCount), Number(unitsInPackage));
        } else {
            close();
        }
    }
    return (
        <Dialog
            maxWidth={'xs'}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title">{`${text.packageCount}`}</DialogTitle>
            <DialogContent >
                <Stack direction="row">
                    <TextField
                        type="number"
                        value={packageCount}
                        label={text.packageCount}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setPackageCount(e.target.value)}
                    />
                    <TextField
                        type="number"
                        value={unitsInPackage}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setUnitsInPackage(e.target.value)}
                        label={`${text.unitsInPackage} (${unitText})`}
                    />
                </Stack>
            </DialogContent>
            <DialogActions
                action={action}
                yesText={text.save}
                noText={text.cancel}
            />
        </Dialog>
    );
}
export default EditPackageCount;