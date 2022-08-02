import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField } from '../../../components/core/form/wrapper';
import { Divider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem'
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { CREATED, RISK_CREATED, RISK_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { saveRisk } from "../../../actions/RiskAssessmentActions";

const useStyles = makeStyles(theme => formStyle(theme));


function renderSpace() {
    return (
        <div>
            <div style={{ height: 30 }} />
            <Divider />
            <div style={{ height: 30 }} />
        </div>
    )
}

let RiskForm = (props) => {

    const classes = useStyles();
    const { deleteRisk, id, handleSubmit, pristine, submitting, text, deletable, riskLists, riskTypes, selectRisk } = props;

    useEffect(() => {
        return () => {
            cancelAction()
        }
    }, [])

    const handleFormSubmit = (data) => {
        return saveRisk(data).catch((error) => {
            if (error) {
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        selectRisk(null);
    }

    const deleteAction = () => {
        cancelAction();
        deleteRisk(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.risks} />
                <Field name="list"
                    select
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.list}>
                    {
                        riskLists.map(element => (
                            <MenuItem key={element} value={element}>{text[element]}</MenuItem>))
                    }
                </Field>
                <Field name="type"
                    select
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.type}>
                    {
                        riskTypes.map(element => (
                            <MenuItem key={element} value={element}>{text[element]}</MenuItem>))
                    }
                </Field>
                {renderSpace()}
                <Field name="categoryhe"
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.category + ' (HE)'}
                    placeholder={text.category + ' (HE)'} />
                <Field name="categoryen"
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.category + ' (EN)'}
                    placeholder={text.category + ' (EN)'} />

                <Field name="categoryes"
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.category + ' (ES)'}
                    placeholder={text.category + ' (ES)'} />
                <Field name="categorynl"
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.category + ' (NL)'}
                    placeholder={text.category + ' (NL)'} />
                <Field name="categorypt"
                    style={{ flex: 1 }}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.category + ' (PT)'}
                    placeholder={text.category + ' (PT)'} />
                {renderSpace()}
                <Field name="descriptionhe"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.description + ' (HE)'}
                    placeholder={text.description + ' (HE)'} />
                <Field name="descriptionen"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.description + ' (EN)'}
                    placeholder={text.description + ' (EN)'} />
                <Field name="descriptiones"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.description + ' (ES)'}
                    placeholder={text.description + ' (ES)'} />
                <Field name="descriptionnl"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.description + ' (NL)'}
                    placeholder={text.description + ' (NL)'} />
                <Field name="descriptionpt"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.description + ' (PT)'}
                    placeholder={text.description + ' (PT)'} />
                {renderSpace()}
                <Field name="preventionhe"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.prevention + ' (HE)'}
                    placeholder={text.prevention + ' (HE)'} />
                <Field name="preventionen"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.prevention + ' (EN)'}
                    placeholder={text.prevention + ' (EN)'} />
                <Field name="preventiones"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.prevention + ' (ES)'}
                    placeholder={text.prevention + ' (ES)'} />
                <Field name="preventionnl"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.prevention + ' (NL)'}
                    placeholder={text.prevention + ' (NL)'} />
                <Field name="preventionpt"
                    style={{ flex: 1 }}
                    multiline
                    rows={4}
                    component={TextField}
                    className={classes.textField}
                    validate={required}
                    label={text.prevention + ' (PT)'}
                    placeholder={text.prevention + ' (PT)'} />
            </div>
            <FormActions
                text={text}
                deletable={deletable}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}
const selector = formValueSelector('RiskForm');

RiskForm = reduxForm({
    form: 'RiskForm',
    onSubmitSuccess: (response, dispatch, props) => {
        console.log('RiskForm,', response);
        return dispatch({
            type: CREATED === response.status ? RISK_CREATED : RISK_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(RiskForm)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
    })
)(RiskForm));
