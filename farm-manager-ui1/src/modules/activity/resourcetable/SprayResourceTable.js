import React from 'react';
import { Table, } from '../../../components';
import { renderNameIdOptions } from '../../../components/core';
import { INVENTORY_TYPES } from '../../../reducers/InventoryReducer';
import { PESTICIDE, WORKER_GROUP, FERTILIZER } from "../../../reducers/ResourceReducer";
import { PER_AREA_UNIT } from "../../../utils/Units";
import { getResourceInventory, getInventoryColor } from '../ActivityUtil';

const EDITABLE_GROUP_AMOUNT = [WORKER_GROUP, FERTILIZER]


const Resources = (props) => {

    const { text, resources, removerActivityResource, changeResourceTableColumn, areaUnit, setResourceAmountEdit, costing, user, inventory, inventoryCheck, warehouses } = props;
    const columns = [

        { name: 'resourceName', title: text.name, getCellValue: row => row.resource ? row.resource.name : row.resourceName, },
        {
            name: 'resourceType', title: text.type,
            getCellValue: row => text[row.resourceType.toLowerCase()],
            clickable: row => {
                return (EDITABLE_GROUP_AMOUNT.includes(row.resourceType))
            },
            onClick: (value, rowIndex) => setResourceAmountEdit({ ru: value, rowIndex: rowIndex })
        },
        {
            name: 'dosage', title: text.dosage,
            width: 170,
            getCellValue: row => {
                // console.log('dosage', row.resourceType, row.dosage)
                return (
                    row.dosage ? Number(row.dosage).toFixed(3) : 0
                )
            },
            endAdornment: row => row.resourceType === PESTICIDE ? text[row.pesticide.unit.toLowerCase()] : null,
            hide: row => row.resourceType !== PESTICIDE,
            edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('dosage', Number(value), rowData, rowIndex),

        },
        { name: 'pestNames', title: text.pest },

        {
            name: 'groupAmount', title: text.qty, edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('groupAmount', value, rowData, rowIndex),
        },]
    if (inventoryCheck) {
        columns.push({
            name: 'inventory', title: text.inventory,
            getStyle: row => getInventoryColor(row, inventory, user),
            getCellValue: row => getResourceInventory(row, inventory, user),
        });
    }
    columns.push({
        name: 'unit', title: text.unit,
        getCellValue: row => {
            const unit = row.resource && row.resource.usageUnit ? row.resource.usageUnit : '';
            const translate = unit === PER_AREA_UNIT ? areaUnit : unit.replace('PER_', '').toLowerCase()
            return text[translate]
        }
    });
    columns.push({
        name: 'warehouseId', title: text.warehouse,
        width: 200,
        hide: row => !INVENTORY_TYPES.includes(row.resourceType),
        options: () => renderNameIdOptions(warehouses),
        onChange: (value, rowData, rowIndex) => changeResourceTableColumn('warehouseId', value, rowData, rowIndex)

    });
    if (costing) {
        columns.push({
            name: 'tariff', title: text.unitCost, edit: costing === true, type: 'number',
            color: (row) => row.manualTariff === true ? 'blue' : null,
            disabled: (row) => row.useInCostReport === false,
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('tariff', value, rowData, rowIndex)
        });
    }
    columns.push({
        name: 'note', title: text.resourceNote, edit: true,
        onChange: (value, rowData, rowIndex) => changeResourceTableColumn('note', value, rowData, rowIndex)
    });

    if (costing) {

        columns.push({
            name: 'totalCost',
            title: text.cost,
            getCellValue: row => row.totalCost && row.useInCostReport ? row.totalCost.toFixed(2) : row.useInCostReport === false ? '' : 0

        });
    }
    columns.push({
        name: 'delete',
        title: ' ',
        iconButton: true,
        onClick: (value, rowIndex) => removerActivityResource(value, rowIndex),
    });

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

