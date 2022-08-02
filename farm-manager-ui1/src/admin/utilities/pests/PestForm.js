import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, PEST_CREATED, PEST_UPDATED, } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { renderTranslatableOptions, } from "../../../components/core/optionsUtil";
import { savePest } from "../../../actions/PestActions";
import { MenuItem } from '@mui/material';


export const SOIL_DISEASE = 'SOIL_DISEASE'
export const PERENNIAL_PEST = 'PERENNIAL_PEST'

const useStyles = makeStyles(theme => formStyle(theme));


const PestFormBase = (props) => {

    const classes = useStyles();
    const { clearPest, deletePest, id, handleSubmit, pristine, submitting, text, deletable, isAdmin, languages } = props;

    const handleFormSubmit = (data) => {
        return savePest(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearPest(true);
    }

    const deleteAction = () => {
        cancelAction();
        deletePest(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.pest} />
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
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="type"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.type}>
                        <MenuItem value={'PEST'}>{text.pest}</MenuItem>
                        <MenuItem value={'DISEASE'}>{text.disease}</MenuItem>
                        <MenuItem value={SOIL_DISEASE}>{text.soilDisease}</MenuItem>
                        <MenuItem value={PERENNIAL_PEST}>{text.perennialPest}</MenuItem>

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

const selector = formValueSelector('PestForm');

let PestForm = reduxForm({
    form: 'PestForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? PEST_CREATED : PEST_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(PestFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(PestForm));
