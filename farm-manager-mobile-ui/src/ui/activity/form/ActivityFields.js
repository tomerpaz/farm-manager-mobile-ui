import { Badge, Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../features/app/appSlice"
import { cellSx, cellSxBlue, cellSxLink, headerSx } from "../view/FieldsView"
import { Fragment, useState } from "react"
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice"
import { useFields } from "../../../features/fields/fieldsApiSlice"
import FieldSelectionDialog from "../../dialog/FieldsSelectionDialog"
import { useFieldArray } from "react-hook-form";
import { Delete, DragHandle, Menu } from "@mui/icons-material"
import ActivityFieldDialog from "./ActivityFieldDialog"

const TRASHHOLD = 3;

const ActivityFields = ({ activity, getValues, control, register, errors, setValue }) => {

    const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "fields", // unique name for your Field Array
        keyName: "key",
        rules: { required: true }
    });
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const fieldsByYear = useFields(getValues('year'))



    const [open, setOpen] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [expendFields, setExpendFields] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

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

    const handleClose = (selectedFields) => {
        setOpen(false);
        if (selectedFields) {
            const alreadySelectedIDs = fields.map(e => e.field.id);
            const newtlySelectedFields = selectedFields.filter(e => !alreadySelectedIDs.includes(e.id)).map(e => {
                return {
                    field: e,
                    activityArea: e.area,
                    fieldNote: null,
                    actualExecution: null
                }
            }
            );
            append(newtlySelectedFields)
        }
    };

    const getFields = () => {
        return (expendFields && fields.length > TRASHHOLD) ? fields : fields.slice(0, TRASHHOLD);
    }
    // const fields = (expendFields && activity.fields.length > TRASHHOLD) ? activity.fields : activity.fields.slice(0, TRASHHOLD);

    return (
        <Box margin={1} display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                    <Button size='large' color={errors.fields ? 'error' : 'primary'} disableElevation={true} variant="contained" onClick={handleClickOpen}>{text.fields} </Button>
                    {fields.length > TRASHHOLD &&
                        <IconButton sx={{ marginLeft: 1, marginRight: 1 }} onClick={() => setExpendFields(!expendFields)}>
                            <Badge badgeContent={fields.length} color="primary">
                                {expendFields && <Menu fontSize='large' />}
                                {!expendFields && <DragHandle fontSize='large' />}                            </Badge>
                        </IconButton>
                    }
                </Box>
                <IconButton onClick={e => remove()}><Delete fontSize='large' /></IconButton>
            </Box>

            <TableContainer >
                <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow  >
                            <TableCell sx={headerSx} >{text.field}</TableCell>
                            <TableCell sx={headerSx}>{text.alias}</TableCell>
                            <TableCell sx={headerSx}>{text.crop}</TableCell>
                            <TableCell sx={headerSx}>{text.variety}</TableCell>
                            <TableCell sx={headerSx}>{text[user.areaUnit]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getFields().map((row, index) =>
                            <Row key={row.key} index={index} row={row} text={text} register={register} remove={remove} onClick={() => handleOpenEditRow(index, row)} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <FieldSelectionDialog open={open} fields={fieldsByYear} handleClose={handleClose} />
            {selectedRow && <ActivityFieldDialog selectedIndex={selectedIndex} selectedRow={selectedRow} activityType={activity.type} handleClose={handleCloseEditRow} update={update} remove={() => handleRemoveRow(selectedIndex)} />}

        </Box>
    )

}
function Row(props) {
    const { row, index, text, onClick, register, remove } = props;

    //        {...register(`test.${index}.value`)} 

    return (
        <Fragment >
            <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell onClick={onClick} sx={cellSxLink} >{row.field.name}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx}>{row.field.alias}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx} >{row.field.cropName}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={cellSx}>{row.field.varietyName}</TableCell>
                <TableCell /*onClick={onClick}*/ sx={row.activityArea === row.field.area ? cellSx : cellSxBlue}>
                    <Box {...register(`field.${index}.activityArea`)}>
                        {row.activityArea.toFixed(2)}
                    </Box>
                </TableCell>
                {/* <TableCell width={1} sx={{ padding: 0, margin: 0 }}><IconButton margin={0} padding={0} onClick={e => remove(index)}><Delete fontSize='large' /></IconButton></TableCell> */}



            </TableRow>
        </Fragment>
    );
}
export default ActivityFields