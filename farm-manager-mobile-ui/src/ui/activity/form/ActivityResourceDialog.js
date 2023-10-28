import { Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TextFieldBase from "../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../features/app/appSlice";
import { Fragment, useState } from "react";
import { cellSx, headerSx } from "../view/FieldsView";
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice";
import { Search } from "@mui/icons-material";
import { asLocalDate, getActivityTypeText, getUnitText, isStringEmpty, parseISOOrNull } from "../../FarmUtil";
import { DatePicker } from "@mui/x-date-pickers";
import { getFruitIcon } from "../../../icons/FruitIconUtil";
import ActivityTypeIcon from "../../../icons/ActivityTypeIcon";





const ActivityResourceDialog = ({ selectedRow, selectedIndex, handleClose, activityType, update }) => {
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()

    const [note, setNote] = useState(selectedRow.note ? selectedRow.note : '');
    const [qty, setQty] = useState(selectedRow.qty);
    const [tariff, setTariff] = useState(selectedRow.tariff);

    const [manualTariff, setManualTariff] = useState(selectedRow.manualTariff);

    // const [actualExecution, setActualExecution] = useState(selectedRow.actualExecution);


    const onAction = (save) => {
        if (save) {
            selectedRow.qty = qty;
            selectedRow.note = note;
            selectedRow.tariff = tariff;
            selectedRow.totalCost = tariff * qty;

            // selectedRow.actualExecution = actualExecution;
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
                {/* <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <Typography component={'div'} variant='h6'>{getActivityTypeText(activityType, text)}</Typography>
                    <Avatar sx={{ backgroundColor: 'white' }}>
                        {getFruitIcon(selectedRow.field.cropEngName)}
                    </Avatar>
                </Box>
                <Typography component={'div'} variant="h5">  {selectedRow.field.name} / {selectedRow.field.alias}</Typography>
                <Typography component={'div'} variant="h6"> {selectedRow.field.cropName} / {selectedRow.field.varietyName}
                </Typography> */}

            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>
                    <TextFieldBase value={qty} onChange={e => setQty(Number(e.target.value))}
                        type='number' label={text.qty}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{
                                getUnitText(selectedRow.resource.usageUnit, user.areaUnit, text)
                            }
                            </InputAdornment>,
                        }}
                    />
                    <Box margin={1}></Box>
                    <TextFieldBase value={tariff} onChange={e => setTariff(Number(e.target.value))}
                        type='number' label={text.unitCost}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{
                                user.currency
                            }
                            </InputAdornment>,
                        }}
                    />
                    {/* <Box margin={1}></Box> */}
                    {/* <DatePicker
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
                    />  */}
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


export default ActivityResourceDialog;