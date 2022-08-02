import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { ACTIVITY_FROM } from "../../../components/frame/Routes";
import { PaginationTable } from '../../../components'
import { pageableModuleTable } from "../../../utils/TabUtils";
import { asShortStringDate } from "../../../utils/DateUtil";
import { getGuidance } from "../../../actions/FileActions";
import { GUIDANCE_TYPES } from "../../activity/types";
import MasterDetailsTableTop from "../../../components/tables/top/MasterDetailsTableTop";
import { loadDataByName } from "../../../utils/LoadUtil";
import { Loading } from '../../../components/core';
import { getActivityDisplayText } from '../../activity/ActivityUtil';
import { getMaxText } from '../../../utils/StringUtil';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));


const ActivityTable = (props) => {
    const classes = useStyles();

    const { activityTableFilter, activityTableFreeText, activityTableStart,
        activityTableEnd, activityTableSorting, activityTableCurrentPage, getActivities,
        pageSize, 
        fetchingActivities, history, setWarnMessage, text, execActivityTableOptions, 
        lang, setActivityTableFilter, setActivityTableFreeText, setActivityTableStart, setActivityTableEnd, activities,
        setActivityTableSorting, totalActivityCount, setTablePageSize, dir,
        setActivityTableCurrentPage, pageSizes, lastActivityUuid, activityTableFreeTextDeepSearch, setActivityTableFilterDeepSearch,
    } = props;

    useEffect(() => {
        loadDataByName(props, ['fields', 'executors', 'pesticides', 'fertilizers', 'composts', 'waterSources', 'equipment', 'varieties', 'disinfectants', 'accessories', 'crops', 'activityDefs', 'customers', 'pests', 'activityDefTypes']);
    }, []);



    useEffect(() => {
        getActivities(activityTableCurrentPage, pageSize, activityTableSorting.columnName, activityTableSorting.direction, activityTableFilter, activityTableStart, activityTableEnd, activityTableFreeText, activityTableFreeTextDeepSearch);
    }, [activityTableCurrentPage, pageSize, activityTableSorting, activityTableSorting, 
        activityTableFilter, activityTableStart, activityTableEnd, activityTableFreeText, activityTableFreeTextDeepSearch])

    const onRowClicked = (row) => {
        history.push(`/t${ACTIVITY_FROM}${row.id}`)
    }



    const onDuplicateClicked = (row) => {
        setWarnMessage(text.duplicate);
        history.push(`/d${ACTIVITY_FROM}${row.id}`)
    }




    let dateColumns = ['execution'];

    const columns = [
        { name: 'execution', title: text.date, getCellValue: row => asShortStringDate(row.execution) },
        {
            name: 'description',
            title: text.activity,
            getCellValue: row => getActivityDisplayText(row, text),
        },
        { name: 'field', disableSort: true, title: text.field, },
        { name: 'area', title: text.area, frame: true },
        { name: 'statusDate', title: text.lastUpdate, getCellValue: row => asShortStringDate(row.statusDate) },
        {
            name: 'docRef', title: text.reference,
            clickable: row => GUIDANCE_TYPES.includes(row.type),
            onClick: row => getGuidance(row.id, lang)
        },
        {
            name: 'externalId', title: text.externalId,
            getCellValue: row => getMaxText(row.externalId, 15),
        },
        {
            name: 'duplicate',
            title: text.duplicate,
            iconButton: true,
            clickable: true,
            disableSort: true,
            tooltip: text.duplicate,
            disabled: false,
            onClick: (value, rowIndex) => onDuplicateClicked(value, true),
        }
    ];


    const FORM = ACTIVITY_FROM;
    const reportName = 'ActivityReport';

    const options = execActivityTableOptions;

    const selections = lastActivityUuid ? [lastActivityUuid] : null;
    return (
        <div className={classes.root}>
            <MasterDetailsTableTop to={`/t${FORM}0`} options={options} filter={activityTableFilter}
                setFilter={setActivityTableFilter}
                label={text.typeToSearch} actionText={text.add}
                pdfReport={reportName}
                xlsReport={reportName}
                lang={lang}
                text={text}
                start={activityTableStart}
                clearableDates={true}
                end={activityTableEnd}
                sorting={activityTableSorting}
                freeText={activityTableFreeText}
                freeTextTitle={text.freeText}
                onFreeTextChange={setActivityTableFreeText}
                onStartChange={setActivityTableStart}
                onEndChange={setActivityTableEnd}
                deepSearch={activityTableFreeTextDeepSearch}
                onDeepSearchChange={setActivityTableFilterDeepSearch}
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