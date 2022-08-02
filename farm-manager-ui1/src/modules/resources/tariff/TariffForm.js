import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField, Checkbox } from '../../../components/core/form/wrapper';
import { DatePicker, FormTitle } from '../../../components/core';


import { makeStyles } from '@mui/styles';

import FormActions from '../../../components/forms/FormActions'
import { CREATED, TARIFF_CREATED, TARIFF_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, spacer10, } from "../../../utils/StyleUtils";
import { saveTariff } from "../../../actions/TariffActions";
import { getSuggestionsNameId, renderTypeOptions } from "../../../components/core/optionsUtil";
import {
    ACCESSORY,
    COMPOST,
    CONTRACTOR,
    DISINFECTANT,
    EQUIPMENT,
    FERTILIZER,
    PESTICIDE,
    VARIETY,
    WATER,
    WORKER,
    WORKER_GROUP,
} from "../../../reducers/ResourceReducer";
import { getTariffUnit, getUnitText } from "../../../utils/Units";
import { TARIFF_TYPES } from "../../../reducers/TariffReducer";
import { GENERAL, HARVEST, SPRAY } from "../../activity/types";
import { FormControlLabel, InputAdornment } from '@mui/material';
import { PROCUREMENT_RESOURCE_TYPES } from '../../cropManagement/procurement/ProcurementTable';


const useStyles = makeStyles(theme => formStyle(theme));

function getResourceSuggestions(resourceType, props) {
    if (resourceType === PESTICIDE) {
        return props.pesticides;
    } else if (resourceType === FERTILIZER) {
        return props.fertilizers;
    } else if (resourceType === VARIETY) {
        return props.varieties;
    } else if (resourceType === ACCESSORY) {
        return props.accessories;
    } else if (resourceType === EQUIPMENT) {
        return props.equipment;
    } else if (resourceType === WATER) {
        return props.waterSources;
    } else if (resourceType === WORKER) {
        return props.executors.filter(e => e.type === WORKER);
    } else if (resourceType === CONTRACTOR) {
        return props.executors.filter(e => e.type === CONTRACTOR);
    } else if (resourceType === WORKER_GROUP) {
        return props.executors.filter(e => e.type === WORKER_GROUP);
    } else if (resourceType === DISINFECTANT) {
        return props.disinfectants;
    } else if (resourceType === COMPOST) {
        return props.composts;
    } else {
        return [];
    }
}

const TariffFormBase = (props) => {
    const classes = useStyles();


    const { resourceType, clearTariff, change, deleteTariff, id,
        handleSubmit, pristine, reset, error,
        submitting, submitFailed, text, deletable, match, tariffResource, isAdmin,
        activityDefs, activityType, equipment, selectedTariffActivityDef, activityDefOptions, areaUnit, master,
    } = props;

    

    const [resourceSuggestions, setResourceSuggestions] = useState([])

    useEffect(() => {
        const typeSuggestions = getResourceSuggestions(resourceType, props);
        setResourceSuggestions(getSuggestionsNameId(typeSuggestions.filter(w => w.active)))
    }, [resourceType])


    const handleFormSubmit = (data) => {
        return saveTariff(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearTariff();
    }


    const resourceTypeChanged = () => {
        change('selectedTariffResource', null);
        change('activityType', null);
        change('tariffResource', null);
        change('selectedTariffSecondaryResource', null);
        change('tariffSecondaryResource', null);
        change('selectedTariffActivityDef', null);
    }

    const deleteAction = () => {
        cancelAction();
        deleteTariff(id);
    }

    const onResourceTariffChange = (o) => {
        if (o && o.element) {
            change('tariffResource', o.element)
            change('selectedTariffResource', {
                value: o.element.id,
                label: o.element.name
            });
        }
    }

    const onActivityDefChange = (o) => {
        if (o && o.element) {
            change('activityDef', o.element)
            change('selectedTariffActivityDef', {
                value: o.element.id,
                label: o.element.name
            });
        }
    }


    const onTariffSecondaryResourceChange = (o) => {
        if (o && o.element) {
            change('tariffSecondaryResource', o.element)
            change('selectedTariffSecondaryResource', {
                value: o.element.id,
                label: o.element.name
            });
        }
    }





    let QtyInputProps = {};

    if (tariffResource) {
        QtyInputProps.endAdornment = <InputAdornment style={{ paddingLeft: 5, paddingRight: 5 }}
            position="start">
            {getTariffUnit(tariffResource, selectedTariffActivityDef ? selectedTariffActivityDef.element : null, areaUnit, text)}
        </InputAdornment>;
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.tariff} />

                <div className={classes.formRow}>

                    <Field
                        style={{ width: 150 }}
                        name="resourceType"
                        select
                        disabled={!isNaN(id)}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        onChange={resourceTypeChanged}
                        label={text.category}>
                        {renderTypeOptions(TARIFF_TYPES, text)}
                    </Field>
                    <div style={{ width: 265 }} >
                        <Field name="selectedTariffResource"
                            isMulti={false}
                            component={Autocomplete}
                            label={text.resource}
                            placeholder={text.resource}
                            options={resourceSuggestions}
                            validate={required}
                            onChange={onResourceTariffChange}
                            requiredText={text.required}
                        />
                    </div>


                </div>
                <div className={classes.formRow}>
                    <DatePicker name='effectiveFrom'
                        label={text.effectiveFrom}
                        validate={required}
                        {...props} />
                    <Field
                        name="price"
                        type="number"
                        InputProps={QtyInputProps}
                        style={{ width: 250 }}
                        component={TextField}
                        validate={required}
                        label={text.price}
                        placeholder={text.tariff} />
                </div>
                {resourceType === CONTRACTOR &&
                    <div className={classes.formRow}>

                        <Field
                            style={{ width: 150 }}
                            name="activityType"
                            disabled={id}
                            select
                            component={TextField}
                            className={classes.textField}
                            validate={required}
                            label={text.activity}>
                            {renderTypeOptions([SPRAY, GENERAL, HARVEST], text)}
                        </Field>
                        <div style={{ width: 265 }} >
                            {activityType !== SPRAY &&
                                <Field name="selectedTariffActivityDef"
                                    isMulti={false}
                                    disabled={id}
                                    component={Autocomplete}
                                    className={classes.textField}
                                    label={text.activityName}
                                    placeholder={text.activityName}

                                    options={activityDefOptions.filter(e => activityType === e.element.type)}
                                    validate={required}
                                    onChange={onActivityDefChange}
                                    requiredText={text.required}
                                />}
                            {activityType === SPRAY &&
                                <Field name="selectedTariffSecondaryResource"
                                    isMulti={false}
                                    disabled={id}
                                    component={Autocomplete}
                                    label={text.sprayer}
                                    placeholder={text.sprayer}
                                    className={classes.autoSuggest}
                                    options={getSuggestionsNameId(equipment.filter(e => e.category === 'SPRAYER' && e.active))}
                                    validate={required}
                                    onChange={onTariffSecondaryResourceChange}
                                    requiredText={text.required}
                                />
                            }
                        </div>
                    </div>}
                {PROCUREMENT_RESOURCE_TYPES.includes(resourceType) &&

                    <div className={classes.formRow}>
                        <div className={classes.checkboxLabel}>
                            <FormControlLabel
                                control={<Field color="primary"
                                    name="master" component={Checkbox} />}
                                label={text.master} />
                        </div>
                        {master && <DatePicker name='validThrough'
                            clearable={true}
                            label={text.validThrough}
                            {...props} />}
                    </div>
                }
            </div>


            <FormActions
                text={text}
                editable={isAdmin}
                deletable={deletable && isAdmin}
                cancelAction={cancelAction}
                deleteAction={isAdmin ? deleteAction : null}
                pristine={pristine}
                submitting={submitting}
            />

        </form>
    )
}


const selector = formValueSelector('TariffForm');

let TariffForm = reduxForm({
    form: 'TariffForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? TARIFF_CREATED : TARIFF_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(TariffFormBase)


TariffForm = withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        resourceType: selector(state, 'resourceType'),
        activityType: selector(state, 'activityType'),
        selectedTariffResource: selector(state, 'selectedTariffResource'),
        tariffResource: selector(state, 'tariffResource'),
        tariffSecondaryResource: selector(state, 'tariffSecondaryResource'),
        selectedTariffSecondaryResource: selector(state, 'selectedTariffSecondaryResource'),
        selectedTariffActivityDef: selector(state, 'selectedTariffActivityDef'),
        master: selector(state, 'master'),

    })
)(TariffForm));
export default TariffForm;
