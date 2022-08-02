import React, { useState, useEffect } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { Box, Dialog, Stack } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { asShortStringDate, getUnitText } from '../../utils';
import { Table, } from '../../components';
import { getTariffs } from '../../actions';
import { OutlinedButton } from '../core';

const PriceHistory = (props) => {
    const { resource, close, text, open } = props;

    const [tariffs, setTariffs] = useState([])

    useEffect(() => {
        getTariffs(0, 10, 'effectiveFrom', 'desc', [{ value: 'resource_' + resource.id }], null, null).
            then(function (response) {
                setTariffs(response.data.content);
            });

    }, []);

    const unitText = getUnitText(resource.inventoryUnit ? resource.inventoryUnit : resource.usageUnit, text)
    const columns = [
        {
            name: 'tariff.effectiveFrom', title: text.effectiveFrom, getCellValue: row => asShortStringDate(row.effectiveFrom),
        },
        {
            name: 'tariff.price', title: text.unitCost,
            getCellValue: row => row.price ? row.price.toFixed(2) : 0,
        },
    ]
    return (
        <Dialog
            maxWidth={'xs'}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title">{`${resource.name} (${unitText}):`}</DialogTitle>
            <DialogContent >
                <Stack direction="row">
                    <Table
                        rows={tariffs}
                        columns={columns}
                        disableSort={true}
                        dateFormat={text.dateFormat}
                        text={text}
                        indexKey={true}
                    />

                </Stack>
            </DialogContent>
            <Box display={'flex'} flex={1} justifyContent={'center'}>

                <DialogActions >
                    <OutlinedButton type="button"
                        onClick={close}>
                        {text.close}
                    </OutlinedButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
export default PriceHistory;