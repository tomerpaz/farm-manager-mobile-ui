import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../../features/app/appSlice";
import { useState } from "react";
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice";
import { FERTILIZER, IRRIGARION_TYPES, PESTICIDE, QTY_PER_AREA_UNIT_RESOURCE_TYPE, SECONDARY_QTY_RESOURCES, SPRAY_TYPES, WAREHOUSE_RESOURCE_TYPE, WATER, WORKER_GROUP, getResourceTypeText, getUnitText, isStringEmpty, safeDiv } from "../../../FarmUtil";
import { Cancel, Delete, Save } from "@mui/icons-material";
import { calacTotalPesticideVolume } from "../../../FarmCalculator";

const getQtyPerWorker = (selectedRow) => {

    if (selectedRow.qty && selectedRow.secondaryQty && selectedRow.secondaryQty != 0) {
        return (selectedRow.qty / selectedRow.secondaryQty).toFixed(2);
    }
    return 0;
}

const getSecondaryQtyConfig = (selectedRow, user) => {
    const val = SECONDARY_QTY_RESOURCES.find(e => e.type === selectedRow.resource.type);
    if (val && val.gg === true && user.gg === false) {
        return null;
    }
    return val;
}

const isQtyPerAreaUnitFunc = (selectedRow, irrigationParams) => {
    if (FERTILIZER === selectedRow.resource.type && !isStringEmpty(irrigationParams?.fertilizeMethod)) {
        return false;
    }

    if (PESTICIDE === selectedRow.resource.type && selectedRow?.pesticideListItem) {
        return false;
    }

    return QTY_PER_AREA_UNIT_RESOURCE_TYPE.includes(selectedRow.resource.type)
}

const ActivityResourceDialog = ({ selectedRow, selectedIndex, handleClose, update, warehouses, activityArea, remove, resourceUnit, activityType, irrigationParams, sprayParams }) => {
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
    const [dosage, setDosage] = useState(selectedRow.dosage);

    const secondaryQtyConfig = getSecondaryQtyConfig(selectedRow, user);
    const isWarehouse = WAREHOUSE_RESOURCE_TYPE.includes(selectedRow.resource.type);
    const isQtyPerAreaUnit = isQtyPerAreaUnitFunc(selectedRow, irrigationParams);
    const isWorkerGropup = WORKER_GROUP === selectedRow.resource.type;
    const isWater = WATER === selectedRow.resource.type;
    const isDosage = selectedRow?.pesticideListItem;

    const autoCalc = SPRAY_TYPES.concat(IRRIGARION_TYPES).includes(activityType) && [WATER, PESTICIDE, FERTILIZER].includes(selectedRow.resource.type);
    const onAction = (save) => {
        if (save) {
            if (autoCalc) {
                const qtyChanged = selectedRow.qty !== qty;
                if (qtyChanged) {
                    selectedRow.manualQty = true;
                }
            }
            selectedRow.qty = qty;
            selectedRow.note = note;
            selectedRow.tariff = tariff;
            selectedRow.totalCost = tariff * qty;
            selectedRow.warehouse = warehouse;
            selectedRow.manualTariff = manualTariff;
            if (secondaryQtyConfig || isWorkerGropup) {
                selectedRow.secondaryQty = secondaryQty;
            }
            if (isDosage) {
                selectedRow.dosage = dosage;
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

    const onQtyChange = (value) => {
        setQty(value);
        if (isQtyPerAreaUnit && value && activityArea && activityArea !== 0) {
            setQtyPerAreaUnit((value / activityArea).toFixed(2));
        }
    }

    const onDosageChange = (value) => {
        setDosage(value);
        if (value && activityArea && !selectedRow.manualQty) {
            const pesticideListItem = selectedRow.pesticideListItem;
            const calcQty = calacTotalPesticideVolume(
                pesticideListItem.unit, value, sprayParams.volume, activityArea)
            setQty(calcQty);
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
        if (value && secondaryQty) {
            setQty((value * secondaryQty).toFixed(2));
        }
    }

    const onWorkerCountChange = (value) => {
        const workerCount = value ? value.toFixed(0) : 0
        setSecondaryQty(workerCount);
        if (workerCount && qtyPerWorker) {
            setQty((workerCount * qtyPerWorker).toFixed(2));
        }
    }


    return (
        <Dialog
            open={selectedRow !== null}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography component={'div'} variant="h6">{`${getResourceTypeText(selectedRow.resource.type, text)}:  ${selectedRow.resource.name}`}</Typography>
            </DialogTitle>
            <DialogContent /*sx={{ minHeight: isWarehouse ? height : null }}*/>
                <Box display={'flex'} flex={1} flexDirection={'column'}  >
                    <TextFieldBase value={qty} onChange={e => onQtyChange(Number(e.target.value))}
                        type='number' label={text.qty}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{
                                getUnitText(resourceUnit, user.areaUnit, text)
                            }
                            </InputAdornment>,
                        }}
                        fullWidth={true}
                    />

                    {isDosage &&
                        <TextFieldBase value={dosage} onChange={e => onDosageChange(Number(e.target.value))}
                            type='number' label={`${text.dosage}`}
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{
                                    getUnitText(selectedRow.pesticideListItem.unit, user.areaUnit, text)
                                }
                                </InputAdornment>,
                            }}
                        />}
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
                        <Box margin={1} />
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