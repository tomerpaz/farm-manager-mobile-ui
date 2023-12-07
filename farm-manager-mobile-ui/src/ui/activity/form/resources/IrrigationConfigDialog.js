import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Clear, Save } from "@mui/icons-material";
import { useState } from "react";
import { AREA_UNIT, getUnitText } from "../../../FarmUtil";

const PER_AREA_UNIT_PER_IRREGATION_DAY = 'perAreaUnitPerIrrigationDay';

const IrrigationConfigDialog = ({ open, units, text, handleClose, areaUnit, activityArea, days, irrigationParams }) => {
    //  console.log(irrigationParams)

    const [irrigationMethod, setIrrigationMethod] = useState(irrigationParams?.irrigationMethod ? irrigationParams?.irrigationMethod : '');
    const [fertilizeMethod, setFertilizeMethod] = useState(irrigationParams?.fertilizeMethod ? irrigationParams?.fertilizeMethod : '');
    const [frequency, setFrequency] = useState(irrigationParams?.frequency ? irrigationParams?.frequency : 1);
    const [irrigationDays, setIrrigationDays] = useState(irrigationParams?.irrigationDays ? irrigationParams?.irrigationDays : 1);


    const onAction = (val) => {
        handleClose(val ? { irrigationMethod, fertilizeMethod, frequency } : null);
    }

    const clear = () => {
        setIrrigationDays(1);
        setFrequency(1);
        setIrrigationMethod('');
        setFertilizeMethod('');

    }

    const handleSetIrrigationMethod = (val) => {
        setIrrigationMethod(val);
    }

    const handleSetFrequency = (val) => {
        setFrequency(val < 1 ? 1 : val);
    }

    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            {/* <DialogTitle id="alert-dialog-title">
                <Typography component={'div'} variant="h6">  {text.days.toLowerCase()}: {days}</Typography>
            </DialogTitle> */}
            <DialogContent>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <TextField
                        sx={{ flex: 3 }}
                        value={irrigationMethod}
                        id="outlined-selectirrigation-method"
                        onChange={e => handleSetIrrigationMethod(e.target.value)}
                        fullWidth
                        select
                        label={text.irrigationMethod}
                    >
                        <MenuItem key={''} value={''}><em /></MenuItem>
                        <MenuItem value={'perAreaUnitPerDay'}>{`${text[areaUnit]}/${text.day}`}</MenuItem>
                        <MenuItem value={'perAreaUnitPerIrrigationDay'}>{`${text[areaUnit]}/${text.irrigationDay}`}</MenuItem>
                        <MenuItem value={'totalPerAreaUnit'}>{`${text.total}/${text[areaUnit]}`}</MenuItem>
                        <MenuItem value={'totalPerField'}>{`${text.total}/  ${text.field}`}</MenuItem>
                    </TextField>
                    <Box marginLeft={1} marginRight={1} />
                    <TextFieldBase
                        sx={{ flex: 2 }}
                        disabled={PER_AREA_UNIT_PER_IRREGATION_DAY !== irrigationMethod}
                        value={PER_AREA_UNIT_PER_IRREGATION_DAY !== irrigationMethod ? '' : frequency} onChange={e => handleSetFrequency(Number(e.target.value))}
                        type='number' label={`${text.frequency}, ${text.every}`}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{
                                text.days
                            }
                            </InputAdornment>,
                        }}
                    />
                </Box>
                <Box margin={2} />
                <TextField
                    value={fertilizeMethod}
                    id="outlined-select-unit"
                    onChange={e => setFertilizeMethod(e.target.value)}
                    fullWidth
                    select
                    label={text.fertilizeMethod}
                >
                    <MenuItem key={''} value={''}>{<em />}</MenuItem>
                    <MenuItem value={'perM3Water'}>{`${text.per}${text.m3}`}</MenuItem>
                    <MenuItem value={'perAreaUnitPerDay'}>{`${text[areaUnit]}/${text.day}`}</MenuItem>
                    <MenuItem value={'perAreaUnitPerIrrigationDay'}>{`${text[areaUnit]}/${text.irrigationDay}`}</MenuItem>
                    <MenuItem value={'totalPerAreaUnit'}>{`${text.total}/${text[areaUnit]}`}</MenuItem>
                    <MenuItem value={'totalPerField'}>{`${text.total}/${text.field}`}</MenuItem>
                </TextField>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                {/* <Button size='large' endIcon={<Clear />} variant='outlined' onClick={clear} >
                    {text.clear}
                </Button> */}
                <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default IrrigationConfigDialog;
