import React, { useState,  } from 'react';
import MasterDetailsTableTop from "../../../components/tables/top/MasterDetailsTableTop";
import { filterData } from "../../../components/filters/filterUtil";
import {
    Table,
} from '../../../components';
import { height300 } from "../../../utils/TabUtils";
import { getSuggestionsNameId } from "../../../components/core/optionsUtil";
import { makeStyles } from '@mui/styles';

import { formStyle } from "../../../utils/StyleUtils";
import { FormTitle } from '../../../components/core';

const useStyles = makeStyles(theme => formStyle(theme));


function getPest(row) {
    if (row && row.pest) {
        return row.pest.map((e => e.pest.name)).join(',')
        //return row.pest[0].pest.name;
    }
    return '';
}

const PesticidesTable = (props) => {

    const classes = useStyles();

    const { text, selectedPesticideList, selectPesticideListPesticide } = props;

    console.log('PesticidesTable', selectedPesticideList.editable)

    const [options, setOptions] = useState(getSuggestionsNameId(selectedPesticideList.pesticides.map(e => e.resource)));

    const [filter, setFilter] = useState('');

    function newPesticide(e) {
        selectPesticideListPesticide({ listId: selectedPesticideList.id, editable: true, active: true, pest: [] });
    }

    let columns = [
        { name: 'resource.name', title: text.name, getCellValue: row => row.resource.name },
        { name: 'resource.identification', title: text.genericName, getCellValue: row => row.resource.identification },
        { name: 'pest', title: text.pest, getCellValue: row => getPest(row) },
        { name: 'dosage', title: text.dosage, getCellValue: row => row.maxDosage },
        { name: 'unit', title: text.unit, getCellValue: row => text[row.unit.toLowerCase()] },
        { name: 'interval', title: text.interval, getCellValue: row => row.interval },

        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterData(selectedPesticideList.pesticides, filter);
    return (
        <div className={classes.root}>

            <FormTitle title= {selectedPesticideList.name} />

            <MasterDetailsTableTop options={options} filter={filter} setFilter={(value) => setFilter(value)}
                label={text.typeToSearch}
                onClick={selectedPesticideList.editable ? newPesticide : null}
                actionText={selectedPesticideList.editable ? text.add : null} />
            <Table
                rows={displayRows}
                columns={columns}
                height={height300}
                onRowClicked={(e) => selectedPesticideList.editable ? selectPesticideListPesticide(e) : null}
            />
        </div>
    );
}

export default PesticidesTable;


