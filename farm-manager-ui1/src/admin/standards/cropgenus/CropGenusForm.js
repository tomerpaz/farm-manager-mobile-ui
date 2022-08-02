import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Autocomplete, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, CROP_GENUS_CREATE, CROP_GENUS_UPDATE } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from '../../../utils/StyleUtils';
import { saveCropGenus } from '../../../actions';

const useStyles = makeStyles(theme => formStyle(theme));

const CropGenusBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, clearCropGenus, deleteCropGenus, user,
        baseCropOptions,
    } = props;


    const handleFormSubmit = (data) => {

        return saveCropGenus(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearCropGenus();
    }
    const deleteAction = () => {
        clearCropGenus();
        deleteCropGenus(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.variety} />

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
                        label={'GG Crop Genus'}
                        placeholder={'GG Crop Genus'} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        component={TextField}
                        validate={required}
                        label={text.name}
                        style={{ flex: 1 }}
                        placeholder={text.name} />
                    <Field name="description"
                        component={TextField}
                        style={{ flex: 1 }}
                        validate={required}
                        label={text.description}
                        placeholder={text.description} />
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

const selector = formValueSelector('CropGenus');

let CropGenus = reduxForm({
    form: 'CropGenus',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? CROP_GENUS_CREATE : CROP_GENUS_UPDATE,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(CropGenusBase)

export default  connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
    ,
    {})(CropGenus);

