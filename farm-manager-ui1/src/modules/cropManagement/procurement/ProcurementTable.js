import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'

import { getElementText } from "../../../components/filters/filterUtil";
import { PROCUREMENT_FORM, UPLOAD, PROCUREMENT } from "../../../components/frame/Routes";
import { pageableModuleTable } from "../../../utils/TabUtils";
import { PaginationTable, YesNoDialog } from '../../../components'
import { asShortStringDate } from "../../../utils/DateUtil";
import MasterDetailsTableTop from "../../../components/tables/top/MasterDetailsTableTop";
import { ACCESSORY, COMPOST, DISINFECTANT, FERTILIZER, PESTICIDE, VARIETY } from "../../../reducers/ResourceReducer";
import { loadDataByName, _activityDefs } from '../../../utils/LoadUtil';
import { getSupplierOptions } from '../../../components/core';
import { ActionMenu } from '../../../components';
import { uploadAction, downloadAction, deleteAction } from '../../../components/core/ActionMenu';
import { getFile } from '../../../actions';
import { isEmpty } from '../../../utils/StringUtil';


const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));

export const PROCUREMENT_RESOURCE_TYPES = [PESTICIDE, FERTILIZER, COMPOST, DISINFECTANT, ACCESSORY, VARIETY];



const ProcurementTable = (props) => {
    const classes = useStyles();
    const { getProcurements,
        text, dir, lang, pageSize, pageSizes, setTablePageSize,
        setProcurementFilterEnd, setProcurementFilterStart, setProcurementFilterFreeText, setProcurementFilter,
        procuremenetFilter, procuremenetStart, procuremenetEnd, procuremenetFreeText, procurements,
        procurementCurrentPage,
        procurementTotalCount,
        setProcurementCurrentPage, setProcurementSorting, procurementSorting, history,
        customerAndSupplierOptions, fieldOptions, fetchProcuremenet, fetchingProcuremenet,
        deleteFile, fertilizerOptions, pesticideOptions, compostOptions, disinfectantOptions, accessoryOptions, varietyResourceOptions,
        setWarnMessage, activityDefOptions
    } = props;

    const options = getElementText(PROCUREMENT_RESOURCE_TYPES, text, 'resourceType', true)
        .concat(getSupplierOptions(customerAndSupplierOptions)).concat(fieldOptions).concat(fertilizerOptions)
        .concat(pesticideOptions)
        .concat(compostOptions).concat(disinfectantOptions).concat(accessoryOptions)
        .concat(varietyResourceOptions).concat(activityDefOptions.filter(e => PROCUREMENT.toUpperCase() === e.element.type))


    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteFileFlag, setDeleteFileFlag] = useState(false);

    const handleClick = (value, rowIndex, event) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(value);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const actionClick = (value, event) => {
        if (value === uploadAction) {
            history.push(`${UPLOAD}${PROCUREMENT}/${selectedRow.id}`)
        } else if (value === downloadAction && selectedRow && selectedRow.fileId) {
            getFile(selectedRow.fileId);
        } else if (value === deleteAction && selectedRow && selectedRow.fileId) {
            setDeleteFileFlag(true);
        }
        setAnchorEl(null);
    }

    const deleteSelectedFile = (value) => {
        setDeleteFileFlag(false);
        if (value && selectedRow && selectedRow.fileId) {
            deleteFile(selectedRow.fileId);
        }
    }

    useEffect(() => {
        loadDataByName(props, ['fields', 'pesticides', 'fertilizers', 'composts', 'varieties', 'disinfectants', 'accessories', 'suppliers', _activityDefs]);
        getProcurements(procurementCurrentPage, pageSize, procurementSorting.columnName, procurementSorting.direction, procuremenetFilter, procuremenetStart, procuremenetEnd, procuremenetFreeText);
    }, []);

    useEffect(() => {
        if (fetchProcuremenet && !fetchingProcuremenet) {
            getProcurements(procurementCurrentPage, pageSize, procurementSorting.columnName, procurementSorting.direction, procuremenetFilter, procuremenetStart, procuremenetEnd, procuremenetFreeText);
        }
    })

    const onRowClicked = (row) => {
        history.push(`/e${PROCUREMENT_FORM}${row.id}`)
    }

    const onDuplicateClicked = (row) => {
        setWarnMessage(text.duplicate);
        history.push(`/d${PROCUREMENT_FORM}${row.id}`)
    }

    function getDescription(row, text) {
        if (row.activityDef) {
            return isEmpty(row.description) ? row.activityDef.name : `${row.activityDef.name}/${row.description}`
        } else if (row.items) {
            return isEmpty(row.description) ? text.items : `${text.items}/${row.description}`
        } else if (row.description) {
            return row.description
        }
    }

    let dateColumns = ['procurementDate'];

    const columns = [
        { name: 'procurementDate', title: text.date, getCellValue: row => asShortStringDate(row.procurementDate) },
        { name: 'description', title: text.description, getCellValue: row => getDescription(row, text) },
        { name: 'supplier', title: text.supplier, getCellValue: row => row.supplier ? row.supplier.name : '' },
        {
            name: 'procurementRef', title: text.invoice, clickable: row => row.fileId,
            onClick: row => getFile(row.fileId)
        },
        { name: 'category', title: text.waybill, },
        { name: 'totalCost', title: text.totalCost, disableSort: true, },
        {
            name: 'file',
            title: text.file,
            disableSort: true,
            iconButton: true,
            clickable: true,
            hasData: row => row.fileId,
            onClick: (value, rowIndex, e) => handleClick(value, rowIndex, e),
        },
        {
            name: 'duplicate',
            title: text.duplicate,
            disableSort: true,
            iconButton: true,
            clickable: true,
            tooltip: text.duplicate,
            onClick: (value, rowIndex) => onDuplicateClicked(value, true),
        }

    ];

    return (
        <div className={classes.root}>
            <MasterDetailsTableTop to={`/n${PROCUREMENT_FORM}0`} options={options} filter={procuremenetFilter}
                setFilter={setProcurementFilter}
                label={text.typeToSearch} actionText={text.add}
                pdfReport={'ProcurementReport'}
                xlsReport={'ProcurementReport'}
                lang={lang}
                text={text}
                start={procuremenetStart}
                clearableDates={true}
                end={procuremenetEnd}
                sorting={procurementSorting}
                onStartChange={setProcurementFilterStart}
                freeText={procuremenetFreeText}
                freeTextTitle={text.freeText}
                onFreeTextChange={setProcurementFilterFreeText}
                onEndChange={setProcurementFilterEnd} />
            <PaginationTable
                rows={procurements}
                columns={columns}
                height={pageableModuleTable}
                onRowClicked={onRowClicked}
                onCurrentPageChange={setProcurementCurrentPage}
                onSortingChange={setProcurementSorting}
                sorting={procurementSorting}
                currentPage={procurementCurrentPage}
                pageSize={pageSize}
                totalCount={procurementTotalCount}
                onChangeRowsPerPage={setTablePageSize}
                dir={dir}
                pageSizes={pageSizes}
                dateColumns={dateColumns}
                text={text}
            />
            {selectedRow && <ActionMenu onClick={actionClick} text={text}
                actions={selectedRow.fileId ? [downloadAction, deleteAction] : [uploadAction]}
                anchorEl={anchorEl} onClose={(handleClose)} />}

            {selectedRow && selectedRow.fileId && <YesNoDialog open={deleteFileFlag}
                action={deleteSelectedFile}
                title={text.deleteFormTitle}
                body={text.deleteFormBody}
                yesText={text.delete}
                noText={text.cancel}
                noText={text.cancel} />}
        </div>
    )
}
export default withRouter(ProcurementTable);