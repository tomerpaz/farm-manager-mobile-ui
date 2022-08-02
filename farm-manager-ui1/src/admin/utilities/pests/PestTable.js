import React, { useState, useEffect } from 'react';
import { getTablePageRows } from "../../../components";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix, } from "../../../components/filters/filterUtil";
import { pageableModuleTable } from "../../../utils/TabUtils";
import PaginationTable from "../../../components/tables/PaginationTable";
import { loadDataByName, _pests } from "../../../utils/LoadUtil";

function getNew() {
    return { active: true, };
}

const PestTable = (props) => {
    const { dir, lang, text, pageSize, setTablePageSize, pageSizes,
        pestOptions, selectPest, getPest, createNewPest, pests, getPests } = props
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ direction: 'asc', columnName: 'name' });


    useEffect(() => {
        loadDataByName(props, [_pests]);
        selectPest(getNew())

        return () => {
            selectPest(null);
            getPests();
        }
    }, []);

    const onRowClicked = (row) => {
        selectPest(null);
        getPest(row.id);
    }

    useEffect(() => {
        if (createNewPest === true) {
            selectPest(getNew())
        }
    }, [createNewPest]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'engName', title: text.engName },
        { name: 'locale', title: text.language, getCellValue: row => text[row.locale] },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const filteredRows = filterWithPrefix(pests, filter, 'pest');
    const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);
    return (
        <div>
            <MasterDetailsTableTop options={pestOptions} filter={filter}
                setFilter={setFilter}
                pdfReport={'pests'}
                xlsReport={'pests'}
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

export default PestTable;