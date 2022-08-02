import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { SubmitConfirmation, TopBackBar } from '../../components'
import { ContainedButton, FormTitle, OutlinedButton } from '../../components/core';
import { withRouter } from 'react-router-dom'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { TextField } from '../../components/core/form/wrapper';
import { formStyle, } from "../../utils/StyleUtils";
import { OVERVIEW_TABS } from "../../components/frame/Routes";
import Loading from "../../components/core/util/Loading";
import { splitDomain } from "../../actions/DomainActions";
import { DOMAIN_SPLITTED } from "../../actions/types";
import { required } from "../../components/core/form/validation";

const useStyles = makeStyles(theme => formStyle(theme));

let maxArea = 0;

const maxValue = (value) =>
    value && value >= maxArea ? `${maxArea}` : undefined

const DomainSplitFormBase = (props) => {

    const classes = useStyles();

    const { match, selectDomain, getDomain, handleSubmit, pristine, submitting, text, dir, history, selectedDomain, match: { params: { subTab } },
    } = props;

    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        selectDomain(null);
        getDomain(match.params.id);
        return () => {
            selectDomain(null);
            maxArea = 0;
        }
    }, [])


    const handleFormSubmit = (data) => {
        setShowWarning(false);

        maxArea = -1;
        return splitDomain(selectedDomain.id, data.splitSize).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });

    }

    const cancelAction = () => {
        history.push(`${OVERVIEW_TABS}${subTab}`);
    }

    if (maxArea < 0 || !selectedDomain) {
        return (
            <Loading />
        )
    }

    maxArea = selectedDomain.plantArea;

    const alias = selectedDomain.alias ? ` (${selectedDomain.alias}) ` : '';
    return (
        <div className={classes.formFrame} style={{ backgroundColor: 'white' }}>
            <TopBackBar dir={dir} label={`${text.back}`} history={history} />
            <form className={classes.root} >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 50 }}>
                    <FormTitle title={`${text.splitField}: ${selectedDomain.field.name} ${alias} -  ${selectedDomain.variety.category}/${selectedDomain.variety.name}`} />
                    <Field
                        style={{ maxWidth: 350 }}
                        name="splitSize"
                        type="number"
                        className={classes.textField}
                        label={`${text.maxSplitArea}: ${selectedDomain.plantArea}`}
                        component={TextField}
                        validate={[required, maxValue]}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ContainedButton
                        disabled={pristine || submitting}
                        onClick={() => setShowWarning(true)}
                    >
                        {text.save}
                    </ContainedButton>
                    <OutlinedButton
                        onClick={cancelAction}
                    >
                        {text.cancel}
                    </OutlinedButton>
                </div>
                <SubmitConfirmation open={showWarning}
                    text={text}
                    onSubmit={handleSubmit(handleFormSubmit)}
                    pristine={pristine}
                    submitting={submitting}
                    cancel={() => setShowWarning(false)}
                    title={text.plantField}
                    body={text.splitWarning}
                />

            </form>
        </div>
    )
}

let DomainSplitForm = reduxForm({
    form: 'DomainSplitForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(`${OVERVIEW_TABS}${props.match.params.subTab}`);

        console.log('onSubmitSuccess', response.data)
        return dispatch({
            type: DOMAIN_SPLITTED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);

    }
})(DomainSplitFormBase)

export default withRouter(connect()(DomainSplitForm));
