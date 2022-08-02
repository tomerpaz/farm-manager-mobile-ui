import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import {
    CREATED, PESTICIDE_LIST_CREATED, PESTICIDE_LIST_UPDATED,
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { renderNameIdOptions } from "../../../components/core/optionsUtil";
import { savePesticideList } from "../../../actions/PesticideListActions";
import { DatePicker } from '../../../components/core';
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const PesticideListFormBase = (props) => {

    const classes = useStyles();
    const { clearPesticideList, deletePesticideList, id, handleSubmit, pristine, submitting, text, deletable, isAdmin, languages, baseCrops, editable } = props;


    const handleFormSubmit = (data) => {
        return savePesticideList(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearPesticideList();
    }

    const deleteAction = () => {
        // this.cancelAction();
        deletePesticideList(id);
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field name="crop.id"
                        style={{ width: 200 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.crop}>
                        {renderNameIdOptions(baseCrops)}
                    </Field>
                    <DatePicker name='lastUpdate'
                        label={text.lastUpdate}
                        validate={required}
                        {...props} />
                </div>
                <div className={classes.formRowSpaceBetween}>

                <Field name="note"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    label={text.note}

                />
                </div>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </Box>

            </div>
            <FormActions
                text={text}
                deletable={deletable}
                editable={editable}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}

const selector = formValueSelector('PesticideListForm');

let PesticideListForm = reduxForm({
    form: 'PesticideListForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? PESTICIDE_LIST_CREATED : PESTICIDE_LIST_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(PesticideListFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        editable: selector(state, 'editable'),
        id: selector(state, 'id'),
    })
)(PesticideListForm));
