import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, CROP_BASE_CREATED, CROP_BASE_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderTranslatableOptions, renderLocaleOptions, renderNamValueOptions, CROP_COLORS } from "../../../components/core/optionsUtil";

const useStyles = makeStyles(theme => formStyle(theme));

const AdminCropFormBase = (props) => {

    const classes = useStyles();
    const { clearResource, deleteBaseCrop, id, handleSubmit, pristine, submitting, text, deletable, isAdmin, languages, description } = props;


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
        deleteBaseCrop(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.crop} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field
                        name="engName"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        label={text.engName}
                        component={TextField}
                    />
                </div>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between'
                }}>

                    <Field name="description"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        label={text['color']}>
                        {renderNamValueOptions(CROP_COLORS)}
                    </Field>

                    <div className={classes.textField} style={{
                        borderRadius: 4,
                        flex: 1,
                        height: 40,
                        backgroundColor: description
                    }}></div>
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
                <div className={classes.formRowSpaceBetween}>
                    <Field name="note"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.phenologicalStage}
                        multiline
                        rows="5"
                        placeholder={text.phenologicalStage} />
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
const selector = formValueSelector('CropForm');

let AdminCropForm = reduxForm({
    form: 'CropForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? CROP_BASE_CREATED : CROP_BASE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(AdminCropFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        description: selector(state, 'description'),
    })
)(AdminCropForm));
