import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { connect } from 'react-redux';

import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";

import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import {
    BUSINESS_CREATED, BUSINESS_UPDATED, CREATED,
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import {
    getSuggestionsNameId, renderDateFormats, renderNameIdOptions,
    renderTranslatableOptions
} from "../../../components/core/optionsUtil";
import { DatePicker } from '../../../components/core';
import { getGGNToken, saveBusiness } from "../../../actions";
import { Button, MenuItem } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const BusinessFormBase = (props) => {
    const { handleSubmit, pristine, submitting, deletable, text,
        match, languages, currencies, editable, areaUnits, weightUnits, countries, fieldInGroups, fieldInCompanies,
        deleteBusiness, id,
        clearBusiness, businesses, mapApiKey, fieldinId, ggn, change,
    } = props;
    const classes = useStyles();

    function handleFormSubmit(data) {


        data.links = data.businessLinks ? data.businessLinks.map(e => e.value) : null;

        return saveBusiness(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    function cancelAction() {
        clearBusiness();
    }

    function deleteAction() {
        deleteBusiness(id);
    }

    const loadGGNToken = () =>{
        getGGNToken(ggn).then( e =>{
            console.log( e.data)
            change('ggBearer', e.data);
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Field name="name"
                        
                        component={TextField}
                        
                        validate={required}
                        label={text.businessName}
                        placeholder={text.businessName} />
                    <Field name="engName"
                        


                        component={TextField}
                        
                        validate={required}
                        label={text.engName}
                        placeholder={text.engName} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Field name="ggn"
                        


                        component={TextField}
                        
                        // validate={required}
                        label={'GGN'}
                        placeholder={'GGN'} />
                    <Field name="businessIdentification"
                        


                        component={TextField}
                        
                        // validate={required}
                        label={text.businessIdentification}
                        placeholder={text.businessIdentification} />
                    <DatePicker name='registration'
                        label={text.start}
                        validate={required}
                        {...props} />
                    <DatePicker name='validThrough'
                        label={text.validThrough}
                        validate={required}
                        {...props} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Field name="country"
                        
                        select


                        component={TextField}
                        
                        validate={required}
                        label={text.country}>
                        {renderTranslatableOptions(countries, text)}
                    </Field>
                    <Field name="locale"
                        
                        select


                        component={TextField}
                        
                        validate={required}
                        label={text.language}>
                        {renderTranslatableOptions(languages, text)}
                    </Field>
                    <Field name="areaUnit"
                        
                        select
                        component={TextField}
                        
                        validate={required}
                        label={text.areaUnit}>
                        {renderTranslatableOptions(areaUnits, text)}
                    </Field>
                    <Field name="weightUnit"
                        
                        select
                        component={TextField}
                        
                        validate={required}
                        label={text.weight}>
                        {renderTranslatableOptions(weightUnits, text)}
                    </Field>
                    <Field name="currency"
                        
                        select


                        component={TextField}
                        
                        validate={required}
                        label={text.currency}>
                        {renderTranslatableOptions(currencies, text)}
                    </Field>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Field name="dateFormat"
                        
                        select


                        component={TextField}
                        
                        validate={required}
                        label={text.dateFormatLabel}>
                        {renderDateFormats()}
                    </Field>
                    <Field name="plantDateFormat"
                        
                        select
                        component={TextField}
                        
                        validate={required}
                        label={text.plantDateFormat}>
                        {renderDateFormats()}
                    </Field>
                    <Field name="startHour"
                        style={{ width: 100 }}
                        component={TextField}
                        
                        label={text.startHour}>
                    </Field>
                    <Field name="updates"
                        style={{ width: 100 }}
                        select
                        component={TextField}
                        
                        label={text.updates}>
                        <MenuItem style={{ minHeight: 30 }} key='' value="">
                            <em>

                            </em>
                        </MenuItem>
                        <MenuItem key={1} value={1}>Simple</MenuItem>
                        <MenuItem key={2} value={2}>Pro</MenuItem>

                    </Field>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Field name="wialon"
                        
                        select
                        component={TextField}
                        
                        label={'Wialon'}>
                        <MenuItem style={{ minHeight: 30 }} key='' value="">
                            <em>

                            </em>
                        </MenuItem>
                        <MenuItem key={1} value={1}>Simple</MenuItem>
                        <MenuItem key={2} value={2}>Pro</MenuItem>
                    </Field>
                    <Field name="fieldinId"
                        
                        select
                        component={TextField}
                        
                        label={'Field-In'}>
                        {renderNameIdOptions(fieldInCompanies, true)}
                    </Field>
                    <Field name="fieldinGroupId"
                        
                        disabled={!fieldinId}
                        select
                        component={TextField}
                        
                        label={'Field-In-Group'}>
                        {renderNameIdOptions(fieldInGroups.filter(e => e.company_id === fieldinId), true)}
                    </Field>
                    <Field name="openweathermapApiKey"
                        


                        component={TextField}
                        
                        label={'Agromonitoring'}>
                    </Field>
                </div>
                <div style={{ flex: 1, zIndex: 1000 }}>
                    {businesses && <Field name="businessLinks"
                        fullWidth={true}
                        isMulti={true}
                        component={Autocomplete}
                        
                        label={text.links}
                        placeholder={text.links}
                        options={getSuggestionsNameId(businesses)}
                        requiredText={text.required}
                    />}
                </div>

                <Field name="address"
                    
                    multiline
                    rows={4}


                    component={TextField}
                    
                    label={text.address}

                />
                <Field name="note"
                    
                    multiline
                    rows={4}


                    component={TextField}
                    
                    label={text.note}

                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Field name="ggBearer"
                        disabled={true}
                        component={TextField}
                        label={'GG Bearer'}
                    />
                    <div>
                        <Button variant="outlined" onClick={loadGGNToken}>Load</Button>
                    </div>
                </div>
                <div className={classes.formRow2}>
                    <FormControlLabel
                        control={<Field color="primary"
                            name="active" component={Checkbox} />}
                        label={text.active} />

                    <FormControlLabel
                        control={<Field color="primary"
                            name="application" component={Checkbox} />}
                        label={text.application} />
                </div>
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




const selector = formValueSelector('BusinessForm');

let BusinessForm = reduxForm({
    form: 'BusinessForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? BUSINESS_CREATED : BUSINESS_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(BusinessFormBase)

BusinessForm = withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        fieldinId: selector(state, 'fieldinId'),
        ggn: selector(state, 'ggn'),
        id: selector(state, 'id'),
        ggBearer: selector(state, 'ggBearer'),
    })
)(BusinessForm));
export default BusinessForm;
