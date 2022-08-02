import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, FormControlLabel } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { Field, FieldArray, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, CREATE_COMPOUND, UPDATE_COMPOUND, } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import { saveCompound } from '../../../actions';
import Elements from './Elements';
import { isArrayEmpty } from '../../../components/filters/filterUtil';

const useStyles = makeStyles(theme => formStyle(theme));

const CompoundFormBase = (props) => {

    const classes = useStyles();

    const {
        handleSubmit, pristine, submitting, text, id, deletable, deleteCompound, clearCompound,
        ingredients,
    } = props;

    const handleFormSubmit = (data) => {
        return saveCompound(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }
    const cancelAction = () => {
        clearCompound(true);
    }
    const deleteAction = () => {
        deleteCompound(id);
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.compound} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.code} />
                </div>

                {!isArrayEmpty(ingredients) && <FieldArray name="elements" text={text} ingredients={ingredients} component={Elements}
                    validate={required}

                />}

                <div className={classes.formRowSpaceBetween}>
                    <Field name="note"
                        style={{ flex: 1 }}
                        multiline
                        rows={4}
                        component={TextField}
                        className={classes.textField}
                        label={text.note} />
                </div>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </Box>
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

const selector = formValueSelector('CompoundForm');

let CompoundForm = reduxForm({
    form: 'CompoundForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? CREATE_COMPOUND : UPDATE_COMPOUND,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(CompoundFormBase)

CompoundForm = withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        elements: selector(state, 'elements'),
    })
)(CompoundForm));
export default CompoundForm;
