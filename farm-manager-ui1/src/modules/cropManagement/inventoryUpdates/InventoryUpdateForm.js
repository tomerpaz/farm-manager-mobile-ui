import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { MenuItem, InputAdornment } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField, Autocomplete } from '../../../components/core/form/wrapper';
import { saveInventoryUpdate } from "../../../actions/InventoryActions";
import FormActions from '../../../components/forms/FormActions'
import { DatePicker, FormTitle } from "../../../components/core";
import { CREATED, INVENTORY_UPDATE_CREATED, INVENTORY_UPDATE_UPDATED, } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { renderNameIdOptions, renderTypeOptions } from "../../../components/core/optionsUtil";
import { ACCESSORY, FERTILIZER, PESTICIDE, VARIETY } from "../../../reducers/ResourceReducer";
import { getUnitText } from "../../../utils/Units";
import { INVENTORY_TYPES } from "../../../reducers/InventoryReducer";

const useStyles = makeStyles(theme => formStyle(theme));

let InventoryForm = (props) => {

    const classes = useStyles();

    const [resourceSuggestions, setResourceSuggestions] = useState([]);


    const { clearInventoryUpdate, deleteInventoryUpdate, id, handleSubmit, pristine, submitting, deletable,
        text, warehouses, change, selectedResource, isAdmin,
        resourceType, fertilizerOptions, pesticideOptions, varietyResourceOptions, accessoryOptions,
    } = props;


    useEffect(() => {

        let temp = [];
        if (resourceType) {
            if (resourceType === PESTICIDE) {
                temp = pesticideOptions;
            } else if (resourceType === FERTILIZER) {
                temp = fertilizerOptions;
            } else if (resourceType === VARIETY) {
                temp = varietyResourceOptions;
            } else if (resourceType === ACCESSORY) {
                temp = accessoryOptions;
            }
        }
        setResourceSuggestions(temp)
    }, [resourceType]);


    const handleFormSubmit = (data) => {
        if (data.selectedResource) {
            data.resource = { id: data.selectedResource.id };
        }
        if (data.selectedWarehouse) {
            data.warehouse = { id: data.selectedWarehouse };
        }
        return saveInventoryUpdate(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearInventoryUpdate();
    }

    const deleteAction = () => {
        cancelAction();
        deleteInventoryUpdate(id);
    }

    const activeWarehouses = warehouses.filter(w => w.active);

    const QtyInputProps = {};

    if (selectedResource) {
        const resource = selectedResource.element;
        const unit = resource.inventoryUnit ? resource.inventoryUnit : resource.usageUnit
        QtyInputProps.endAdornment = <InputAdornment style={{ paddingLeft: 5, paddingRight: 5 }}
            position="start">{getUnitText(unit, text)}</InputAdornment>;
    }
    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.inventoryUpdate} />
                <div className={classes.formRowSpaceBetween}>
                    <DatePicker name='updateDate'
                        label={text.date}
                        validate={required}
                        {...props} />
                    <Field
                        style={{ flex: 1 }}
                        className={classes.textField}
                        name="resourceType"
                        select
                        component={TextField}
                        validate={required}
                        onChange={(e) => {
                            change('selectedResource', '');
                            change('unit', '');
                        }}
                        label={text.resourceType}
                    >
                        <MenuItem value="">
                            <em>{text.resourceType}</em>
                        </MenuItem>
                        {renderTypeOptions(INVENTORY_TYPES, text)}
                    </Field>
                    <Field
                        style={{ flex: 1 }}
                        className={classes.textField}
                        name="selectedWarehouse"
                        select
                        component={TextField}
                        validate={required}
                        label={text.warehouse}>
                        {renderNameIdOptions(activeWarehouses, true)}
                    </Field>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="selectedResource"
                        style={{ width: 1 }}
                        className={classes.textField}
                        fullWidth={true}
                        isMulti={false}
                        component={Autocomplete}
                        label={text.item}
                        placeholder={text.selectItem}
                        options={resourceSuggestions}
                        validate={required}
                        requiredText={text.required}
                    />
                    <Field
                        style={{ flex: 1 }}
                        className={classes.textField}
                        name="qty"
                        type="number"
                        InputProps={QtyInputProps}
                        validate={required}
                        label={text.qty}
                        component={TextField}
                    />

                </div>
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


const selector = formValueSelector('InventoryForm');

InventoryForm = reduxForm({
    form: 'InventoryForm',
    onSubmitSuccess: (response, dispatch, props) => {
        // props.history.push(props.exitRoute);
        return dispatch({
            type: CREATED === response.status ? INVENTORY_UPDATE_CREATED : INVENTORY_UPDATE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(InventoryForm)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        selectedResource: selector(state, 'selectedResource'),
        selectedWarehouse: selector(state, 'selectedWarehouse'),
        resourceType: selector(state, 'resourceType'),
    })
)(InventoryForm));