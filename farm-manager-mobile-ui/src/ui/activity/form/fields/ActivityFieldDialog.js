import { AppBar, Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../../features/app/appSlice";
import { useEffect, useState } from "react";
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice";
import { HARVEST, MARKET, UI_SIZE, displayFieldName, getActivityTypeText, getMarketingDestinations, isArrayEmpty, safeDiv } from "../../../FarmUtil";
import { DatePicker } from "@mui/x-date-pickers";
import { Cancel, Close, ControlPointDuplicate, Delete, Save } from "@mui/icons-material";
import { useGetContainersQuery, useGetQualitiesQuery, useGetSizesQuery } from "../../../../features/utils/containersApiSlice";
import ActionApprovalDialog from "../../../../components/ui/ActionApprovalDialog";
import DialogAppBar from "../../../dialog/DialogAppBar";


const ActivityFieldDialog = ({ selectedRow, selectedIndex, handleClose, activityType, update, remove, prepend }) => {
    const text = useSelector(selectLang);

    const isMarket = activityType === MARKET


    const { data: user } = useGetUserDataQuery()

    const [note, setNote] = useState(selectedRow.fieldNote ? selectedRow.fieldNote : '');
    const [activityArea, setActivityArea] = useState(selectedRow.activityArea);
    const [actualExecution, setActualExecution] = useState(selectedRow.actualExecution);
    const [qty, setQty] = useState(selectedRow.qty);
    const [weight, setWeight] = useState(selectedRow.weight);
    const [container, setContainer] = useState(activityType === HARVEST ? selectedRow.container : null);
    const [duplicateOpen, setDuplicateOpen] = useState(false);

    const [quality, setQuality] = useState(isMarket ? selectedRow.fieldMarketParams.marketingQuality : null);
    const [size, setSize] = useState(isMarket ? selectedRow.fieldMarketParams.marketingSize : null);
    const [destination, setDestination] = useState(isMarket ? selectedRow.fieldMarketParams.marketingDestination : null);
    const [income, setIncome] = useState(isMarket ? selectedRow.fieldMarketParams.income : null);
    const [incomePerUnit, setIncomePerUnit] = useState(isMarket ? safeDiv(selectedRow.fieldMarketParams.income, selectedRow.qty) : null);
    const [waybill, setWaybill] = useState(isMarket ? selectedRow.fieldMarketParams.waybill : null);



    const { data: containers, isSuccess: isContainersSuccess } = useGetContainersQuery({}, { skip: activityType !== HARVEST })
    const { data: qualities, isSuccess: isQUalitiesSuccess } = useGetQualitiesQuery({}, { skip: !isMarket })
    const { data: sizes, isSuccess: isSizesSuccess } = useGetSizesQuery({}, { skip: !isMarket })

    const isExecute = activityType !== MARKET

    const onAction = (save) => {
        if (save) {
            selectedRow.activityArea = activityArea;
            selectedRow.fieldNote = note;
            selectedRow.actualExecution = actualExecution;
            if (HARVEST === activityType) {
                selectedRow.qty = qty;
                selectedRow.weight = weight;
                selectedRow.container = container;
            } else if (MARKET === activityType) {
                selectedRow.qty = qty;
                selectedRow.weight = weight;
                selectedRow.fieldMarketParams.marketingDestination = destination;
                selectedRow.fieldMarketParams.marketingSize = size;
                selectedRow.fieldMarketParams.marketingQuality = quality;
                selectedRow.fieldMarketParams.income = income;
                selectedRow.fieldMarketParams.waybill = waybill;


            }
            update(selectedIndex, selectedRow);
        }
        handleClose();
    }

    const handleSetActivityArea = (val) => {
        setActivityArea(val > 0 ? val : selectedRow.field.area)
    }

    const handleDuplicate = (val) => {
        setDuplicateOpen(false);
        if (val) {
            prepend({ ...selectedRow })
            handleClose();
        }
    }

    const onIncomeChange = (value) => {
        setIncome(value);
        if (value && qty) {
            setIncomePerUnit(safeDiv(value, qty));
        }
    }
    const onIncomePerUnitChange = (value) => {
        setIncomePerUnit(value);
        if (value && qty) {
            setIncome((value * qty).toFixed(0))
        }
    }

    useEffect(() => {
        if (incomePerUnit) {
            setIncome((incomePerUnit * qty).toFixed(0))
        }
    }, [qty])


    return (
        <Box>

            <Dialog
                open={selectedRow !== null}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogAppBar onClose={() => onAction(false)}
                    title={
                        displayFieldName(selectedRow.field)}
                />


                <DialogTitle id="alert-dialog-title">
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Box>
                            <Typography component={'div'} > {selectedRow.field.cropName} / {selectedRow.field.varietyName} - {selectedRow.field.area} {text[user.areaUnit]}

                            </Typography>
                        </Box>
                        {[HARVEST, MARKET].includes(activityType) &&
                            // <Button size='large'  startIcon={<ControlPointDuplicate />}  onClick={_=>console.log('duplicate field')}>{text.duplicate}</Button>
                            <IconButton onClick={_ => setDuplicateOpen(true)} color="primary" aria-label="duplicate-activity-field" size="large">
                                <ControlPointDuplicate fontSize="large" />
                            </IconButton>
                        }
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {!isMarket && <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>
                        <TextFieldBase sx={{ flex: 1 }} value={activityArea} onChange={e => handleSetActivityArea(Number(e.target.value))} type='number' label={text[user.areaUnit]} />
                        <Box margin={1}></Box>
                        <DatePicker
                            label={text.executedDate}
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
                    </Box>}


                    {isMarket && <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>
                        <TextFieldBase sx={{ flex: 1 }} value={waybill} onChange={e => setWaybill(e.target.value)} label={text.waybill} />
                        <Box margin={1}></Box>
                        <TextFieldBase
                            id="outlined-select-destination"
                            select
                            onChange={(e) => setDestination(e.target.value)}
                            value={destination}
                            label={text.destination}
                            sx={{ flex: 1 }}
                        >
                            {getMarketingDestinations().map((option) => (
                                <MenuItem key={option} value={option}>
                                    {text[option.replace('Destination', '')]}
                                </MenuItem>
                            ))}
                        </TextFieldBase>


                    </Box>}
                    {[HARVEST, MARKET].includes(activityType) &&
                        <Box display={'flex'} flexDirection={'row'} flex={1}>
                            <TextFieldBase sx={{ flex: 1 }} value={qty} onChange={e => setQty(Number(e.target.value))} type='number' label={text.qty} />
                            <Box margin={1}></Box>
                            <TextFieldBase sx={{ flex: 1 }} value={weight} onChange={e => setWeight(Number(e.target.value))} type='number' label={text[user.weightUnit]} />
                        </Box>
                    }
                    {HARVEST === activityType &&
                        <Autocomplete
                            blurOnSelect={true}
                            value={container}
                            onChange={(_, data) => setContainer(data)}
                            options={!isArrayEmpty(containers) ? containers : [container]}
                            //fullWidth
                            getOptionLabel={(option) => option ? option.name : ''}
                            isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                            renderInput={(params) => <TextFieldBase {...params} label={text.container} />}
                        />
                    }
                    {isMarket &&
                        <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>
                            <Autocomplete
                                blurOnSelect={true}
                                value={size}
                                onChange={(_, data) => setSize(data)}
                                options={!isArrayEmpty(sizes) ? sizes : [size]}
                                fullWidth
                                getOptionLabel={(option) => option ? option.name : ''}
                                isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                                renderInput={(params) => <TextFieldBase {...params} label={text.size} />}
                            />
                            <Box margin={1}></Box>

                            <Autocomplete
                                blurOnSelect={true}
                                value={quality}
                                onChange={(_, data) => setQuality(data)}
                                options={!isArrayEmpty(qualities) ? qualities : [quality]}
                                fullWidth
                                getOptionLabel={(option) => option ? option.name : ''}
                                isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                                renderInput={(params) => <TextFieldBase {...params} label={text.quality} />}
                            />
                        </Box>
                    }
                    {isMarket &&
                        <Box display={'flex'} flexDirection={'row'} flex={1}>
                            <TextFieldBase sx={{ flex: 1 }} value={incomePerUnit} onChange={e => onIncomePerUnitChange(Number(e.target.value))} type='number' label={`${text.unitCost}`} />
                            <Box margin={1}></Box>
                            <TextFieldBase sx={{ flex: 1 }} value={income} onChange={e => onIncomeChange(Number(e.target.value))} type='number' label={`${text.income}`} />
                        </Box>
                    }

                    <TextFieldBase value={note} onChange={e => setNote(e.target.value)} fullWidth={true} label={`${text.fieldNote}`} />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={remove}>{text.delete}</Button>
                    <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                        {text.save}
                    </Button>
                </DialogActions>
            </Dialog>
            <ActionApprovalDialog open={duplicateOpen} handleClose={handleDuplicate}
                title={`${text.duplicate} ${text.field}?`} okText={text.duplicate} cancelText={text.cancel} />

        </Box >
    )

}


export default ActivityFieldDialog;