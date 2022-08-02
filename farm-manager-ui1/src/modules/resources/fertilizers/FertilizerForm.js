import React from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import {
    CREATED, FERTILIZER_CREATED,
    FERTILIZER_UPDATED
} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { saveResource } from "../../../actions/ResourceActions";
import { renderTranslatableOptions, renderPerUnitOptions, renderTypeOptions, renderNameIdOptions } from "../../../components/core/optionsUtil";
import { FERTILIZER_UNITS } from "../../../utils/Units";
import { isArrayEmpty } from '../../../components/filters/filterUtil';
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const FertilizerFormBase = (props) => {

    const classes = useStyles();


    const {
        handleSubmit, pristine, submitting, text, id, deletable, deleteFertilizer, clearResource, isAdmin, languages, selectLocale,
        compounds,
    } = props;

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
        deleteFertilizer(id);
    }




    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.fertilizer} />
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
                        name="category"
                        select
                        component={TextField}
                        validate={required}
                        className={classes.textField}
                        label={text.type}>
                        {renderTypeOptions(['LIQUID', 'SOLID'], text)}
                    </Field>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="specificGravity"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        label={text.specificGravity}
                        validate={required}
                        component={TextField}
                    />

                    <Field name="code"
                        style={{ flex: 1 }}


                        component={TextField}
                        className={classes.textField}
                        label={text['code']} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="k"
                        type="number"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        validate={required}
                        label="K"
                        component={TextField}
                    />
                    <Field
                        name="p"
                        type="number"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        validate={required}
                        label="P"
                        component={TextField}
                    />

                    <Field
                        name="n"
                        type="number"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        validate={required}
                        label="N"
                        component={TextField}
                    />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        style={{ flex: 1 }}
                        name="usageUnit"
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.usageUnit}>
                        {renderPerUnitOptions(FERTILIZER_UNITS, text)}
                    </Field>
                    <Field
                        style={{ flex: 1 }}
                        name="inventoryUnit"
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.inventoryUnit}>
                        {renderPerUnitOptions(FERTILIZER_UNITS, text)}
                    </Field>
                    {selectLocale === true &&
                        <Field name="locale"
                            style={{ flex: 1 }}
                            select
                            component={TextField}
                            className={classes.textField}
                            validate={required}
                            label={text.language}>
                            {renderTranslatableOptions(languages, text)}
                        </Field>
                    }
                    {!isArrayEmpty(compounds) &&
                        <Field name={`compoundId`}
                            style={{ flex: 1 }}
                            select
                            component={TextField}
                            className={classes.textField}
                            label={text.microElements}
                        >
                            {renderNameIdOptions(compounds.filter(e => e.active), true)}
                        </Field>
                    }
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

const selector = formValueSelector('FertilizerForm');

let FertilizerForm = reduxForm({
    form: 'FertilizerForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? FERTILIZER_CREATED : FERTILIZER_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(FertilizerFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(FertilizerForm));
