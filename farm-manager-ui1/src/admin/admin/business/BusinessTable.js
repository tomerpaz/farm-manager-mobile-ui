import React, { useState, useEffect } from 'react';
import { getTablePageRows } from "../../../components";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    buildNameCodeFilterOptions, filterWithPrefix,
} from "../../../components/filters/filterUtil";

import { pageableModuleTable } from "../../../utils/TabUtils";
import {
    PaginationTable,
} from '../../../components';
import { addYear, asShortStringDate, newDate, calcAge } from "../../../utils/DateUtil";
import { loadDataByName, _businesses, } from '../../../utils/LoadUtil';

function getNew() {
    return {
        active: true, registration: newDate(), validThrough: addYear(newDate()), businessLinks: [],
        autoArea: true, autoHour: true, maturity: false, application: true, tracket: false
    };
}


const BusinessTable = (props) => {

    const { dir, lang, text, businesses, getBusinesses, selectBusiness, getBusiness, createNewBusiness, pageSize, setTablePageSize, pageSizes } = props

    const [filter, setFilter] = useState('');


    const [currentPage, setCurrentPage] = useState(0);


    const [sorting, setSorting] = useState({ direction: 'asc', columnName: 'name' });
    const [options, setOptions] = useState(buildNameCodeFilterOptions(businesses, 'business'));

    useEffect(() => {
        loadDataByName(props, [_businesses]);
        selectBusiness(getNew())

        return () => {
            selectBusiness(null);
            getBusinesses();
        }
    }, []);


    const onRowClicked = (row) => {
        selectBusiness(null);
        getBusiness(row.id);

    }

    useEffect(() => {
        if (createNewBusiness === true) {
            selectBusiness(getNew())
        }
    }, [createNewBusiness]);

    useEffect(() => {
        setOptions(buildNameCodeFilterOptions(businesses, 'business'))
    }, [businesses]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'locale', title: text.language, getCellValue: row => text[row.locale] },
        {
            name: 'validThrough', title: text.validThrough,
            getCellValue: row => asShortStringDate(row.validThrough),
        },
        {
            name: 'registration', title: text.start,
            getCellValue: row => asShortStringDate(row.registration),
        },
        {
            name: 'years', title: text.years,
            getCellValue: row => calcAge(row.registration, row.validThrough),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const filteredRows = filterWithPrefix(businesses, filter, 'business');
    const totalCount = filteredRows.length;

    const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);

    return (
        <div>
            <MasterDetailsTableTop options={options} filter={filter}
                setFilter={setFilter}
                pdfReport={'businesses'}
                xlsReport={'businesses'}
                label={text.typeToSearch}
                lang={lang}
            />
            <PaginationTable
                rows={displayRows}
                columns={columns}
                height={pageableModuleTable}
                sorting={sorting}
                onSort
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                onChangeRowsPerPage={setTablePageSize}
                pageSizes={pageSizes}
                dir={dir}
                onRowClicked={onRowClicked}
                text={text}
                onSortingChange={setSorting}
            />
        </div>
    );
}

export default BusinessTable;