import React, { useState, useEffect } from 'react';
import { TextField, DatePicker, Autocomplete, Table, YesNoDialog } from '../../components'
import { MenuItem, Box } from '@mui/material';
import {
    _equipment, _executors, _waterSources,
    loadDataByName
} from '../../utils/LoadUtil';
import { EQUIPMENT, WATER, WORKER } from '../../reducers/ResourceReducer';
import { asLocalDate, asShortStringDate, getFirstDayOfPreviousMonth, getLastDayOfPreviousMonth, getStart, getUnitText, masterDetails } from '../../utils';
import { sumBy } from 'lodash';
import { OutlinedButton } from '../../components/core';


const UpdatesResource = (props) => {

    const { text, executorOptions, waterSourceOptions, areaUnit, equipmentOptions, updates, fetchUpdates, clearUpdates, executehUpdates } = props;
    const [resourceType, setResourceType] = useState('');
    const [method, setMethod] = useState('amount');

    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOption] = useState(null);
    const [end, setEnd] = useState(getLastDayOfPreviousMonth());
    const [start, setStart] = useState(getFirstDayOfPreviousMonth());

    const [newAmount, setNewAmount] = useState(0);

    const [openSave, setOpenSave] = useState(false);

    const [currentAmount, setCurrentAmount] = useState(0);


    const handleSave = (e) => {
        setOpenSave(false);
        if (e === true) {
            const updateContext = {
                type: 'ru',
                resourceId: selectedOptions.id,
                method: method,
                uuids: updates.map((e) => e.uuid),
                amount: newAmount,
            }

            executehUpdates(updateContext)
            setSelectedOption(null);
        }
    }


    useEffect(() => {
        loadDataByName(props, [_executors, _waterSources, _equipment,
            //  _pesticides, _fertilizers, _varieties, _disinfectants,_accessories,_composts,
        ]);

    }, []);

    useEffect(() => {
        setSelectedOption(null);
        if (resourceType === WORKER) {
            setOptions(executorOptions.filter(e => e.element.active && e.element.type === WORKER));
        } else if (resourceType === WATER) {
            setOptions(waterSourceOptions);
        } else if (resourceType === EQUIPMENT) {
            setOptions(equipmentOptions);
        } else {
            setOptions([]);
        }
    }, [resourceType])


    useEffect(() => {
        clearUpdates();
        if (selectedOptions != null) {
            const updateContext = {
                type: 'ru',
                resourceId: selectedOptions.id,

                method: method,
                maxDate: asLocalDate(end, true),
                minDate: asLocalDate(start, true),
            }

            fetchUpdates(updateContext)
        }
    }, [method, selectedOptions, end, start])


    useEffect(() => {
        const amt = sumBy(updates, 'groupAmount').toFixed(1);
        setNewAmount(amt);
        setCurrentAmount(amt)
    }, [updates])

    const columns = [
        { name: 'execution', title: text.date, getCellValue: row => asShortStringDate(row.execution) },
        { name: 'documentRef', title: text.reference },
        {
            name: 'description',
            title: text.activity,

        },
        {
            name: 'groupAmount', title: text.amount,
            getCellValue: row => row.groupAmount ? row.groupAmount.toFixed(1) : 0
        },
        {
            name: 'usageUnit', title: text.unit,
            getCellValue: row => selectedOptions ? getUnitText(selectedOptions.element.usageUnit, text, areaUnit) : '',
        },
    ];


    return (
        <div >
            <Box display='flex' flex={1} alignItems='cenetr'>

                <TextField
                    select
                    width={80}
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    label={text.type}
                >
                    <MenuItem value={''}>
                        <em> {text.type} </em>
                    </MenuItem>
                    <MenuItem value={WORKER}>
                        {text.worker}
                    </MenuItem>
                    <MenuItem value={WATER}>
                        {text.water}
                    </MenuItem>
                    <MenuItem value={EQUIPMENT}>
                        {text.equipment}
                    </MenuItem>
                </TextField>

                <Autocomplete
                    style={{ flex: 2 }}
                    noMargin={true}
                    options={options}
                    onChange={(e) => setSelectedOption(e)}
                    value={selectedOptions}
                    placeholder={text.resource}
                    label={text.resource}
                    isMulti={false}
                />

                <TextField
                    select
                    width={200}
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    label={text.calculateMethod}>
                    <MenuItem value={''}>
                        <em> {text.calculateMethod} </em>
                    </MenuItem>
                    <MenuItem value={'amount'}>
                        {text.amount}
                    </MenuItem>
                    <MenuItem value={'area'}>
                        {text[areaUnit]}
                    </MenuItem>
                </TextField>

                <DatePicker clearable={false} value={start} text={text} onChange={setStart} placeholder={text.fromDate} label={text.fromDate} />
                <DatePicker clearable={false} value={end} text={text} onChange={setEnd} placeholder={text.toDate} label={text.toDate} noMargin={true} />
                <TextField
                    width={120}
                    disabled={true}
                    type='number'
                    value={currentAmount}
                    label={text.amount}>
                </TextField>
                <TextField
                    width={120}
                    type='number'
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    label={text.update}>

                </TextField>
                <div>
                    <OutlinedButton
                        size={'medium'}
                        disabled={method === '' || !selectedOptions || !end || !start || resourceType === '' || currentAmount === newAmount || updates.lenght === 0}
                        onClick={() => setOpenSave(true)}
                    >{text.update}</OutlinedButton>
                </div>
            </Box>

            <Table
                rows={updates}
                columns={columns}
                height={masterDetails}
            />
            <YesNoDialog open={openSave}
                action={handleSave}
                title={text.executeUpdates + '?'}
                body={text.irreversibleAction}
                yesText={text.update}
                noText={text.no} />
        </div>
    )
}
export default UpdatesResource;