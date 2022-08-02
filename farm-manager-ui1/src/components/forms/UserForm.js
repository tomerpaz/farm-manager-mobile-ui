import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'

import { MenuItem, Typography } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';

import { TextField, Checkbox } from '../core/form/wrapper'; import { withRouter } from 'react-router-dom'
import { required } from "../core/form/validation";
import { FormTitle } from "../core";
import FormActions from './FormActions'
import { USER_SAVED } from "../../actions/types";

import { asShortStringDate, getDaysInMonth, getIndexSelectOptions, getYearSelectOptions } from "../../utils/DateUtil";
import { saveUser } from "../../actions/AdminActions";
import { renderNameIdOptions } from "../core/optionsUtil";
import { loadDataByName } from "../../utils/LoadUtil";
import { height140 } from '../../utils';
import { WORKER } from '../../reducers/ResourceReducer';
import { formRow, formRowSpaceBetween } from '../../utils/FormStyle';
import { isEmpty } from '../../utils/StringUtil';
import { BING, ESRI, GOOGLE, OSM, THUNDERFOREST } from '../maps/SatelliteMapProvider';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        height: height140,
    },
    formRow: formRow(theme),
    formRowSpaceBetween: formRowSpaceBetween(theme),

}));


const UserFormBase = (props) => {

    const classes = useStyles();

    const { handleSubmit, pristine, submitting, text, initialValues, cancelAction, warehouses, height, executors, business, activitySeason, seasonMonth } = props;

    useEffect(() => {
        loadDataByName(props, ['warehouses', 'executors'])
    }, [])



    const handleFormSubmit = (data) => {
        return saveUser(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const style = height ? { height: height } : null
    return (
        <div className={classes.container} style={style}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {initialValues &&
                    <FormTitle title={`${initialValues.username}`} />
                }

                {initialValues &&

                    <Typography className={classes.formRow}>
                        {initialValues.lastLogin ? text.lastLogin + ' ' + asShortStringDate(initialValues.lastLogin) : ''}
                    </Typography>
                }
                <div style={{ display: 'flex', }}>
                    <Field name="firstName"
                        component={TextField}
                        label={text.firstName}
                        validate={required}
                    />
                    <Field name="lastName"
                        component={TextField}
                        label={text.lastName}
                        validate={required}
                    />
                </div>
                <div style={{ display: 'flex', }}>

                    <Field name="email"
                        component={TextField}
                        label={text.email}
                        validate={required}
                    />
                    <Field name="phone"
                        component={TextField}
                        label={text.phone}
                        validate={required}
                    />
                </div>

                <div style={{ display: 'flex', }}>

                    <Field name="warehouse.id"
                        select
                        style={{ flex: 1 }}
                        component={TextField}
                        label={text.warehouse}
                        validate={required}
                    >
                        {renderNameIdOptions(warehouses)}
                    </Field>
                    <Field name="tablePageSize"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        validate={required}
                        label={text.tablePageSize}
                    >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={150}>150</MenuItem>
                    </Field>
                </div>
                {business.activitySeason === null &&
                    <div style={{ display: 'flex', }}>
                        <Field name="activitySeason"
                            // disabled={business.activitySeason !== null}
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
                            component={TextField}
                            validate={!isEmpty(activitySeason) ? required : null}
                            label={text.day}
                        >
                            <MenuItem value="">
                                <em>{text.day}</em>
                            </MenuItem>
                            {getIndexSelectOptions(getDaysInMonth(seasonMonth, activitySeason))}
                        </Field>
                    </div>}

                <div style={{ display: 'flex', }}>
                    <Field name="fieldsDisplayOrder"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        validate={required}
                        label={text.fieldsDisplayOrder}
                    >
                        <MenuItem value={'creation'}>{text.creation}</MenuItem>
                        <MenuItem value={'name'}>{text.name}</MenuItem>
                        <MenuItem value={'plantDate'}>{text.plantDate}</MenuItem>
                    </Field>
                    <Field name="worker.id"
                        select
                        style={{ flex: 1 }}
                        component={TextField}
                        label={text.worker}
                    // validate={required}
                    >
                        {renderNameIdOptions(executors.filter(e => e.type === WORKER))}
                    </Field>
                    <Field name="mapProvider"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        validate={required}
                        label={text.mapview}
                    >
                        <MenuItem value={GOOGLE}>Google</MenuItem>
                        <MenuItem value={ESRI}>Esri</MenuItem>
                        <MenuItem value={BING}>Bing</MenuItem>
                        <MenuItem value={OSM}>OSM</MenuItem>
                        <MenuItem value={THUNDERFOREST}>Thunderforest</MenuItem>
                    </Field>
                </div>


                <div className={classes.formRowSpaceBetween}>

                    <Typography variant="h6" gutterBottom>
                        {`${text.notifications} ${text.inventory}: `}
                    </Typography>
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="pesticideInventoryWarn" component={Checkbox} />}
                        label={text.pesticide} />
                    <FormControlLabel
                        control={<Field style={{ fontWeight: 600 }} color="primary" name="fertilizerInventoryWarn" component={Checkbox} />}
                        label={text.fertilizer} />
                </div>
                <FormActions
                    text={text}
                    deletable={false}
                    cancelAction={cancelAction}
                    pristine={pristine}
                    submitting={submitting}
                />
            </form>
        </div>
    )
}

const selector = formValueSelector('UserForm');


const UserForm = reduxForm({
    form: 'UserForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: USER_SAVED,
            payload: response.data
        });


    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(UserFormBase)


export default withRouter(connect(
    state => ({
        activitySeason: selector(state, 'activitySeason'),
        seasonMonth: selector(state, 'seasonMonth'),
    })
    ,
    {})(UserForm));
