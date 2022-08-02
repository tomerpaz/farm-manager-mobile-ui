import React from 'react';
import { Table, } from '../../../components';
import { FERTILIZER, WATER, WORKER_GROUP } from "../../../reducers/ResourceReducer";
import { PER_AREA_UNIT } from "../../../utils/Units";
import { calcNPK } from '../../../utils/FarmCalculator';
import { getResourceInventory, getInventoryColor } from '../ActivityUtil';
import { isEmpty } from '../../../utils/StringUtil';
import { INVENTORY_TYPES } from '../../../reducers/InventoryReducer';
import { renderNameIdOptions } from '../../../components/core';


export const CALCULATOR_TYPES = [WATER, FERTILIZER]

function calcFertilizerNPK(ru, isCalculator, type) {
    const totalFertilizerAmount = isCalculator ? ru.usageAmount : ru.groupAmount;
    const specificGravity = ru.resource.specificGravity;
    let value = null;
    if (type === 'p') {
        value = ru.resource.p;
    } else if (type === 'k') {
        value = ru.resource.k;
    } else if (type === 'n') {
        value = ru.resource.n;
    }
    if (value && specificGravity && totalFertilizerAmount) {
        return calcNPK(totalFertilizerAmount, specificGravity, value, ru.resource.usageUnit);
    }

}

const Resources = (props) => {

    const { text, resources, removerActivityResource, changeResourceTableColumn, calculator,
        setResourceAmountEdit, areaUnit, costing, user, inventory, inventoryCheck, warehouses } = props;

    const columns = [];

    columns.push(
        { name: 'resourceName', title: text.name, getCellValue: row => row.resource ? row.resource.name : row.resourceName, },

    );

    columns.push(
        {
            name: 'resourceType', title: text.type,
            getCellValue: row => text[row.resourceType.toLowerCase()],
            clickable: row => {
                return (row.resource.type === WORKER_GROUP)
            },
            onClick: (value, rowIndex) => setResourceAmountEdit({ ru: value, rowIndex: rowIndex })
        },
    );
    columns.push({
        name: 'groupAmount', title: text.qty, edit: true, type: 'number',
        onChange: (value, rowData, rowIndex) => changeResourceTableColumn('groupAmount', Number(value), rowData, rowIndex),
    })

    if (!isEmpty(user.business.ggBearer)) {
        columns.push({
            name: 'info',
            title: ' ',
            iconButton: true,
            clickableCheck: row => {
                return (row.resource.type === WATER)
            },
            onClick: (value, rowIndex) => setResourceAmountEdit({ ru: value, rowIndex: rowIndex, secondary: true })
        });
    }

    if (calculator) {
        columns.push({ name: 'usageAmount', iconTitle: 'calculator', type: 'number', getCellValue: row => CALCULATOR_TYPES.includes(row.resourceType) ? (row.usageAmount ? row.usageAmount.toFixed(2) : 0) : null });
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
    columns.push({ name: 'calcK', title: 'K', getCellValue: row => row.resourceType === FERTILIZER ? calcFertilizerNPK(row, calculator, 'k') : '' });
    columns.push({ name: 'calcP', title: 'P', getCellValue: row => row.resourceType === FERTILIZER ? calcFertilizerNPK(row, calculator, 'p') : '' });
    columns.push({ name: 'calcN', title: 'N', getCellValue: row => row.resourceType === FERTILIZER ? calcFertilizerNPK(row, calculator, 'n') : '' });

    if (costing) {

        columns.push({
            name: 'tariff', title: text.unitCost, edit: costing === true, type: 'number',
            color: (row) => row.manualTariff === true ? 'blue' : null,
            disabled: (row) => row.useInCostReport === false,
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('tariff', value, rowData, rowIndex)
        });
    }
    columns.push({
        name: "", title: " ",
        getCellValue: row => row.resourceType === FERTILIZER && row.resource.inventoryUnit
            ? '(' + text[row.resource.inventoryUnit.replace('PER_', '').toLowerCase()] + ')' : '',
    });

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

