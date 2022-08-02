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
    CREATED, DISINFECTANT_CREATED, DISINFECTANT_UPDATED,
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderTranslatableOptions, renderPerUnitOptions } from "../../../components/core/optionsUtil";
import { COMPOST_UNITS } from "../../../utils/Units";

const useStyles = makeStyles(theme => formStyle(theme));

const DisinfectantFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, deleteDisinfectant, clearResource, languages,
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
        deleteDisinfectant(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.disinfectant} />
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
                        label={text['engName']} />
                    <Field name="identification"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text['genericName']} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        style={{ flex: 1 }}
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

const selector = formValueSelector('DisinfectantForm');

let DisinfectantForm = reduxForm({
    form: 'DisinfectantForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? DISINFECTANT_CREATED : DISINFECTANT_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(DisinfectantFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(DisinfectantForm));
