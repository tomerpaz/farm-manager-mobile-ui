import { Box, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge, List, ListItemButton, ListItemText, ListItemIcon, ListItem } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../../features/app/appSlice"
import { cellSx, cellSxChange, cellSxLink, headerSx } from "../../view/FieldsView"
import { Fragment, useEffect, useState } from "react"
import { ACTIVITY_RESOURCES, AREA_UNIT, ENERGY, HOUR, IRRIGARION_TYPES, IRRIGATION, IRRIGATION_PLAN, SPRAY, SPRAY_TYPES, WAREHOUSE_RESOURCE_TYPE, WATER, getResourceTypeText, getResourceUsageUnit, getUnitText, isArrayEmpty } from "../../../FarmUtil"
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice"
import ResourcseSelectionDialog from "../../../dialog/ResourcseSelectionDialog"
import { Controller, useFieldArray } from "react-hook-form"
import { Delete, DragHandle, Menu, MoreVert } from "@mui/icons-material"
import ActivityResourceDialog from "./ActivityResourceDialog"
import { useGetWarehousesQuery } from "../../../../features/warehouses/warehouseApiSlice"
import UpdateResourcesQtyDialog from "./UpdateResourcesQtyDialog"
import Calculator from "../../../../icons/Calculator"
import IrrigationConfigDialog from "./IrrigationConfigDialog"

const TRASHHOLD = 3;
const UNITS = [AREA_UNIT.toUpperCase(), HOUR.toUpperCase()]

const ActivityResources = ({ activity, control, errors, register, tariffs, activityArea, activityDef, days, irrigationParams, setValue }) => {
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

    const handleOpenEditRow = (index, row) => {
        setSelectedRow(row);
        setSelectedIndex(index);
    };


    const handleCloseEditRow = () => {
        setSelectedRow(null);
        setSelectedIndex(null);
    };

    const handleRemoveRow = (index) => {
        setSelectedRow(null);
        setSelectedIndex(null);
        remove(index)

    };

    const { fields, append, prepend, remove, swap, move, insert, update, } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "resources", // unique name for your Field Array
        keyName: "key",
        rules: { required: false }
    });


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
            let newtlySelectedResources = selectedResources.filter(e => !alreadySelectedIDs.includes(e.id)).map(e => {
                return {
                    resource: e,
                    qty: 0,
                    totalCost: 0,
                    note: null,
                    date: null,
                    dosage: null,
                    tariff: 0,
                    manualTariff: false,
                    warehouse: WAREHOUSE_RESOURCE_TYPE.includes(e.type) ? user.warehouse : null,
                }
            }
            );
            if (!isArrayEmpty(newtlySelectedResources)) {
                newtlySelectedResources = clearSingular(newtlySelectedResources);
                prepend(newtlySelectedResources)
                setLoadTariffs(true);
            }

        }
        // const element = document.getElementById('section-1');
        // if (element) {
        //   // 👇 Will scroll smoothly to the top of the next section
        //   element.scrollIntoView({ behavior: 'smooth' });
        // }

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
        // if (unit && qty) {
        //     fields.map((row, index) => {
        //         if (unit === getResourceUsageUnit(row.resource, activityDef)) {
        //             row.qty = qty;
        //             if (row.tariff) {
        //                 row.totalCost = row.tariff * qty;
        //             }
        //             update(index, row);
        //         }
        //     })
        // }
        setOpenIrrigationConfig(false)
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

    return (
        <Box margin={1} paddingTop={2} display={'flex'} flexDirection={'column'}>
            <Box marginTop={1} marginBottom={1} display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
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
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                    <Button id={'section-1'} size='large' color={errors.resources ? 'error' : 'primary'} disableElevation={true} variant="contained" onClick={handleClickOpen}>{text.resources} </Button>
                    {fields.length > TRASHHOLD &&
                        <IconButton sx={{ marginLeft: 1, marginRight: 1 }} onClick={() => setExpendFields(!expendFields)}>
                            <Badge badgeContent={fields.length} color="primary">
                                {expendFields && <Menu fontSize='large' />}
                                {!expendFields && <DragHandle fontSize='large' />}
                            </Badge>
                        </IconButton>
                    }
                    {IRRIGARION_TYPES.includes(activity.type) &&
                        <IconButton size='large' onClick={() => setOpenIrrigationConfig(true)}><Calculator fontSize='large' /></IconButton>
                    }
                </Box>
                <Box>
                    <IconButton size='large' disabled={isArrayEmpty(resourceBulkUnits)} onClick={() => setOpenEditBulkQty(true)}><MoreVert fontSize='large' /></IconButton>
                    <IconButton size='large' disabled={isArrayEmpty(fields)} onClick={() => remove()}><Delete fontSize='large' /></IconButton>
                </Box>
            </Box>


            <RenderTable register={register} remove={remove} user={user} activity={activity}
                handleOpenEditRow={handleOpenEditRow} text={text} getFields={getFields} activityDef={activityDef} irrigationParams={irrigationParams} />


            <ResourcseSelectionDialog open={open} handleClose={handleClose} resourceTypes={resourceTypes} />
            {selectedRow && <ActivityResourceDialog selectedIndex={selectedIndex} selectedRow={selectedRow}
                activityType={activity.type} handleClose={handleCloseEditRow} update={update}
                warehouses={warehouses} control={control} errors={errors} activityArea={activityArea}
                resourceUnit={getResourceUsageUnit(selectedRow.resource, activityDef)}
                remove={() => handleRemoveRow(selectedIndex)} />}
            <UpdateResourcesQtyDialog open={openEditBulkQty} units={resourceBulkUnits} text={text} handleClose={handleBulkQtyUpdate} areaUnit={user.areaUnit} activityArea={activityArea}
            />
            {IRRIGARION_TYPES.includes(activity.type) && <IrrigationConfigDialog open={openIrrigationConfig} days={days} text={text} handleClose={handleIrrigationConfig} areaUnit={user.areaUnit} activityArea={activityArea}
                irrigationParams={irrigationParams}
            // {...register(`irrigationParams`)}
            />}

        </Box>
    )
}

const RenderList = ({ register, remove, user, activity, handleOpenEditRow, text, getFields }) => {
    return (
        <List>
            {getFields().map((row, index) =>
                <ListItem disablePadding dense={true}>
                    <ListItemButton onClick={() => handleOpenEditRow(index, row)}>
                        {/* <ListItemIcon>
                            <Inbox />
                        </ListItemIcon> */}
                        <ListItemText primary={row.resource.name} secondary={getResourceTypeText(row.resource.type, text)} />
                        {/* <ListItemText secondary={row.resource.type} /> */}

                    </ListItemButton>
                </ListItem>
                // <Row key={row.key} index={index} row={row} text={text} areaUnit={user.areaUnit} register={register}
                //     remove={remove}
                //     currency={user.currency} activityDef={activity.activityDef}
                //     financial={user.financial}
                //     onClick={() => handleOpenEditRow(index, row)} />
            )}

        </List>
    )
}

const RenderTable = ({ register, remove, user, activity, handleOpenEditRow, text, getFields, activityDef, irrigationParams }) => {
    return (
        <TableContainer >
            <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                <TableHead>
                    <TableRow  >
                        <TableCell sx={headerSx} >{text.name}</TableCell>
                        <TableCell sx={headerSx} >{text.type}</TableCell>
                        <TableCell sx={headerSx}>{text.qty}</TableCell>
                        {/* <TableCell ><Calculator/></TableCell> */}

                        <TableCell sx={headerSx}>{text.unit}</TableCell>
                        {user.financial && <TableCell sx={headerSx}>{text.cost}</TableCell>}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {getFields().map((row, index) =>
                        <Row key={row.key} index={index} row={row} text={text} areaUnit={user.areaUnit} register={register}
                            remove={remove}
                            currency={user.currency}
                            financial={user.financial}
                            onClick={() => handleOpenEditRow(index, row)}
                            activityDef={activityDef} irrigationParams={irrigationParams} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function Row(props) {
    const { row, index, text, areaUnit, onClick, currency, remove, register, financial, activityDef, irrigationParams } = props;

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
                <TableCell /*onClick={onClick}*/ sx={cellSx} >{getResourceTypeText(row.resource.type, text)}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx}>{row.qty}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx}>{getUnitText(getResourceUsageUnit(row.resource, activityDef), areaUnit, text)}</TableCell>
                {financial && <TableCell /*onClick={onClick}*/ sx={row.manualTariff ? cellSxChange : cellSx}>{row.totalCost ? row.totalCost.toFixed(2) : 0}</TableCell>}
                {/* <TableCell width={1} sx={{ padding: 0, margin: 0 }}><IconButton margin={0} padding={0} onClick={e => remove(index)}><Delete fontSize='large' /></IconButton></TableCell> */}
            </TableRow>
        </Fragment>
    );
}
export default ActivityResources