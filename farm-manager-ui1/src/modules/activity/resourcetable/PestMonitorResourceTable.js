import React from 'react';
import {Table,} from '../../../components';
import {CONTRACTOR, PESTICIDE} from "../../../reducers/ResourceReducer";
import {renderPerUnitOptions} from "../../../components/core/optionsUtil";
import {EXECUTOR_UNITS} from "../../../utils/Units";


const Resources = (props) => {

    const {text, resources, totalCost, removerActivityResource, changeResourceTableColumn} = props;
    const columns = [

        {name: 'resourceName', title: text.name, getCellValue: row => row.resource ? row.resource.name : row.resourceName,},
        {name: 'resourceType', title: text.type, getCellValue: row => text[row.resourceType.toLowerCase()]},
        {name: 'dosage', title: text.dosage,
            getCellValue: row => row.dosage ? row.dosage.toFixed(3) : 0,
            endAdornment: row => row.resourceType === PESTICIDE ? text[row.pesticide.unit.toLowerCase()] : null ,
            hide: row => row.resourceType !== PESTICIDE,
            edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('dosage',Number(value), rowData, rowIndex),

        },
        {name: 'unit', title: text.unit,
            options: (row)=> row.resourceType === CONTRACTOR ?  renderPerUnitOptions(EXECUTOR_UNITS, text) : null,
            width: 100,
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('unit',value, rowData, rowIndex),
            getCellValue: row => {
                    const unit = row.resource && row.resource.usageUnit ? row.resource.usageUnit.replace('PER_','').toLowerCase() : '';
                    return text[unit]
            }
        },
        {name: 'note', title: text.note,  edit: true,
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('note',value, rowData, rowIndex)
        },
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => removerActivityResource(value, rowIndex),
        },
    ]
    return (
        <Table
            rows={resources}
            columns={columns}
            disableSort={true}
            getKey={(row) => row.resourceId}

        />
    )

}

export default Resources;

