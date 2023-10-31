import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Typography } from "@mui/material";
import TextFieldBase from "../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../features/app/appSlice";
import { useState } from "react";
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice";
import { WAREHOUSE_RESOURCE_TYPE, getResourceTypeText, getUnitText } from "../../FarmUtil";

const ActivityResourceDialog = ({ selectedRow, selectedIndex, handleClose, update, warehouses }) => {
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()
    const [note, setNote] = useState(selectedRow.note ? selectedRow.note : '');
    const [qty, setQty] = useState(selectedRow.qty);
    const [tariff, setTariff] = useState(selectedRow.tariff ? selectedRow.tariff : 0);
    const [warehouse, setWarehouse] = useState(selectedRow.warehouse);

    const [manualTariff, setManualTariff] = useState(selectedRow.manualTariff);

    const onAction = (save) => {
        if (save) {
            selectedRow.qty = qty;
            selectedRow.note = note;
            selectedRow.tariff = tariff;
            selectedRow.totalCost = tariff * qty;
            selectedRow.warehouse = warehouse;
            update(selectedIndex, selectedRow);
        }
        handleClose(save);
    }

    const isWarehouse = WAREHOUSE_RESOURCE_TYPE.includes(selectedRow.resource.type);
    return (
        <Dialog
            open={selectedRow !== null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >
            <DialogTitle id="alert-dialog-title">
                <Typography component={'div'} variant="h5">{`${getResourceTypeText(selectedRow.resource.type, text)}:  ${selectedRow.resource.name}`}</Typography>
            </DialogTitle>
            <DialogContent sx={{ minHeight: 400 }}>
                <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'} >
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
                </Box>
                <Box margin={1}></Box>
                {isWarehouse &&
                    <Autocomplete
                        disablePortal
                        value={warehouse}
                        onChange={(_, data) => setWarehouse(data)}
                        options={warehouses.filter(e => e.active)}
                        fullWidth
                        size='small'
                        getOptionLabel={(option) => option ? option.name : ''}
                        isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                        renderInput={(params) => <TextFieldBase sx={{ marginTop: 0.5 }} {...params}
                            label={text.warehouse} />}
                    />}
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