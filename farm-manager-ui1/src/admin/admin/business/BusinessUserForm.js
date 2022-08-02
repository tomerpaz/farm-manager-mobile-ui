import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField, Checkbox } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import {
    BUSINESS_USER_CREATED, BUSINESS_USER_UPDATED, CREATED,
} from "../../../actions/types";
import { required, passwordValidation, requiredEmailValidation, userNameValidation } from "../../../components/forms/ValidationUtil";
import { FormRoot, FormRow, SB, } from "../../../utils/StyleUtils";

import { saveBusinessUser } from "../../../actions";
import { renderNamValueOptions, renderTranslatableOptions } from "../../../components/core/optionsUtil";
import { FormControlLabel, MenuItem } from '@mui/material';


const BusinessUserFormBase = (props) => {


    const { selectBusinessUser, deleteBusinessUser, id,
        handleSubmit, pristine, submitting, deletable, text,
        userTypes, selectedBusiness, editable, businessUsers, username, newUser,

    } = props;

    const handleFormSubmit = (data) => {
        return saveBusinessUser(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    useEffect(() => {
        return () => {
            cancelAction();
        }
    }, [])



    const cancelAction = () => {
        selectBusinessUser(null);
    }

    const deleteAction = () => {
        deleteBusinessUser(id);
    }





    const managers = businessUsers.filter(e => e.username !== username && e.role === 'approver').map(e => ({
        value: e.username,
        name: `${e.firstName} ${e.lastName}`
    }));

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormRoot>
                <FormRow>
                    <Typography margin={1} variant="h6" gutterBottom>
                        {text.user}
                    </Typography>
                    <Typography margin={1} variant="subtitle1" gutterBottom>
                        {selectedBusiness.name}
                    </Typography>
                </FormRow>
                <FormRow js={SB}>

                    {newUser && <Field name="username"
                        component={TextField}
                        label={text.username}
                        validate={userNameValidation}
                        disabled={newUser !== true}
                    />}
                    {!newUser &&
                        <Box margin={1} >
                            {username}
                        </Box>}

                    <Field name="role"
                        width={200}
                        select
                        component={TextField}
                        validate={required}
                        label={text.type}>
                        {renderTranslatableOptions(userTypes, text)}
                    </Field>
                </FormRow>
                <FormRow>

                    <Field name="pwd"
                        component={TextField}
                        label={text.password}
                        validate={passwordValidation}
                    />
                    <Field name="email"
                        component={TextField}
                        label={text.email}
                        validate={requiredEmailValidation}
                    />
                </FormRow>
                <FormRow>

                    <Field name="firstName"
                        component={TextField}
                        label={text.firstName}
                        validate={required}
                    />
                    <Field name="lastName"
                        component={TextField}
                        label={text.lastName}
                        validate={required}
                    />
                </FormRow>
                <FormRow>

                    <Field name="phone"
                        component={TextField}
                        label={text.phone}
                        validate={required}
                    />

                    <Field name="groupName"
                        component={TextField}

                        label={"Group"}
                    />


                    {managers.length > 0 &&
                        <Field name="manager"
                            width={200}
                            select
                            component={TextField}
                            label={text.approver}>
                            {renderNamValueOptions(managers, null, true)}
                        </Field>}
                </FormRow>
                <FormRow>
                    <Field name="inactiveAlert"
                        width={120}
                        select
                        component={TextField}
                        label={text.notification}>
                        <MenuItem value={''}><em>{`${text.days}`}</em></MenuItem>
                        <MenuItem value={30}>{text.month}</MenuItem>
                        <MenuItem value={60}>2 {text.months}</MenuItem>
                        <MenuItem value={90}>3 {text.months}</MenuItem>
                        <MenuItem value={180}>6 {text.months}</MenuItem>
                    </Field>
                    <FormControlLabel
                        control={<Field color="primary"
                            name="active" component={Checkbox} />}
                        label={text.active} />
                </FormRow>
            </FormRoot>
            <FormActions
                text={text}
                deletable={deletable}
                editable={editable}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}


const selector = formValueSelector('BusinessUserForm');

let BusinessUserForm = reduxForm({
    form: 'BusinessUserForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? BUSINESS_USER_CREATED : BUSINESS_USER_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props.errors.response.data.message);
    }
})(BusinessUserFormBase)

BusinessUserForm = withRouter(connect(
    state => ({
        username: selector(state, 'username'),
        deletable: selector(state, 'deletable'),
        editable: selector(state, 'editable'),
        newUser: selector(state, 'newUser'),
        id: selector(state, 'id'),
    })
)(BusinessUserForm));
export default BusinessUserForm;
