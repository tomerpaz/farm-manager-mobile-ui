import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField, Autocomplete } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, PESTICIDE_CREATED, PESTICIDE_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderOptions, renderPerUnitOptions, renderTranslatableOptions, } from "../../../components/core/optionsUtil";
import { COMPOST_UNITS } from "../../../utils/Units";

const useStyles = makeStyles(theme => formStyle(theme));

const PesticideFormBase = (props) => {

    const classes = useStyles();
    const { clearResource, deletePesticide, id, handleSubmit, pristine, submitting, text, deletable,
        initialValues, languages,
        fieldInProductOptions, pesticideCategories,
    } = props;

    const handleFormSubmit = (data) => {
        if (data.fieldinProduct && data.fieldinProduct.value) {
            data.fieldinId = data.fieldinProduct.value;
        } else {
            data.fieldinId = null;
        }
        return saveResource(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    useEffect(() => {
        if (initialValues.fieldinId) {
            const fieldInProduct = fieldInProductOptions.find(e => e.value === initialValues.fieldinId)
            if (fieldInProduct) {
                initialValues.fieldinProduct = { value: fieldInProduct.value, label: fieldInProduct.label }
            }
        }
    }, []);

    const cancelAction = () => {
        clearResource(true);
    }

    const deleteAction = () => {
        deletePesticide(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.pesticide} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field name="engName"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text['engName']} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="identification"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text['genericName']} />
                    <Field name="category"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.category}>
                        {renderOptions(pesticideCategories, text)}
                    </Field>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        style={{ width: 100 }}
                        name="usageUnit"
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.usageUnit}>
                        {renderPerUnitOptions(COMPOST_UNITS, text)}
                    </Field>
                    <Field name="locale"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.language}>
                        {renderTranslatableOptions(languages, text)}
                    </Field>
                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.code} />
                </div>

                <Field name="note"
                    style={{ flex: 1 }}
                    component={TextField}
                    multiline
                    rows="3"
                    className={classes.textField}
                    label={text.note} />

                {fieldInProductOptions.length > 0 &&
                    <div className={classes.formRowSpaceBetween}>
                        <Field name="fieldinProduct"
                            fullWidth={true}
                            isMulti={false}
                            component={Autocomplete}
                            className={classes.textField}
                            //onChange={e => change('fieldinId',e.value)}
                            label={"Field-In"}
                            placeholder={"Field-In"}
                            options={fieldInProductOptions}
                        />
                        <Field name="attribute1"
                            style={{ flex: 1 }}
                            component={TextField}
                            className={classes.textField}
                            label={'Field-In other codes'} />
                    </div>
                }
                <div>
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </div>
            </div>
            <FormActions
                text={text}
                deletable={deletable}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}

const selector = formValueSelector('PesticideForm');

const PesticideForm = reduxForm({
    form: 'PesticideForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? PESTICIDE_CREATED : PESTICIDE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(PesticideFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        fieldinId: selector(state, 'fieldinId'),

        id: selector(state, 'id'),
    })
)(PesticideForm));
