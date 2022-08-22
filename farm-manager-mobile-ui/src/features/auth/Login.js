import { Box, Button, InputAdornment, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import LoginOutlined from '@mui/icons-material/LoginOutlined';

import LogoLeaf from "../../icons/LogoLeaf";
import { useLoginMutation } from "./authApiSlice";
import { DEFAULT_ROUTE } from "../../App";
import { useEffect } from "react";

const Login = (props) => {




      
    const navigate = useNavigate()

    const [login] = useLoginMutation()

    const { handleSubmit, control } = useForm();


    const user = useWatch({ name: 'username', control });
    const pwd = useWatch({ name: 'password', control });



    const onSubmit = async (e) => {
        console.log(e)
        try {
            const loginData = await login(e).unwrap()
            console.log('loginData',loginData)
            localStorage.setItem('token', loginData.token)
            const token = localStorage.getItem('token');
            console.log(' onSubmit token',token)
            navigate(DEFAULT_ROUTE)
        } catch (err) {

            console.log(err);
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
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