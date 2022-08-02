import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { getTablePageRows, MasterDetailsTableTop, PaginationTable, Table } from '../../../components'
import { masterDetails, pageableModuleTable } from "../../../utils/TabUtils";
import { getUnitText } from "../../../utils/Units";
import { buildFilterOptions } from "../inventoryUpdates/InventoryUpdateTable";
import { loadDataByName } from "../../../utils/LoadUtil";
import { newDate, asLocalDate, subtractMonths, asShortStringDate } from '../../../utils';
import { Loading } from '../../../components/core';
import { errorStyle, okStyle } from '../../../utils/StyleUtils';


const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));

const summaryStyle = { color: 'blue', backgroundColor: 'yellow', fontWeight: 'bold' };

function getRowStyle(e) {
    if (e && e.type && e.type === 'summary') {
        return summaryStyle;
    }
    return null;
}

function getFieldOrSupplier(row) {
    if (row.domain) {
        return row.domain.field.name;
    } else if (row.supplier) {
        return row.supplier;
    }
    return '';
}

const inventoryView = 'Inventory';
const stockMovementView = 'StockMovement';

const defaultMonths = 3;

function getDefaultStart() {
    return subtractMonths(newDate(), defaultMonths);
}

function getColumns(view, text) {
    if (view === inventoryView) {
        return [
            { name: 'resourceType', title: text.category, getCellValue: row => text[row.resource.type.toLowerCase()] },
            { name: 'resourceName', title: text.item, },
            { name: 'in', title: text.inQty, getCellValue: row => row.in.toFixed(2) },
            { name: 'out', title: text.outQty, getCellValue: row => row.out.toFixed(2) },
            { name: 'current', title: text.inventoryQty },
            {
                name: 'unit',
                title: text.unit,
                disableSort: true,
                getCellValue: row => row.resource.inventoryUnit ? getUnitText(row.resource.inventoryUnit, text) : getUnitText(row.resource.usageUnit, text)
            },
            { name: 'warehouseName', title: text.warehouse },
        ];
    } else {
        return [
            { name: 'date', title: text.date, getCellValue: row => asShortStringDate(row.date) },
            { name: 'resource', title: text.item, getCellValue: row => row.resource.name },
            { name: 'warehouse', title: text.warehouse, getCellValue: row => row.warehouse.name },
            { name: 'reference', title: `${text.reference}/${text.invoice}` },
            {
                name: 'type', title: text.type, getCellValue: row => text[row.resource.type.toLowerCase()],
            },
            { name: 'field', title: `${text.field}/${text.supplier}`, getCellValue: row => getFieldOrSupplier(row) },

            { name: 'category', title: text.category, getCellValue: row => text[row.type] },
            {
                name: 'in', title: text.inQty, getCellValue: row => row.in ? row.in.toFixed(2) : '',
                style: okStyle
            },
            {
                name: 'out', title: text.outQty, getCellValue: row => row.out ? row.out.toFixed(2) : '',
                style: errorStyle
            },
            {
                name: 'balance', title: text.balance,
                style: { color: 'blue', fontWeight: 'bold' },
                getCellValue: row => row.balance ? row.balance.toFixed(2) : ''
            },
            {
                name: 'unit',
                title: text.unit,
                getCellValue: row => row.resource.inventoryUnit ? getUnitText(row.resource.inventoryUnit, text) : getUnitText(row.resource.usageUnit, text)
            },
            {
                name: 'unitCost',
                title: text.unitCost,
                getCellValue: row => row.tariff ? row.tariff.price : ''
            },
            {
                name: 'totalCost',
                title: text.totalCost,
                getCellValue: row => row.totalCost ? row.totalCost.toFixed(2) : ''
            },
        ];
    }

}
const InventoryTable = (props) => {
    const classes = useStyles();
    const { getInventory, defaultWarehouse,
        text, inventory, lang, warehouseOptions, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions,
        getStockMovments, stockMovments, costing, pageSize, setTablePageSize, pageSizes, dir, user: { externalInventory }
    } = props

    const [filter, setFilter] = useState(defaultWarehouse ? [{ label: defaultWarehouse.name, value: 'warehouse_' + defaultWarehouse.id }] : '');
    const [dateFilter, setDateFilter] = useState(newDate());
    const [view, setView] = useState(inventoryView);

    const [startDate, setStartDate] = useState(getDefaultStart());

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);


    const [sorting, setSorting] = useState({ direction: 'asc', columnName: 'index' });

    const showMovments = costing && !externalInventory;
    useEffect(() => {
        loadDataByName(props, ['pesticides', 'fertilizers', 'varieties', 'accessories', 'warehouses']);
    }, []);


    useEffect(() => {
        setLoading(true);
        if (view === inventoryView) {
            getInventory(dateFilter, filter);
        } else {
            getStockMovments(startDate, dateFilter, filter);
        }
    }, [dateFilter, filter, view, startDate]);

    useEffect(() => {
        setLoading(false);
    }, [stockMovments, inventory]);

    let columns = getColumns(view, text)


    const options = buildFilterOptions(text, warehouseOptions, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions);

    const data = view === inventoryView ? inventory : stockMovments;


    const displayRows = getTablePageRows(data, sorting, currentPage, pageSize);
    if(loading){
        return <Loading />
    }
    return (
        <div className={classes.root}>
            <MasterDetailsTableTop options={options} filter={filter} setFilter={(e) => setFilter(e)}
                label={text.typeToSearch} onClick={null} actionText={text.add}
                pdfReport={view}
                xlsReport={view}
                lang={lang}
                text={text}
                start={view === stockMovementView ? startDate : null}
                onStartChange={view === stockMovementView ? (s) => setStartDate(s ? s : getDefaultStart()) : null}
                end={dateFilter}
                onEndChange={(dateFilter) => setDateFilter(dateFilter ? dateFilter : newDate())}
                view={view}
                setView={setView}
                viewOptions={showMovments ? [inventoryView, stockMovementView] : null}
            />
            <PaginationTable
                rows={displayRows}
                columns={columns}
                height={pageableModuleTable}
                disableSort={view === stockMovementView}
                sorting={sorting}
                indexKey={true}
                getRowStyle={getRowStyle}
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                totalCount={data.length}
                onChangeRowsPerPage={setTablePageSize}
                pageSizes={pageSizes}
                dir={dir}
                text={text}
                onSortingChange={setSorting}
            />
        </div>
    );

}
export default InventoryTable;