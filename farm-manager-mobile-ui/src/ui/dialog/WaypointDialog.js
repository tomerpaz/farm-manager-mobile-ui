import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Cancel, Delete, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AREA_UNIT, asShortStringDateTime, getUnitText, parseISOOrNull } from "../FarmUtil";
import DialogAppBar from "./DialogAppBar";
import { selectLang } from "../../features/app/appSlice";
import { useSelector } from "react-redux";

const WaypointDialog = ({ open, handleClose, selectedPoint, handleDelete }) => {

    const text = useSelector(selectLang);
    const [touched, setTouched] = useState(false);

    const [note, setNote] = useState(selectedPoint.note);



    const handleSetNote = (val) => {
        setNote(val);
        setTouched(true)
    }

    const onAction = (val) => {
        if (val) {
            selectedPoint.note = note;
        }
        handleClose();
        setTouched(false);
        setNote('');
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h6">
                            {text.note}
                        </Typography>
                        <Typography marginLeft={3} marginRight={3} variant="h6">
                            {asShortStringDateTime(parseISOOrNull(selectedPoint.date))}
                        </Typography>
                    </Box>
                } />
            <DialogContent>
                <TextFieldBase value={note} onChange={e => handleSetNote(e.target.value)} fullWidth={true} /*label={`${text.total} ${text.qty}`}*/ />

                {/* {selectedPoint.date} */}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={handleDelete}>{text.delete}</Button>
                <Button disabled={!touched} size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default WaypointDialog;
