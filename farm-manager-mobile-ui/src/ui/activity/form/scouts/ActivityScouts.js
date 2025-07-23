import { Box, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge, List, ListItemButton, ListItemText, ListItemIcon, ListItem, Autocomplete } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../../features/app/appSlice"
import { cellSx, cellSxChange, cellSxLink, headerSx } from "../../../Util"
import { Fragment, useEffect, useState } from "react"
import { ACTIVITY_RESOURCES, AREA_UNIT, ENERGY, EQUIPMENT, FERTILIZER, HOUR, IRRIGARION_TYPES, IRRIGATION, IRRIGATION_PLAN, PESTICIDE, SCOUT, SPRAY, SPRAYER, SPRAY_TYPES, WAREHOUSE_RESOURCE_TYPE, WATER, WORKER, getResourceTypeText, getResourceUsageUnit, getUnitText, isArrayEmpty } from "../../../FarmUtil"
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice"
import { Controller, useFieldArray } from "react-hook-form"
import { Agriculture, Delete, DragHandle, Error, Menu, MoreVert } from "@mui/icons-material"
import PestSelectionDialog from "../../../dialog/PestSelectionDialog"
import { infectionLevels } from "../../../scout/ScoutingUtil"
import ActivityScoutDialog from "./ActivityScoutDialog"
import { useGetPestStagesQuery } from "../../../../features/pests/pestsApiSlice"
import TextFieldBase from "../../../../components/ui/TextField"
import { useGetResourcesQuery } from "../../../../features/resources/resourcesApiSlice"


const TRASHHOLD = 3;
const UNITS = [AREA_UNIT.toUpperCase(), HOUR.toUpperCase()]

//const REQUIRED_RESOURCES = SPRAY_TYPES.concat(IRRIGARION_TYPES);

const ELEMENT_ID = 'scoutParams.scouts'

const ActivityScouts = ({ activity, control, errors, register, setValue, trigger }) => {
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [expendFields, setExpendFields] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const { data: stages, isLoading: isLoadingStages } = useGetPestStagesQuery()


    const {
        data: scouters,
    } = useGetResourcesQuery({ type: WORKER })



    const handleOpenEditRow = (index, row) => {
        setSelectedRow(row);
        setSelectedIndex(index);
    };


    const handleCloseEditRow = () => {
        setSelectedRow(null);
        setSelectedIndex(null);
        // trigger(['scoutParams.scouts'])
    };

    const handleRemoveRow = (index) => {
        setSelectedRow(null);
        setSelectedIndex(null);
        remove(index)

    };

    const { fields, append, prepend, remove, swap, move, insert, update, } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "scoutParams.scouts", // unique name for your Field Array
        keyName: "key",
        rules: {
            required: false,
        }
    });

    const handleClose = (selectedElements) => {
        setOpen(false);
        if (selectedElements) {
            const alreadySelectedIDs = fields.map(e => e.finding.id);
            const newtlySelectedFields = selectedElements.filter(e => !alreadySelectedIDs.includes(e.id)).map(e => {
                return {
                    finding: e,
                    note: '',
                    qty: 0,
                    location: 'none',
                    infectionLevel: 'none',
                    stage: stages.find(e => e.code === 'none')
                }
            }
            );
            append(newtlySelectedFields)
        }
    }





    const handleClickOpen = () => {
        setOpen(true);
    };


    const getFields = () => {
        return (expendFields && fields.length > TRASHHOLD) ? fields : fields.slice(0, TRASHHOLD);
    }

    console.log('text.scouter',text.scouter)
    return (
        <Box margin={1} paddingTop={2} display={'flex'} flexDirection={'column'}>

            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Box display={'flex'}  flexDirection={'row'} alignItems={'center'}>
                    <Box>
                        <Button id={ELEMENT_ID} size='large' disableElevation={true} variant="contained" onClick={handleClickOpen}>{text.pests} </Button>
                    </Box>
                    {fields.length > TRASHHOLD &&
                        <IconButton  onClick={() => setExpendFields(!expendFields)}>
                            <Badge badgeContent={fields.length} color="info">
                                {expendFields && <Menu fontSize='large' />}
                                {!expendFields && <DragHandle fontSize='large' />}
                            </Badge>
                        </IconButton>
                    }
                </Box>
                 <Box margin={1} ></Box>
                <Box flex={1} >
                    {!isArrayEmpty(scouters) && <Controller
                        name="scoutParams.scouter"
                        rules={{ required: true }}
                        control={control}
                        render={({ field: { ref, onChange, ...field } }) => <Autocomplete
                            disablePortal
                            blurOnSelect={true}
                            onChange={(_, data) => onChange(data)}
                            options={scouters.filter(e => e.active)}
                            sx={{ flex: 1 }}
                            size='small'
                            getOptionLabel={(option) => option ? option.name : ''}
                            isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                            renderInput={(params) => <TextFieldBase
                                // error={errors.customer ? true : false}
                                sx={{ marginTop: 0.5 }} {...params} label={text.scouter} />}
                            {...field} />}

                    />}
                </Box>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>

                    <IconButton size='large' disabled={isArrayEmpty(fields)} onClick={() => remove()}><Delete fontSize='large' /></IconButton>
                </Box>
            </Box>


            <RenderTable
                register={register} remove={remove} user={user} activity={activity}
                handleOpenEditRow={handleOpenEditRow} text={text} getFields={getFields}

            />
            <PestSelectionDialog open={open} handleClose={handleClose} />


            {selectedRow && <ActivityScoutDialog selectedIndex={selectedIndex} selectedRow={selectedRow} handleClose={handleCloseEditRow} update={update} remove={() => handleRemoveRow(selectedIndex)} stages={isLoadingStages ? [] : stages} />}


        </Box>
    )
}

const RenderTable = ({ register, remove, user, activity, handleOpenEditRow, text, getFields, activityDef, irrigationParams, calcIrrigation, activityArea, daysInPeriod, fieldsCount, totalWaterQty }) => {
    return (
        <TableContainer >
            <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                <TableHead>
                    <TableRow  >
                        <TableCell sx={headerSx} >{text.pest}</TableCell>
                        {/* <TableCell sx={headerSx} >{text.qty}</TableCell> */}
                        <TableCell sx={headerSx} >{text.location}</TableCell>
                        <TableCell sx={headerSx} >{text.infectionLevel}</TableCell>
                        <TableCell sx={headerSx} >{text.qty}</TableCell>

                        {/* <TableCell sx={headerSx}>{text.qty}</TableCell>

                        <TableCell sx={headerSx}>{text.unit}</TableCell> */}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {getFields().map((row, index) =>
                        <Row key={row.key} index={index} row={row} text={text}
                            register={register}
                            remove={remove}
                            onClick={() => handleOpenEditRow(index, row)}

                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}



function Row(props) {
    const { row, index, text, areaUnit, onClick, currency, remove,
        register,
    } = props;



    return (
        <Fragment>
            <TableRow
                // {...register(`scoutParams.scouts.${index}.totalCost`)}
                // {...register(`scoutParams.scouts.${index}.qty`)}
                // {...register(`scoutParams.scouts.${index}.note`)}
                // {...register(`scoutParams.scouts.${index}.warehouse`)}
                // {...register(`scoutParams.scouts.${index}.manualTariff`)}

                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell onClick={onClick} sx={cellSxLink} >{row.finding.name}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx} >{text[row.location]}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx} >{text[row.infectionLevel]}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx} >{row.value}</TableCell>

            </TableRow>
        </Fragment>
    );
}
export default ActivityScouts