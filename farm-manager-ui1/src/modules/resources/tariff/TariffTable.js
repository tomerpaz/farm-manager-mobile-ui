import React, { useState, useEffect } from 'react';
import { pageableModuleTable, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { PaginationTable } from '../../../components';
import { getTariffs } from "../../../actions/TariffActions";
import { asShortStringDate, newDate } from "../../../utils/DateUtil";
import { getTariffUnit } from "../../../utils/Units";
import { CONTRACTOR } from "../../../reducers/ResourceReducer";
import { loadDataByName } from "../../../utils/LoadUtil";

export function getTariffDescription(t) {
    if (t.tariffResource.type === CONTRACTOR) {
        if (t.activityDef) {
            return ' (' + t.activityDef.name + ')'
        } else if (t.tariffSecondaryResource) {
            return ' (' + t.tariffSecondaryResource.name + ')'
        }
    }
    return '';
}


const masterStyle = { backgroundColor: 'yellow' };

function getRowStyle(e) {
    if (e && e.master) {
        return masterStyle;
    }
    return null;
}

const TariffTable = (props) => {
    const {
        pageSize,
        text, pageSizes, dir,
        selectTariff, getTariff, duplicateTariff,
        lang, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions,
        executorOptions, equipmentOptions, waterSourceOptions, compostOptions, disinfectantOptions,
        resourceTypeOptions, areaUnit, activityDefOptions, isAdmin, createNewTariff, setTablePageSize, fetchTariffs,setFetchTariffs
    } = props;



    const [currentPage, setCurrentPage] = useState(0)

    const [sorting, setSorting] = useState({ columnName: 'effectiveFrom', direction: 'desc' })
    const [filter, setFilter] = useState('')
    const [rows, setRows] = useState([])
    const [totalCount, setTotalCount] = useState(0)

    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    useEffect(() => {
        loadDataByName(props, ['fertilizers', 'pesticides', 'varieties', 'accessories', 'executors', 'waterSources', 'equipment', 'composts', 'disinfectants', 'activityDefs']);
        if (isAdmin) {
            selectTariff({ effectiveFrom: newDate(), master: false })
        }
        return () => {
            selectTariff(null);
        }
    }, []);

    useEffect(() => {
        if (isAdmin && createNewTariff) {
            selectTariff({ effectiveFrom: newDate(), master: false })
        }

    }, [createNewTariff]);

    useEffect(() => {
        fetchTariffsFunc();
    }, [currentPage, sorting, pageSize, filter, start, end]);

    useEffect(() => {
        if (fetchTariffs) {
            setFetchTariffs(false);
            fetchTariffsFunc();
        }
    }, [fetchTariffs]);

    const fetchTariffsFunc = () => {
        getTariffs(currentPage, pageSize, sorting.columnName, sorting.direction, filter, start, end).
            then(function (response) {
                setRows(response.data.content);
                setCurrentPage(response.data.number);
                setTotalCount(response.data.totalElements);
            });

    }


    const onRowClicked = (row, duplicate) => {
        selectTariff(null);
        if (row) {
            if (duplicate && duplicate === true) {
                duplicateTariff(row.id)
            } else {
                getTariff(row.id);
            }
        }
    }

    const options = resourceTypeOptions.concat(fertilizerOptions)
        .concat(pesticideOptions).concat(varietyResourceOptions)
        .concat(accessoryOptions).concat(executorOptions)
        .concat(equipmentOptions).concat(waterSourceOptions)
        .concat(compostOptions).concat(disinfectantOptions)
        .concat(activityDefOptions);

    let columns = [
        { name: 'tariffResource.type', title: text.category, getCellValue: row => `${text[row.tariffResource.type.toLowerCase()]}${getTariffDescription(row)}` },
        { name: 'tariffResource.name', title: text.resource, getCellValue: row => row.tariffResource.name },
        { name: 'tariffResource.usageUnit', title: text.unit, getCellValue: row => getTariffUnit(row.tariffResource, row.activityDef, areaUnit, text) },
        { name: 'price', title: text.price },
        { name: 'effectiveFrom', title: text.effectiveFrom, getCellValue: row => asShortStringDate(row.effectiveFrom) },
    ];

    if (isAdmin) {
        columns.push(

            {
                name: 'duplicate',
                title: ' ',
                iconButton: true,
                clickable: true,
                onClick: (value, rowIndex) => onRowClicked(value, true),
            },

        )
    }

    let dateColumns = ['effectiveFrom'];


    return (
        <div>
            <MasterDetailsTableTop options={options} filter={filter} setFilter={setFilter}
                label={text.typeToSearch}
                pdfReport={'Tariff'}
                xlsReport={'Tariff'}
                lang={lang}
                text={text}
                start={start}
                clearableDates={true}
                end={end}
                sorting={sorting}
                onStartChange={setStart}
                onEndChange={setEnd} />

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
                getRowStyle={getRowStyle}
                onChangeRowsPerPage={setTablePageSize}
                pageSizes={pageSizes}
                dateColumns={dateColumns}
                text={text}
            />
        </div>
    );
}

export default TariffTable;