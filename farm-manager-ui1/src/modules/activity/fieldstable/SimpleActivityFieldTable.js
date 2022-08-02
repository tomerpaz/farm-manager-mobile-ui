import React from 'react';
import {Table,} from '../../../components';
import { getDomainYear } from '../../../utils';


const SimpleActivityFieldTable = (props) => {

    const {activityDomains, expendFieldTable, text, editActivityArea, areaUnit, changeDomainTableColumn } = props;

    const rows = expendFieldTable ? activityDomains : activityDomains.slice(0, 4);

    const columns = [
        {name: 'name', width: 500, title: text.field, getCellValue: row => (row.field.name),},
        {name: 'alias', title: props.text.alias},
        {name: 'year', title: props.text.year, getCellValue: row => getDomainYear(row),},
        {
            name: 'crop',
            title: props.text.crop,
            getCellValue: row => (row.variety.category),
        }, 
        {
            name: 'variety',
            title: props.text.variety,
            getCellValue: row => (row.variety.name),
        },

        {
            name: 'actualExecution', title: text.executed, 
            getCellValue: row => row.actualExecution ? row.actualExecution : null,
            edit: true, 
            type: 'date',
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('actualExecution', value, rowData, rowIndex),
            }, 
        {
            name: 'fieldNote',
            title: text.fieldNote,
            width: '100%',
            edit: true,
            getCellValue: row => (row.fieldNote),
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('fieldNote', value, rowData, rowIndex),

        },
        {name: 'plantArea', title: props.text.fieldSize},
    ]

    if(editActivityArea){
        columns.push(
            {name: 'activityArea', title: props.text[areaUnit], edit: true,
            width: 120,
                onChange: (value, rowData, rowIndex) => props.changeFieldActualSize(value, rowData, rowIndex)
        });
    }
    columns.push(        {
        name: 'delete',
        title: ' ',
        iconButton: true,
        onClick: (value, rowIndex) => props.changeDomainTableColumn('delete', null, value, rowIndex),
    })
    return (
        <Table
            rows={rows}
            columns={columns}
            indexKey={true}
            disableSort={true}
            text={text}
        />
    );
}


export default SimpleActivityFieldTable;
