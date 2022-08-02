import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { height220 } from "../../utils/TabUtils";
import { Checkbox, FormControlLabel, IconButton, MenuItem } from '@mui/material';

import { Autocomplete, PaginationTable, TextField } from '../../components';
import { getTablePageRows } from "../../components/tables/PaginationTableUtil";
import { getMaxText, isEmpty } from "../../utils/StringUtil";
import { Loading } from '../../components/core';
import { getReport } from '../../actions';
import PdfIcon from '../../icons/PdfIcon';
import ExcelIcon from "../../icons/ExcelIcon";
import { iconButton } from '../../utils/StyleUtils';
import { asShortStringDate } from '../../utils';
import {
    buildNameCodeFilterOptions, filterWithPrefix,
} from "../../components/filters/filterUtil";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',

    },

    table: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    search: {
        flex: 1,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        // marginBottom: theme.spacing(1),
    },
    iconButton: iconButton(theme),
    reportIcons: {
        display: 'flex', alignItems: 'center'
        // marginBottom: theme.spacing(1),
    },
}));


function ok(filter, valve){
    if('active' === filter){
        return valve.active === true
    } else if('inactive' === filter){
        return valve.active === false
    } else {
        return true;
    }
}

const Valves = (props) => {
    const classes = useStyles();

    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ columnName: 'name', direction: 'asc' });
    const [accountFilter, setAccountFilter] = useState('');
    const [domainFilter, setDomainFilter] = useState('');
    const [generate, setGenerate] = useState(null)
    const [selectedValves, setSelectedValves] = useState([]);

    const {
        text, domainOptions, accountTitle, saveValve, valves, duplicateValve, deletedValve,
        pageSize, pageSizes, setTablePageSize, lang, system, selectedValve, activeValves, setActiveValves,
    } = props;

    useEffect(() => {
        return () => {
            setActiveValves('all');
        }
    }, []);

    useEffect(() => {
        if (generate) {
            const filter = [
                { value: `IrrigationSystem_${system}` },
                { value: `active_${activeValves}` },
                { value: `accountText_${accountFilter}` },
                { value: `domainText_${domainFilter}` },

            ]

            getReport('valves', lang, generate, null, null, filter.concat(selectedValves), sorting, null, () => setGenerate(null))
        }
    }, [generate]);

    useEffect(() => {

        if (selectedValve) {
            setSelectedValves([
                {
                    value: 'valve' + selectedValve.id,
                    label: selectedValve.name,
                    element: selectedValve,
                    id: selectedValve.id
                }]
            );
        }

    }, [selectedValve]);

    if (domainOptions.length == 0) {
        return <Loading />
    }
    let columns = [
        {
            name: 'name', title: text.valve,
            getStyle: row => (!row.active ? { color: row.active ? 'green' : 'red', fontWeight: 'bold' } : null),
        },

        {
            name: 'domain', title: text.field,
            disableSort: true,
            options: () => domainOptions,
            autocomplete: true,
            placeholder: text.field + '...',
            width: 300,
            getCellValue: row => row.selectedDomainOption,
            onChange: (value, rowData, rowIndex) => {
                rowData.domain = null;
                if (value && value.element) {
                    rowData.domain = value.element;
                }
                saveValve(rowData);
            }
        },
        {
            disableSort: true,
            name: 'crop', title: text.crop,
            getCellValue: row => row.domain ? row.domain.variety.category : '',
        },
        {
            disableSort: true,
            name: 'variety', title: text.variety,
            getCellValue: row => row.domain ? row.domain.variety.name : '',

        },
        {
            disableSort: true,
            name: 'root', title: text.root,
            getCellValue: row => row.domain && row.domain.root ? asShortStringDate(row.domain.root) : '',

        },

        {
            disableSort: true,
            name: 'lastWaterQty', title: text.lastRead,
        },
        {
            disableSort: true,
            name: 'lastReadDate', title: text.date,
            getCellValue: row => row.lastReadDate ? asShortStringDate(row.lastReadDate) : '',
        },
        { name: 'account', title: accountTitle, getCellValue: row => getMaxText(row.account.value, 20) },
        { name: 'code', title: text.code },
        {
            name: 'active', title: text.active, getCellValue: row => (row.active ? text.yes : text.no),
            getStyle: row => (!row.active ? { color: row.active ? 'green' : 'red', fontWeight: 'bold' } : null),
        },
        {
            name: 'getIcon',
            title: ' ',
            iconButton: true,
            getIcon: (value) => value.master === true && value.active ? 'duplicate' : 'delete',
            onClick: (value, rowIndex) => value.master === true && value.active ? duplicateValve(value.id) : deletedValve(value.id),
        },

    ];

    const selectedValveIds = selectedValves.map(e => e.element.code);
    const valvesList = activeValves === 'all' ? valves : valves.filter(e => e.active === (activeValves === 'active'));
    const filteredByValve = selectedValveIds.length === 0 ? valvesList : valvesList.filter(e => selectedValveIds.includes(e.code));
    const filteredByAccount = isEmpty(accountFilter) ? filteredByValve : filteredByValve.filter(e => e.account.value.includes(accountFilter));
    const filteredRows = isEmpty(domainFilter) ? filteredByAccount :
        filteredByAccount.filter(e => e.domain &&
            ((e.domain.alias && e.domain.alias.includes(domainFilter)) || e.domain.field.name.includes(domainFilter)));

    const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);

    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <Autocomplete
                        style={{ flex: 1 }}
                        noMargin={true}
                        options={buildNameCodeFilterOptions(valves.filter(e => e.master == true && ok(activeValves,e)), 'valve')}
                        onChange={setSelectedValves}
                        value={selectedValves}
                        placeholder={text.valves}
                        isMulti={true}
                    />
                </div>
                <TextField
                    style={{ flex: 1 }}
                    value={domainFilter}
                    onFocus={(e) => e.target.select()}
                    placeholder={text.field}
                    onChange={(e) => setDomainFilter(e.target.value)}
                />
                <TextField
                    style={{ flex: 1 }}

                    //   fullWidth={true}
                    value={accountFilter}
                    onFocus={(e) => e.target.select()}
                    placeholder={accountTitle}
                    onChange={(e) => setAccountFilter(e.target.value)}
                />
                <TextField
                    select
                    style={{ width: 80 }}
                    value={activeValves}
                    onChange={(e) => setActiveValves(e.target.value)}
                    label={text.status}
                >
                    <MenuItem value={'all'}>
                        {text.all}
                    </MenuItem>
                    <MenuItem value={'active'}>
                        {text.active}
                    </MenuItem>
                    <MenuItem value={'inactive'}>
                        {text.inactive}
                    </MenuItem>
                </TextField>
                <div className={classes.reportIcons}>
                    <IconButton onClick={() => !generate ? setGenerate('pdf') : null} variant="outlined"
                        className={classes.iconButton}>
                        <PdfIcon />
                    </IconButton>
                    <IconButton onClick={() => !generate ? setGenerate('xls') : null} variant="outlined"
                        className={classes.iconButton}>
                        <ExcelIcon />
                    </IconButton>
                </div>
            </div>
            <div className={classes.table}>
                <PaginationTable
                    rows={displayRows}
                    columns={columns}
                    height={height220}
                    onRowClicked={null}
                    onCurrentPageChange={(currentPage) => setCurrentPage(currentPage)}
                    onSortingChange={(sorting) => setSorting(sorting)}
                    sorting={sorting}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={filteredRows.length}
                    pageSizes={pageSizes}
                    onChangeRowsPerPage={(pageSize) => setTablePageSize(pageSize)}
                />
            </div>
        </div>
    )
}

export default Valves;



