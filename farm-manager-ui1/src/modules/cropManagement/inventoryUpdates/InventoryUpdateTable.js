import React, { useState, useEffect } from 'react';
import { MasterDetailsTableTop, PaginationTable } from '../../../components'
import { pageableModuleTable } from "../../../utils/TabUtils";
import { getDirectInventoryUpdates } from "../../../actions/InventoryActions";
import { asShortStringDate, newDate } from "../../../utils/DateUtil";
import { INVENTORY_TYPES } from "../../../reducers/InventoryReducer";
import { loadDataByName, _pesticides, _fertilizers, _varieties, _accessories, _warehouses } from "../../../utils/LoadUtil";
import { PESTICIDE } from '../../activity/types';

const dateColumns = ['updateDate'];

export function buildFilterOptions(text, warehouses, fertilizers, pesticides, varieties, accessories) {
    return INVENTORY_TYPES.map(type => (
        { value: 'resourceType_' + type, label: text[type.toLowerCase()] }
    )).concat(warehouses).concat(fertilizers).concat(pesticides).concat(varieties).concat(accessories);
}

function getNew() {
    return {
        updateDate: newDate(),
        deletable: false,
        active: true,
        resourceType: '',
        selectedWarehouse: '',
        qty: ''
    };
}

const InventoryUpdateTable = (props) => {

    const {
        pageSize,
        text, pageSizes, dir, lang, isAdmin,
        setTablePageSize, selectInventoryUpdate, createNewInventoryUpdate,
        getInventoryUpdate, fetchInventoryUpdate,
        warehouseOptions, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions
    } = props;

    const [currentPage, setCurrentPage] = useState(0)
    const [sorting, setSorting] = useState({ columnName: 'updateDate', direction: 'desc' })
    const [filter, setFilter] = useState('')
    const [rows, setRows] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [options, setOptions] = useState([])


    useEffect(() => {
        loadDataByName(props, [_pesticides, _fertilizers, _varieties, _accessories, _warehouses]);
        if (isAdmin) {
            selectInventoryUpdate(getNew())
        } return () => {
            selectInventoryUpdate(null);
        }
    }, []);


    useEffect(() => {
        if (isAdmin && createNewInventoryUpdate === true) {
            selectInventoryUpdate(getNew())
        }
    }, [createNewInventoryUpdate]);

    useEffect(() => {
        setOptions(buildFilterOptions(text, warehouseOptions, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions));
    }, [warehouseOptions, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions]);

    const fetchData = () => {
        getDirectInventoryUpdates(currentPage, pageSize, sorting.columnName, sorting.direction, filter, start, end).
            then(function (response) {
                setRows(response.data.content);
                setTotalCount(response.data.totalElements);

            });
    }

    useEffect(() => {
        fetchData();
    }, [pageSize, currentPage, sorting, filter, start, end]);

    useEffect(() => {
        if (fetchInventoryUpdate === true) {
            fetchData();
        }
    }, [fetchInventoryUpdate]);

    const onRowClicked = (row) => {
        selectInventoryUpdate(null);
        getInventoryUpdate(row.id);
    }

    let columns = [
        { name: 'updateDate', title: text.date, getCellValue: row => asShortStringDate(row.updateDate) },
        {
            name: 'resource.type', title: text.category,
            getCellValue: row => text[row.resource.type.toLowerCase()]
        },
        {
            name: 'resource.name', title: text.item,
            getCellValue: row => row.resource.name
        },
        {
            name: 'warehouse.name', title: text.warehouse,
            getCellValue: row => (row.warehouse ? row.warehouse.name : '')
        },
    ];

    return (
        <div>
            <MasterDetailsTableTop options={options}
                filter={filter}
                setFilter={setFilter}
                label={text.typeToSearch}
                lang={lang} />
            <PaginationTable
                rows={rows}
                columns={columns}
                height={pageableModuleTable}
                onRowClicked={onRowClicked}
                onCurrentPageChange={setCurrentPage}
                onSortingChange={setSorting}
                sorting={sorting}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                dir={dir}
                pageSizes={pageSizes}
                dateColumns={dateColumns}
                onChangeRowsPerPage={setTablePageSize}
                text={text}
            />
        </div>
    );
}

export default InventoryUpdateTable;