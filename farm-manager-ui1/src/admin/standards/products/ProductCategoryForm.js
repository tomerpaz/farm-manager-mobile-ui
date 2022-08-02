import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'

import { Autocomplete, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, PRODUCT_CATEGORY_CREATE, PRODUCT_CATEGORY_UPDATE } from "../../../actions/types";
import { saveProductCategory } from "../../../actions";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from '../../../utils/StyleUtils';

const useStyles = makeStyles(theme => formStyle(theme));

const ProductCategoryBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, clearProductCategory, deleteProductCategory, user,
        baseCropOptions,
    } = props;


    const handleFormSubmit = (data) => {

        return saveProductCategory(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearProductCategory();
    }
    const deleteAction = () => {
        clearProductCategory();
        deleteProductCategory(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>

                <FormTitle title={text.productCategory} />

                <div className={classes.formRowSpaceBetween}>
                    <Field name="crop"
                        isMulti={false}
                        style={{ flex: 1 }}
                        component={Autocomplete}
                        className={classes.textField}
                        label={text.crop}
                        placeholder={text.crop}
                        options={baseCropOptions}
                        validate={required}
                        requiredText={text.required}
                    />
                    <Field name="externalId"
                        component={TextField}
                        style={{ flex: 1 }}
                        validate={required}
                        type="number"
                        label={'GG ID'}
                        placeholder={'GG ID'} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        component={TextField}
                        style={{ flex: 1 }}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field name="description"
                        component={TextField}
                        style={{ flex: 1 }}
                        validate={required}
                        label={text.description}
                        placeholder={text.description} />
                    <Field name="supraCategory"
                        component={TextField}
                        style={{ flex: 1 }}
                        validate={required}
                        label={text.category}
                        placeholder={text.category} />
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

const selector = formValueSelector('ProductCategory');

let ProductCategory = reduxForm({
    form: 'ProductCategory',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? PRODUCT_CATEGORY_CREATE : PRODUCT_CATEGORY_UPDATE,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ProductCategoryBase)


export default connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
    ,
    {})(ProductCategory);
