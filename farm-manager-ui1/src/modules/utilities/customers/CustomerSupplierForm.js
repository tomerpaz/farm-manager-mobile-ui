import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import {
    CREATED, CUSTOMER_OR_SUPPLIER_CREATED, CUSTOMER_OR_SUPPLIER_UPDATED,
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderTypeOptions } from "../../../components/core/optionsUtil";
import { CUSTOMER, SUPPLIER } from "../../../reducers/ResourceReducer";
import { typeDisabled } from "../../../components/core/form/FormUtil";
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const CustomerSupplierFormBase = (props) => {

    const classes = useStyles();

    const { clearResource, deleteCustomerOrSupplier, id, handleSubmit, pristine, submitting, text, deletable, isAdmin, backOnExit, history, typeOptions } = props;

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
        if (backOnExit === true) {
            history.goBack();
        }
    }

    const deleteAction = () => {
        cancelAction();
        deleteCustomerOrSupplier(id);
    }

    const disabled = typeDisabled(id, deletable);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.customerOrSupplier} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field
                        style={{ flex: 1 }}
                        name="type"
                        select
                        component={TextField}
                        className={classes.textField}
                        disabled={disabled}
                        label={text.type}>
                        {renderTypeOptions(typeOptions ? typeOptions : [CUSTOMER, SUPPLIER], text)}
                    </Field>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="attribute1"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        label={text.phone}
                        component={TextField}
                    />
                    <Field name="email"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.email} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="identification"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        label={text.businessIdentification}
                        component={TextField}
                    />
                    <Field name="code"
                        style={{ flex: 1 }}


                        component={TextField}
                        className={classes.textField}
                        label={text['code']} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="address"
                        style={{ flex: 1 }}
                        component={TextField}
                        multiline
                        rows="4"
                        className={classes.textField}
                        label={text.address} />
                    <Field name="description"
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

const selector = formValueSelector('CustomerSupplierForm');

const CustomerSupplierForm = reduxForm({
    form: 'CustomerSupplierForm',
    onSubmitSuccess: (response, dispatch, props) => {
        if (props.backOnExit === true) {
            props.history.goBack();
        }
        return dispatch({
            type: CREATED === response.status ? CUSTOMER_OR_SUPPLIER_CREATED : CUSTOMER_OR_SUPPLIER_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(CustomerSupplierFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(CustomerSupplierForm));
