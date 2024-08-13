import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Close, Save } from "@mui/icons-material";
import { useState } from "react";
import { AREA_UNIT, getUnitText } from "../../../FarmUtil";

const UpdateResourcesQtyDialog = ({ open, units, text, handleClose, areaUnit, activityArea }) => {

    const [qty, setQty] = useState('');
    const [unit, setUnit] = useState('');

    const onAction = (val) => {
        handleClose(val ? unit : null, val ? qty : null);
        setQty('');
        setUnit('')
    }

    const handleSetUnit = (val) => {
        if (val.toLowerCase() === AREA_UNIT && activityArea) {
            setQty(activityArea);
        }
        setUnit(val);
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <AppBar sx={{ position: 'relative' }} elevation={0}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {text.bulkQtyUpdate}
                    </Typography>
                    <IconButton
                        edge="start"
                        onClick={() => onAction(false)}
                        color="inherit"
                        aria-label="done"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
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
                <Button disabled={'' === unit || '' === qty} size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateResourcesQtyDialog;
