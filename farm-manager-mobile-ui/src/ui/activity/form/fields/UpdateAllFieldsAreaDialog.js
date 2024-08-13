import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Toolbar, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Close, Save } from "@mui/icons-material";
import { useState } from "react";
import { getTotalFieldArea } from "../ActivityUtil";

const UpdateAllFieldsAreaDialog = ({ open, text, handleClose, areaUnit, fields, replace }) => {

    const [_percent, setPercent] = useState('');
    const [touched, setTouched] = useState(false);

    const handlePercent = (val) => {
        if (val > 0) {
            setPercent(val);
            setTouched(true);
        }
    }

    const onAction = (val) => {
        if (val) {
            const newFields = fields.slice();

            newFields.forEach((e) => {
                const newArea = Number(((_percent / 100) * e.field.area).toFixed(2));
                if (newArea > 0) {
                    e.activityArea = newArea;
                }
            });
            replace(newFields);
        }
        handleClose();
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
                        {`% ${text.of} ${getTotalFieldArea(fields.map(e => e.field))} ${text[areaUnit]}`}
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
                <TextFieldBase type='number' value={_percent} onChange={e => handlePercent(Number(e.target.value))} fullWidth={true}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{'%'}
                        </InputAdornment>,
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button disabled={!touched} size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateAllFieldsAreaDialog;
