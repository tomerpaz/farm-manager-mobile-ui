import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AREA_UNIT, getUnitText } from "../../../FarmUtil";

const UpdateAllFieldsDialog = ({ open, text, handleClose, areaUnit, activityArea, totalWeight, totalQty, weightUnit, fields, replace }) => {

    const [_totalWeight, setTotalWeight] = useState(totalWeight);
    const [_totalQty, setTotalQty] = useState(totalQty);
  //  const [touched, setTouched] = useState(false);



    const onAction = (val) => {
        if(val){
            const newFields = fields.slice();
            const qtyPerAreaUnit = _totalQty / activityArea;
            const weightPerAreaUnit = _totalWeight / activityArea;

            newFields.forEach((e,index,arr) => {
                e.qty = Number((qtyPerAreaUnit * e.activityArea).toFixed(2));
                e.weight = Number((weightPerAreaUnit * e.activityArea).toFixed(2));

            });
            replace(newFields);
            console.log('save..')
        }
        handleClose();
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
                    <TextFieldBase type='number' value={_totalQty.toFixed(2)} onChange={e => setTotalQty(Number(e.target.value))} fullWidth={true} label={`${text.total} ${text.qty}`} />
                    <Box margin={1}/>
                    <TextFieldBase type='number' value={_totalWeight.toFixed(2)} onChange={e => setTotalWeight(Number(e.target.value))} fullWidth={true} label={`${text.total} ${text[weightUnit]}`} />
                </Box>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button disabled={_totalWeight === totalWeight && _totalQty === totalQty} size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateAllFieldsDialog;
