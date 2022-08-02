import React from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle, renderNameIdOptions } from "../../../components/core";
import { CREATED, EXECUTOR_CREATED, EXECUTOR_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { FormRoot, FormRow } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderPerUnitOptions, renderTypeOptions } from "../../../components/core/optionsUtil";
import { CONTRACTOR, EXECUTOR_TYPES } from "../../../reducers/ResourceReducer";
import { typeDisabled } from "../../../components/core/form/FormUtil";
import { EXECUTOR_UNITS } from "../../../utils/Units";
import { Box } from '@mui/material';
import { isArrayEmpty } from '../../../components/filters/filterUtil';


const ExecutorsFormBase = (props) => {

    const { clearResource, deleteExecutor, id, handleSubmit, pristine, submitting, deletable, text, type, areaUnit, isAdmin, genericTags } = props

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
        deleteExecutor(id);
    }

    const disabled = typeDisabled(id, deletable);

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormRoot>
                <FormTitle title={text.executor} />
                <FormRow>
                    <Field name="name"
                        component={TextField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field
                        name="type"
                        disabled={disabled}
                        select
                        component={TextField}
                        label={text.type}>
                        {renderTypeOptions(EXECUTOR_TYPES, text)}
                    </Field>
                </FormRow>
                <FormRow>
                    <Field
                        name="engName"
                        label={text.engName}
                        component={TextField}
                    />
                    <Field
                        name="identification"
                        label={text.businessIdentification}
                        component={TextField}
                    />
                </FormRow>
                <FormRow>
                    <Field
                        name="attribute1"
                        label={text.phone}
                        component={TextField}
                    />

                    <Field name="email"
                        component={TextField}
                        label={text.email} />
                </FormRow>
                <FormRow>
                    <Field name="address"
                        component={TextField}
                        multiline
                        rows="2"
                        label={text.address} />
                    <Field name="description"
                        component={TextField}
                        multiline
                        rows="2"
                        label={text.note} />
                </FormRow>
                <FormRow>
                    <Field
                        name="usageUnit"
                        select
                        component={TextField}
                        validate={required}
                        label={text.unit}>
                        {renderPerUnitOptions(EXECUTOR_UNITS, text, areaUnit)}
                    </Field>
                    <Field name="code"
                        component={TextField}
                        label={text.code} />
                   {! isArrayEmpty(genericTags) && <Field name="tagId"
                        select
                        component={TextField}
                        label={text.tag}
                    >
                        {renderNameIdOptions(genericTags, true)}
                    </Field>}
                </FormRow>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </Box>
                {type === CONTRACTOR &&
                    <Box margin={1}>
                        <FormControlLabel
                            control={<Field color="primary" name="prime" component={Checkbox} />}
                            label={text.primeContractor} />
                    </Box>
                }

            </FormRoot>
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

const selector = formValueSelector('ExecutorsForm');

let ExecutorsForm = reduxForm({
    form: 'ExecutorsForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? EXECUTOR_CREATED : EXECUTOR_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ExecutorsFormBase)

export default ExecutorsForm = connect(
    state => ({
        deletable: selector(state, 'deletable'),
        type: selector(state, 'type'),
        id: selector(state, 'id'),
    })
)(ExecutorsForm);
