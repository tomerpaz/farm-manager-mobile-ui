import { Box, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";
import LogoLeaf from "../icons/LogoLeaf";

const Login = (props) => {

    let navigate = useNavigate();

    const login = () => {
		localStorage.setItem("token", JSON.stringify({token: "token"}));
        console.log('login')
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
            

        >

            <Box marginTop={10}
                flex={1}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'column'}>
                <LogoLeaf color='primary' fontSize={'large'} />
                <TextField
                    required
                    name={'username'}
                    id="outlined-required"
                    label="User Name"
                    defaultValue=""
                />
                {/* <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                /> */}
                <TextField
                    id="outlined-password-input"
                    name={'password'}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />

                <Button fullWidth={true} size='large' onClick={login} disableElevation variant="contained">Login</Button>
            </Box>
        </Box>


    )
}
export default Login;