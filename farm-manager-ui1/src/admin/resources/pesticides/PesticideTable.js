import React, { useState, useEffect } from 'react';
import { getTablePageRows } from "../../../components";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    filterWithPrefix,
} from "../../../components/filters/filterUtil";
import { pageableModuleTable } from "../../../utils/TabUtils";
import { PESTICIDE } from "../../../reducers/ResourceReducer";
import PaginationTable from "../../../components/tables/PaginationTable";
import { loadDataByName, _pesticides } from "../../../utils/LoadUtil";

function getNew() {
    return { type: PESTICIDE, active: true, };
}


const PesticideTable = (props) => {

    const { dir, lang, text, pageSize, setTablePageSize, pageSizes, pesticideOptions, selectPesticide, getPesticide, createNewResource, pesticides, getPesticides } = props
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ direction: 'asc', columnName: 'name' });

    useEffect(() => {
        loadDataByName(props, [_pesticides]);
        selectPesticide(getNew())

        return () => {
            selectPesticide(null);
            getPesticides();
        }
    }, []);

    const onRowClicked = (row) => {
        selectPesticide(null);
        getPesticide(row.id);
    }

    useEffect(() => {
        if (createNewResource === true) {
            selectPesticide(getNew())
        }
    }, [createNewResource]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'engName', title: text.engName },
        { name: 'locale', title: text.language, getCellValue: row => text[row.locale] },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const filteredRows = filterWithPrefix(pesticides, filter, 'resource');
    const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);
    return (
        <div>
            <MasterDetailsTableTop options={pesticideOptions} filter={filter}
                setFilter={setFilter}
                pdfReport={'pesticides'}
                xlsReport={'pesticides'}
                label={text.typeToSearch}
                lang={lang}
            />
            <PaginationTable
                rows={displayRows}
                columns={columns}
                height={pageableModuleTable}
                onRowClicked={onRowClicked}
                onCurrentPageChange={setCurrentPage}
                onSortingChange={setSorting}
                sorting={sorting}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={filteredRows.length}
                dir={dir}
                pageSizes={pageSizes}
                onChangeRowsPerPage={setTablePageSize}
                dateColumns={columns}
                text={text}
            />
        </div>
    );
}
export default PesticideTable;