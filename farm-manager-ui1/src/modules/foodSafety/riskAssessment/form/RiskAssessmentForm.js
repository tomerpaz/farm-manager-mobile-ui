import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import MenuItem from '@mui/material/MenuItem'
import { Divider } from '@mui/material';
import Autocomplete from "../../../../components/core/form/wrapper/Autocomplete";
import FormActions from '../../../../components/forms/FormActions'
import { TextField } from '../../../../components/core/form/wrapper';
import { withRouter } from 'react-router-dom'
import { required, requiredArray } from "../../../../components/core/form/validation";
import { DatePicker, FormTitle } from "../../../../components/core";
import { TopBackBar, AddButton } from "../../../../components";
import AssessmentRiskTable from './AssessmentRiskTable';
import { buttonPrimeSmall, spacer, textField } from "../../../../utils/StyleUtils";
import { FOOD_SAFETY_RISKS } from "../../../../components/frame/Routes";
import { BORDER_COLOR, BORDER_COLOR_DARK } from "../../../../App";
import { controlsNoMarginStyle, sectionTitle } from "../../../activity/activityStyle";
import Loading from "../../../../components/core/util/Loading";
import { CREATED, RISK_ASSESSMENT_CREATED, RISK_ASSESSMENT_UPDATED, SET_MESSAGE } from "../../../../actions/types";
import { WORKER } from "../../../../reducers/ResourceReducer";
import { deleteRiskAssessment, getListRisks, saveRiskAssessment } from "../../../../actions/RiskAssessmentActions";
import { getSuggestionsNameElement } from "../../../../components/core/optionsUtil";
import { scrollToFirstError } from "../../../../components/core/form/FormUtil";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    form: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },

    section: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: theme.palette.common.white,
        border: '1px solid ' + BORDER_COLOR,
        borderRadius: 4,
        marginTop: 20,
    },


    title: sectionTitle(theme),
    button: {
        borderColor: BORDER_COLOR_DARK,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.common.white,
        fontWeight: 700,
        textTransform: 'none',
    },
    controls: controlsNoMarginStyle(theme),

    table: {
        flex: 1,
        margin: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },

    chooseButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

    },

    marginTop: {
        marginTop: theme.spacing(2),
    },

    textField: textField(theme),

    riskListTextField: textField(theme, 400),

    buttonSmall: buttonPrimeSmall(theme),
    flexRow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        alignItems: 'center',
        minWidth: 150,
        paddingTop: theme.spacing(2),
    }

}));


let RiskAssessmentForm = (props) => {

    const classes = useStyles();
    const { id, handleSubmit, pristine, submitting, text, deletable, isAdmin, initialValues,
        riskAssessment, riskLists, lang, risks, executorOptions, cropOptions, fields,
        getRiskAssessment, setRiskAssessment, match: { params }, duplicate, list, change, dir,
        history, dispatch } = props;


    const [listChanged, setListChanged] = useState(false);


    useEffect(() => {
        if (listChanged) {
            setListChanged(false);
            if (list) {
                getListRisks(list).then(response => {
                    const risks = response.data.map(risk => (
                        {
                            risk: risk,
                            status: 'DONE',
                            severity: 'LOW',
                            probability: 'LOW'
                        }
                    ));
                    change('risks', risks)
                });
            }
        }
    }, [listChanged]);

    const changeRiskAssessmentItemColumn = (column, value, rowData, rowIndex) => {
        change(`risks[${rowIndex}].${column}`, value);
    }


    const handleFormSubmit = (data) => {
        data.fields = null;
        data.crops = null;
        if (data.selectedExecutor) {
            data.resource = data.selectedExecutor.element;
        }
        if (data.selectedCropOptions) {
            data.crops = data.selectedCropOptions.map(e => e.id);
        }
        if (data.selectedFieldOptions) {
            data.fields = data.selectedFieldOptions.map(e => e.id);
        }
        return saveRiskAssessment(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        history.push(FOOD_SAFETY_RISKS);
    }

    const deleteAction = () => {

        deleteRiskAssessment(id).then(response => {

            const { data: { status, count, resultMessage } } = response;
            let message = resultMessage;
            if (status === 'OK') {
                if (count === 1) {
                    message = text.recordDeleted;
                } else if (count > 1) {
                    message = `${count} ${text.recordsDeleted}`;
                }
                cancelAction();
            }
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
        })

    }

    if (!riskAssessment) {
        return (
            <Loading />
        )
    }

    const fieldOptions = fields.filter(e => e.active).map(e => getSuggestionsNameElement(e, 'field'));

    const executorOptionsNoGroups = executorOptions.filter(e => e.element.type === WORKER);
    return (
        <div className={classes.container}>
            <TopBackBar dir={dir} label={`${text.backTo}${text.riskAssessment}`} history={history} />
            <form className={classes.form} onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={classes.section}>
                    <div className={classes.title}>
                        <FormTitle title={text.riskAssessment} />
                    </div>
                    <Divider />
                    <div className={classes.flexRow}>
                        <Field name="list"
                            select
                            component={TextField}
                            className={classes.riskListTextField}
                            validate={required}
                            onChange={() => setListChanged(true)}
                            label={text.type}>

                            {
                                riskLists.map(element => (
                                    <MenuItem key={element} value={element}>{text[element]}</MenuItem>))
                            }
                        </Field>
                        <DatePicker name='date'
                            label={text.date}

                            validate={required}
                            {...props} />

                        <div >
                            <Field name="selectedExecutor"
                                fullWidth={false}
                                isMulti={false}
                                width= {250}
                                component={Autocomplete}
                                className={classes.textField}
                                label={text.executor}
                                placeholder={text.executor}
                                options={executorOptionsNoGroups}
                                validate={required}
                                requiredText={text.required}
                            />
                        </div>


                    </div>
                    <div className={classes.flexRow}>

                        {'ProductAssessment' === list &&

                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }} >
                                <Field name="selectedCropOptions"
                                    closeMenuOnSelect={false}
                                    fullWidth={true}
                                    isMulti={true}
                                    component={Autocomplete}
                                    className={classes.textField}
                                    label={text.crops}
                                    placeholder={text.crops}
                                    options={cropOptions}
                                    validate={requiredArray}
                                    requiredText={text.required}
                                />
                                <AddButton
                                    onClick={() => change('selectedCropOptions', cropOptions)}
                                    label={text.allCrops} />
                            </div>
                        }


                        {'FieldAssessment' === list &&
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }} >
                                <Field name="selectedFieldOptions"
                                    closeMenuOnSelect={false}
                                    fullWidth={true}
                                    isMulti={true}
                                    component={Autocomplete}
                                    className={classes.textField}
                                    label={text.fields}
                                    placeholder={text.fields}
                                    options={fieldOptions}
                                    validate={requiredArray}
                                    requiredText={text.required}
                                />
                                <AddButton
                                    onClick={() => change('selectedFieldOptions', fieldOptions)}
                                    label={text.allFields} />
                            </div>
                        }
                    </div>

                </div>
                <div className={classes.section}>
                    <div className={classes.table}>
                        <AssessmentRiskTable risks={risks} text={text} lang={lang}
                            changeRiskAssessmentItemColumn={changeRiskAssessmentItemColumn} />
                    </div>
                </div>
                <FormActions
                    text={text}
                    deletable={deletable}
                    cancelAction={cancelAction}
                    deleteAction={deleteAction}
                    pristine={false}
                    submitting={submitting}
                />
            </form>
        </div>
    )
}

const selector = formValueSelector('RiskAssessmentForm');

RiskAssessmentForm = reduxForm({
    form: 'RiskAssessmentForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(FOOD_SAFETY_RISKS);
        return dispatch({
            type: CREATED === response.status ? RISK_ASSESSMENT_CREATED : RISK_ASSESSMENT_UPDATED,
            payload: response.data
        });


    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(errors);
        scrollToFirstError(errors);

    }
})(RiskAssessmentForm)


export default withRouter(connect(
    state => ({
        initialValues: state.riskAssessment.riskAssessment,
        deletable: selector(state, 'deletable'),
        list: selector(state, 'list'),
        id: selector(state, 'id'),
        risks: selector(state, 'risks'),
    })
    ,
    {})(RiskAssessmentForm));
