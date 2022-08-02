import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'

import { TextField } from '../core/form/wrapper';
import { withRouter } from 'react-router-dom'
import { required, passwordValidation, passwordVerifyValidation } from "./ValidationUtil";
import { FormTitle } from "../core";
import FormActions from './FormActions'
import { PASSWORD_UPDATED } from "../../actions/types";
import { textField } from "../../utils/StyleUtils";
import { updatePassword } from "../../actions";
import { height140 } from '../../utils';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        height: height140,
    },
    textField: textField(theme),
}));

const PasswordFormBase = (props) => {
    const classes = useStyles();

    const [errors, setErrors] = useState([]);
    const { handleSubmit, pristine, submitting,
        text, cancelAction,  } = props;


    const handleFormSubmit = (data) => {
        setErrors([])
        return updatePassword(data.currentPassword, data.newPassword).catch((error) => {
            if (error) {
                if (error.response.data) {
                    setErrors(error.response.data.errors)
                }
                throw new SubmissionError(error)

            }
        });
    }

    const currentPasswordError = errors['currentPassword'] !== undefined

    return (
        <div className={classes.container}>
            <form autoComplete="no" onSubmit={handleSubmit(handleFormSubmit)}>
                <FormTitle title={text.password} />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Field name="currentPassword"
                        component={TextField}
                        className={classes.textField}
                        label={`${text.currentPassword}${currentPasswordError ? ': ' + text[errors['currentPassword']] : ''}`}
                        validate={required}
                        error={currentPasswordError}
                        autoComplete='off'
                    />
                    <Field name="newPassword"
                        component={TextField}
                        className={classes.textField}
                        label={text.newPassword}
                        validate={passwordValidation}
                        autoComplete="no"
                    />
                    <Field name="verify"
                        component={TextField}
                        className={classes.textField}
                        label={text.verify}
                        validate={passwordVerifyValidation}
                    />
                </div>
                <FormActions
                    text={text}
                    deletable={false}
                    cancelAction={cancelAction}
                    pristine={pristine}
                    submitting={submitting}
                />
            </form>
        </div>
    )
}


const selector = formValueSelector('PasswordForm');

let PasswordForm = reduxForm({
    form: 'PasswordForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.reset();
        return dispatch({
            type: PASSWORD_UPDATED,
        });
    },
})(PasswordFormBase)



PasswordForm = withRouter(connect(
    state => ({
        newPassword: selector(state, 'newPassword'),
        verify: selector(state, 'verify'),
    })
    ,
    {})(PasswordForm));
export default PasswordForm;
