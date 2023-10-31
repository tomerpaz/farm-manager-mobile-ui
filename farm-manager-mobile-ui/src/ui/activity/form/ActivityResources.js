import { Box, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../features/app/appSlice"
import { cellSx, cellSxLink, headerSx } from "../view/FieldsView"
import { Fragment, useState } from "react"
import { ACTIVITY_RESOURCES, getResourceTypeText, getUnitText } from "../../FarmUtil"
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice"
import ResourcseSelectionDialog from "../../dialog/ResourcseSelectionDialog"
import { Controller, useFieldArray } from "react-hook-form"
import { Delete, Menu } from "@mui/icons-material"
import ActivityResourceDialog from "./ActivityResourceDialog"
import { useGetWarehousesQuery } from "../../../features/warehouses/warehouseApiSlice"

const TRASHHOLD = 3;

const ActivityResources = ({ activity, control, errors, register }) => {
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [expendFields, setExpendFields] = useState(false);
    const { data: warehouses, isSuccess: isWarehousesDefsSuccess } = useGetWarehousesQuery()

    const handleOpenEditRow = (index, row) => {
        setSelectedRow(row);
        setSelectedIndex(index);
    };


    const handleCloseEditRow = () => {
        setSelectedRow(null);
        setSelectedIndex(null);
    };

    const { fields, append, prepend, remove, swap, move, insert, update, } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "resources", // unique name for your Field Array
        keyName: "key",
        rules: { required: false }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (selectedResources) => {
        console.log('handleClose', selectedResources)

        setOpen(false);
        if (selectedResources) {
            const alreadySelectedIDs = fields.map(e => e.resource.id);
            const newtlySelectedResources = selectedResources.filter(e => !alreadySelectedIDs.includes(e.id)).map(e => {
                return {
                    resource: e,
                    qty: 0,
                    totalCost: 0,
                    note: null,
                    date: null,
                    dosage: null,
                    tariff: 0,
                    manualTariff: false,
                    warehouse: null,
                }
            }
            );
            append(newtlySelectedResources)
        }
    }
    const resourceTypes = ACTIVITY_RESOURCES.find(e => activity.type.includes(e.activity))?.types;

    if (!resourceTypes) {
        return <></>
    }

    const getFields = () => {
        return (expendFields && fields.length > TRASHHOLD) ? fields : fields.slice(0, TRASHHOLD);
    }

    return (
        <Box margin={1} paddingTop={2} display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Button size='large' color={errors.resources ? 'error' : 'primary'} disableElevation={true} variant="contained" onClick={handleClickOpen}>{text.resources} </Button>
                {fields.length > TRASHHOLD &&
                    <IconButton sx={{ marginLeft: 1, marginRight: 1 }} onClick={() => setExpendFields(!expendFields)}>
                        <Badge badgeContent={fields.length} color="primary">
                            <Menu fontSize='large' />
                        </Badge>
                    </IconButton>
                }
                <Box margin={1}></Box>
                <Controller
                    control={control}
                    name="invoice"
                    render={({ field }) => (
                        <TextField size='small'

                            id="activity-invoice"
                            label={text.invoice} fullWidth {...field} />
                    )}
                />
                {/* <IconButton onClick={e => remove()}><Delete fontSize='large' /></IconButton> */}
            </Box>

            <TableContainer >
                <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow  >
                            <TableCell sx={headerSx} >{text.name}</TableCell>
                            <TableCell sx={headerSx} >{text.type}</TableCell>
                            <TableCell sx={headerSx}>{text.qty}</TableCell>
                            <TableCell sx={headerSx}>{text.unit}</TableCell>
                            {user.financial && <TableCell sx={headerSx}>{text.cost}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getFields().map((row, index) =>
                            <Row key={row.key} index={index} row={row} text={text} areaUnit={user.areaUnit} register={register}
                                remove={remove}
                                currency={user.currency} activityDef={activity.activityDef}
                                financial={user.financial}
                                onClick={() => handleOpenEditRow(index, row)} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <ResourcseSelectionDialog open={open} handleClose={handleClose} resourceTypes={resourceTypes} />
            {selectedRow && <ActivityResourceDialog selectedIndex={selectedIndex} selectedRow={selectedRow}
                activityType={activity.type} handleClose={handleCloseEditRow} update={update}
                warehouses={warehouses} control={control} errors={errors} />}

        </Box>
    )
}
function Row(props) {
    const { row, index, text, areaUnit, onClick, currency, remove, register, financial } = props;
    return (
        <Fragment>
            <TableRow
                {...register(`resource.${index}.totalCost`)}
                {...register(`resource.${index}.qty`)}
                {...register(`resource.${index}.note`)}
                {...register(`resource.${index}.warehouse`)}

                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell onClick={onClick} sx={cellSxLink} >{row.resource.name}</TableCell>
                <TableCell onClick={onClick} sx={cellSx} >{getResourceTypeText(row.resource.type, text)}</TableCell>
                <TableCell onClick={onClick} sx={cellSx}>{row.qty}</TableCell>
                <TableCell onClick={onClick} sx={cellSx}>{getUnitText(row.resource.usageUnit, areaUnit, text)}</TableCell>
                {financial && <TableCell onClick={onClick} sx={cellSx}>{row.totalCost}</TableCell>}
                <TableCell width={1} sx={{ padding: 0, margin: 0 }}><IconButton margin={0} padding={0} onClick={e => remove(index)}><Delete fontSize='large' /></IconButton></TableCell>
            </TableRow>
        </Fragment>
    );
}
export default ActivityResources