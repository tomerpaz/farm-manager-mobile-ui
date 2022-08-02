import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';

import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, VARIETY_CREATED, VARIETY_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderAliasIdOptions, renderPerUnitOptions, CROP_COLORS, renderNamValueOptions, renderNameIdOptions } from "../../../components/core/optionsUtil";
import { VARIETY_UNITS } from "../../../utils/Units";
import { isArrayEmpty } from '../../../components/filters/filterUtil';
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

export function getByCropId(cropGenuses, crops, cropId) {
    if (cropId) {
        const selectedCrop = crops.find(e => e.id === cropId);
        if (selectedCrop) {
            const baseCropId = selectedCrop.substance.id;
            const releventCropGenuses = cropGenuses.filter(e => e.crop.id === baseCropId);
            if (!isArrayEmpty(releventCropGenuses)) {
                return releventCropGenuses;
            }
        }
    }
    return null;
}

const VarietyFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, clearResource, deleteVariety,
        cropGenuses, crops, isAdmin, cropID, 
    } = props;

    const [cropGenusOptions, setCropGenusOptions] = useState(null);

    useEffect(() => {
        setCropGenusOptions(getByCropId(cropGenuses, crops, cropID));
    }, [cropID]);

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
        cancelAction();
        deleteVariety(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.variety} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field
                        style={{ flex: 1 }}
                        name="cropID"
                        select
                        component={TextField}
                        validate={required}
                        className={classes.textField}
                        label={text.crop}>
                        {renderAliasIdOptions(crops.filter(e => e.active === true))}
                    </Field>
                    {cropGenusOptions &&
                        <Field
                            style={{ flex: 1 }}
                            name="cropGenusId"
                            select
                            component={TextField}
                            className={classes.textField}
                            validate={required}
                            label={'GG Crop Genus'}>
                            {renderNameIdOptions(cropGenusOptions)}
                        </Field>
                    }
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="engName"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        label={text.engName}
                        component={TextField}
                    />

                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text['code']} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <Field
                            name="usageUnit"
                            style={{ width: 100 }}
                            select
                            component={TextField}
                            className={classes.textField}
                            validate={required}
                            label={text.usageUnit}>
                            {renderPerUnitOptions(VARIETY_UNITS, text)}
                        </Field>
                        <Field name="description"
                            style={{ flex: 1 }}
                            select
                            validate={required}
                            component={TextField}
                            className={classes.textField}
                            label={text['color']}>
                            {renderNamValueOptions(CROP_COLORS)}
                        </Field>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <div className={classes.textField} style={{
                            borderRadius: 4,
                            flex: 1,
                            height: 40,
                            backgroundColor: props.description
                        }}></div>
                    </div>
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
                editable={isAdmin}
                deletable={deletable && isAdmin}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}

const selector = formValueSelector('VarietyForm');

const VarietyForm = reduxForm({
    form: 'VarietyForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? VARIETY_CREATED : VARIETY_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(VarietyFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        description: selector(state, 'description'),
        id: selector(state, 'id'),
        cropID: selector(state, 'cropID'),
    })
)(VarietyForm));
