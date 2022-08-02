import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Box, FormControlLabel, MenuItem } from '@mui/material';

import { Autocomplete, Checkbox, TextField } from '../../../components/core/form/wrapper';
import { FormTitle, DatePicker } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, ALERT_CREATE, ALERT_UPDATE } from "../../../actions/types";
import { saveAlert } from "../../../actions";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from '../../../utils/StyleUtils';


const generic = "generic";
const useStyles = makeStyles(theme => formStyle(theme));

const AlertFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, clearAlert, deleteAlert, user, repeatType, executed, type,
        equipmentOptions, executorOptions
    } = props;



    const handleFormSubmit = (data) => {

        console.log(data)
        if (data.resourceOption) {
            data.resource = data.resourceOption.element
        }

        return saveAlert(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const cancelAction = () => {
        clearAlert();
    }
    const deleteAction = () => {
        clearAlert();
        deleteAlert(id);
    }

    const repeatValueLable = repeatType ? `${text.every} (${text[repeatType + 's']})` : '';

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.notification} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="type"
                        style={{ width: 180 }}
                        select
                        component={TextField}
                        validate={required}
                        label={text.type}
                    >
                        <MenuItem value={generic}>{text.generic}</MenuItem>
                        <MenuItem value={"executor"}>{text.executor}</MenuItem>
                        <MenuItem value={"equipment"}>{text.equipment}</MenuItem>
                    </Field>
                    {type === generic && <Field name="name"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        component={TextField}
                        validate={required}
                        label={text.description}
                        placeholder={text.description} />
                    }
                    {type !== generic && <Field name="resourceOption"
                        style={{ flex: 1 }}
                        isMulti={false}
                        component={Autocomplete}
                        label={text[type]}
                        placeholder={text[type]}
                        options={type === 'executor' ? executorOptions : equipmentOptions}
                        validate={required}
                        requiredText={text.required}
                    />}
                    <DatePicker name='time'
                        label={text.date}
                        validate={required}
                        {...props} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="note"
                        style={{ flex: 1 }}
                        multiline
                        rows={4}
                        validate={(type !== generic) ? required : null}
                        component={TextField}
                        className={classes.textField}
                        label={text.note} />
                </div>
                <Box marginLeft={1} marginRight={1} display={'flex'} flexDirection={'row'}>
                    <Box display={'flex'} alignItems={'center'}>
                        <FormControlLabel
                            control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                            label={text.active} />
                        <FormControlLabel
                            control={<Field className={classes.textField} color="primary" name="calender" component={Checkbox} />}
                            label={text.calendarOption} />
                        <FormControlLabel
                            control={<Field className={classes.textField} color="primary" name="critical" component={Checkbox} />}
                            label={text.critical} />
                    </Box>
                    <Box>
                        <Field name="repeatType"
                            style={{ width: 150 }}
                            select
                            component={TextField}
                            // validate={required}
                            label={text.frequency}
                        >
                            <MenuItem value="">
                                <em>{text.frequency}</em>
                            </MenuItem>
                            <MenuItem value={"year"}>{text.year}</MenuItem>
                            <MenuItem value={"month"}>{text.month}</MenuItem>
                            <MenuItem value={"week"}>{text.week}</MenuItem>
                            <MenuItem value={"day"}>{text.day}</MenuItem>
                        </Field>
                        <Field name="repeatValue"
                            style={{ width: 100 }}
                            className={classes.textField}
                            disabled={!repeatType}
                            component={TextField}
                            type="number"
                            validate={repeatType ? required : null}
                            label={repeatValueLable}
                            placeholder={text[repeatType + 's']} />
                    </Box>

                </Box>
                <FormActions
                    text={text}
                    editable={!executed}
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

const selector = formValueSelector('AlertForm');

const AlertForm = reduxForm({
    form: 'AlertForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? ALERT_CREATE : ALERT_UPDATE,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(AlertFormBase)


export default connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        repeatType: selector(state, 'repeatType'),
        executed: selector(state, 'executed'),
        type: selector(state, 'type'),
    })
    ,
    {})(AlertForm);

