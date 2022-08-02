import React, { useState, useEffect } from 'react';
import YearPicker from "../../core/picker/YearPicker";
import { Autocomplete, TextField } from '../../'

import { Divider, Dialog, DialogContent, DialogTitle, Checkbox, FormControlLabel, Box, } from '@mui/material';

import DialogActions from '../../dialog/DialogActions'

import { asShortStringDate, getDateYear } from "../../../utils/DateUtil";
import { filterDomains, filterDomainsFreeText, } from "../../filters/filterUtil";
import { height375 } from "../../../utils/TabUtils";
import PaginationTable from "../PaginationTable";
import { getTablePageRows } from "../PaginationTableUtil";
import { isEmpty } from "../../../utils/StringUtil";
import { BACKGROUND, SECONDARY_LIGHT } from '../../../App';

const DomainSelectionTable = (props) => {

    const { getSelectionDomainsByYear, yearFilter, selectionDomains, cropID, pageSize, setSelectionYearFilter, handleClose,
        open, text, dir, pageSizes,
        selectionDomainFilterOption, selectionYearFilter, showSelectAll, setTablePageSize, user
    } = props;

    const [sorting, setSorting] = useState({ columnName: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState(null);

    const [selectedDomainsIDs, setSelectedDomainsIDs] = useState([]);
    const [freeTextFilter, setFreeTextFilter] = useState('');
    const [active, setActive] = useState(true);


    // console.log('DomainSelectionTable', yearFilter)
    useEffect(() => {
        setSelectionYearFilter(yearFilter)
        getSelectionDomainsByYear(yearFilter);
    }, [])

    function getDisplayRows() {
        let filteredRows = filterDomains(selectionDomains.filter(e => (selectedDomainsIDs.includes(e.id)) || (active ? e.root === null : e.root !== null)), filter, cropID);
        if (!isEmpty(freeTextFilter)) {
            filteredRows = filterDomainsFreeText(filteredRows, freeTextFilter)
        }
        const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);

        return { displayRows, filteredRows };
    }

    function selectAll(value) {
        const data = getDisplayRows();
        const displayRows = data.filteredRows;
        console.log('selectAll', value)
        const displayRowsIds = displayRows.map(e => e.id);


        if (value === true) {
            setSelectedDomainsIDs(selectedDomainsIDs.concat(displayRowsIds.filter(e => !selectedDomainsIDs.includes(e))))
        } else {
            setSelectedDomainsIDs(selectedDomainsIDs.filter(e => !displayRowsIds.includes(e)))
        }
    };

    function changeSelection(selection) {
        if (!selectedDomainsIDs.includes(selection.id)) {
            setSelectedDomainsIDs(selectedDomainsIDs.concat([selection.id]));
        }
        else {
            setSelectedDomainsIDs(selectedDomainsIDs.filter(e => e !== selection.id));
        }
    };

    function onYearFilterChange(year) {
        setSelectionYearFilter(year);
        getSelectionDomainsByYear(year);
        setSelectedDomainsIDs([]);
    }

    function clearForm() {
        setSelectionYearFilter(yearFilter);
        getSelectionDomainsByYear(yearFilter);
        setSelectedDomainsIDs([])
        setFilter(null)
    }


    function action(yes) {
        let result = null;
        if (yes) {
            if (selectedDomainsIDs.length > 0) {
                result = selectionDomains.filter((domain) => selectedDomainsIDs.indexOf(domain.id) >= 0);
            }
        }
        setSelectedDomainsIDs([]);
        setFreeTextFilter('');
        setFilter(null);
        clearForm();
        handleClose(result);
    }


    const tag1 = user.business.tag1;
    const tag2 = user.business.tag2;
    const columns = [
        {
            name: 'field.name', title: text.field,
            getCellValue: row => (row.field.name),
        },
        { name: 'alias', title: text.alias },

        { name: 'plantArea', title: text.size, frame: true },
    ];
    columns.push({
        name: 'variety.category',
        title: text.crop, getCellValue: row => (row.variety.category),
    });
    columns.push({
        name: 'variety.name',
        title: text.variety,
        getCellValue: row => (row.variety.name),
    });

    if (!isEmpty(tag1)) {
        columns.push({
            name: 'tag1.name',
            title: tag1, getCellValue: row => row.tag1 ? row.tag1.name : "",
        });
    }
    if (!isEmpty(tag2)) {
        columns.push({
            name: 'tag2.name',
            title: tag2, getCellValue: row => row.tag2 ? row.tag2.name : "",
        });
    }

    columns.push({
        name: 'plant',
        title: text.plant,
        getCellValue: row => asShortStringDate(row.plant),
    });

    columns.push({
        name: 'year',
        title: text.year,
        disableSort: true,
        getCellValue: row => row.year ? row.year : getDateYear(row.plant),
    });
    columns.push({ name: 'site', title: text.site, getCellValue: row => row.field.site ? row.field.site.name : '' });



    const data = getDisplayRows();
    const displayRows = data.displayRows;


    const displayIDs = displayRows.map(e => e.id);

    return (
        <Dialog
            maxWidth={'lg'}
            fullWidth={true}
            open={open}
            scroll="body"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" sx={{ padding: 0, paddingLeft: 2, paddingRight: 2, backgroundColor: BACKGROUND }} >
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'row', }}>
                    {text.fields}
                    <YearPicker dir={dir} value={selectionYearFilter}
                        onChange={value => onYearFilterChange(value)} />
                </div>
            </DialogTitle>
            <Divider />

            <DialogContent sx={{ padding: 0, backgroundColor: SECONDARY_LIGHT }} >
                <Box flex={1} display={'flex'} margin={2}>
                    <Autocomplete
                        options={selectionDomainFilterOption}
                        onChange={(value) => setFilter(value)}
                        value={filter}
                        placeholder={text.typeToSearchField}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={active}
                                onChange={() => setActive(!active)}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label={text.active}
                    />

                    <TextField
                        width={200}
                        onChange={(e) => setFreeTextFilter(e.target.value)}
                        value={freeTextFilter}
                        placeholder={text.freeText}
                    />
                </Box>
                <Box margin={2} >
                    <PaginationTable
                        rows={displayRows}
                        columns={columns}
                        height={height375}
                        onRowClicked={(e) => changeSelection(e)}
                        onCurrentPageChange={(currentPage) => setCurrentPage(currentPage)}
                        onSortingChange={(sorting) => setSorting(sorting)}
                        sorting={sorting}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={data.filteredRows.length}
                        dir={dir}
                        pageSizes={pageSizes}
                        onChangeRowsPerPage={setTablePageSize}
                        dateColumns={columns}
                        text={text}
                        useSelection={true}
                        showSelectAll={showSelectAll === false ? false : true}
                        selectAll={selectAll}
                        selections={selectedDomainsIDs.filter(e => displayIDs.includes(e))}
                    />
                </Box>
            </DialogContent>
            <DialogActions backgroundColor={SECONDARY_LIGHT}
                action={action}
                yesText={text.save}
                noText={text.cancel}
            />
        </Dialog>
    );
}
//}

export default DomainSelectionTable;
