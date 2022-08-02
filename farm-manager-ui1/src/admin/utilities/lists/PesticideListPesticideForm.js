import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { CREATED, PESTICIDE_LIST_PESTICIDE_CREATED, PESTICIDE_LIST_PESTICIDE_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { getSuggestionsNameId, renderOptions } from "../../../components/core/optionsUtil";
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { Autocomplete as BaseAutoCompete, AddButton } from '../../../components/'

import { Table, } from '../../../components';
import { savePesticideListPesticide } from "../../../actions/PesticideListActions";
import { requiredArray } from "../../../components/core/form/validation";
import { FormTitle } from '../../../components/core';

const useStyles = makeStyles(theme => formStyle(theme));

let PesticideListPesticideForm = (props) => {
    const classes = useStyles();

    const [selectedFormPest, setSelectedFormPest] = useState(null);

    const {
        deletePesticideListPesticide, id, pristine, submitting, text, deletable,
        selectPesticideListPesticide, handleSubmit, array, touch,
        pesticideUnits, pesticides, pest, pests, selectedPesticideList, editable, change } = props;

    const handleFormSubmit = (data) => {
        return savePesticideListPesticide(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        selectPesticideListPesticide(null);
    }

    const deleteAction = () => {
        deletePesticideListPesticide(id);
    }

    const addSelectedPest = () => {
        array.unshift("pest", { pest: selectedFormPest.element, dosage: 0, interval: 0 });
        setSelectedFormPest(null);
    }

    const changePestProperty = (column, value, rowData, rowIndex) => {
        change(`pest[${rowIndex}].${column}`, value);
    }

    const changePesticideProperty = (selection) => {
        change('resource', selection && selection.element ? selection.element : null);
    }

    const locale = selectedPesticideList.crop.locale;
    // console.log('selectedPesticideList', selectedPesticideList.crop.locale);

    let columns = [
        {
            name: 'pest', title: text.pest,
            getCellValue: row => row.pest.name,
        },
        {
            name: 'dosage', title: text.dosage, edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changePestProperty('dosage', value, rowData, rowIndex),
        },
        {
            name: 'interval', title: text.interval, edit: true, type: 'number',
            onChange: (value, rowData, rowIndex) => changePestProperty('interval', value, rowData, rowIndex),
        },

    ];

    if (editable) {
        columns.push(
            {
                name: 'delete',
                title: ' ',
                iconButton: true,
                onClick: (value, rowIndex) => array.remove(`pest`, rowIndex) && touch("pest"),
            }
        )
    }
    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={`${text.pesticide} (${selectedPesticideList.name})`} />
                <div className={classes.formRowSpaceBetween}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                        <div className={classes.formRowSpaceBetween}>
                            <Field name="selectedResource"
                                isMulti={false}
                                style={{ flex: 1 }}
                                component={Autocomplete}
                                className={classes.textField}
                                label={text.substance}
                                placeholder={text.substance}
                                options={getSuggestionsNameId(pesticides.filter(e => e.active && e.locale === locale))}
                                validate={required}
                                onChange={changePesticideProperty}
                                requiredText={text.required}
                            />
                            <Field name="unit"
                                style={{ width: 100 }}
                                select
                                component={TextField}
                                className={classes.textField}
                                validate={required}
                                label={text.unit}>
                                {renderOptions(pesticideUnits, text, true)}
                            </Field>
                        </div>
                        <div className={classes.formRowSpaceBetween}>
                            <Field name="note"
                                style={{ flex: 1 }}
                                multiline
                                rows={2}
                                component={TextField}
                                className={classes.textField}
                                label={text.note}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                                label={text.active} />
                        </div>
                    </div>
                    <div style={{ width: 80 }}></div>
                    <div className={classes.formRowSpaceBetween}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>

                            {editable === true && <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                                <BaseAutoCompete
                                    style={{ flex: 1 }}
                                    isMulti={false}
                                    options={getSuggestionsNameId(pests.filter(e => e.active && e.locale === locale))}
                                    onChange={setSelectedFormPest}
                                    value={selectedFormPest}
                                    placeholder={text.pest}
                                    className={classes.textField}
                                />
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <AddButton disabled={selectedFormPest ? false : true} onClick={addSelectedPest}
                                        label={text.add} />
                                </div>
                            </div>}
                            {pest &&
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className={classes.textField} style={{ flex: 1 }}>
                                        <Field
                                            style={{ flex: 1 }}
                                            className={classes.textField}
                                            validate={requiredArray}
                                            name="pest"
                                            component={({ meta: { touched, error, warning } }) =>
                                                <div>
                                                    <Typography variant='caption' noWrap
                                                        className={touched && error ? classes.tableError : classes.tableTitle}>
                                                        {text.pests}
                                                    </Typography>
                                                    <Table
                                                        rows={pest}
                                                        columns={columns}
                                                        indexKey={true}
                                                        disableSort={true}
                                                        onRowClicked={e => (console.log(e))}
                                                    />
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            <FormActions
                text={text}
                deletable={deletable}
                editable={editable}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}

const selector = formValueSelector('PesticideListPesticideForm');

PesticideListPesticideForm = reduxForm({
    form: 'PesticideListPesticideForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? PESTICIDE_LIST_PESTICIDE_CREATED : PESTICIDE_LIST_PESTICIDE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(errors, props);
    }
})(PesticideListPesticideForm)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        editable: selector(state, 'editable'),
        pest: selector(state, 'pest'),
        resource: selector(state, 'resource'),
        id: selector(state, 'id'),
    })
)(PesticideListPesticideForm));
