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
    PRODUCT_CREATED, PRODUCT_UPDATED,
    CREATED,
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, spacer30 } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));


const ProductFormBase = (props) => {

    const classes = useStyles();

    const { clearResource, deleteProduct, id, handleSubmit, pristine, submitting, text, deletable, isAdmin } = props;
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
        cancelAction();
        deleteProduct(id);
    }


    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.cropSize} />
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

const selector = formValueSelector('ProductForm');

let ProductForm = reduxForm({
    form: 'ProductForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? PRODUCT_CREATED : PRODUCT_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ProductFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(ProductForm));
