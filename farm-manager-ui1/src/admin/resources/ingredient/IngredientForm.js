import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import {
    CREATED, INGREDIENT_CREATED, INGREDIENT_UPDATED,
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderTranslatableOptions } from "../../../components/core/optionsUtil";

const useStyles = makeStyles(theme => formStyle(theme));

const IngredientFormBase = (props) => {

    const classes = useStyles();


    const {
        handleSubmit, pristine, submitting, text, id, deletable, deleteIngredient, clearResource, user, isAdmin, languages, selectLocale
    } = props;

    const handleFormSubmit = (data) => {
        return saveResource(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }
    const cancelAction = () => {
        clearResource(true);
    }
    const deleteAction = () => {
        deleteIngredient(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.ingredient} />
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
                        label={text.engName} />
                </div>
                <div className={classes.formRowSpaceBetween}>
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

const selector = formValueSelector('IngredientForm');

let IngredientForm = reduxForm({
    form: 'IngredientForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? INGREDIENT_CREATED : INGREDIENT_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(IngredientFormBase)

IngredientForm = withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(IngredientForm));
export default IngredientForm;
