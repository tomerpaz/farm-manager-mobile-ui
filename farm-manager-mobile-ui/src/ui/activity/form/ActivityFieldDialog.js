import { Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TextFieldBase from "../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../features/app/appSlice";
import { Fragment, useState } from "react";
import { cellSx, headerSx } from "../view/FieldsView";
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice";
import { Search } from "@mui/icons-material";
import { asLocalDate, getActivityTypeText, isStringEmpty, parseISOOrNull } from "../../FarmUtil";
import { DatePicker } from "@mui/x-date-pickers";
import { getFruitIcon } from "../../../icons/FruitIconUtil";
import ActivityTypeIcon from "../../../icons/ActivityTypeIcon";





const ActivityFieldDialog = ({ selectedRow, selectedIndex, handleClose, activityType, update }) => {
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()

    const [note, setNote] = useState(selectedRow.fieldNote ? selectedRow.fieldNote :'');
    const [activityArea, setActivityArea] = useState(selectedRow.activityArea);
    const [actualExecution, setActualExecution] = useState(selectedRow.actualExecution);


    const onAction = (save) => {
        if (save) {
            selectedRow.activityArea = activityArea;
            selectedRow.fieldNote = note;
            selectedRow.actualExecution = actualExecution;
            update(selectedIndex, selectedRow);
        }
        handleClose(save);
    }

    return (
        <Dialog
            open={selectedRow !== null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        // fullScreen
        >
            <DialogTitle id="alert-dialog-title">
                <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <Typography component={'div'} variant='h6'>{getActivityTypeText(activityType, text)}</Typography>
                    <Avatar sx={{ backgroundColor: 'white' }}>
                        {getFruitIcon(selectedRow.field.cropEngName)}
                    </Avatar>
                </Box>
                <Typography component={'div'} variant="h5">  {selectedRow.field.name} / {selectedRow.field.alias}</Typography>
                <Typography component={'div'} variant="h6"> {selectedRow.field.cropName} / {selectedRow.field.varietyName}
                </Typography>

            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>

                    <TextFieldBase value={activityArea} onChange={e => setActivityArea(Number(e.target.value))} type='number' label={text[user.areaUnit]} />
                    <Box margin={1}></Box>
                    <DatePicker
                        label={text.executed}
                        closeOnSelect
                        localeText={{
                            cancelButtonLabel: text.cancel,
                            clearButtonLabel: text.clear
                        }}

                        showToolbar={false}
                        value={actualExecution}
                        onChange={(e) => setActualExecution(e)}// asLocalDate(e, true)}
                        slotProps={{
                            textField: { size: 'small', variant: 'outlined', sx: { marginTop: 0.5 } },
                            actionBar: { actions: ["cancel", "clear"] }
                        }}
                    />
                </Box>
                <TextFieldBase value={note} onChange={e => setNote(e.target.value)} fullWidth={true} label={text.note} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button size='large' disableElevation={true} variant='contained' onClick={() => onAction(true)} autoFocus>
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )

}


export default ActivityFieldDialog;