import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { getTablePageRows, PaginationTable, Table, } from '../../../components';
import { loadDataByName, _fields, _sites, _parentFields, _waterSources } from "../../../utils/LoadUtil";
import { buildTableFilterOptions, filterActiveTable, filterTable } from './tableUtil';
import { pageableModuleTable } from "../../../utils/TabUtils";

function getNew() {
    return { active: true, soilType: 'soil', type: 'openField' };
}

const FieldTable = (props) => {

    const { isAdmin, text, lang, getField, createNewField,
        fields, selectField, getUsers, pageSize, setTablePageSize, pageSizes, dir,
    } = props;

    const [filter, setFilter] = useState('');
    const [active, setActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ direction: 'asc', columnName: 'fieldName' });

    useEffect(() => {
        loadDataByName(props, [_fields, _sites, _parentFields, _waterSources]);
        getUsers(); 
        if (isAdmin) {
            selectField(getNew())
        }
        return () => {
            selectField(null);

        }
    }, []);


    useEffect(() => {
        setCurrentPage(0);
    }, [filter,active]);

    const onRowClicked = (row) => {
        selectField(null);
        if (row) {
            getField(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewField === true) {
            selectField(getNew())
        }
    }, [createNewField]);


    let columns = [
        { name: 'name', title: text.name },
        { name: 'size', title: text.size },
        {
            name: 'parentField',
            title: text.parentField,
            getCellValue: row => (row.parentField ? row.parentField.name : ''),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];


    let displayRows = filterTable(fields, filter).filter(e => e.active === active);

    const totalCount = displayRows.length;

    displayRows = getTablePageRows(displayRows, sorting, currentPage, pageSize);

    return (
        <div>
            <MasterDetailsTableTop
                active={active}
                onActiveChange={setActive}
                text={text}
                options={buildTableFilterOptions(fields)}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'fields'}
                xlsReport={'fields'}
                label={text.typeToSearch}
                lang={lang} />
            {/* <Table
                text={text}
                rows={displayRows}
                columns={columns}
                height={masterDetails}
                onRowClicked={onRowClicked}
            /> */}
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


export default FieldTable;