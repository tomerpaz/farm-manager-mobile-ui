import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { pageableModuleTable, height220, height450 } from "../../utils/TabUtils";

import { PaginationTable, TextField } from '../../components';
import { getTablePageRows } from "../../components/tables/PaginationTableUtil";
import { isEmpty } from "../../utils/StringUtil";

import { iconButton } from '../../utils/StyleUtils';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

    },

    table: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    search: {
        flex: 1, zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        // marginBottom: theme.spacing(1),
    },
    iconButton: iconButton(theme),
    reportIcons: {
        flex: 1, display: 'flex', alignItems: 'center'
        // marginBottom: theme.spacing(1),
    },
}));


const Valves = (props) => {
    const classes = useStyles();

    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ columnName: 'name', direction: 'asc' });
    const [vavleFilter, setValveFilter] = useState('');
    const [domainFilter, setDomainFilter] = useState('');

    const {
        text, accountValves, 
        pageSize, pageSizes, setTablePageSize, lang,system,
    } = props;

    let columns = [
        { name: 'name', title: text.valve },
        {
            name: 'domain', title: text.field,
            disableSort: true,
            width: 250,
            getCellValue: row => row.domain ?  row.domain.field.name : '',

        },


    ];

    const filteredByValve = isEmpty(vavleFilter) ? accountValves : accountValves.filter(e => e.name.includes(vavleFilter));
    const filteredRows = isEmpty(domainFilter) ? filteredByValve :
    filteredByValve.filter(e => e.domain &&
            ((e.domain.alias && e.domain.alias.includes(domainFilter)) || e.domain.field.name.includes(domainFilter)));

    const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);

    const filter = [{value: 'IrrigationSystem_'+system}]

    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <TextField
                    fullWidth={true}
                    value={vavleFilter}
                    onFocus={(e) => e.target.select()}
                    placeholder={text.valve}
                    onChange={(e) => setValveFilter(e.target.value)}
                />
                <TextField
                    fullWidth={true}
                    value={domainFilter}
                    onFocus={(e) => e.target.select()}
                    placeholder={text.field}
                    onChange={(e) => setDomainFilter(e.target.value)}
                />

            </div>
            <div className={classes.table}>
                <PaginationTable
                    rows={displayRows}
                    columns={columns}
                    height={height450}
                    onRowClicked={null}
                    onCurrentPageChange={(currentPage) => setCurrentPage(currentPage)}
                    onSortingChange={(sorting) => setSorting(sorting)}
                    sorting={sorting}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={filteredRows.length}
                    showSelectAll={true}
                    onRowClicked={(e) => console.log(e)}
                    pageSizes={pageSizes}
                    onChangeRowsPerPage={(pageSize) => setTablePageSize(pageSize)}
                    selectAll={(e) => console.log(e)}
                    useSelection={true}
                    selections={[]}/*

                                useSelection={true}
                                selection={selection}
                                showSelectAll={showSelectAll === false ? false : true}
                                selectAll={this.selectAll.bind(this)}
                                selections={selectedDomainsIDs}
*/
                />
            </div>
        </div>
    )
}

export default Valves;



