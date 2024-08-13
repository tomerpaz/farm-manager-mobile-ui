import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Clear, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PER_AREA_UNIT_PER_DAY, PER_AREA_UNIT_PER_IRREGATION_DAY, PER_WATER_UNIT, TOTAL_PER_AREA_UNIT, TOTAL_PER_FIELD, calcIrrigationDays } from "../../../FarmCalculator";
import DecoratedBox from "../../../../components/ui/DecoratedBox";
import DialogAppBar from "../../../dialog/DialogAppBar";



const IrrigationConfigDialog = ({ open, units, text, handleClose, areaUnit, activityArea, days, irrigationParams }) => {
    //  console.log(irrigationParams)

    const [irrigationMethod, setIrrigationMethod] = useState(irrigationParams?.irrigationMethod ? irrigationParams?.irrigationMethod : '');
    const [fertilizeMethod, setFertilizeMethod] = useState(irrigationParams?.fertilizeMethod ? irrigationParams?.fertilizeMethod : '');
    const [frequency, setFrequency] = useState(irrigationParams?.frequency ? irrigationParams?.frequency : 1);
    // const [irrigationDays, setIrrigationDays] = useState(calcIrrigationDays(days,irrigationParams.frequency));

    // useEffect(() => {
    //     if(frequency !== 0){
    //         calcIrrigationDays(days,frequency);
    //     }
    // }, [frequency]);

    const onAction = (val) => {
        handleClose(val ? { irrigationMethod, fertilizeMethod, frequency } : null);
    }

    const clear = () => {
        // setIrrigationDays(1);
        setFrequency(1);
        setIrrigationMethod('');
        setFertilizeMethod('');

    }

    const handleSetIrrigationMethod = (val) => {
        setIrrigationMethod(val);
    }

    const handleSetFrequency = (val) => {
        if (val < 1) {
            setFrequency(1);
        } else if (val > days) {
            setFrequency(days);
        } else {
            setFrequency(val)
        }
    }

    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogAppBar onClose={() => onAction(false)}
                title=
                {''}
            />
            <DialogContent>
                <TextField
                    value={irrigationMethod}
                    id="outlined-select_irrigation-method"
                    onChange={e => handleSetIrrigationMethod(e.target.value)}
                    fullWidth
                    select
                    label={text.irrigationMethod}
                >
                    <MenuItem key={''} value={''}><em style={{ height: 20 }} /></MenuItem>
                    <MenuItem value={PER_AREA_UNIT_PER_DAY}>{`${text[areaUnit]}/${text.day}`}</MenuItem>
                    <MenuItem value={PER_AREA_UNIT_PER_IRREGATION_DAY}>{`${text[areaUnit]}/${text.irrigationDay}`}</MenuItem>
                    <MenuItem value={TOTAL_PER_AREA_UNIT}>{`${text.total}/${text[areaUnit]}`}</MenuItem>
                    <MenuItem value={TOTAL_PER_FIELD}>{`${text.total}/  ${text.field}`}</MenuItem>
                </TextField>

                {PER_AREA_UNIT_PER_IRREGATION_DAY === irrigationMethod &&
                    <Box margin={2} />}
                {PER_AREA_UNIT_PER_IRREGATION_DAY === irrigationMethod &&
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <TextFieldBase sx={{ flex: 1 }}
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
                        <Box >
                            <DecoratedBox value={`${text.irrigationDays}: ${calcIrrigationDays(days, frequency)}`} />
                        </Box>

                    </Box>

                }
                <Box margin={2} />
                <TextField
                    value={fertilizeMethod}
                    id="outlined-select-fertilize-unit"
                    onChange={e => setFertilizeMethod(e.target.value)}
                    fullWidth
                    select
                    label={text.fertilizeMethod}
                >
                    <MenuItem key={''} value={''}>{<em style={{ height: 20 }} />}</MenuItem>
                    <MenuItem value={PER_WATER_UNIT}>{`${text.per}${text.m3}`}</MenuItem>
                    <MenuItem value={PER_AREA_UNIT_PER_DAY}>{`${text[areaUnit]}/${text.day}`}</MenuItem>
                    <MenuItem value={PER_AREA_UNIT_PER_IRREGATION_DAY}>{`${text[areaUnit]}/${text.irrigationDay}`}</MenuItem>
                    <MenuItem value={TOTAL_PER_AREA_UNIT}>{`${text.total}/${text[areaUnit]}`}</MenuItem>
                    <MenuItem value={TOTAL_PER_FIELD}>{`${text.total}/${text.field}`}</MenuItem>
                </TextField>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default IrrigationConfigDialog;
