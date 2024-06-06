import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, Typography } from "@mui/material";
import TextFieldBase from "../../../components/ui/TextField";
import { useDispatch, useSelector } from "react-redux";
import { selectLang, setSnackbar } from "../../../features/app/appSlice";
import { Cancel, Save } from "@mui/icons-material";
import { UI_SIZE, asLocalDate } from "../../FarmUtil";

import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { useCreateSeasonDataMutation, useUpdateSeasonDataMutation } from "../../../features/season/seasonDataApiSlice";
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice";




const SeasonDataForm = ({ defaultValues, open, handleClose, plantation }) => {
    const text = useSelector(selectLang);

    const [createSeasonData] = useCreateSeasonDataMutation();
    const [updateSeasonData] = useUpdateSeasonDataMutation()

    const dispatch = useDispatch()

    const { data: user } = useGetUserDataQuery()

    const { control, register, handleSubmit, getValues, watch, formState: { errors },
        formState: { isDirty, dirtyFields }, reset, setValue, trigger
    } = useForm({ defaultValues });

    const saveSeasonData = (data) => {
        data.ripe = asLocalDate(data.ripe, true);
        data.flash = asLocalDate(data.flash, true);

        if (data.id) {
            return createSeasonData(data).unwrap();
        } else {
            return updateSeasonData(data).unwrap();
        }
    }



    const onSubmit = async (data) => {
        try {
            const result = await saveSeasonData(data);
            dispatch(setSnackbar({ msg: data.id ? text.recordUpdated : text.recordCreated, severity: 'success' }))
        } catch (err) {
            console.log(err);
        }
    }

    const onAction = (save) => {
        handleClose(save ? null : null);
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                <Box display={'flex'} flex={1} justifyContent={'space-between'}>
                    <Box>
                        {text.season}
                    </Box>
                    <Box>
                        {defaultValues.year}
                    </Box>
                </Box>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} >

                <DialogContent>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Controller
                            control={control}
                            name="estimateProducePerAreaUnit"
                            render={({ field: { ref, ...field } }) => (
                                <TextFieldBase
                                    sx={{ flex: 1 }}
                                    size={UI_SIZE}
                                    fullWidth
                                    type="number"
                                    id="activity-estimateProducePerAreaUnit"
                                    label={text.estimatedProduce}  {...field}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{
                                            `${text[user.weightUnit]}/${text[user.areaUnit]}`
                                        }
                                        </InputAdornment>,
                                    }}

                                />
                            )}
                        />
                    </Box>
                    <Box margin={1} />
                    <Box display={'flex'} flex={1} >
                        {plantation && <Controller
                            name="ripe"
                            control={control}
                            render={({ field }) =>
                                <DatePicker label={text.ripe}
                                    closeOnSelect
                                    showToolbar={false}
                                    localeText={{
                                        cancelButtonLabel: text.cancel,
                                        clearButtonLabel: text.clear,
                                        okButtonLabel: text.save
                                    }}
                                    slotProps={{
                                        textField: { size: UI_SIZE, variant: 'outlined', sx: { marginTop: 0.5, flex: 1 } },
                                        actionBar: { actions: ["cancel", "clear"] }
                                    }}
                                    {...field} />}
                        />}
                        {!plantation && <Controller
                            name="flash"
                            control={control}
                            render={({ field }) =>
                                <DatePicker label={text.flash}
                                    closeOnSelect
                                    showToolbar={false}
                                    localeText={{
                                        cancelButtonLabel: text.cancel,
                                        clearButtonLabel: text.clear,
                                        okButtonLabel: text.save
                                    }}
                                    slotProps={{
                                        textField: { size: UI_SIZE, variant: 'outlined', sx: { marginTop: 0.5, flex: 1 } },
                                        actionBar: { actions: ["cancel", "clear"] }
                                    }}
                                    {...field} />}
                        />}
                    </Box>
                    <Box margin={1} />
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Controller
                            control={control}
                            name="note"
                            render={({ field: { ref, ...field } }) => (
                                <TextFieldBase
                                    id="season-note"
                                    size={UI_SIZE}
                                    label={text.note} fullWidth multiline rows={3} {...field} />
                            )}
                        />
                    </Box>

                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button size='large' endIcon={<Cancel />} variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                    <Button size='large' disabled={!isDirty} endIcon={<Save />} disableElevation={true} variant='contained' type="submit" >
                        {text.save}
                    </Button>
                </DialogActions>
            </form >

        </Dialog >
    )
}

export default SeasonDataForm;