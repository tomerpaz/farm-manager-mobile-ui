import { Box, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import LogoLeaf from "../icons/LogoLeaf";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from '../data/slices/fieldSlice'

const Login = (props) => {

    let navigate = useNavigate();

    const count = useSelector((state) => state.field.value)
    const dispatch = useDispatch()

    const { handleSubmit, control } = useForm();



    console.log('count',count)

    const onSubmit = data => {
        console.log('data', data);
        login();
    };

    const login = () => {
        localStorage.setItem("token", JSON.stringify({ token: "token" }));
        console.log('login')

        dispatch(increment())
        navigate("/map");
    }
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

            <Box marginTop={10}
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
                            label="User Name"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
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
                            label="Password"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            type="password"
                            autoComplete="current-password"
                        />
                    )}
                    rules={{ required: 'Password required' }}
                />


                <Button type="submit" fullWidth={true} size='large' disableElevation variant="contained">Login</Button>
            </Box>
        </Box>


    )
}
export default Login;