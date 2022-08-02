import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@mui/styles';

import {PaginationTable, TopBackBar, MasterDetailsTableTop} from "../../components";
import {ACTIVITY_FROM, PLAN_FROM, GPS} from "../../components/frame/Routes";
import {pageableModuleTable} from "../../utils/TabUtils";
import {getDomainActivitiesDirect} from "../../actions/ActivityActions";
import {asShortStringDate} from "../../utils/DateUtil";
import { loadDataByName } from '../../utils/LoadUtil';
import { getCustomerOptions } from '../../components/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    body: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)

    }
}));


const DomainHistoryTable = (props) => {
        const classes = useStyles();

        const {text, dir, isPlans, pageSize, pageSizes, setTablePageSize,history, fertilizerOptions, compostOptions,
            execActivityTypeFilterOptions, activityDefOptions, executorOptions, pesticideOptions, 
            customerAndSupplierOptions,lastActivityUuid, domainHistoryTableFilter, setDomainHistoryTableFilter,
          match: {params: {id}}} = props;

          const options = execActivityTypeFilterOptions
          .concat(activityDefOptions)
          .concat(executorOptions)
          .concat(pesticideOptions)
          .concat(fertilizerOptions)
          .concat(compostOptions)
          .concat(getCustomerOptions(customerAndSupplierOptions));
        
        const [sorting, setSorting] = useState({columnName: 'execution', direction: 'desc'})

        const [rows, setRows] = useState([])
        const [currentPage, setCurrentPage] = useState(0)
        const [totalCount, setTotalCount] = useState(0)


        useEffect(() => {
            loadDataByName(props, ['executors', 'pesticides', 'fertilizers', 'composts', 'waterSources', 'equipment', 'disinfectants', 'accessories', 'activityDefs', 'customers', 'pests', 'activityDefTypes']);
            fetchData();            
        }, []);
    
        useEffect(() => {
            fetchData();            
        }, [domainHistoryTableFilter, currentPage, sorting, pageSize]);


    const fetchData = () =>{
        getDomainActivitiesDirect(id, currentPage, pageSize, isPlans, sorting.columnName, sorting.direction, domainHistoryTableFilter).then(function (response) {
            setRows(response.data.content);
            setCurrentPage(response.data.number);
            setTotalCount(response.data.totalElements);

        });

    }

    const onRowClicked = (row) =>{
       
        const FORM = isPlans ? PLAN_FROM : ACTIVITY_FROM;
        history.push(`/h${FORM}${row.uuid}`)
    }



        let dateColumns = ['execution'];

        const columns = [
            {name: 'execution', title: text.date, getCellValue: row => asShortStringDate(row.execution)},
            {
                name: 'field',
                title: text.field,
                getCellValue: row => row.domain.field.name,
            },
            {name: 'alias', title: text.alias,
                getCellValue: row => row.domain.alias,
            },
            {
                name: 'crop',
                title: text.crop,
                getCellValue: row => row.domain.variety.category,
            },
            {
                name: 'variety',
                title: text.variety,
                getCellValue: row => row.domain.variety.name,
            },
            {
                name: 'description',
                title: text.activity,
                getCellValue: row => row.activityDef ? row.activityDef.name: text[row.type.toLowerCase()],

            },
            {name: 'area', title: text.area},
            {name: 'documentRef', title: text.reference},
        ];

        const selections  = lastActivityUuid ? rows.filter(e=> e.uuid === lastActivityUuid).map(e=> e.id) : null;


        return (
            <div className={classes.root}>
                    <TopBackBar dir={dir} label={text.back} history={history}/>
                <div className={classes.body}>
                        <MasterDetailsTableTop options={options} filter={domainHistoryTableFilter}
                                      setFilter={(filter) => setDomainHistoryTableFilter(filter)}
                                      label={text.typeToSearch}/>              
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
                        onChangeRowsPerPage={setTablePageSize}
                        pageSizes={pageSizes}
                        dateColumns={dateColumns}
                        text={text}
                        selections={selections}

                    />
                </div>
            </div>
        )
    }


export default withRouter(DomainHistoryTable);