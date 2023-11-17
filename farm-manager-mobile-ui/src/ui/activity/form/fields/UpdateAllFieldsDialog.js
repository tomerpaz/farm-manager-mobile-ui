import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Save } from "@mui/icons-material";
import { useState } from "react";
import { AREA_UNIT, getUnitText } from "../../../FarmUtil";

const UpdateAllFieldsDialog = ({ open, text, handleClose, areaUnit, activityArea, totalWeight, totalQty, weightUnit }) => {

    const [_totalWeight, setTotalWeight] = useState(totalWeight);
    const [_totalQty, setTotalQty] = useState(totalQty);

    const onAction = (val) => {
        console.log(_totalWeight, _totalQty)
        handleClose();
        //handleClose(val ? unit : null, val ? qty: null);
        // setTotalWeight('');
        // setTotalQty('')
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
                <Typography component={'div'} variant="h5">  {text.updateFields}</Typography>
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flexDirection={'row'}>
                    <TextFieldBase type='number' value={_totalQty} onChange={e => setTotalQty(Number(e.target.value))} fullWidth={true} label={`${text.total} ${text.qty}`} />
                    <Box margin={1}/>
                    <TextFieldBase type='number' value={_totalWeight} onChange={e => setTotalWeight(Number(e.target.value))} fullWidth={true} label={`${text.total} ${text[weightUnit]}`} />
                </Box>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button disabled={true /*_totalWeight === totalWeight && _totalQty === totalQty*/} size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateAllFieldsDialog;
