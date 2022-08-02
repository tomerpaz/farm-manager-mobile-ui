import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { formRoot, formSection, formRow, formRowSpaceBetween, formTable, errorPlaceHolder } from '../../../utils/FormStyle';
import { Typography } from '@mui/material';


import { connect } from 'react-redux';

import { saveSupplierMonthInvoice, getSupplierMonthProcurements } from '../../../actions';
import { Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import FormActions from '../../../components/forms/FormActions';
import { CROP_MANAGEMENT_PROCUREMENT } from '../../../components/frame/Routes';
import { SET_SUPPLIER_MONTH_INVOICE } from '../../../actions/types';
import { FormTitle } from '../../../components/core';
import { Table, } from '../../../components';

import { Divider, } from '@mui/material';
import { Autocomplete, TextField } from '../../../components/core/form/wrapper';

import DatePicker from '../../../components/core/form/DatePicker';
import { SUPPLIER } from '../../../reducers/ResourceReducer';
import { required, requiredArray } from '../../../components/core/form/validation';
import { tableError } from '../../activity/activityStyle';

import { getDateYear, getDateMonth, asShortStringDate, height470 } from '../../../utils';

const useStyles = makeStyles(theme => ({
    root: formRoot(theme),
    section: formSection(theme),
    formRow: formRow(theme),
    error: tableError(theme),
    table: formTable(theme),
    errorPlaceHolder: errorPlaceHolder(theme),

}));

const SupplierInvoiceFormBase = (props) => {

    const { handleSubmit, deletable,
        pristine, submitting, text, user, history, customerAndSupplierOptions
        , monthYear, selectedSupplierOption, selectedProcuremenets, change, array
    } = props;

    const classes = useStyles();

    const [procurements, setProcurements] = useState([]);



    const handleFormSubmit = (data) => {
        const supplierId = data.selectedSupplierOption.id;
        const procurementRef = data.procurementRef;
        const year = getDateYear(data.monthYear);
        const month = getDateMonth(data.monthYear);
        return saveSupplierMonthInvoice(supplierId, procurementRef, year, month, data.selectedProcuremenets).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });

    };

    const cancelAction = () => {
        history.push(CROP_MANAGEMENT_PROCUREMENT)
    }


    function selectAll(checked) {
        if (checked) {
            change("selectedProcuremenets", procurements.map(e => e.id));
        }
        else {
            change("selectedProcuremenets", []);
        }
    }

    function select(value) {
        if (value) {
            const index = selectedProcuremenets.indexOf(value.id);
            if (index >= 0) {
                array.remove("selectedProcuremenets", index);

            } else {
                array.unshift("selectedProcuremenets", value.id);

            }
        }
    }
    useEffect(() => {
        if (monthYear && selectedSupplierOption) {
            const year = getDateYear(monthYear);
            const month = getDateMonth(monthYear);
            getSupplierMonthProcurements(year, month, selectedSupplierOption.id).then(response => {
                setProcurements(response.data);
            }).catch(error => {
                console.log(error);
                setProcurements([]);
            });
        }
        else {
            setProcurements([]);
        }
        change("selectedProcuremenets", []);

    }, [monthYear, selectedSupplierOption])

    const columns = [
        { name: 'procurementDate', title: text.date, getCellValue: row => asShortStringDate(row.procurementDate), },
        { name: 'description', title: text.description, getCellValue: row => row.description ? row.description : text.items },
        { name: 'category', title: text.waybill },
        { name: 'procurementRef', title: text.invoice },
        { name: 'totalCost', title: text.totalCost, },
    ]
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={classes.section}>
                    <div className={classes.formRow}>
                        <FormTitle title={text.supplierInvoice} />
                    </div>
                    <Divider />
                    <div className={classes.formRow}>
                        <DatePicker name='monthYear'
                            views={["month", "year"]}
                            format='MM/YYYY'
                            label={text.month}
                            validate={required}
                            text={text}
                        />
                        <Field
                            name="procurementRef"
                            type="number"
                            width={150}
                            label={text.invoice}
                            component={TextField}
                            onFocus={(e) => e.target.select()}
                            validate={required}
                        />
                        <Field name="selectedSupplierOption"
                            width={280}
                            isMulti={false}
                            component={Autocomplete}
                            label={text.supplier}
                            placeholder={text.supplier}
                            options={customerAndSupplierOptions.filter(e => SUPPLIER === e.element.type)}
                            validate={required}
                            requiredText={text.required}
                        />
                    </div>
                </div>


                <div className={classes.section}>
                    {/* <div className={classes.formRow}>
                        <FormTitle title={text.procurement} />
                    </div>
                    <Divider /> */}
                    <div className={classes.formRow}>

                        <Field
                            validate={requiredArray}
                            name="selectedProcuremenets"
                            component={({
                                meta: { touched, error, warning }
                            }) =>
                                <div name="selectedProcuremenets" className={classes.table}>
                                    <div className ={classes.errorPlaceHolder}>
                                       {touched && error && <Typography variant='caption' noWrap
                                            className={ classes.error }>
                                            {error}
                                        </Typography>}
                                    </div>
                                    <Table rows={procurements}
                                        columns={columns}
                                        selections={selectedProcuremenets}
                                        height={height470}
                                        useSelection={true}
                                        showSelectAll={true}
                                        onRowClicked={select}
                                        selectAll={selectAll}
                                    />
                                </div>
                            }
                        />
                    </div>
                </div>

                <FormActions
                    text={text}
                    deletable={deletable}
                    cancelAction={cancelAction}
                    deleteAction={null}
                    pristine={pristine}
                    submitting={submitting}
                />
            </form>
        </div>
    )
}

let SupplierInvoiceForm = reduxForm({
    form: 'SupplierInvoiceForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(CROP_MANAGEMENT_PROCUREMENT);
        return dispatch({
            type: SET_SUPPLIER_MONTH_INVOICE,
            payload: new Array(response.data)
        });


    },
    onSubmitFail: (errors, dispatch, props) => {
        // console.log(errors);
        // scrollToFirstError(errors);

    }
})(SupplierInvoiceFormBase)

const selector = formValueSelector('SupplierInvoiceForm');


SupplierInvoiceForm = connect(

    state => ({
        // initialValues: state.procurement.procurement,
        selectedProcuremenets: selector(state, 'selectedProcuremenets'),
        selectedSupplierOption: selector(state, 'selectedSupplierOption'),
        procurementRef: selector(state, 'selectedSupplierOption'),
        monthYear: selector(state, 'monthYear'),
    })
    ,
    {})(SupplierInvoiceForm);
export default SupplierInvoiceForm;



