import React from 'react'
import { connect } from 'react-redux';
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField } from '../../../components/core/form/wrapper';
import { DatePicker, FormTitle } from '../../../components/core';
import FormActions from '../../../components/forms/FormActions'
import { CREATED, MAINTENANCE_CREATED, MAINTENANCE_UPDATED, } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { FormRoot, FormRow,} from "../../../utils/StyleUtils";
import { renderOptions } from "../../../components/core/optionsUtil";
import { WORKER_GROUP } from "../../../reducers/ResourceReducer";
import { saveMaintenance } from "../../../actions/MaintenanceActions";

const MaintenanceFormBase = (props) => {

    const { clearMaintenance, deleteMaintenance, id, handleSubmit, submitting, text, deletable, maintenanceTypes,
        equipmentOptions, executorOptions } = props;

    const handleFormSubmit = (data) => {
        if (data.selectedEquipment) {
            data.equipment = data.selectedEquipment.element
        }

        if (data.selectedExecutor) {
            data.executor = data.selectedExecutor.element
        }
        return saveMaintenance(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearMaintenance();
    }

    const deleteAction = () => {
        deleteMaintenance(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormRoot>
                <FormTitle title={text.maintenance} />
                <FormRow>
                    <DatePicker name='date'
                        label={text.date}
                        validate={required}
                        {...props} />
                    <Field
                        name="type"
                        select
                        component={TextField}
                        validate={required}
                        label={text.category}>
                        {renderOptions(maintenanceTypes, text)}
                    </Field>
                </FormRow>
                <FormRow>
                    <Field name="selectedEquipment"
                        style={{ width: 1 }}
                        isMulti={false}
                        component={Autocomplete}
                        label={text.equipment}
                        placeholder={text.equipment}
                        options={equipmentOptions}
                        validate={required}
                    />
                    <Field name="selectedExecutor"
                        isMulti={false}
                        component={Autocomplete}
                        label={text.executor}
                        placeholder={text.executor}
                        options={executorOptions.filter(e => e.element.type !== WORKER_GROUP)}
                        validate={required}
                    />
                </FormRow>
                <FormRow>
                    <Field name="note"
                        component={TextField}
                        multiline
                        rows="6"
                        label={text.note} />
                </FormRow>
            </FormRoot>

            <FormActions
                text={text}
                deletable={deletable}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={false}
                submitting={submitting}
            />

        </form>
    )
}

const selector = formValueSelector('MaintenanceForm');

const MaintenanceForm = reduxForm({
    form: 'MaintenanceForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? MAINTENANCE_CREATED : MAINTENANCE_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(MaintenanceFormBase)


export default connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        date: selector(state, 'date'),
        type: selector(state, 'type'),

    })
)(MaintenanceForm);
