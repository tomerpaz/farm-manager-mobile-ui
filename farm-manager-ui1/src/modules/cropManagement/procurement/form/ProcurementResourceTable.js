import React, {useState} from 'react';
import { Table, } from '../../../../components';

import { getUnitText } from "../../../../utils/Units";
import { renderNameIdOptions } from "../../../../components/core/optionsUtil";
import { asLocalDate } from '../../../../utils';
import { EditPackageCount, PriceHistory } from '../../../../components/dialog';

export function getPrice(value){
    const result = Number(value);
    if(result && result < 0){
        return Math.abs(result);
    } else {
        return result;
    }
}

const ProcurementItems = (props) => {

    const { text, items, changeResourceTableColumn, warehouses } = props;

    const [item, setItem] = useState(item)
    const [index, setIndex] = useState(item)
    const [priceHistory, setPriceHistory] = useState(null)

    const onUnitClick = (item, index) => {
        setItem(item);
        setIndex(index);
    }

    const savePackages = (packageCount,  unitsInPackage) => {
        item.packageCount = packageCount === 0 ? null : packageCount;
        if(packageCount !== 0 && unitsInPackage !== 0 ){
            changeResourceTableColumn('amount', (packageCount * unitsInPackage).toFixed(2) , item, index)
        }
        setItem(null)
        setIndex(null)
    }

    const activeWarehouses = warehouses.filter(w => w.active);
    const columns = [
        {
            name: 'tariff.effectiveFrom', title: text.waybillDate, getCellValue: row => row.tariff.effectiveFrom, edit: true, type: 'date',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('tariff.effectiveFrom', asLocalDate(value, true), rowData, rowIndex)
        },
        { name: 'resourceType', title: text.category, getCellValue: row => text[row.resource.type.toLowerCase()] },
        { name: 'itemName', title: text.item, getCellValue: row => row.resource.name },
        {
            name: 'tariff.unit', title: text.unit,
            clickable: row => true,
            onClick: (value, rowIndex) => onUnitClick(value, rowIndex),

            getCellValue: row => getUnitText(row.resource.inventoryUnit ? row.resource.inventoryUnit : row.resource.usageUnit, text)
        },
        {
            name: 'amount', title: text.qty, edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('amount', Number(value), rowData, rowIndex),
        },
        {
            name: 'tariff.price', title: text.unitCost,
            getCellValue: row => row.tariff.price ? row.tariff.price.toFixed(2) : 0,
            edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('tariff.price', getPrice(value), rowData, rowIndex),
        },
        {
            name: 'history',
            title: ' ',
            iconButton: true,
            onClick: (row, rowIndex) => setPriceHistory(row.resource),
        },
        {
            name: 'totalCost', title: text.totalCost, edit: true, type: 'number',
            getCellValue: row => row.totalCost ? row.totalCost.toFixed(2) : 0,
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('totalCost', Number(value), rowData, rowIndex),

        },

        {
            name: 'warehouse.id',
            width: 150 ,
            title: text.warehouse,
            getCellValue: row => row.warehouse ? row.warehouse.id : (activeWarehouses.length ? activeWarehouses[0].id : ''),
            options: () => renderNameIdOptions(activeWarehouses),
            onChange: (value, rowData, rowIndex) => changeResourceTableColumn('warehouse.id', value, rowData, rowIndex),
        },
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (row, rowIndex) => changeResourceTableColumn('delete', null, row, rowIndex),
        },
        {
            name: 'duplicate',
            title: ' ',
            iconButton: true,
            onClick: (row, rowIndex) => changeResourceTableColumn('duplicate', null, row, rowIndex),
        },
    ];

    if (items) {
        items.sort((a, b) => (a.resource.name >= b.resource.name) ? 1 : -1);
    }
    return (
        <div>

            <Table
                rows={items ? items : []}
                columns={columns}
                disableSort={true}
                dateFormat={text.dateFormat}
                text={text}
                indexKey={true}
            />
            {item && <EditPackageCount text={text} open={item!=null} item={item} close={()=> setItem(null)}
            save={savePackages}
            />}
            {priceHistory && <PriceHistory text={text} resource={priceHistory} open={priceHistory!=null} close={()=> setPriceHistory(null)}/>}
        </div>

    )
}
export default ProcurementItems;

