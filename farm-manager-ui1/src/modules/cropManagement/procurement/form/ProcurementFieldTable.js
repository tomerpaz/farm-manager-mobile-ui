import React from 'react';
import {Table,} from '../../../../components';
import { getDomainYear } from '../../../../utils';

const ProcurementFieldTable = (props) => {

    const {procurementFields, expendFieldTable, text, total, changeFieldTableColumn} = props;
    const rows = expendFieldTable ? procurementFields : procurementFields.slice(0, 4);

    const columns = [
        {name: 'name', title: text.field, getCellValue: row => (row.domain.field.name),},
        {
            name: 'alias', title: props.text.alias,
            getCellValue: row => (row.domain.alias),
        },
        {name: 'year', title: props.text.year, getCellValue: row => getDomainYear(row.domain),},

        {
            name: 'crop',
            title: props.text.crop,
            getCellValue: row => (row.domain.variety.category),
        }, {
            name: 'variety',
            title: props.text.variety,
            getCellValue: row => (row.domain.variety.name),
        },

        {name: 'ratio', title: props.text.distributionRatio},
        {name: 'cost', title: props.text.cost},
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (row, rowIndex) => changeFieldTableColumn('delete', null, row, rowIndex),
        },
    ]
    return (
        <Table
            rows={rows}
            columns={columns}
            getKey={(e)=> e.domain.id}
        />
    );
}

export default ProcurementFieldTable;
