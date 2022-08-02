import React from 'react';
import { styled, } from '@mui/material/styles';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import LeafLogo from "../../icons/LeafLogo";
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Button, Typography} from '@mui/material';
import { directSignUser, getGlobalData } from '../../actions';
import { TextField } from '../core/form/wrapper';
import { AUTH_ERROR, AUTH_USER } from "../../actions/types";
import { BORDER_COLOR } from "../../App";
import { required } from "./ValidationUtil";
import MadeInIsrael from '../../icons/MadeInIsrael';
import { Box } from '@mui/system';


const Form = styled('form')(({ theme }) => ({
    marginTop: theme.spacing(12),
    width: 350,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    border: '1px solid ' + BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4)
  }));


const validate = values => {
    const errors = {}
    const requiredFields = ['username', 'password']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const SigninFormBase = (props) => {


    const { handleSubmit, text, recoverPassword, username, authError } = props;
    const InputLabelProps = { shrink: true, };

    const handleFormSubmit = (data) => {

        return directSignUser(data).catch((error) => {
            if (error) {
                //console.log(error);
                throw new SubmissionError(error)
            }
        });
    }
    return (

        <Box  display={'flex'} flex='1' alignItems='center' justifyContent='center'>
            <Form
                onSubmit={handleSubmit(handleFormSubmit)}>
                <LeafLogo color='primary' fontSize={'medium'} />
                <Typography variant='h5' fontWeight='bold' whiteSpace='nowrap'>
                    {text.welcome}
                </Typography>
                <div style={{ color: 'red', margin: 10 }}>
                    {text[authError]}
                </div>
                <Field name="username"
                    component={TextField}
                    InputLabelProps={InputLabelProps}
                    width={'100%'}
                    validate={required}
                    label={text.username}
                    placeholder={text.username} />
                <Field name="password"
                    type="password"
                    InputLabelProps={InputLabelProps}
                    component={TextField}
                    width={'100%'}
                    validate={required}
                    label={text.password}
                    placeholder={text.password} />

                <Button type="submit" variant='contained' disableElevation={true} color="primary"  style={{ width: '100%', marginTop: 20 }}>
                    {props.text.login}
                </Button>
                {text.lang === 'he'&&<MadeInIsrael width={110} />}
                {/* <Button disabled={false} onClick={()=> recoverPassword(username)} size="small" color="secondary" >{text.forgotPassword}</Button> */}
            </Form>
        </Box>
    )
}

const selector = formValueSelector('SigninForm');

let SigninForm = reduxForm({
    form: 'SigninForm',
    validate,
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: AUTH_USER,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {        
        dispatch({
            type: AUTH_ERROR,
            payload: props.errors.response.data.message
        });


    }
})(SigninFormBase)
SigninForm = withRouter(connect(
    state => ({
        username: selector(state, 'username'),
    })
    , { getGlobalData })(SigninForm));
export default SigninForm;

