import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { ACTIVITY_FROM, APPROVAL_FROM } from "../../components/frame/Routes";
import { PaginationTable } from '../../components'
import { pageableModuleTable } from "../../utils/TabUtils";
import { asShortStringDate } from "../../utils/DateUtil";
import { getGuidance, getOperationInfo } from "../../actions/FileActions";
import MasterDetailsTableTop from "../../components/tables/top/MasterDetailsTableTop";
import { loadDataByName } from "../../utils/LoadUtil";
import { Loading } from '../../components/core';
import { getActivityDisplayText, getStatusText } from '../activity/ActivityUtil';
import { isEmpty } from '../../utils/StringUtil';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));


export function getApprovalFilter(approvalView, filter, active) {
    const approvalFilter = [{ value: 'approvalView_' + approvalView }, { value: 'active_' + active }]
    if (filter && filter.length > 0) {
        return approvalFilter.concat(filter);
    } else {
        return approvalFilter;
    }
}

const ActivityTable = (props) => {
    const classes = useStyles();

    const { activityTableFilter, activityTableFreeText, activityTableStart,
        activityTableEnd, activityTableSorting, activityTableCurrentPage, getActivities,
        pageSize, fetchActivities, fetchingActivities, history, setWarnMessage, text, execActivityTableOptions, planActivityTableOptions,
        lang, setActivityTableFilter, setActivityTableFreeText, setActivityTableStart, setActivityTableEnd, activities,
        setActivityTableSorting, totalActivityCount, setTablePageSize, dir,
        setActivityTableCurrentPage, pageSizes, lastActivityUuid, approvalView, clearActivities, user: { manager }, updateApprovalPrinted,
        growerOptions, 
    } = props;

    const [active, setActive] = useState(true);

 
    // console.log(approvalView)

    useEffect(() => {        
        loadDataByName(props, ['fields', 'executors', 'pesticides', 'fertilizers', 'composts', 'waterSources', 'equipment', 'varieties', 'disinfectants', 'accessories', 'crops', 'activityDefs', 'customers', 'pests']);
    }, []);

    useEffect(() => {

        if (fetchActivities && !fetchingActivities) {
            console.log('getActivities1');
            getActivities(activityTableCurrentPage, pageSize, activityTableSorting.columnName, activityTableSorting.direction, getApprovalFilter(approvalView, activityTableFilter, active), activityTableStart, activityTableEnd, activityTableFreeText);
        }
    }, [fetchActivities, fetchingActivities])


    useEffect(() => {
        clearActivities();
    }, [approvalView, active]);


    const onRowClicked = (row) => {
        history.push(`${APPROVAL_FROM}${row.id}`)
    }

    const onPrintedClicked = (row, value) => {
        console.log(row.printed, value);
        row.printed = value;
        updateApprovalPrinted(row.id, value);
    }

    const onViewClicked = (row) => {
        history.push(`/ap${ACTIVITY_FROM}${row.id}`)
    }




    let dateColumns = ['execution'];

    const columns = [
        { name: 'statusDate', title: text.lastUpdate, getCellValue: row => asShortStringDate(row.statusDate) },
        {
            name: 'description',
            title: text.activity,
            getCellValue: row => getActivityDisplayText(row, text),
        },
        { name: 'creatorName', title: text.creatorName, },

        { name: 'execution', title: text.date, getCellValue: row => asShortStringDate(row.execution) },

        { name: 'status', title: text.status, getCellValue: row => getStatusText(row.status, text) },
        { name: 'executor', title: text.executor, },


        {
            name: 'docRef', title: text.reference,
            clickable: row => true,
            onClick: row => getGuidance(row.id, lang)
        },
        {
            name: ' ', title: ' ',
            clickable: row => true,
            getCellValue: row => text.approval,
            disableSort: true,
            onClick: row => getOperationInfo(row.id, 'true', lang)
        },

        {
            name: 'moreHoriz', title: ' ',
            iconButton: true,
            clickable: true,
            disableSort: true,
            onClick: row => getOperationInfo(row.id, 'false', lang)
        },
        {
            name: 'view',
            title: text.view,
            iconButton: true,
            clickable: true,
            disableSort: true,
            onClick: (value, rowIndex) => onViewClicked(value, true),
        }
    ];

    if (isEmpty(manager)) {
        if('inprocess' === approvalView)
        columns.push(
            { name: 'currentName', title: text.taskQueue, },
        )
        columns.push(
            {
                onChange: (row, rowIndex, value) => onPrintedClicked(row, value),
                checkbox: true,
                name: 'printed',
                disableSort: true,
                title: text.printed,
            }
        )
    }



    const options = execActivityTableOptions;

    const selections = lastActivityUuid ? [lastActivityUuid] : null;
    return (
        <div className={classes.root}>
            <MasterDetailsTableTop options={growerOptions.length > 0  ? growerOptions.concat(options) : options} filter={activityTableFilter}
                setFilter={setActivityTableFilter}
                label={text.typeToSearch} actionText={text.add}
                lang={lang}
                text={text}
                start={activityTableStart}
                clearableDates={true}
                end={activityTableEnd}
                sorting={activityTableSorting}
                freeText={activityTableFreeText}
                freeTextTitle={text.freeText}
                active={active}
                onFreeTextChange={setActivityTableFreeText}
                onStartChange={setActivityTableStart}
                onEndChange={setActivityTableEnd}
                onActiveChange={setActive} 

                />
            {fetchingActivities && <Loading />}
            {!fetchingActivities && <PaginationTable
                rows={activities}
                columns={columns}
                height={pageableModuleTable}
                onRowClicked={onRowClicked}
                onCurrentPageChange={setActivityTableCurrentPage}
                onSortingChange={setActivityTableSorting}
                sorting={activityTableSorting}
                currentPage={activityTableCurrentPage}
                pageSize={pageSize}
                totalCount={totalActivityCount}
                onChangeRowsPerPage={setTablePageSize}
                dir={dir}
                pageSizes={pageSizes}
                dateColumns={dateColumns}
                text={text}
                selections={selections}
            />}
        </div>
    )
}

export default withRouter(ActivityTable);