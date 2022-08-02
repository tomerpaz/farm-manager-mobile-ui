import React from 'react';
import { Table, } from '../../../components';
import { PER_AREA_UNIT } from "../../../utils/Units";
import { COMPOST, CONTRACTOR, DISINFECTANT, PESTICIDE, VARIETY, WORKER_GROUP, ACCESSORY, ENERGY, FERTILIZER } from "../../../reducers/ResourceReducer";
import { getResourceInventory, getInventoryColor } from '../ActivityUtil';
import { isEmpty } from '../../../utils/StringUtil';
import { renderNameIdOptions } from '../../../components/core';
import { INVENTORY_TYPES } from '../../../reducers/InventoryReducer';



const EDITABLE_GROUP_AMOUNT = [COMPOST, FERTILIZER, PESTICIDE, DISINFECTANT, WORKER_GROUP, VARIETY, ACCESSORY]
const Resources = (props) => {

    const { text, resources, removerActivityResource, changeResourceTableColumn, areaUnit,
        setResourceAmountEdit, selectedActivityDefOption, costing, user, inventory, inventoryCheck, warehouses } = props;

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
            name: 'groupAmount', title: text.qty, edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('groupAmount', value, rowData, rowIndex),
        },
    ];

    if (!isEmpty(user.business.ggBearer)) {
        columns.push({
            name: 'info',
            title: ' ',
            iconButton: true,
            clickableCheck: row => {
                return (row.resource.type === ENERGY)
            },
            onClick: (value, rowIndex) => setResourceAmountEdit({ ru: value, rowIndex: rowIndex, secondary: true })
        });
    }

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
            const unit = row.resourceType === CONTRACTOR && selectedActivityDefOption ? selectedActivityDefOption.element.unit : row.resource && row.resource.usageUnit ? row.resource.usageUnit : '';
            const translate = unit === PER_AREA_UNIT ? areaUnit : unit.replace('PER_', '').toLowerCase()
            return text[translate]
        }
    })

    columns.push({
        name: 'warehouseId', title: text.warehouse,
        width: 200,
        hide: row => !INVENTORY_TYPES.includes(row.resourceType),
        options: () => renderNameIdOptions(warehouses),
        onChange: (value, rowData, rowIndex) => changeResourceTableColumn('warehouseId', value, rowData, rowIndex)
    });

    if (costing) {
        columns.push(
            {
                name: 'tariff', title: text.unitCost, edit: costing === true, type: 'number',
                color: (row) => row.manualTariff === true ? 'blue' : null,
                disabled: (row) => row.useInCostReport === false,
                onChange: (value, rowData, rowIndex) => changeResourceTableColumn('tariff', value, rowData, rowIndex)
            },
        )
    }
    columns.push(
        {
            name: "", title: " ",
            getCellValue: row => row.resourceType === FERTILIZER && row.resource.inventoryUnit
                ? '(' + text[row.resource.inventoryUnit.replace('PER_', '').toLowerCase()] + ')' : '',
        }
    )

    columns.push(

        {
            name: 'note', title: text.resourceNote, edit: true,
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('note', value, rowData, rowIndex)
        })
    if (costing) {

        columns.push(

            {
                name: 'totalCost',
                title: text.cost,
                getCellValue: row => row.totalCost && row.useInCostReport ? row.totalCost.toFixed(2) : row.useInCostReport === false ? '' : 0
            })
    }
    columns.push(

        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => removerActivityResource(value, rowIndex),
        },
    )

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

