import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { FormControlLabel } from '@mui/material';

import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, LINK_CREATE, LINK_UPDATE } from "../../../actions/types";
import { saveLink } from "../../../actions";
import { required } from "../../../components/forms/ValidationUtil";
import { loadDataByName } from "../../../utils/LoadUtil";
import { formStyle } from '../../../utils/StyleUtils';
import { getIndexSelectOptions } from '../../../utils';


const useStyles = makeStyles(theme => formStyle(theme));

const LinkFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, clearLink, deleteLink,
    } = props;


    useEffect(() => {
        loadDataByName(props, ['links']);
    }, [])

    const handleFormSubmit = (data) => {

        return saveLink(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const cancelAction = () => {
        clearLink();
    }
    const deleteAction = () => {
        clearLink();
        deleteLink(id);
    }




    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>

                <FormTitle title={text.site} />

                <div className={classes.formRow}>
                    <Field name="name"
                        component={TextField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />

                    <Field name="position"
                        style={{ width: 100 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.location}>                        
                        {getIndexSelectOptions(10)}
                    </Field>


                </div>

                <div className={classes.formRow}>
                    <Field name="url"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        placeholder={text.address}
                        validate={required}
                        label={text.address} />

                </div>
                <div className={classes.formRow}>

                    <Field name="description"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.note}
                        placeholder={text.note}
                        multiline
                        rows={4}
                    />
                </div>

                <div className={classes.formRow2}>
                    <FormControlLabel
                        control={<Field name="active" color="primary" component={Checkbox} />}
                        label={text.active} />
                    <FormControlLabel
                        control={<Field name="tab" color="primary" component={Checkbox} />}
                        label={text.externalTab} />

                </div>

                <FormActions
                    text={text}
                    editable={true}
                    deletable={id}
                    cancelAction={cancelAction}
                    deleteAction={deleteAction}
                    pristine={pristine}
                    submitting={submitting}
                />
            </div>
        </form >

    )
}

const selector = formValueSelector('LinkForm');

let LinkForm = reduxForm({
    form: 'LinkForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? LINK_CREATE : LINK_UPDATE,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(LinkFormBase)


LinkForm = connect(
    state => ({

        id: selector(state, 'id'),
    })
    ,
    {})(LinkForm);
export default LinkForm;
