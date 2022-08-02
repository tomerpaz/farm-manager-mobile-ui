import { Checkbox, FormControlLabel, Box } from '@mui/material';

const CheckboxBase = (props) => {
    const sideMargin = props.sideMargin ? props.sideMargin : 0
    return (
        <Box marginLeft={sideMargin} marginRight={sideMargin}>
            <FormControlLabel sx={{ margin: 0 }}
                label={props.label}
                control={<Checkbox {...props} />}
            />
        </Box>

    )
}
export default CheckboxBase;
