import React, { useState, useEffect } from 'react';
import { pageableModuleTable, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { buildNameCodeFilterOptions, getElementText } from "../../../components/filters/filterUtil";
import { PaginationTable } from '../../../components';
import { asShortStringDate, newDate } from "../../../utils/DateUtil";
import { getMaintenances } from "../../../actions/MaintenanceActions";
import { loadDataByName, _executors, _equipment } from '../../../utils/LoadUtil';

function getNew() {
    return { date: newDate() };
}

const MaintenanceTable = (props) => {
    const {
        pageSize,
        text, pageSizes, dir, lang,
        setWarnMessage, setTablePageSize, selectMaintenance, createNewMaintenance, equipment, executors, maintenanceTypes,
        getMaintenance, duplicateMaintenance,fetchMaintenance, setFetchMaintenance
    } = props;

    const [currentPage, setCurrentPage] = useState(0)
    const [sorting, setSorting] = useState({ columnName: 'date', direction: 'desc' })
    const [filter, setFilter] = useState('')
    const [rows, setRows] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [options, setOptions] = useState([])

    useEffect(() => {
        loadDataByName(props, [_executors, _equipment]);
        selectMaintenance(getNew())
        return () => {
            selectMaintenance(null);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageSize, currentPage, sorting, filter, start, end]);

    useEffect(() => {
        if(fetchMaintenance){
            setFetchMaintenance(false);
            fetchData();
        }
    }, [fetchMaintenance]);
    
    const fetchData = () => {
        getMaintenances(currentPage, pageSize, sorting.columnName, sorting.direction, filter, start, end).
            then(function (response) {
                setRows(response.data.content);
                setTotalCount(response.data.totalElements);

            });
    }

    useEffect(() => {
        if (createNewMaintenance === true) {
            selectMaintenance(getNew())
        }
    }, [createNewMaintenance]);

    useEffect(() => {
        setOptions(getElementText(maintenanceTypes, text, 'maintenanceType').concat(buildNameCodeFilterOptions(equipment.concat(executors), 'resource')))
    }, [equipment, executors]);

    const onRowClicked = (row, duplicate) => {
        selectMaintenance(null);
        if (row) {
            if (duplicate && duplicate === true) {
                setWarnMessage(text.duplicate);
                duplicateMaintenance(row.id)
            } else {
                getMaintenance(row.id);
            }
        }
    }

    let columns = [


        // render() {
        //     const { text, dir, lang } = this.props;
    
        //     const {options, filter, currentPage, sorting, pageSize,pageSizes,totalCount, rows, start, end} = this.state;
    
        { name: 'date', title: text.date, getCellValue: row => asShortStringDate(row.date) },
        { name: 'type', title: text.type, getCellValue: row => `${text[row.type]}` },
        { name: 'equipment.name', title: text.equipment, getCellValue: row => row.equipment.name },
        { name: 'executor.name', title: text.executor, getCellValue: row => row.executor.name },
        {
            name: 'duplicate',
            title: ' ',
            iconButton: true,
            clickable: true,
            onClick: (value, rowIndex) => onRowClicked(value, true),
        },

    ];

    let dateColumns = ['date'];



    // const displayRows = filterData(warehouses, filter);
    return (
        <div>
            <MasterDetailsTableTop options={options} filter={filter} setFilter={setFilter}
                label={text.typeToSearch}
                pdfReport={'Maintenance'}
                xlsReport={'Maintenance'}
                lang={lang}
                text={text}
                start={start}
                clearableDates={true}
                end={end}
                sorting={sorting}
                onStartChange={setStart}
                onEndChange={setEnd}
            />

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

export default MaintenanceTable;