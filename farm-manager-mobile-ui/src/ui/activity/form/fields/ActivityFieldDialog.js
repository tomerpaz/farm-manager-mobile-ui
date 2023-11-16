import { Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../../features/app/appSlice";
import { useState } from "react";
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice";
import { HARVEST, MARKET, UI_SIZE, displayFieldName, getActivityTypeText, isArrayEmpty } from "../../../FarmUtil";
import { DatePicker } from "@mui/x-date-pickers";
import { getFruitIcon } from "../../../../icons/FruitIconUtil";
import { Cancel, ControlPointDuplicate, Delete, Save } from "@mui/icons-material";
import { useGetContainersQuery } from "../../../../features/containers/containersApiSlice";





const ActivityFieldDialog = ({ selectedRow, selectedIndex, handleClose, activityType, update, remove }) => {
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()

    const [note, setNote] = useState(selectedRow.fieldNote ? selectedRow.fieldNote : '');
    const [activityArea, setActivityArea] = useState(selectedRow.activityArea);
    const [actualExecution, setActualExecution] = useState(selectedRow.actualExecution);
    const [qty, setQty] = useState(selectedRow.qty);
    const [weight, setWeight] = useState(selectedRow.weight);
    const [container, setContainer] = useState(activityType === HARVEST ? selectedRow.container : null);

    const { data: containers, isSuccess: isContainersSuccess } = useGetContainersQuery({}, { skip: activityType !== HARVEST })

    //  console.log('containers', containers)

    const onAction = (save) => {
        if (save) {
            selectedRow.activityArea = activityArea;
            selectedRow.fieldNote = note;
            selectedRow.actualExecution = actualExecution;
            if (HARVEST === activityType) {
                selectedRow.qty = qty;
                selectedRow.weight = weight;
                selectedRow.container = container;
            }
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
            fullWidth
        // fullScreen
        >
            <DialogTitle id="alert-dialog-title">
                {/* <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <Typography component={'div'} variant='h6'>{getActivityTypeText(activityType, text)}</Typography>

                </Box> */}
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography component={'div'} variant="h6"> {displayFieldName(selectedRow.field)}</Typography>
                        <Typography component={'div'} > {selectedRow.field.cropName} / {selectedRow.field.varietyName} - {selectedRow.field.area} {text[user.areaUnit]}
                            {/* <Avatar sx={{ backgroundColor: 'white' }}>
                        {getFruitIcon(selectedRow.field.cropEngName)}
                    </Avatar> */}
                        </Typography>
                    </Box>
                    {[HARVEST, MARKET].includes(activityType) &&
                        // <Button size='large'  startIcon={<ControlPointDuplicate />}  onClick={_=>console.log('duplicate field')}>{text.duplicate}</Button>
                        <IconButton onClick={_ => console.log('duplicate field')} color="primary" aria-label="duplicate-activity-field" size="large">
                            <ControlPointDuplicate fontSize="large" />
                        </IconButton>
                    }
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>

                    <TextFieldBase sx={{ flex: 1 }} value={activityArea} onChange={e => setActivityArea(Number(e.target.value))} type='number' label={text[user.areaUnit]} />
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
                            textField: { size: UI_SIZE, variant: 'outlined', sx: { marginTop: 0.5, flex: 1 } },
                            actionBar: { actions: ["cancel", "clear"] }
                        }}
                    />
                </Box>
                {HARVEST === activityType &&
                    <Box display={'flex'} flexDirection={'row'} flex={1}>
                        <TextFieldBase sx={{flex: 1}} value={qty} onChange={e => setQty(Number(e.target.value))} type='number' label={text.qty} />
                        <Box margin={1}></Box>
                        <TextFieldBase sx={{flex: 1}} value={weight} onChange={e => setWeight(Number(e.target.value))} type='number' label={text[user.weightUnit]} />
                    </Box>
                }
                {HARVEST === activityType &&
                    <Autocomplete
                        value={container}
                        onChange={(_, data) => setContainer(data)}
                        options={!isArrayEmpty(containers) ? containers : [container]}
                        //fullWidth
                        getOptionLabel={(option) => option ? option.name : ''}
                        isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                        renderInput={(params) => <TextFieldBase {...params} label={text.container} />}
                    />

                }
                <TextFieldBase value={note} onChange={e => setNote(e.target.value)} fullWidth={true} label={text.note} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={remove}>{text.delete}</Button>
                <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )

}


export default ActivityFieldDialog;