import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { ACTIVITY_FROM, PLAN_FROM } from "../../../components/frame/Routes";
import { PaginationTable } from '../../../components'
import { pageableModuleTable } from "../../../utils/TabUtils";
import { asShortStringDate } from "../../../utils/DateUtil";
import { getGuidance } from "../../../actions/FileActions";
import { GUIDANCE_TYPES } from "../../activity/types";
import MasterDetailsTableTop from "../../../components/tables/top/MasterDetailsTableTop";
import { loadDataByName } from "../../../utils/LoadUtil";
import { Loading } from '../../../components/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));

const ActivityTable = (props) => {
    const classes = useStyles();

    const {
        pageSize, history, setWarnMessage, text, planActivityTableOptions,
        lang,
        setTablePageSize, dir,
        pageSizes,
        getPlanActivities,
        planActivities,
        planActivityTableFilter,
        planActivityTableStart,
        planActivityTableEnd,
        planActivityTableFreeText,
        fetchingPlanActivities,
        planActivityTableSorting,
        planActivityTableCurrentPage,
        planTotalActivityCount,
        setPlanActivityTableFilter, setPlanActivityTableFreeText, setPlanActivityTableStart, setPlanActivityTableEnd, setPlanActivityTableCurrentPage, setPlanActivityTableSorting,
        isInspector,
        lastActivityUuid,
        activityTableFreeTextDeepSearch, setActivityTableFilterDeepSearch,
    } = props;

    useEffect(() => {
        loadDataByName(props, ['fields', 'executors', 'pesticides', 'fertilizers', 'composts', 'waterSources', 'equipment', 'varieties', 'disinfectants', 'accessories', 'crops', 'activityDefs', 'customers', 'pests']);
    }, []);


    useEffect(() => {
        getPlanActivities(planActivityTableCurrentPage, pageSize, planActivityTableSorting.columnName,
            planActivityTableSorting.direction, planActivityTableFilter, planActivityTableStart, planActivityTableEnd, planActivityTableFreeText, activityTableFreeTextDeepSearch);
    }, [planActivityTableCurrentPage, pageSize, planActivityTableSorting,
        planActivityTableSorting, planActivityTableFilter, planActivityTableStart,
        planActivityTableEnd, planActivityTableFreeText, activityTableFreeTextDeepSearch])


    const onRowClicked = (row) => {
        history.push(`/t${PLAN_FROM}${row.id}`)
    }



    const onDuplicateClicked = (row) => {
        setWarnMessage(text.duplicate);
        history.push(`/d${PLAN_FROM}${row.id}`)
    }

    const onExecutePlanClicked = (row) => {
        setWarnMessage(text.executePlan);
        history.push(`/e${ACTIVITY_FROM}${row.id}`)
    }


    let dateColumns = ['execution'];

    const columns = [
        { name: 'execution', title: text.date, getCellValue: row => asShortStringDate(row.execution) },
        {
            name: 'description',
            title: text.activity,
            getCellValue: row => row.activityDef ? row.activityDef.name : text[row.type.toLowerCase()],
        },
        { name: 'field', disableSort: true, title: text.field, },
        { name: 'area', title: text.area, frame: true },
        {
            name: 'docRef', title: text.reference,
            clickable: row => GUIDANCE_TYPES.includes(row.type),
            onClick: row => getGuidance(row.id, lang)
        },
        {
            name: 'status',
            title: text.status,
            getCellValue: row => row.status === 'PLAN' ? text.executePlan : text[row.status.toLowerCase()],
            clickable: row => !isInspector && row.status === 'PLAN',
            onClick: row => onExecutePlanClicked(row)
        },
        {
            disableSort: true,
            name: 'duplicate',
            title: text.duplicate,
            iconButton: true,
            clickable: true,
            tooltip: text.duplicate,
            onClick: (value, rowIndex) => onDuplicateClicked(value, true),
        }
    ];


    const FORM = PLAN_FROM;
    const reportName = 'ActivityPlanReport';

    const options = planActivityTableOptions;
    const selections = lastActivityUuid ? [lastActivityUuid] : null;

    return (
        <div className={classes.root}>
            <MasterDetailsTableTop to={`/t${FORM}0`} options={options} filter={planActivityTableFilter}
                setFilter={setPlanActivityTableFilter}
                label={text.typeToSearch} actionText={text.add}
                pdfReport={reportName}
                xlsReport={reportName}
                lang={lang}
                text={text}
                start={planActivityTableStart}
                clearableDates={true}
                end={planActivityTableEnd}
                sorting={planActivityTableSorting}
                freeText={planActivityTableFreeText}
                freeTextTitle={text.freeText}
                onFreeTextChange={setPlanActivityTableFreeText}
                onStartChange={setPlanActivityTableStart}
                onEndChange={setPlanActivityTableEnd}
                deepSearch={activityTableFreeTextDeepSearch}
                onDeepSearchChange={setActivityTableFilterDeepSearch}
            />
            {fetchingPlanActivities && <Loading />}
            {!fetchingPlanActivities &&
                <PaginationTable
                    rows={planActivities}
                    columns={columns}
                    height={pageableModuleTable}
                    onRowClicked={onRowClicked}
                    onCurrentPageChange={setPlanActivityTableCurrentPage}
                    onSortingChange={setPlanActivityTableSorting}
                    sorting={planActivityTableSorting}
                    currentPage={planActivityTableCurrentPage}
                    pageSize={pageSize}
                    totalCount={planTotalActivityCount}
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