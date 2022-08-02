import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import { saveWarehouse } from "../../../actions";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, WAREHOUSE_CREATED, WAREHOUSE_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const WarehouseFormBase = (props) => {

    const classes = useStyles();
    const { clearWarehouse, deleteWarehouse, id, handleSubmit, pristine, submitting, text, deletable, isAdmin } = props;

    const handleFormSubmit = (data) => {
        return saveWarehouse(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearWarehouse();
    }

    const deleteAction = () => {
        cancelAction();
        deleteWarehouse(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.warehouse} />
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
                <div className={classes.formRowSpaceBetween}>
                    <Field name="note"
                        style={{ flex: 1 }}
                        component={TextField}
                        multiline
                        rows="4"
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

const selector = formValueSelector('WarehouseForm');

const WarehouseForm = reduxForm({
    form: 'WarehouseForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? WAREHOUSE_CREATED : WAREHOUSE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(WarehouseFormBase)


export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(WarehouseForm));
