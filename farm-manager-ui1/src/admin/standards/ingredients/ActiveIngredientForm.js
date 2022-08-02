import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'

import { Autocomplete, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, ACTIVE_INGREDIENT_CREATE, ACTIVE_INGREDIENT_UPDATE } from "../../../actions/types";
import { saveActiveIngredient } from "../../../actions";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from '../../../utils/StyleUtils';

const useStyles = makeStyles(theme => formStyle(theme));

const ActiveIngredientBaseForm = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, clearActiveIngredient, deleteActiveIngredient,
        pesticideOptions,
    } = props;

    const handleFormSubmit = (data) => {

        return saveActiveIngredient(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const cancelAction = () => {
        clearActiveIngredient();
    }
    const deleteAction = () => {
        clearActiveIngredient();
        deleteActiveIngredient(id);
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>

                <FormTitle title={text.activeIngredient} />

                <div className={classes.formRowSpaceBetween}>
                    <Field name="resource"
                        style={{ flex: 1 }}
                        isMulti={false}
                        component={Autocomplete}
                        className={classes.textField}
                        label={text.substance}
                        placeholder={text.substance}
                        options={pesticideOptions}
                        validate={required}
                        requiredText={text.required}
                    />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="kg"
                        component={TextField}
                        style={{ flex: 1 }}
                        type="number"
                        className={classes.textField}
                        validate={required}
                        label={text.kg}>
                    </Field>

                    <Field name="cas"
                        component={TextField}
                        style={{ flex: 1 }}
                        className={classes.textField}
                        validate={required}
                        label={'CAS'}>
                    </Field>
                </div>

                <FormActions
                    text={text}
                    editable={true}
                    deletable={deletable}
                    cancelAction={cancelAction}
                    deleteAction={deleteAction}
                    pristine={pristine}
                    submitting={submitting}
                />
            </div>
        </form >

    )
}

const selector = formValueSelector('ActiveIngredientForm');

let ActiveIngredientForm = reduxForm({
    form: 'ActiveIngredientForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? ACTIVE_INGREDIENT_CREATE : ACTIVE_INGREDIENT_UPDATE,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ActiveIngredientBaseForm)


export default connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
    ,
    {})(ActiveIngredientForm);

