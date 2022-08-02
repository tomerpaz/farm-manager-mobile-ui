import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, ACTIVITY_DEF_TYPE_CREATED, ACTIVITY_DEF_TYPE_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { saveActivityDefType } from "../../../actions/ActivityDefTypeActions";
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const ActivityDefTypeFormBase = (props) => {

    const classes = useStyles();
    const { clearActivityDefType, deleteActivityDefType, id, handleSubmit, pristine, submitting, text, deletable, isAdmin } = props;

    const handleFormSubmit = (data) => {
        return saveActivityDefType(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearActivityDefType();
    }

    const deleteAction = () => {
        cancelAction();
        deleteActivityDefType(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.activityGroup} />
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
                        label={text['code']} />
                </div>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="spray" component={Checkbox} />}
                        label={text.spray} />
                </Box>

                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="irrigation" component={Checkbox} />}
                        label={text.fertilize_irrigation} />
                </Box>
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

const selector = formValueSelector('ActivityDefTypeForm');

let ActivityDefTypeForm = reduxForm({
    form: 'ActivityDefTypeForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? ACTIVITY_DEF_TYPE_CREATED : ACTIVITY_DEF_TYPE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ActivityDefTypeFormBase)


export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(ActivityDefTypeForm));
