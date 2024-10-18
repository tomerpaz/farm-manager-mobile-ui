import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Cancel, Delete, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AREA_UNIT, getUnitText } from "../FarmUtil";
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
                title={text.note} />
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
