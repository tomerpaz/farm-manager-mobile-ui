import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../features/app/appSlice"
import { cellSx, cellSxLink, headerSx } from "../view/FieldsView"
import { Fragment, useState } from "react"
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice"
import { useFields } from "../../../features/fields/fieldsApiSlice"
import FieldSelectionDialog from "../../dialog/FieldsSelectionDialog"
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";


const ActivityFields = ({ activity, getValues, control, register }) => {

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "fields", // unique name for your Field Array
        keyName: "key"
    });
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const fieldsByYear = useFields(getValues('year'))



    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (selectedFields) => {
        setOpen(false);
        if (selectedFields) {
            const alreadySelectedIDs = fields.map(e=>e.field.id);
            const newtlySelectedFields = selectedFields.filter(e=>!alreadySelectedIDs.includes(e.id)).map(e => {
                return {
                    field: e,
                    activityArea: e.area,
                }
            }
            );
            append(newtlySelectedFields)
        }
    };

    return (
        <Box margin={1} display={'flex'} flexDirection={'column'}>
            <Box>
                <Button size='large' disableElevation={true} variant="contained" onClick={handleClickOpen}>{text.fields} </Button>
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
                        {fields.map((row, index) =>
                            <Row key={row.key} index={index} row={row} text={text} register={register} /*onClick={setSelectedRow}*/ />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <FieldSelectionDialog open={open} fields={fieldsByYear} handleClose={handleClose} />

        </Box>
    )

}
function Row(props) {
    const { row, index, text, onClick, register } = props;

    //        {...register(`test.${index}.value`)} 

    return (
        <Fragment>
            <TableRow onClick={() => onClick(index)}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={cellSxLink} >{row.field.name}</TableCell>
                <TableCell sx={cellSx}>{row.field.alias}</TableCell>
                <TableCell sx={cellSx} >{row.field.cropName}</TableCell>
                <TableCell sx={cellSx}>{row.field.varietyName}</TableCell>
                <TableCell sx={cellSx}>{row.activityArea.toFixed(2)}</TableCell>
            </TableRow>
        </Fragment>
    );
}
export default ActivityFields