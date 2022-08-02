import React from 'react';
import {Table,} from '../../../components';
import {getSuggestionsNameElement } from "../../../components/core/optionsUtil";
import {sumBy} from 'lodash';
import { getDomainYear } from '../../../utils';


const numericColumnWidth = 140

const HarvestFieldTable = (props) => {


    const {activityDomains, expendFieldTable, text, changeDomainTableColumn, containerOptions, weightUnit} = props;


    const iCount =  Number(sumBy(activityDomains, 'itemCount')).toFixed(2);
    const iNet = Number(sumBy(activityDomains, 'netWeight')).toFixed(1);


    const rows = expendFieldTable ? activityDomains : activityDomains.slice(0, 4);


    const columns = [

        {name: 'name', title: text.field, getCellValue: row => (row.field.name), style: {width: 80}},
        {name: 'alias', title: text.alias,
            width: 50,
           // style: {width: 50},
        },
            {name: 'year', title: props.text.year, getCellValue: row => getDomainYear(row),},

        {
            name: 'crop',
            title: text.crop,
            width: 80,
            getCellValue: row => (row.variety.category),
           // style: {width: 80},
        }, {
            name: 'variety',
            title: text.variety,
            getCellValue: row => (row.variety.name),
           // style: {width: 80},
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
        {
            name: 'container',
            autocomplete: true,
            title: text.container,
            width:  180,
           
            options: ()=> containerOptions.filter(e => e.element.active && e.element.containerType === 'CONTAINER'),
            placeholder: text.container,
            getCellValue: row => (row.container  ?  getSuggestionsNameElement(row.container,'container'): ''),
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('container', value ? value.element : null, rowData, rowIndex),

        },
        {
            name: 'itemCount', title: text.amount, edit: true, type: 'number',
            width: numericColumnWidth,
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('itemCount', value, rowData, rowIndex),
        },
        {
            name: 'netWeight', title: text[weightUnit], edit: true, type: 'number',
            width: numericColumnWidth,
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('netWeight', value, rowData, rowIndex),
        },
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => changeDomainTableColumn('delete', null, value, rowIndex),
        },
        {
            name: 'duplicate',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => changeDomainTableColumn('duplicate', null, value, rowIndex),
        },

    ]

    const footer = [
        { colSpan: 8, value: text.total},
        { edit: true, value: iCount, type: 'number',
            width: numericColumnWidth,
            onChange: (value) => changeDomainTableColumn('itemCount', value, 'summary') },
        {
            edit: true, value: iNet, type: 'number',
            width: numericColumnWidth,
            onChange: (value) => changeDomainTableColumn('netWeight', value, 'summary')
        },
    ]
    return (
        <Table
            overflowX={'visible'}
            rows={rows}
            columns={columns}
            footer={footer}
            indexKey={true}
            disableSort={true}
            text={text}
        />
    );
}
export default HarvestFieldTable;
