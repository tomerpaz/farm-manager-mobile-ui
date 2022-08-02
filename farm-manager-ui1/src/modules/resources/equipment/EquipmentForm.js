import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, EQUIPMENT_CREATED, EQUIPMENT_UPDATED, } from "../../../actions/types";
import { required, requiredPositiveNumber } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderPerUnitOptions, renderTypeOptions } from "../../../components/core/optionsUtil";
import { typeDisabled } from "../../../components/core/form/FormUtil";
import { EQUIPMENT_UNITS } from "../../../utils/Units";
import { isArrayEmpty } from '../../../components/filters/filterUtil';
import { Box, MenuItem } from '@mui/material';
import { WIALON_TITLE } from '../../wialon/WialonSettings';

const useStyles = makeStyles(theme => formStyle(theme));

export const EQUIPMENT_TYPES = ['TRACTOR', 'SPRAYER', 'VEHICLE', 'AGRO_MACHINE', 'OTHER'];

const EquipmentFormBase = (props) => {
    const classes = useStyles();

    const { clearResource, deleteEquipment, id, handleSubmit, pristine, submitting, deletable, text, category, isAdmin, areaUnit, wialonUnits } = props


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
        deleteEquipment(id);
    }

    const disabled = typeDisabled(id, deletable);

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.equipment} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"

                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />

                    <Field

                        name="category"
                        disabled={disabled}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.type}>
                        {renderTypeOptions(EQUIPMENT_TYPES, text)}
                    </Field>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="engName"

                        className={classes.textField}
                        label={text.engName}
                        component={TextField}
                    />
                    <Field name="code"

                        component={TextField}
                        className={classes.textField}
                        label={text['code']} />
                </div>
                {category === 'SPRAYER' && <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="capacity"

                        className={classes.textField}
                        label={text.capacity}
                        component={TextField}
                        validate={requiredPositiveNumber}
                    />
                </div>}

                <div className={classes.formRowSpaceBetween}>
                    <Field

                        name="usageUnit"
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.unit}>
                        {renderPerUnitOptions(EQUIPMENT_UNITS, text, areaUnit)}
                    </Field>
                    <Field name="description"

                        component={TextField}
                        multiline
                        rows="2"
                        className={classes.textField}
                        label={text.note} />
                </div>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </Box>
            </div>
            <FormActions
                text={text}
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

const selector = formValueSelector('EquipmentForm');

let EquipmentForm = reduxForm({
    form: 'EquipmentForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? EQUIPMENT_CREATED : EQUIPMENT_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(EquipmentFormBase)

export default connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        category: selector(state, 'category'),
    })
)(EquipmentForm);
