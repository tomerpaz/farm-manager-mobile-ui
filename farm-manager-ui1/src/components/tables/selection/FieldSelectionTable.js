import React, { useState, useEffect } from 'react';
import { Autocomplete } from '../../'

import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import DialogActions from '../../dialog/DialogActions'
import { buildNameCodeFilterOptions, filterFields } from "../../filters/filterUtil";
import { height375 } from "../../../utils/TabUtils";
import PaginationTable from '../PaginationTable';
import YearPicker from '../../core/picker/YearPicker';
import { loadDataByName } from '../../../utils/LoadUtil';
import { BACKGROUND, SECONDARY_LIGHT } from '../../../App';

const FieldSelectionTable = (props) => {
    const { fields, handleClose, open, text, dir, pageSize, pageSizes, selectionDomains, setTablePageSize, userYear, getSelectionDomainsByYear, yearFilter,
        setSelectionYearFilter, selectionYearFilter, fieldOptions } = props;

    const [filter, setFilter] = useState([])
    const [options, setOptions] = useState([])

    const [selectedFieldsIDs, setSelectedFieldsIDs] = useState(buildNameCodeFilterOptions([]))

    const [displayRows, setDisplayRows] = useState(buildNameCodeFilterOptions(fields.filter(e => e.active === true)))

    const [sorting, setSorting] = useState({ columnName: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadDataByName(props, ['fields']);
        if (userYear && selectionDomains.length === 0) {
            getSelectionDomainsByYear(yearFilter);
        }
    }, [])

    useEffect(() => {
        if (open) {
            setOptions(fieldOptions)
        }
    }, [open, fieldOptions])

    useEffect(() => {
        if (userYear && selectionDomains.length === 0) {
            getSelectionDomainsByYear(yearFilter);
        }

    }, [yearFilter])


    function changeSelections(selection) {
        if (selectedFieldsIDs.includes(selection.id)) {
            setSelectedFieldsIDs(selectedFieldsIDs.filter(e => e !== selection.id));
        } else {
            setSelectedFieldsIDs(selectedFieldsIDs.concat([selection.id]));
        }
    }

    function selectAll(checked) {
        const displayIds = displayRows.map(a => a.id);
        if (checked) {
            setSelectedFieldsIDs(selectedFieldsIDs.filter(e => displayIds.includes(e.id)).concat(displayIds));
        }
        else {
            setSelectedFieldsIDs(selectedFieldsIDs.filter(e => !displayIds.map(a => a.id).includes(e.id)));
        }
    }

    useEffect(() => {
        setDisplayRows(filterFields(fields.filter(e => e.active === true), filter));
    }, [filter])

    function action(yes) {
        let result = null;
        if (yes) {
            if (selectedFieldsIDs.length > 0) {
                result = fields.filter((f) => selectedFieldsIDs.indexOf(f.id) >= 0)
            }
        }
        handleClose(result);
        setSelectedFieldsIDs([]);
    }

    const columns = [
        { name: 'name', title: text.field },
        { name: 'size', title: text.size },
        { name: 'code', title: text.code },
        { name: 'site', title: text.site, getCellValue: row => row.site ? row.site.name : '' },
        { name: 'parentField', title: text.parentField, getCellValue: row => row.parentField ? row.parentField.name : '' },


    ];

    let selection = [];
    for (let i = 0; i < displayRows.length; i++) {
        let domainId = displayRows[i].id
        if (selectedFieldsIDs.indexOf(domainId) > -1) {
            selection.push(i);
        }
    }


    return (
        <Dialog
            maxWidth={'lg'}
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            disableBackdropClick={true}
        >
            <DialogTitle id="form-dialog-title" sx={{ padding: 0, paddingLeft: 2, paddingRight: 2, backgroundColor: BACKGROUND }}>
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'row', }}>
                    {text.fields}
                    {userYear &&
                        <YearPicker dir={dir} value={selectionYearFilter}
                            onChange={value => setSelectionYearFilter(value)} />}
                </div>
            </DialogTitle>
            <DialogContent sx={{ padding: 0, backgroundColor: SECONDARY_LIGHT }}>
                <Box flex={1} display={'flex'} margin={1}>
                    <Autocomplete
                        options={options}
                        onChange={(value) => setFilter(value)}
                        value={filter}
                        placeholder={text.typeToSearchField}

                    />
                </Box>
                <Box margin={2} >
                    <PaginationTable
                        rows={displayRows}
                        columns={columns}
                        height={height375}
                        onRowClicked={(e) => changeSelections(e)}
                        onCurrentPageChange={(currentPage) => setCurrentPage(currentPage)}
                        onSortingChange={(sorting) => setSorting(sorting)}
                        sorting={sorting}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={fields.length}
                        dir={dir}
                        pageSizes={pageSizes}
                        onChangeRowsPerPage={setTablePageSize}
                        dateColumns={columns}
                        text={text}
                        useSelection={true}
                        showSelectAll={true}
                        selectAll={selectAll}
                        selections={selectedFieldsIDs}
                    />
                </Box>
            </DialogContent>
            <DialogActions
                backgroundColor={SECONDARY_LIGHT}
                action={action}
                yesText={text.save}
                noText={text.cancel}
            />
        </Dialog>
    );
}
//}
export default FieldSelectionTable