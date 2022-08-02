import React, { useState, useEffect } from 'react';
import { Table } from '../..';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '../../dialog/DialogActions'
import { height350 } from "../../../utils/TabUtils";
import { asShortStringDate, newDate, subtractMonths } from "../../../utils/DateUtil";
import MasterDetailsTableTop from '../top/MasterDetailsTableTop';
import { loadDataByName } from '../../../utils/LoadUtil';
import { getCustomerOptions } from '../../core';
import { BACKGROUND, SECONDARY_LIGHT } from '../../../App';
import { Box } from '@mui/material';


const WaybillSelectionTable = (props) => {
    const { text, open, getWaybills, waybills, handleClose, setWaybills, lang, varietyOptions, customerAndSupplierOptions, cropOptions, selectedCustomerOption } = props

    const [freeText, setFreeText] = useState('');
    const [filter, setFilter] = useState([]);

    const [selectedActivities, setSelectedActivities] = useState([]);
    const [start, setStart] = useState(subtractMonths(newDate(), 2));
    const [end, setEnd] = useState(newDate());
    const [customerOptions, setCustomerOptions] = useState([]);



    useEffect(() => {
        setSelectedActivities([]);
        if (open && start && end) {
            getWaybills(start, end, filter, freeText);
        }
    }, [open, start, end, freeText, filter])


    useEffect(() => {
        loadDataByName(props, ['varieties', 'crops', 'customers']);
    }, [])

    useEffect(() => {
        setCustomerOptions(getCustomerOptions(customerAndSupplierOptions))
    }, [customerAndSupplierOptions])

    useEffect(() => {
        if (selectedCustomerOption) {
            setFilter(customerOptions.filter(e => e.element.id === selectedCustomerOption.element.id));
        } else {
            setFilter([]);
        }
    }, [selectedCustomerOption])


    const changeSelection = (selection) => {
        if (selectedActivities.includes(selection.id)) {
            setSelectedActivities(selectedActivities.filter(e => e !== selection.id));
        } else {
            setSelectedActivities(selectedActivities.concat([selection.id]));
        }
    };


    const selectAll = (value) => {
        setSelectedActivities(value ? waybills.map(e => e.id) : []);
    };

    const action = (yes) => {
        if (yes && selectedActivities) {
            const selectedHarvests = waybills.filter(e => selectedActivities.includes(e.id))
            handleClose(selectedHarvests.map(e => e.domain));
        }
        else {
            handleClose(null);
        }
        setWaybills([]);
        //setFilter('');
        setSelectedActivities([]);
    }


    const columns = [
        {
            name: 'number', title: text.waybill,
            getCellValue: row => row.param1,
        },
        { name: 'customer', title: text.customer, getCellValue: row => row.customer.name, },
        {
            name: 'date', title: text.date,
            getCellValue: row => asShortStringDate(row.execution),
        },
        {
            name: 'variety', title: text.variety, getCellValue: row => row.domain.variety.name,
        },
    ];

    return (
        <Dialog
            // sx={{
            //     padding: 0,
            //     margin: 0,
            //     flex: 1,
            // }}
            maxWidth={'lg'}
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            disableBackdropClick={true}
        >

            <DialogTitle sx={{ padding: 0, paddingLeft: 2, paddingRight: 2, backgroundColor: BACKGROUND }}>
                {text.waybill}
            </DialogTitle>

            <DialogContent sx={{ padding: 0, backgroundColor: SECONDARY_LIGHT }}>

                <Box flex={1} display={'flex'} margin={1} flexDirection={'column'}>
                    <MasterDetailsTableTop options={customerOptions.concat(varietyOptions).concat(cropOptions)}
                        filter={filter}
                        setFilter={setFilter}
                        label={text.typeToSearch}
                        lang={lang}
                        text={text}
                        start={start}
                        clearableDates={false}
                        end={end}
                        freeText={freeText}
                        freeTextTitle={text.waybill}
                        onFreeTextChange={setFreeText}
                        onStartChange={setStart}
                        onEndChange={setEnd} />
                    <Box flex={1} display={'flex'} margin={1}>
                        <Table
                            rows={waybills} columns={columns}
                            height={height350}
                            useSelection={true}
                            onRowClicked={changeSelection}
                            selections={selectedActivities}
                            showSelectAll={true}
                            disableSort={true}
                            selectAll={selectAll}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions backgroundColor={SECONDARY_LIGHT}
                action={action}
                yesText={text.save}
                noText={text.cancel}
            />
        </Dialog>
    );
}


export default WaybillSelectionTable;
