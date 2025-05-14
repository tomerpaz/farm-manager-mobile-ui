import { useState } from 'react'
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import LoginOutlined from '@mui/icons-material/LoginOutlined';

import LogoLeaf from "../../icons/LogoLeaf";
import { useLoginMutation } from "./authApiSlice";
import { DEFAULT_ROUTE } from "../../App";
import { selectLang, setCredentials, setLang } from "../app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserLang } from '../../router/UserRoutes';

const Login = (props) => {


    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [login] = useLoginMutation()

    const text = useSelector(selectLang)

    const { handleSubmit, control } = useForm();


    // const user = useWatch({ name: 'username', control });
    // const pwd = useWatch({ name: 'password', control });

    const onSubmit = async (e) => {
        setErrorMsg(null)
        try {
            const loginData = await login(e).unwrap()
            dispatch(setCredentials(loginData))
            navigate(DEFAULT_ROUTE)
        } catch (err) {

            dispatch(setLang(getUserLang(text.lang)));
            if (err?.data?.message) {
                setErrorMsg(err?.data?.message)
            }


            // if (!err?.originalStatus) {
            //     // isLoading: true until timeout occurs
            //     setErrMsg('No Server Response');
            // } else if (err.originalStatus === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.originalStatus === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
        }

    };


    return (


        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiButton-root': { m: 1, width: '26ch' },
            }}

            noValidate
            autoComplete="off"
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-around'}
            alignContent={'space-around'}
            alignItems={'center'}

            flex={1}
            onSubmit={handleSubmit(onSubmit)}

        >
            <Box
                marginTop={15}
                flex={1}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'column'}>
                <LogoLeaf color='primary' fontSize={'large'} />
                {errorMsg && <Typography color='error'>{text[errorMsg] ? text[errorMsg] : errorMsg}</Typography>}
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (

                        <TextField
                            // label="User Name"
                            error={!!error}
                            //      helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }
                            }}

                        />
                    )}
                    rules={{ required: 'Username required' }}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (

                        <TextField
                            // label="Password"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            //  helperText={error ? error.message : null}
                            type="password"
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordOutlined />
                                    </InputAdornment>
                                ),
                            }}
                        />


                    )}
                    rules={{ required: 'Password required' }}
                />



                <Button type="submit" size='large' fullWidth disableElevation variant="contained"><LoginOutlined /></Button>
            </Box>
        </Box>


    )
}
export default Login;