import React from 'react'
import { makeStyles } from '@mui/styles'; import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { ACTIVITY_DEF_CREATED, ACTIVITY_DEF_UPDATED, CREATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { renderNameIdOptionsTranslate, renderPerUnitOptions, renderTypeOptions } from "../../../components/core/optionsUtil";
import { saveActivityDef } from "../../../actions/ActivityDefActions";
import { GENERAL, HARVEST, PROCUREMENT } from "../../activity/types";
import { EXECUTOR_UNITS } from "../../../utils/Units";
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const ActivityDefFormBase = (props) => {

    const classes = useStyles();
    const { clearActivityDef, deleteActivityDef, id, handleSubmit, pristine, submitting, text, deletable, isAdmin, history, backOnExit, activityDefTypes, areaUnit, typeOptions } = props;

    // constructor(props) {
    //     super(props);
    //     loadDataByName(props, ['activityDefTypes']);
    // }

    const handleFormSubmit = (data) => {
        return saveActivityDef(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearActivityDef();
        if (backOnExit === true) {
            history.goBack();
        }
    }

    const deleteAction = () => {
        cancelAction();
        deleteActivityDef(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.activityDef} />
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
                    <Field
                        style={{ flex: 1 }}
                        name="type"
                        select
                        component={TextField}
                        className={classes.textField}
                        disabled={id !== null && deletable === false}
                        validate={required}
                        label={text.category}>
                        {renderTypeOptions(typeOptions ? typeOptions : [GENERAL, HARVEST, PROCUREMENT], text)}
                    </Field>
                    <Field
                        style={{ flex: 1 }}
                        name="defTypeId"
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.activityGroup}>
                        {renderNameIdOptionsTranslate(activityDefTypes, text)}
                    </Field>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        style={{ flex: 1 }}
                        name="unit"
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.unit}>
                        {renderPerUnitOptions(EXECUTOR_UNITS, text, areaUnit)}
                    </Field>
                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.code} />
                </div>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </Box>
            </div>


            <FormActions
                text={text}
                editable={isAdmin}
                deletable={deletable && isAdmin}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />

        </form>
    )
}

const selector = formValueSelector('ActivityDefForm');

let ActivityDefForm = reduxForm({
    form: 'ActivityDefForm',
    onSubmitSuccess: (response, dispatch, props) => {

        if (props.backOnExit === true) {
            props.history.goBack();
        }
        return dispatch({
            type: CREATED === response.status ? ACTIVITY_DEF_CREATED : ACTIVITY_DEF_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ActivityDefFormBase)


export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(ActivityDefForm));
