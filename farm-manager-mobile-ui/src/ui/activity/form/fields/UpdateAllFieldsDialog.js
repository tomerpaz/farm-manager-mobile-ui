import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Save } from "@mui/icons-material";
import { useState } from "react";
import { AREA_UNIT, getUnitText } from "../../../FarmUtil";

const UpdateAllFieldsDialog = ({ open, units, text, handleClose, areaUnit, activityArea }) => {

    const [totalWeight, setTotalWeight] = useState('');
    const [totalQty, setTotalQty] = useState('');

    const onAction = (val) => {
        //handleClose(val ? unit : null, val ? qty: null);
        setQty('');
        setUnit('')
    }

    const handleSetUnit = (val) => {
        if(val.toLowerCase() === AREA_UNIT && activityArea){
            setQty(activityArea);
        }
        setUnit(val);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                <Typography component={'div'} variant="h5">  {text.bulkQtyUpdate}</Typography>
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <TextField
                        sx={{ marginTop: 0.5 }}
                        value={unit}
                        id="outlined-select-unit"
                        onChange={e => handleSetUnit(e.target.value)}
                        fullWidth
                        select
                        label={text.unit}
                    >
                        <MenuItem key={''} value={''}><em /></MenuItem>
                        {units.map((option) => (
                            <MenuItem key={option} value={option}>
                                {getUnitText(option, areaUnit, text)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box margin={1} />
                    <TextFieldBase type='number' value={qty} onChange={e => setQty(Number(e.target.value))} fullWidth={true} label={text.qty} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button disabled={'' === unit || '' === qty} size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateAllFieldsDialog;
