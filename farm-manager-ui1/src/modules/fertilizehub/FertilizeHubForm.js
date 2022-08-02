import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { FormControlLabel, Typography } from '@mui/material';

import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField, Checkbox } from '../../components/core/form/wrapper';
import { saveFertilizerHub } from '../../actions';

import FormActions from '../../components/forms/FormActions'
import { FormTitle, DatePicker } from "../../components/core";
import { CREATED, FERTILIZER_HUB_CREATED, FERTILIZER_HUB_UPDATED, } from "../../actions/types";
import { required } from "../../components/forms/ValidationUtil";
import { formStyle, } from "../../utils/FormStyle";
import { renderNameIdOptions } from "../../components/core/optionsUtil";


const useStyles = makeStyles(theme => formStyle(theme));


const FertilizeHubFormBase = (props) => {

    const classes = useStyles();

    const { handleSubmit, pristine, submitting, text,
        deleteFertilizerHub, waterSysAccounts, deletable, clearFertilizerHub,
        fertilizerOptions, id, cancelAction, account, hasValves } = props;



    function deleteAction() {
        clearFertilizerHub();
        deleteFertilizerHub(id);
    }



    const handleFormSubmit = (data) => {
        return saveFertilizerHub(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    let talgil = false;
    if (account && !account.account) {
        //  console.log(account);
        const selectedAccount = waterSysAccounts.find(e => e.id === account.id);
        if (selectedAccount && selectedAccount.type === 'TALGIL_ACCOUNT') {
            talgil = true
        }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <div className={classes.formRow}>
                    <FormTitle title={text.fertilizerHubs} />
                </div>
                <div className={classes.formRow}>
                    <Field name="name"
                        component={TextField}
                        label={text.name}
                        validate={required}
                    />
                    {!hasValves && <Field name="account.id"
                        select
                        fullWidth={true}
                        component={TextField}
                        label={text.source}
                        validate={required}
                        onChange={(e) => console.log(e)}
                    >
                        {renderNameIdOptions(waterSysAccounts)}
                    </Field>}
                    {hasValves && account &&
                        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Typography >{account.value}</Typography>
                        </div>}
                </div>
                {talgil && <div className={classes.formRow2}>
                    <Typography >
                        {text.lineFertilizer}
                    </Typography>
                </div>}
                <div className={classes.formRow}>
                    <Field name="fertilizer1.id"
                        select
                        fullWidth={true}
                        component={TextField}
                        label={`${text.fertilizer} ${1}`}
                    >
                        {renderNameIdOptions(fertilizerOptions, true)}
                    </Field>
                    <Field name="fertilizer2.id"
                        select
                        fullWidth={true}

                        component={TextField}
                        label={`${text.fertilizer} ${2}`}
                    >
                        {renderNameIdOptions(fertilizerOptions, true)}
                    </Field>
                    <Field name="fertilizer3.id"
                        select
                        fullWidth={true}

                        component={TextField}
                        label={`${text.fertilizer} ${3}`}
                    >
                        {renderNameIdOptions(fertilizerOptions, true)}
                    </Field>
                    {!talgil &&
                        <Field name="fertilizer4.id"
                            select
                            fullWidth={true}
                            component={TextField}
                            label={`${text.fertilizer} ${4}`}
                        >
                            {renderNameIdOptions(fertilizerOptions, true)}
                        </Field>
                    }
                </div>

                {talgil &&
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                        <div className={classes.formRow}>
                            <Field name="fertilizer4.id"
                                select
                                fullWidth={true}
                                component={TextField}
                                label={`${text.fertilizer} ${4}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                            <Field name="fertilizer5.id"
                                select
                                fullWidth={true}

                                component={TextField}
                                label={`${text.fertilizer} ${5}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                            <Field name="fertilizer6.id"
                                select
                                fullWidth={true}

                                component={TextField}
                                label={`${text.fertilizer} ${6}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                        </div>
                        <div className={classes.formRow2}>
                            <Typography >
                                {text.centralFertilizer}
                            </Typography>
                        </div>
                        <div className={classes.formRow}>
                            <Field name="centralFertilizer1.id"
                                select
                                fullWidth={true}
                                component={TextField}
                                label={`${text.fertilizer} ${1}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                            <Field name="centralFertilizer2.id"
                                select
                                fullWidth={true}

                                component={TextField}
                                label={`${text.fertilizer} ${2}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                            <Field name="centralFertilizer3.id"
                                select
                                fullWidth={true}

                                component={TextField}
                                label={`${text.fertilizer} ${3}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>

                        </div>

                        <div className={classes.formRow}>
                            <Field name="centralFertilizer4.id"
                                select
                                fullWidth={true}
                                component={TextField}
                                label={`${text.fertilizer} ${4}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                            <Field name="centralFertilizer5.id"
                                select
                                fullWidth={true}

                                component={TextField}
                                label={`${text.fertilizer} ${5}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                            <Field name="centralFertilizer6.id"
                                select
                                fullWidth={true}

                                component={TextField}
                                label={`${text.fertilizer} ${6}`}
                            >
                                {renderNameIdOptions(fertilizerOptions, true)}
                            </Field>
                        </div>
                    </div>}

                <div className={classes.formRow}>
                    <DatePicker name='validThrough'
                        label={text.validThrough}
                        clearable={true}
                        {...props} />
                    <FormControlLabel
                        control={<Field color="primary"
                            name="active" component={Checkbox} />}
                        label={text.active} />
                </div>
                <FormActions
                    text={text}
                    deletable={deletable}
                    cancelAction={cancelAction}
                    pristine={pristine}
                    deleteAction={deleteAction}
                    submitting={submitting}





                />

            </div>
        </form>
    )
}



const FertilizeHubForm = reduxForm({
    form: 'FertilizeHubForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? FERTILIZER_HUB_CREATED : FERTILIZER_HUB_UPDATED,
            payload: response.data
        });


    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(FertilizeHubFormBase)

const selector = formValueSelector('FertilizeHubForm');

export default connect(
    state => ({
        deletable: selector(state, 'deletable'),
        account: selector(state, 'account'),
        id: selector(state, 'id'),
    })
    ,
    {})(FertilizeHubForm);
