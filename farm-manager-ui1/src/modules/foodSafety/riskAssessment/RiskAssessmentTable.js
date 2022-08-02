import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import { buttonSecondary } from "../../../utils/StyleUtils";
import { getElementText } from "../../../components/filters/filterUtil";
import { RISK_ASSESSMENT_FORM } from "../../../components/frame/Routes";
import { pageableModuleTable } from "../../../utils/TabUtils";
import { MasterDetailsTableTop, PaginationTable } from '../../../components'
import { asShortStringDate } from "../../../utils/DateUtil";
import { getRiskAssessments } from "../../../actions/RiskAssessmentActions";
import { loadDataByName, _fertilizers, _pesticides, _varieties, _accessories, _executors, _waterSources, _equipment, _composts, _disinfectants, _activityDefs } from '../../../utils/LoadUtil';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),

    },
    title: {
        color: theme.palette.text.primary,
    },
    button: buttonSecondary(theme),
}));

const RiskAssessmentTable = (props) => {
    const classes = useStyles();
    const {
        pageSize,
        text, pageSizes, dir, lang, riskLists, history,
        setWarnMessage, setTablePageSize
    } = props;

    const [currentPage, setCurrentPage] = useState(0)
    const [sorting, setSorting] = useState({ columnName: 'date', direction: 'desc' })
    const [filter, setFilter] = useState('')
    const [rows, setRows] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [options, setOptions] = useState(getElementText(riskLists, text, 'riskList'))

    useEffect(() => {
        loadDataByName(props, [_fertilizers, _pesticides, _varieties, _accessories, _executors, _waterSources, _equipment, _composts, _disinfectants, _activityDefs]);
    }, []);

    useEffect(() => {
        getRiskAssessments(currentPage, pageSize, sorting.columnName, sorting.direction, filter, start, end).
            then(function (response) {
                setRows(response.data.content);
                setTotalCount(response.data.totalElements);

            });
    }, [pageSize, currentPage, sorting, filter, start, end]);

    
    const onRowClicked = (row) => {
        history.push(`${RISK_ASSESSMENT_FORM}${row.id}`)
    }

    const onDuplicateClicked = (row) => {
        setWarnMessage(text.duplicate);
        history.push(`/d${RISK_ASSESSMENT_FORM}${row.id}`)
    }

    let dateColumns = ['date'];

    const columns = [
        { name: 'date', title: text.date, getCellValue: row => asShortStringDate(row.date) },
        { name: 'list', title: text.type, getCellValue: row => text[row.list] },
        { name: 'resource.name', title: text.executor, getCellValue: row => row.resource ? row.resource.name : '' },
        {
            name: 'duplicate',
            title: ' ',
            iconButton: true,
            clickable: true,
            onClick: (value, rowIndex) => onDuplicateClicked(value, true),
        }
    ];

    return (
        <div className={classes.root}>
            <MasterDetailsTableTop to={`${RISK_ASSESSMENT_FORM}0`} options={options} filter={filter}
                setFilter={setFilter}
                label={text.typeToSearch} actionText={text.add}
                pdfReport={'RiskAssessment'}
                xlsReport={'RiskAssessment'}
                lang={lang}
                text={text}
                start={start}
                clearableDates={true}
                end={end}
                sorting={sorting}
                onStartChange={setStart}
                onEndChange={setEnd}

            />

            <PaginationTable
                rows={rows}
                columns={columns}
                height={pageableModuleTable}
                onRowClicked={onRowClicked}
                onCurrentPageChange={setCurrentPage}
                onSortingChange={setSorting}
                sorting={sorting}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                dir={dir}
                pageSizes={pageSizes}
                onChangeRowsPerPage={setTablePageSize}
                dateColumns={dateColumns}
                text={text}
            />
        </div>
    )
}
export default withRouter(RiskAssessmentTable);