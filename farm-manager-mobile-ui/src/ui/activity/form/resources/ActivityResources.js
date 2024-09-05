import { Box, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge, List, ListItemButton, ListItemText, ListItemIcon, ListItem } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../../features/app/appSlice"
import { cellSx, cellSxChange, cellSxLink, headerSx } from "../../../Util"
import { Fragment, useEffect, useState } from "react"
import { ACTIVITY_RESOURCES, AREA_UNIT, ENERGY, EQUIPMENT, FERTILIZER, HOUR, IRRIGARION_TYPES, IRRIGATION, IRRIGATION_PLAN, PESTICIDE, SCOUT, SPRAY, SPRAYER, SPRAY_TYPES, WAREHOUSE_RESOURCE_TYPE, WATER, getResourceTypeText, getResourceUsageUnit, getUnitText, isArrayEmpty } from "../../../FarmUtil"
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice"
import ResourcseSelectionDialog from "../../../dialog/ResourcseSelectionDialog"
import { Controller, useFieldArray } from "react-hook-form"
import { Agriculture, Delete, DragHandle, Error, Menu, MoreVert } from "@mui/icons-material"
import ActivityResourceDialog from "./ActivityResourceDialog"
import { useGetWarehousesQuery } from "../../../../features/warehouses/warehouseApiSlice"
import UpdateResourcesQtyDialog from "./UpdateResourcesQtyDialog"
import Calculator from "../../../../icons/Calculator"
import IrrigationConfigDialog from "./IrrigationConfigDialog"
import AlertDialog from "../../../dialog/AlertDialog"
import { calacTotalPesticideVolume, calcIrrigationDays, calcSprayVolume, calcSprayVolumePerArea, calcTotalFertilizerQty, calcTotalWaterQtyUtilFunc } from "../../../FarmCalculator"
import SprayParams from "./SprayParams"

const TRASHHOLD = 3;
const UNITS = [AREA_UNIT.toUpperCase(), HOUR.toUpperCase()]

//const REQUIRED_RESOURCES = SPRAY_TYPES.concat(IRRIGARION_TYPES);

const ELEMENT_ID = 'resources'

const ActivityResources = ({ activity, control, errors, register, tariffs, activityArea, activityDef, days, irrigationParams, setValue, trigger, fieldsCount, sprayParams, scoutParams }) => {
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [expendFields, setExpendFields] = useState(false);
    const { data: warehouses, isSuccess: isWarehousesDefsSuccess } = useGetWarehousesQuery()
    const [loadTariffs, setLoadTariffs] = useState(false);
    const [openEditBulkQty, setOpenEditBulkQty] = useState(false);
    const [openIrrigationConfig, setOpenIrrigationConfig] = useState(false);
    const [openSprayParams, setOpenSprayParams] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const disabledSelections = SPRAY_TYPES.concat([SCOUT]).includes(activity.type) && sprayParams?.crop === null;

console.log('sprayParams', sprayParams)

    const handleOpenEditRow = (index, row) => {
        setSelectedRow(row);
        setSelectedIndex(index);
    };


    const handleCloseEditRow = () => {
        setSelectedRow(null);
        setSelectedIndex(null);
        trigger(['resources'])
    };

    const handleRemoveRow = (index) => {
        setSelectedRow(null);
        setSelectedIndex(null);
        remove(index)

    };
    const valideArray = (arr, act) => {
        if (IRRIGARION_TYPES.includes(act.type)) {
            const water = arr.find(e => e.resource.type === WATER)

            if (!water) {
                return 'waterSource,waterQty';
            } else if (water.qty <= 0) {
                return 'waterQty';
            }
        }
        if (SPRAY_TYPES.includes(act.type)) {
            const sprayer = arr.find(e => e.resource.type === EQUIPMENT && e.resource.category === SPRAYER)
            const pesticides = arr.find(e => e.resource.type === PESTICIDE)

            if (!sprayer && !pesticides) {
                return 'sprayer,pesticides';
            } else if (!sprayer) {
                return 'sprayer';
            } else if (!pesticides) {
                return 'pesticides';
            }
        }
        return null;
    }

    const { fields, append, prepend, remove, swap, move, insert, update, } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "resources", // unique name for your Field Array
        keyName: "key",
        rules: {
            required: false,
            validate: valideArray
        }
    });

    const errorMsg = errors.resources?.root?.message?.split(",");

    const runTariffMatch = () => {
        if (tariffs) {
            fields.map((row, index) => {
                const tariff = tariffs.find(e => e.resource.id === row.resource.id);
                if (tariff && row.manualTariff === false) {
                    row.tariff = tariff.price;
                    if (row.qty) {
                        row.totalCost = tariff.price * row.qty;
                    }
                    update(index, row);
                }
            })
        }
    }

    const resourceBulkUnits = Array.from(new Set(fields.filter(e => UNITS.includes(getResourceUsageUnit(e.resource, activityDef))).map(e => getResourceUsageUnit(e.resource, activityDef))));

    useEffect(() => {
        runTariffMatch();
    }, [tariffs])

    useEffect(() => {
        if (loadTariffs === true) {
            runTariffMatch();
        }
        setLoadTariffs(false);
    }, [loadTariffs])

    const clearSingular = (newtlySelectedResources) => {
        if (IRRIGARION_TYPES.concat(SPRAY_TYPES).includes(activity.type)) {
            if (IRRIGARION_TYPES.includes(activity.type)) {
                const ws = newtlySelectedResources.filter(e => e.resource.type === WATER)
                if (!isArrayEmpty(ws)) {
                    fields.forEach((e, index, arr) => {
                        if (e.resource.type === WATER) {
                            remove(index);
                        }
                    })
                }
            }
            if (SPRAY_TYPES.includes(activity.type)) {
                const sprayer = newtlySelectedResources.filter(e => e.resource.type === EQUIPMENT && e.resource.category === SPRAYER)
                if (!isArrayEmpty(sprayer)) {
                    fields.forEach((e, index, arr) => {
                        if (e.resource.type === EQUIPMENT && e.resource.category === SPRAYER) {
                            remove(index);
                        }
                    })
                }
            }

        }
        return newtlySelectedResources;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (selectedResources) => {
        setOpen(false);
        if (selectedResources) {
            const alreadySelectedIDs = fields.map(e => e.resource.id);
            let newtlySelectedResources = selectedResources.filter(e => !alreadySelectedIDs.includes(e.resouece ? e.resource.id : e.id)).map(e => {
                const r = e.resource ? e.resource : e;
                const pesticideListItem = e.pestId ? e : null;
                const qty = pesticideListItem ? calacTotalPesticideVolume(
                    pesticideListItem.unit, pesticideListItem.dosage, sprayParams.volume, activityArea) : 0;
                return {
                    resource: r,
                    qty,
                    totalCost: 0,
                    note: null,
                    date: null,
                    dosage: pesticideListItem?.dosage,
                    tariff: 0,
                    manualTariff: false,
                    manualQty: false,
                    pesticideListItem,
                    warehouse: WAREHOUSE_RESOURCE_TYPE.includes(r.type) ? user.warehouse : null,
                }
            }
            );
            if (!isArrayEmpty(newtlySelectedResources)) {
                newtlySelectedResources = clearSingular(newtlySelectedResources);
                prepend(newtlySelectedResources)
                setLoadTariffs(true);
            }

        }
        const element = document.getElementById(ELEMENT_ID);
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }

    }

    const handleBulkQtyUpdate = (unit, qty) => {
        if (unit && qty) {
            fields.map((row, index) => {
                if (unit === getResourceUsageUnit(row.resource, activityDef)) {
                    row.qty = qty;
                    if (row.tariff) {
                        row.totalCost = row.tariff * qty;
                    }
                    update(index, row);
                }
            })
        }
        setOpenEditBulkQty(false)
    }

    const handleIrrigationConfig = (conf) => {
        if (conf) {
            setValue('irrigationParams', conf,
                {
                    shouldDirty: true
                })
        }
        setOpenIrrigationConfig(false)
    }

    const handleSprayParam = (data) => {
        if (data) {
            setValue('sprayParams.speed', data.speed);
            setValue('sprayParams.psi', data.psi)
            setValue('sprayParams.pto', data.pto, {
                shouldDirty: true
            })
        }
        setOpenSprayParams(false)
    }

    const getResourceTypes = () => {
        var types = ACTIVITY_RESOURCES.find(e => activity.type.includes(e.activity))?.types;
        if (types && !user.gg) {
            types = types.filter(e => e !== ENERGY);
        }
        return types
    }

    const resourceTypes = getResourceTypes();

    if (!resourceTypes) {
        return <></>
    }

    const getFields = () => {
        return (expendFields && fields.length > TRASHHOLD) ? fields : fields.slice(0, TRASHHOLD);
    }



    const calcIrrigation = (irrigationParams?.irrigationMethod || irrigationParams?.fertilizeMethod) ? true : false;

    const caclTotalWater = () => {
        const water = fields.find(e => e.resource.type === WATER);
        if (calcIrrigation && water && water.qty && irrigationParams.irrigationMethod) {
            const irrigationDays = calcIrrigationDays(days, irrigationParams.frequency);
            return calcTotalWaterQtyUtilFunc(irrigationParams.irrigationMethod, water.qty, activityArea, days, irrigationDays, fieldsCount)
        }
        return 0;
    }

    const onSprayVolumeChange = (onChange, value) => {
        onChange(value);
        setValue('sprayParams.volumePerAreaUnit', calcSprayVolumePerArea(Number(value), Number(activityArea)))
        updatePesticideQty(Number(value))

    }

    const onSprayVolumePerAreaChange = (onChange, value) => {
        onChange(value);
        const sprayVolume = calcSprayVolume(Number(value), Number(activityArea));
        setValue('sprayParams.volume', sprayVolume)
        updatePesticideQty(sprayVolume)
    }

    const updatePesticideQty = (sprayVolume) => {
        fields.map((row, index) => {
            if (row.pesticideListItem && !row.manualQty) {
                const newQty = calacTotalPesticideVolume(row.pesticideListItem.unit, row.dosage, sprayVolume, activityArea)
                if (newQty && newQty !== row.qty) {
                    row.qty = newQty;
                    if (row.tariff) {
                        row.totalCost = row.tariff * row.qty;
                    }
                    update(index, row);
                }
            }
        })
    }

    const totalWaterQty = caclTotalWater();

    return (
        <Box margin={1} paddingTop={2} display={'flex'} flexDirection={'column'}>
            {SPRAY_TYPES.includes(activity.type) && <Box marginTop={1} marginBottom={1} display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Controller
                    control={control}
                    name="sprayParams.volumePerAreaUnit"
                    rules={{ required: true }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField size='small'
                            onChange={(e) => onSprayVolumePerAreaChange(onChange, e.target.value)}
                            type='number'
                            id="spray-volume-per-area-unit"
                            error={errors.sprayParams?.volumePerAreaUnit ? true : false}
                            label={text[`sprayVolume${user.areaUnit}`]}  {...field} />
                    )}
                />
                <Box margin={1} />
                <Controller
                    control={control}
                    name="sprayParams.volume"
                    render={({ field: { onChange, ...field } }) => (
                        <TextField size='small'
                            onChange={(e) => onSprayVolumeChange(onChange, e.target.value)}
                            id="spray-volume"
                            type='number'
                            label={text.totalSprayVolume}  {...field} />
                    )}
                />
            </Box>}
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={'center'}>
                    <Box>
                        <Button disabled={disabledSelections} id={ELEMENT_ID} size='large' color={errors.resources ? 'error' : 'primary'} disableElevation={true} variant="contained" onClick={handleClickOpen}>{text.resources} </Button>
                    </Box>
                    {fields.length > TRASHHOLD &&
                        <IconButton sx={{ marginLeft: 1, marginRight: 1 }} onClick={() => setExpendFields(!expendFields)}>
                            <Badge badgeContent={fields.length} color="info">
                                {expendFields && <Menu fontSize='large' />}
                                {!expendFields && <DragHandle fontSize='large' />}
                            </Badge>
                        </IconButton>
                    }
                    {IRRIGARION_TYPES.includes(activity.type) && !['ICCPRO', 'TALGIL'].includes(activity.src) &&
                        <IconButton size='large' onClick={() => setOpenIrrigationConfig(true)}><Calculator color={calcIrrigation ? 'primary' : 'secondary'} fontSize='large' /></IconButton>
                    }
                    {SPRAY_TYPES.includes(activity.type) &&
                        <IconButton size='large' onClick={() => setOpenSprayParams(true)}><Agriculture fontSize='large' /></IconButton>
                    }
                    {errorMsg &&
                        <IconButton color='error' size='large' onClick={() => setShowAlert(true)}>
                            <Badge badgeContent={errorMsg.length} color="secondary">
                                <Error fontSize='large' />
                            </Badge>

                        </IconButton>
                    }
                </Box>
                <Box flex={1}/>
                <Box display={'flex'}  flexDirection={'row'} alignItems={'center'}>
                    <IconButton size='large' disabled={isArrayEmpty(resourceBulkUnits)} onClick={() => setOpenEditBulkQty(true)}><MoreVert fontSize='large' /></IconButton>
                    <IconButton size='large' disabled={isArrayEmpty(fields)} onClick={() => remove()}><Delete fontSize='large' /></IconButton>
                </Box>
            </Box>


            <RenderTable
                register={register} remove={remove} user={user} activity={activity}
                handleOpenEditRow={handleOpenEditRow} text={text} getFields={getFields} activityDef={activityDef}
                irrigationParams={irrigationParams} calcIrrigation={calcIrrigation}
                activityArea={activityArea}
                daysInPeriod={days}
                fieldsCount={fieldsCount}
                totalWaterQty={totalWaterQty}
            />
            <ResourcseSelectionDialog open={open} handleClose={handleClose} resourceTypes={resourceTypes} cropId={sprayParams?.crop?.id} />
            {selectedRow && <ActivityResourceDialog selectedIndex={selectedIndex} selectedRow={selectedRow}
                activityType={activity.type} handleClose={handleCloseEditRow} update={update}
                warehouses={warehouses} control={control} errors={errors} activityArea={activityArea}
                resourceUnit={getResourceUsageUnit(selectedRow.resource, activityDef)}
                remove={() => handleRemoveRow(selectedIndex)}
                irrigationParams={irrigationParams}
                sprayParams={sprayParams} />}
            <UpdateResourcesQtyDialog open={openEditBulkQty} units={resourceBulkUnits} text={text} handleClose={handleBulkQtyUpdate} areaUnit={user.areaUnit} activityArea={activityArea}
            />
            {IRRIGARION_TYPES.includes(activity.type) && <IrrigationConfigDialog open={openIrrigationConfig} days={days} text={text} handleClose={handleIrrigationConfig} areaUnit={user.areaUnit} activityArea={activityArea}
                irrigationParams={irrigationParams}
            />}
            {SPRAY_TYPES.includes(activity.type) && <SprayParams open={openSprayParams} days={days} text={text} handleClose={handleSprayParam} areaUnit={user.areaUnit} activityArea={activityArea}
                sprayParams={sprayParams}
            />}
            <AlertDialog open={showAlert} title={'requiredFieldsMissing'} message={errorMsg} varieant={'error'} handleClose={_ => setShowAlert(false)} buttonText={text.close} />
            <Box marginTop={2} marginBottom={0} display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Controller
                    control={control}
                    name="invoice"
                    render={({ field }) => (
                        <TextField size='small'

                            id="activity-invoice"
                            label={text.invoice} fullWidth {...field} />
                    )}
                />
            </Box>
        </Box>
    )
}

const RenderTable = ({ register, remove, user, activity, handleOpenEditRow, text, getFields, activityDef, irrigationParams, calcIrrigation, activityArea, daysInPeriod, fieldsCount, totalWaterQty }) => {
    return (
        <TableContainer >
            <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                <TableHead>
                    <TableRow  >
                        <TableCell sx={headerSx} >{text.name}</TableCell>
                        <TableCell sx={headerSx} >{text.type}</TableCell>
                        <TableCell sx={headerSx}>{text.qty}</TableCell>
                        {calcIrrigation && <TableCell sx={cellSx} ><Calculator /></TableCell>}

                        <TableCell sx={headerSx}>{text.unit}</TableCell>
                        {user.financial && <TableCell sx={headerSx}>{text.cost}</TableCell>}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {getFields().map((row, index) =>
                        <Row key={row.key} index={index} row={row} text={text} areaUnit={user.areaUnit} register={register}
                            activityArea={activityArea}
                            remove={remove}
                            currency={user.currency}
                            financial={user.financial}
                            onClick={() => handleOpenEditRow(index, row)}
                            activityDef={activityDef} irrigationParams={irrigationParams}
                            calcIrrigation={calcIrrigation}
                            daysInPeriod={daysInPeriod}
                            fieldsCount={fieldsCount}
                            totalWaterQty={totalWaterQty}

                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function calcQty(row, irrigationParams, activityArea, daysInPeriod, fieldsCount, totalWaterQty) {
    if (row.resource.type === WATER && row.qty && irrigationParams.irrigationMethod) {
        return totalWaterQty.toFixed(2);
    }
    if (row.resource.type === FERTILIZER && row.qty && irrigationParams.fertilizeMethod) {
        const irrigationDays = calcIrrigationDays(daysInPeriod, irrigationParams.frequency);
        return calcTotalFertilizerQty(irrigationParams.fertilizeMethod, row.qty, totalWaterQty, activityArea, daysInPeriod, irrigationDays, fieldsCount).toFixed(2)
    }
    return 0;
}

function getTotalCost(tariff, qty) {
    if (tariff * qty) {
        return (tariff * qty).toFixed(2);
    }
    return 0;
}

function Row(props) {
    const { row, index, text, areaUnit, onClick, currency, remove, register, financial, activityDef, irrigationParams, calcIrrigation, activityArea,
        daysInPeriod, fieldsCount, totalWaterQty
    } = props;

    const calc = (calcIrrigation && [WATER, FERTILIZER].includes(row.resource.type)) ? calcQty(row, irrigationParams, activityArea, daysInPeriod, fieldsCount, totalWaterQty) : null;
    const totalCost = getTotalCost(row.tariff, calc ? calc : row.qty);

    const resourceType = row.resource.category === SPRAYER ? SPRAYER : row.resource.type;

    return (
        <Fragment>
            <TableRow
                {...register(`resource.${index}.totalCost`)}
                {...register(`resource.${index}.qty`)}
                {...register(`resource.${index}.note`)}
                {...register(`resource.${index}.warehouse`)}
                {...register(`resource.${index}.manualTariff`)}

                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell onClick={onClick} sx={cellSxLink} >{row.resource.name}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx} >{getResourceTypeText(resourceType, text)}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={row.manualQty ? cellSxChange : cellSx}>{row.qty}</TableCell>
                {calcIrrigation && <TableCell /*onClick={onClick}*/ sx={cellSx}>{calc ? calc : ''}</TableCell>}
                <TableCell /*onClick={onClick}*/ sx={cellSx}>{getUnitText(getResourceUsageUnit(row.resource, activityDef), areaUnit, text)}</TableCell>
                {financial && <TableCell /*onClick={onClick}*/ sx={row.manualTariff ? cellSxChange : cellSx}>{totalCost}</TableCell>}
                {/* <TableCell width={1} sx={{ padding: 0, margin: 0 }}><IconButton margin={0} padding={0} onClick={e => remove(index)}><Delete fontSize='large' /></IconButton></TableCell> */}
            </TableRow>
        </Fragment>
    );
}
export default ActivityResources