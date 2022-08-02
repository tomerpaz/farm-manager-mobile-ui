import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { TextField } from '../../../components';
import Button from '@mui/material/Button';
import { Save } from '@mui/icons-material';

import { renderPerUnitOptions, renderTypeOptions } from "../../core/optionsUtil";
import { EQUIPMENT_TYPES } from "../../../modules/resources/equipment/EquipmentForm";
import {
    ACCESSORY, EQUIPMENT, EXECUTOR_TYPES, WATER, WORKER,
} from "../../../reducers/ResourceReducer";
import { ACCESSORY_UNITS, EQUIPMENT_UNITS, EXECUTOR_UNITS, WATER_UNITS } from "../../../utils/Units";
import { ACCESSORIES, EXECUTORS, WATERSOURCES } from "./ResourceSelectionTable";
import { isEmpty } from "../../../utils/StringUtil";
import { Box } from '@mui/material';
import { SECONDARY_LIGHT } from '../../../App';
import { OutlinedButton } from '../../core';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    rootExpended: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),

    },
    body: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    textField: {
        width: 200,
        margin: theme.spacing(1),
    },

    button: {
        margin: theme.spacing(1),

    },
    shortTextField: {
        width: 100,
        margin: theme.spacing(1),

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const NewResourcePanel = (props) => {

    const classes = useStyles();
    const { text, areaUnit, resourceType, newResource, quickSaveResource } = props;

    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState('');
    const [name, setName] = useState('');
    const [usageUnit, setUsageUnit] = useState('');


    const clearData = () => {
        setType('');
        setCategory('');
        setCapacity('');
        setName('');
        setUsageUnit('');

    }

    useEffect(() => {
        clearData();
    }, [])

    useEffect(() => {
        clearData();
    }, [resourceType])

    useEffect(() => {
        if (newResource) {
            setName('');
            setCategory('');
            if (resourceType === EQUIPMENT) {
                setType(EQUIPMENT);
                setUsageUnit(EQUIPMENT_UNITS[0]);
                setCategory(EQUIPMENT_TYPES[0]);
            } else if (resourceType === EXECUTORS) {
                setType(WORKER);
                setUsageUnit(EQUIPMENT_UNITS[0]);
            } else if (resourceType === ACCESSORIES) {
                setType(ACCESSORY);
                setUsageUnit(ACCESSORY_UNITS[0]);
            } else if (resourceType === WATERSOURCES) {
                setType(WATER);
                setUsageUnit(WATER_UNITS[0]);
            }
        }
    }, [newResource])

    const renderName = () => {
        return (
            <TextField
                className={classes.textField}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={text.name}
                label={text.name}
            />
        );
    }

    const renderUsageUnit = (options) => {

        return (
            <TextField
                select
                style={{ width: 100 }}
                className={classes.textField}
                value={usageUnit}
                onChange={(e) => setUsageUnit(e.target.value)}
                placeholder={text.unit}
                label={text.unit}
            >
                {renderPerUnitOptions(options, text, areaUnit)}
            </TextField>
        );
    }

    const disableNewResourceSave = () => {
        if (isEmpty(name)) {
            return true;
        } else if (category === 'SPRAYER') {
            return !(Number(capacity) > 0);
        }
        return false;
    }

    const renderNewResourceLine = () => {
        switch (resourceType) {
            case EQUIPMENT: {
                return (
                    <div>
                        <TextField
                            select
                            className={classes.shortTextField}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder={text.category}
                            label={text.category}

                        >
                            {renderTypeOptions(EQUIPMENT_TYPES, text)}
                        </TextField>
                        {category === 'SPRAYER' && <TextField
                            className={classes.shortTextField}
                            value={capacity}
                            type={'number'}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder={text.capacity}
                            label={text.capacity}

                        />}
                        {renderName()}
                        {renderUsageUnit(EQUIPMENT_UNITS)}
                    </div>
                )

            }
            case EXECUTORS: {
                return (
                    <div>
                        <TextField
                            select
                            className={classes.textField}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label={text.type}
                        >
                            {renderTypeOptions(EXECUTOR_TYPES, text)}
                        </TextField>
                        {renderName()}
                        {renderUsageUnit(EXECUTOR_UNITS)}
                    </div>
                )

            }

            case ACCESSORIES: {
                return (
                    <div>
                        {renderName()}
                        {renderUsageUnit(ACCESSORY_UNITS)}
                    </div>
                )

            }
            case WATERSOURCES: {
                return (
                    <div>
                        {renderName()}
                        {renderUsageUnit(WATER_UNITS)}
                    </div>
                )
            }
        }
    }

    const saveResource = () => {

        const data = { name, type, capacity, category, usageUnit }
        quickSaveResource(data);
        setName('');
        setCapacity('')

    }

    return (
        <Box  display={'flex'} flex={1}>

            {newResource && 
                    <Box justifyContent={'space-between'} alignContent={'center'} alignItems={'center'} display={'flex'} flex={1}>

                {renderNewResourceLine()}
                    <OutlinedButton
                        disabled={disableNewResourceSave()}
                        onClick={saveResource}
                        size={'medium'}
                    >
                        <Save />
                        {text.save}
                    </OutlinedButton>
            </Box>}
        </Box>
    );
}

export default NewResourcePanel;