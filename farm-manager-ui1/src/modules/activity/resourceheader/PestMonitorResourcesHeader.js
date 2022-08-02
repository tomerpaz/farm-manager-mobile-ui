import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';

import { FormTitle } from '../../../components/core';
import { getSuggestionsNameId, renderOptions } from "../../../components/core/optionsUtil";
import { Table, Autocomplete, } from '../../../components';

import { formRow, formRowSide } from '../../../utils/FormStyle';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flex: 1, flexDirection: 'column'
    },
    formRow: formRow(theme),
    centerFlex: formRowSide(theme),
}));
const PestMonitorFieldsHeader = (props) => {
    const { text, onChange, plantParts, pests, infectionLevels, pestMonitors, array, change } = props;
    const classes = useStyles();

    const [selectedPest, setSelectedPest] = useState(null);

    useEffect(() => {
        if(!pestMonitors){
            change("pestMonitors", []);
        }
    },[]);

    useEffect(() => {
        if (selectedPest) {
            change(`pestId`, null);
            if (pestMonitors && selectedPest) {
                const pest = selectedPest.element;
                if (pest && !pestMonitors.find(e => e.pest.id === pest.id)) {
                    const pestMonitorItem = {
                        pest: selectedPest.element,
                        value: 0,
                        location: 'None',
                        infectionLevel: 'None'
                    }
                    array.unshift("pestMonitors", pestMonitorItem);
                }
            }
        }
    }, [selectedPest])


    const columns = [
        { name: 'pest', style: { width: 120 }, title: text.pest, getCellValue: row => (row.pest.name) },
        {
            name: 'value', title: text.qty, edit: true, type: 'number',
            width: 120, style: { width: 120 },
            onChange: (value, rowData, rowIndex) =>
                change(`pestMonitors[${rowIndex}].value`, value),
        },
        {
            name: 'infectionLevel',
            title: text.infectionLevel,
            options: () => renderOptions(infectionLevels, text),
            style: { width: 120 },
            onChange: (value, rowData, rowIndex) =>
                change(`pestMonitors[${rowIndex}].infectionLevel`, value),
        },

        {
            name: 'location',
            title: text.location,
            options: () => renderOptions(plantParts, text),
            style: { width: 120 },

            onChange: (value, rowData, rowIndex) =>
                change(`pestMonitors[${rowIndex}].location`, value),
        },
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => array.remove(`pestMonitors`, rowIndex),
        },

    ];

    const rows = pestMonitors ? pestMonitors : [];
    return (
        <div className={classes.root}>
            <div className={classes.formRow}>
                <FormTitle title={text.pests} />

                <Autocomplete
                    width={300}
                    isMulti={false}
                    component={Autocomplete}
                    label={`${text.select} ${text.pest}`}
                    placeholder={`${text.select} ${text.pest}`}
                    value={selectedPest}
                    options={getSuggestionsNameId(pests)}
                    onChange={(value, e) => setSelectedPest(value)}
                />
            </div>

            <Divider />

            <Table
                overflowX={'visible'}
                rows={rows}
                columns={columns}
                indexKey={true}
                disableSort={true}
            />
        </div>
    )
}
export default PestMonitorFieldsHeader;
