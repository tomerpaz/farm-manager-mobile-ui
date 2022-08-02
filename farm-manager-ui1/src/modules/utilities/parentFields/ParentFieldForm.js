import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import { saveParentField } from "../../../actions";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, PARENT_FIELD_CREATED, PARENT_FIELD_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => formStyle(theme));

const ParentFieldFormBase = (props) => {

    const classes = useStyles();
    const { clearParentField, deleteParentField, id, handleSubmit, pristine, submitting, text, deletable, isAdmin } = props;

    const handleFormSubmit = (data) => {
        return saveParentField(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearParentField();
    }

    const deleteAction = () => {
        cancelAction();
        deleteParentField(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.parentField} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="size"
                        type="number"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        label={text.size}
                        component={TextField}
                    />
                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text['code']} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="description"
                        style={{ flex: 1 }}
                        component={TextField}
                        multiline
                        rows="4"
                        className={classes.textField}
                        label={text.note} />
                </div>
            </div>
            <FormActions
                text={text}
                editable={isAdmin}
                deletable={deletable && isAdmin}
                cancelAction={deleteAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}
const selector = formValueSelector('ParentFieldForm');

let ParentFieldForm = reduxForm({
    form: 'ParentFieldForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(props.exitRoute);
        return dispatch({
            type: CREATED === response.status ? PARENT_FIELD_CREATED : PARENT_FIELD_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ParentFieldFormBase)


export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(ParentFieldForm));
