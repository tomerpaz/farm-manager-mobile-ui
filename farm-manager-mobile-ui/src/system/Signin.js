import { Box, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";
import LogoLeaf from "../icons/LogoLeaf";

const Signin = (props) => {

    let navigate = useNavigate();

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
            marginTop={'20%'}

        >

            <Box
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

                <Button fullWidth={true} size='large' onClick={() => navigate("/map")} disableElevation variant="contained">Signin</Button>
            </Box>
        </Box>


    )
}
export default Signin;