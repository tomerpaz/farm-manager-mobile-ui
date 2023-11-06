import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../features/app/appSlice";
import { useState } from "react";
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice";
import { QTY_PER_AREA_UNIT_RESOURCE_TYPE, SECONDARY_QTY_RESOURCES, WAREHOUSE_RESOURCE_TYPE, WORKER_GROUP, getResourceTypeText, getUnitText, safeDiv } from "../../FarmUtil";
import { Cancel, Delete, Save } from "@mui/icons-material";

const height = 400;

const getQtyPerWorker = (selectedRow) => {

    if(selectedRow.qty &&  selectedRow.secondaryQty && selectedRow.secondaryQty != 0){
        return (selectedRow.qty / selectedRow.secondaryQty).toFixed(2);
    }
    return 0;
}

const ActivityResourceDialog = ({ selectedRow, selectedIndex, handleClose, update, warehouses, activityArea, remove }) => {
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()
    const [note, setNote] = useState(selectedRow.note ? selectedRow.note : '');
    const [qty, setQty] = useState(selectedRow.qty);
    const [qtyPerAreaUnit, setQtyPerAreaUnit] = useState(safeDiv(selectedRow.qty, activityArea));

    const [secondaryQty, setSecondaryQty] = useState(selectedRow.secondaryQty);


    const [tariff, setTariff] = useState(selectedRow.tariff ? selectedRow.tariff : 0);
    const [warehouse, setWarehouse] = useState(selectedRow.warehouse);

    const [manualTariff, setManualTariff] = useState(selectedRow.manualTariff);
    const [qtyPerWorker, setQtyPerWorker] = useState(getQtyPerWorker(selectedRow));

    //console.log('secondaryQty',secondaryQty)
    const secondaryQtyConfig = SECONDARY_QTY_RESOURCES.find(e => e.type === selectedRow.resource.type);
    const isWarehouse = WAREHOUSE_RESOURCE_TYPE.includes(selectedRow.resource.type);
    const isQtyPerAreaUnit = QTY_PER_AREA_UNIT_RESOURCE_TYPE.includes(selectedRow.resource.type);
    const isWorkerGropup = WORKER_GROUP === selectedRow.resource.type;

    const onAction = (save) => {
        if (save) {
            selectedRow.qty = qty;
            selectedRow.note = note;
            selectedRow.tariff = tariff;
            selectedRow.totalCost = tariff * qty;
            selectedRow.warehouse = warehouse;
            selectedRow.manualTariff = manualTariff;
            if (secondaryQtyConfig || isWorkerGropup) {
                selectedRow.secondaryQty = secondaryQty;
            }

            update(selectedIndex, selectedRow);
        }
        handleClose(save);
    }

    const onTariffChange = (value) => {
        setTariff(value);
        setManualTariff(true);
    }

    const onQtyPerAreUnitChange = (value) => {
        setQtyPerAreaUnit(value);
        if (value && activityArea) {
            setQty((value * activityArea).toFixed());
        }
    }

    const onSecondaryQtyChange = (value) => {
        if (secondaryQtyConfig.lessThanQty) {
            if (qty) {
                if (value <= qty) {
                    setSecondaryQty(value);
                } else {
                    setSecondaryQty(qty);
                }
            }
        } else {
            setSecondaryQty(value);
        }
    }


    const onQtyPerWorkerChange = (value) => {
        setQtyPerWorker(value);
        if(value && secondaryQty){
            setQty((value * secondaryQty).toFixed(2));
        }
    }

    const onWorkerCountChange = (value) => {
        const workerCount = value? value.toFixed(0) : 0
        setSecondaryQty(workerCount);
        if(workerCount && qtyPerWorker){
            setQty((workerCount * qtyPerWorker).toFixed(2));
        }
    }


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
            <DialogContent /*sx={{ minHeight: isWarehouse ? height : null }}*/>
                <Box display={'flex'} flex={1} flexDirection={'column'}  >
                    <TextFieldBase value={qty} onChange={e => setQty(Number(e.target.value))}
                        type='number' label={text.qty}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{
                                getUnitText(selectedRow.resource.usageUnit, user.areaUnit, text)
                            }
                            </InputAdornment>,
                        }}
                        fullWidth={true}
                    />

                    {isQtyPerAreaUnit &&
                        <TextFieldBase value={qtyPerAreaUnit} onChange={e => onQtyPerAreUnitChange(Number(e.target.value))}
                            type='number' label={`${text.qty}/${text[user.areaUnit]}`}
                            fullWidth
                        />}

                    {secondaryQtyConfig &&
                        <TextFieldBase value={secondaryQty ? secondaryQty : 0} onChange={e => onSecondaryQtyChange(Number(e.target.value))}
                            type='number' label={`${text[secondaryQtyConfig.label]}`}
                            fullWidth
                        />}
                    {isWorkerGropup && <Box display={'flex'} flex={1} flexDirection={'row'}>
                        <TextFieldBase value={secondaryQty ? secondaryQty : 0} onChange={e => onWorkerCountChange(Number(e.target.value))}
                            type='number' label={`${text.workerCount}`}
                            fullWidth
                        />
                        <Box margin={1}/>
                        <TextFieldBase value={qtyPerWorker} onChange={e => onQtyPerWorkerChange(Number(e.target.value))}
                            type='number' label={`${text.qtyPerWorker}`}
                            fullWidth
                        />
                    </Box>}
                    {user.financial && <TextFieldBase value={tariff} onChange={e => onTariffChange(Number(e.target.value))}
                        type='number' label={text.unitCost}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{
                                user.currency
                            }
                            </InputAdornment>,
                        }}
                    />}
                    {/* </Box> */}
                    {/* <Box margin={1}></Box> */}
                    {isWarehouse &&

                        <TextFieldBase
                            value={warehouse?.id}
                            id="outlined-select-warehouse"
                            select
                            label={text.warehouse}
                            onChange={e => setWarehouse(warehouses.find(w => w.id === Number(e.target.value)))}

                        >
                            {warehouses.filter(e => e.active).map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextFieldBase>}

                    {/* {isWarehouse && <Autocomplete
                        value={warehouse}
                        onChange={(_, data) => setWarehouse(data)}
                        options={warehouses.filter(e => e.active)}
                        fullWidth
                        size='medium'
                        ListboxProps={{ style: { maxHeight: height - 150, } }}
                        getOptionLabel={(option) => option ? option.name : ''}
                        isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                        renderInput={(params) => <TextFieldBase  {...params}
                            label={text.warehouse} />}
                    />} */}
                    <TextFieldBase value={note} onChange={e => setNote(e.target.value)} fullWidth={true} label={text.note} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' variant='outlined' endIcon={<Cancel />} onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={remove}>{text.delete}
                </Button>
                <Button size='large' disableElevation={true} variant='contained'
                    endIcon={<Save />}
                    onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default ActivityResourceDialog;