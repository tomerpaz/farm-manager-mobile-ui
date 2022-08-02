import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset, formValueSelector } from 'redux-form'
import FormControlLabel from '@mui/material/FormControlLabel';

import { TextField, Checkbox } from '../core/form/wrapper';
import { withRouter } from 'react-router-dom'
import { required } from "../core/form/validation";
import { FormTitle } from "../core";
import FormActions from './FormActions'


import {
    BY_BUSINESS_UPDATED,
} from "../../actions/types";

import { updateBusiness } from "../../actions/BusinessActions";
import { getDaysInMonth, getIndexSelectOptions, getYearSelectOptions, height140 } from '../../utils';
import { formSection, formRow, formRowSpaceBetween } from '../../utils/FormStyle';
import { MenuItem, Typography } from '@mui/material';
import { isEmpty } from '../../utils/StringUtil';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        height: height140,
    },
    section: formSection(theme),
    formRow: formRow(theme),
    ggn: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
    },
    spacer: {
        width: theme.spacing(2)
    },

}));



const OrganizationForm = (props) => {


    const handleFormSubmit = (data) => {
        return updateBusiness(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const { handleSubmit, pristine, submitting, text, activitySeason, seasonMonth } = props;
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormTitle title={`${text.organizationDetails}`} />
                <div className={classes.ggn}>
                    <Typography variant="h6">{`GGN: ${props.initialValues.ggn}`}</Typography>
                </div>

                <div className={classes.formRow}>
                    <Field name="name"
                        component={TextField}
                        label={text.businessName}
                        validate={required}
                    />
                    <Field name="engName"
                        component={TextField}
                        label={text.engName}
                        validate={required}
                    />
                    <Field name="phone"
                        component={TextField}
                        label={text.phone} />

                    <Field name="fax"
                        component={TextField}
                        label={text.fax} />
                    <Field name="businessIdentification"
                        component={TextField}
                        label={text.businessIdentification}
                        validate={required}
                    />
                </div>
                <div className={classes.formRow}>
                    <Field name="tag1"
                        component={TextField}
                        label={text.tag1}
                    />
                    <Field name="tag2"
                        component={TextField}
                        label={text.tag2}
                    />
                    <Field name="calendarOption"
                        select
                        component={TextField}
                        style={{ flex: 1 }}
                        label={text.calendarOption}
                    >
                        <MenuItem key='' value="">
                            <em>-</em>
                        </MenuItem>
                        <MenuItem value={'grower'}>{`${text.grower}`}</MenuItem>
                        <MenuItem value={'executors'}>{`${text.grower}, ${text.executors}`}</MenuItem>
                        <MenuItem value={'all'}>{`${text.grower}, ${text.executors}, ${text.exporterEnterprise}`}</MenuItem>
                    </Field>
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="maturity" component={Checkbox} />}
                        label={text.youngMature} />
                </div>
                <div className={classes.formRow}>
                    <Field name="activitySeason"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        label={text.activitySeason}
                    >
                        <MenuItem value="">
                            <em>{text.activitySeason}</em>
                        </MenuItem>
                        {getYearSelectOptions(5)}
                    </Field>
                    <Field name="seasonMonth"
                        disabled={isEmpty(activitySeason)}
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        validate={!isEmpty(activitySeason) ? required : null}
                        label={text.month}
                    >
                        <MenuItem value="">
                            <em>{text.month}</em>
                        </MenuItem>
                        {getIndexSelectOptions(12)}
                    </Field>
                    <Field name="seasonDay"
                        disabled={isEmpty(activitySeason)}
                        style={{ flex: 1 }}
                        select
                        validate={!isEmpty(activitySeason) ? required : null}
                        component={TextField}
                        label={text.day}
                    >
                        <MenuItem value="">
                            <em>{text.day}</em>
                        </MenuItem>
                        {getIndexSelectOptions(getDaysInMonth(seasonMonth, activitySeason))}
                    </Field>
                </div>
                <div className={classes.formRow}>
                    <Field name="address" style={{ flex: 1 }}
                        component={TextField}
                        multiline
                        rows="4"
                        label={text.address} />
                </div>
                <div className={classes.formRow}>
                    <div className={classes.ggn}>
                        <Typography variant="h6" gutterBottom>
                            {`${text.activities}: `}
                        </Typography>
                    </div>
                    <div className={classes.spacer} />
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="autoArea" component={Checkbox} />}
                        label={text.autoArea} />
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="autoHour" component={Checkbox} />}
                        label={text.autoHour} />
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="duplicateDate" component={Checkbox} />}
                        label={`${text.duplicate} ${text.date}`} />

                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="saveUntouched" component={Checkbox} />}
                        label={text.saveUntouched} />

                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="selectBaseFields" component={Checkbox} />}
                        label={text.baseFields} />

                </div>
                <div className={classes.formRow}>
                    <div className={classes.ggn}>
                        <Typography variant="h6" gutterBottom>
                            {`${text.application}: `}
                        </Typography>
                    </div>

                    <div className={classes.spacer} />
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="applicationPlan" component={Checkbox} />}
                        label={`${text.application} ${text.plan}`} />
                    <Field
                        name="applicationRowCount"
                        type="number"
                        style={{ width: 150 }}
                        className={classes.textField}
                        label={text.domainHistory}
                        component={TextField}
                    />
                </div>

                <FormActions
                    text={text}
                    deletable={false}
                    cancelAction={reset}
                    pristine={pristine}
                    submitting={submitting}
                />
            </form >
        </div >
    )

}

const selector = formValueSelector('OrganizationForm');

const ConnectedOrganizationForm = reduxForm({
    form: 'OrganizationForm',

    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: BY_BUSINESS_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(OrganizationForm)


export default withRouter(connect(
    state => ({
        activitySeason: selector(state, 'activitySeason'),
        seasonMonth: selector(state, 'seasonMonth'),
    }), {})(ConnectedOrganizationForm));
