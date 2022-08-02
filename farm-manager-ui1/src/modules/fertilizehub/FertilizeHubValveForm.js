import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';

import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { updateFertilizerHubValves } from '../../actions';

import FormActions from '../../components/forms/FormActions'
import { FormTitle } from "../../components/core";
import { FERTILIZER_HUB_VALVES_UPDATED, } from "../../actions/types";
import { formStyle, } from "../../utils/FormStyle";
import { isEmpty } from '../../utils/StringUtil';
import { getTablePageRows, PaginationTable, TextField } from '../../components';
import { height375 } from '../../utils';

const useStyles = makeStyles(theme => formStyle(theme));





const FertilizeHubValveFormBase = (props) => {

    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ columnName: 'name', direction: 'asc' });
    const [valveFilter, setValveFilter] = useState('');


    const { handleSubmit, pristine, submitting, text,

        pageSizes, setTablePageSize,
        cancelAction, valves, accountValves, array, change,
        account,
    } = props;

    const pageSizeFloat = (height375 / 35);
    const pageSize = Number(pageSizeFloat.toFixed(0));
    const columns = [
        { name: 'name', title: text.valve },
        {
            name: 'field', title: text.field,
            disableSort: true,
            width: 250,
            getCellValue: row => row.domain ? row.domain.field.name : '',

        },
        {
            name: 'alias', title: text.alias,
            disableSort: true,
            width: 250,
            getCellValue: row => row.domain && row.domain.alias ? row.domain.alias : '',
        },
        {
            name: 'site', title: text.site,
            disableSort: true,
            width: 250,
            getCellValue: row => row.domain && row.domain.field.site ? row.domain.field.site.name : '',
        },
        {
            name: 'parentField', title: text.parentField,
            disableSort: true,
            width: 250,
            getCellValue: row => row.domain && row.domain.field.parentField ? row.domain.field.parentField.name : '',
        },

    ];

    const handleFormSubmit = (data) => {
        return updateFertilizerHubValves(data.id, data.valves.map(e => e.id)).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    if (!accountValves) {
        return <div></div>
    }

    const filteredRows = isEmpty(valveFilter) ? accountValves :
        accountValves.filter(e =>
            e.name.includes(valveFilter) ||
            (e.domain !== null && e.domain.field.name.includes(valveFilter)) ||
            (e.domain !== null && e.domain.alias && e.domain.alias.includes(valveFilter)) ||
            (e.domain !== null && e.domain.field.site && e.domain.field.site.name.includes(valveFilter)) ||
            (e.domain !== null && e.domain.field.parentField && e.domain.field.parentField.name.includes(valveFilter))
        );

    const displayRows = getTablePageRows(filteredRows, sorting, currentPage, pageSize);


    function onRowClicked(row) {
        const valveIds = valves.map(e => e.id);
        if (valveIds.includes(row.id)) {
            array.remove(`valves`, valveIds.indexOf(row.id))
        } else {
            array.unshift("valves", row);
        }
    }

    const displayedValveIds = displayRows.map(e => e.id);
    const selectedValveIds = valves.map(e => e.id);
    const selectionToSHow = selectedValveIds.filter(e => displayedValveIds.includes(e));

    function selectAll(checked) {


        if (checked) {
            filteredRows.forEach((row, index) => {

                if (!selectedValveIds.includes(row.id)) {
                    array.unshift("valves", row);
                }
            });
        }
        else {
            const filteredValveIds = filteredRows.map(e => e.id);
            const selectedVisible = selectedValveIds.filter((el) => !filteredValveIds.includes(el));
            change("valves", selectedVisible)
        }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <div className={classes.formRow}>
                    <FormTitle title={`${text.valves} / ${account.value}`} />
                    <TextField
                        fullWidth={true}
                        value={valveFilter}
                        onFocus={(e) => e.target.select()}
                        placeholder={text.valve}
                        onChange={(e) => setValveFilter(e.target.value)}
                    />
                </div>
                {/* <FormActions
                text={text}
                deletable={false}
                cancelAction={cancelAction}
                pristine={pristine}
                submitting={submitting}

            /> */}
                <div className={classes.formRow}>

                    {accountValves && <Field
                        name="valves"
                        component={({
                            meta: { touched, error, warning }
                        }) =>
                            <div name="valves" className={classes.table}>

                                <PaginationTable
                                    rows={displayRows}
                                    columns={columns}                                    
                                    height={height375}
                                    onCurrentPageChange={(currentPage) => setCurrentPage(currentPage)}
                                    onSortingChange={(sorting) => setSorting(sorting)}
                                    sorting={sorting}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalCount={filteredRows.length}
                                    showSelectAll={true}
                                    onRowClicked={onRowClicked}
                                   pageSizes={[pageSize]}
                                    onChangeRowsPerPage={(pageSize) => setTablePageSize(pageSize)}
                                    selectAll={selectAll}
                                    useSelection={true}
                                    selections={selectionToSHow}
                                />
                            </div>
                        }
                    />
                    }
                </div>

            </div>

            <FormActions
                text={text}
                deletable={false}
                cancelAction={cancelAction}
                pristine={pristine}
                submitting={submitting}

            />

        </form >
    )
}



const FertilizeHubValveForm = reduxForm({
    form: 'FertilizeHubValveForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.cancelAction();
        return dispatch({
            type: FERTILIZER_HUB_VALVES_UPDATED,
            payload: response.data
        });


    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(FertilizeHubValveFormBase)

const selector = formValueSelector('FertilizeHubValveForm');

export default connect(
    state => ({
        valves: selector(state, 'valves'),
        accountValves: selector(state, 'accountValves'),
        account: selector(state, 'account'),


    })
    ,
    {})(FertilizeHubValveForm);
