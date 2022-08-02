import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { DatePicker, FormTitle, Loading } from '../../components/core';
import { withRouter } from 'react-router-dom'
import { formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Divider } from '@mui/material';
import { signUser } from '../../actions/index';
import FormActions from '../../components/forms/FormActions'
import { buttonPrime, textField } from "../../utils/StyleUtils";
import DomainSelection from '../../modules/activity/DomainSelection';
import { endCrop } from "../../actions/DomainActions";
import { DOMAIN_END_CROP } from "../../actions/types";
import { newDate } from '../../utils';

const useStyles = makeStyles(theme => ({
    button: buttonPrime(theme),
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        padding: 20,
    },
    form: {
        flex: 1,
    },
    textField: textField(theme),
}));

const EndCropFormBase = (props) => {
    const classes = useStyles();

    const { touch, activityDomains, array, reset, history, exitRoute,
        handleSubmit, pristine, submitting, text, } = props;

    const [openFields, setOpenFields] = useState(false);
    const [expendFieldTable, setExpendFieldTable] = useState(false);

    const handleClickCloseFields = (selectedDomains) => {
        setOpenFields(false)

        touch("activityDomains");

        if (selectedDomains) {
            let alreadySelected = activityDomains.map(d => d.id);
            let newDomains = filter(selectedDomains, (domain) => alreadySelected.indexOf(domain.id) <= 0);
            newDomains.forEach(function (domain, index, arr) {
                array.unshift("activityDomains", domain);
            });
        }
    };

    const handleExpendFieldTable = () => {
        setExpendFieldTable(!expendFieldTable)
    };

    const handleFormSubmit = (data) => {
        console.log(data)
        const request = data;
        request.domains = request.activityDomains;
        request.activityDomains = null;
        return endCrop(request).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        reset();
        history.push(exitRoute);
    }


    const removerActivityDomain = (column, row, value, rowIndex) => {
        array.remove(`activityDomains`, rowIndex);

    }

    if (!activityDomains) {
        return <Loading />
    }

    let title = text.endCrop;

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
                <FormTitle title={title} />
                <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                    <DatePicker name='root'
                        label={text.end}
                        clearable={true}
                        {...props} />

                </div>
                <DomainSelection
                    activityType='END_CROP'
                    handleClickOpenFields={() => setOpenFields(!openFields )}
                    handleExpendFieldTable={handleExpendFieldTable}
                    text={text}
                    renderDomainSelections={true}
                    handleClickCloseFields={handleClickCloseFields}
                    activityDomains={activityDomains} expendFieldTable={expendFieldTable}
                    openFields={openFields}
                    cropID={null}
                    changeFieldActualSize={() => console.log('changeFieldActualSize')}
                    changeDomainTableColumn={removerActivityDomain}
                    activityArea={0}
                    {...props}
                />
                <Divider />
                <FormActions
                    text={text}
                    deletable={false}
                    cancelAction={cancelAction}
                    deleteAction={null}
                    pristine={pristine}
                    submitting={submitting}
                />
            </form>
        </div>
    )
}

const selector = formValueSelector('EndCropForm');

const EndCropForm = reduxForm({
    form: 'EndCropForm', // a unique identifier for this form
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(props.exitRoute);
        return dispatch({
            type: DOMAIN_END_CROP,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(EndCropFormBase)


export default withRouter(connect(
    state => ({
        initialValues: { root: newDate(), activityDomains: [] },
        activityDomains: selector(state, 'activityDomains'),
    }),
    { signUser })(EndCropForm));
