import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../features/app/appSlice";
import { Fragment, useState } from "react";
import { cellSx, headerSx } from "../activity/view/FieldsView";
import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { Search } from "@mui/icons-material";
import { isStringEmpty } from "../FarmUtil";

const filterField = (field, filter) => {
    if (isStringEmpty(filter)) {
        return true;
    } else {
        const val = filter.toLowerCase();
        return field.name.toLowerCase().includes(val) ||
            field.alias?.toLowerCase().includes(val) ||
            field.siteName?.toLowerCase().includes(val) ||
            field.cropName.toLowerCase().includes(val) ||
            field.varietyName.toLowerCase().includes(val)
    }
};

const isFieldSelected = (field, selectedFields) => {
    return selectedFields.some(e=>e.id === field.id)
};

const FieldSelectionDialog = ({ fields, open, handleClose }) => {
    const text = useSelector(selectLang);
    // const { data: user } = useGetUserDataQuery()
    const [filter, setFilter] = useState('');

    const [selectFields, setSelectedFields] = useState([]);


    const visableFields = fields.filter(e => filterField(e, filter));
    const visableSelectedFields = visableFields.filter(e => selectFields.includes(e));
    const numSelected = visableSelectedFields.length;

    const rowCount = visableFields.length;


    const onSelectAllClick = (e) => {
        if(e.target.checked){
            const visableSelectedFieldIDs = visableSelectedFields.map(f=>f.id);
            const visableNotSelectedFields = visableFields.filter(f=>!visableSelectedFieldIDs.includes(f.id));
            setSelectedFields(selectFields.concat(visableNotSelectedFields));
        } else {
            const visableFieldsIDs = visableFields.map(f=>f.id);
            setSelectedFields(selectFields.filter(f=> !visableFieldsIDs.includes(f.id)));
        }
    };

    const onSelectRow = (e) =>{
        if(isFieldSelected(e, selectFields)){
            setSelectedFields(selectFields.filter(f=> e.id !== f.id));
        }else {
            setSelectedFields(selectFields.concat([e]));
        }
    }


    const onAction = (save) => {
        handleClose(save ? selectFields : null);
        setSelectedFields([])
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen
        >
            <DialogTitle id="alert-dialog-title">
                <Box>

                    <TextFieldBase fullWidth={true} label={text.filter} value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                        }}
                    />
                </Box>
            </DialogTitle>
            <DialogContent>
                <TableContainer >
                    <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{
                                height: 10,
                            }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={onSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={headerSx} >{text.field}</TableCell>
                                <TableCell sx={headerSx}>{text.alias}</TableCell>
                                <TableCell sx={headerSx}>{text.crop}</TableCell>
                                <TableCell sx={headerSx}>{text.variety}</TableCell>
                                <TableCell sx={headerSx}>{text.site}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visableFields.map((row, index) =>
                                <Row key={index} index={index} row={row} text={text} onClick={()=>onSelectRow(row, index)} isItemSelected={isFieldSelected(row, selectFields)} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <DialogContentText id="alert-dialog-description">
                {fields.map(e=> <Box key={e.id}>{e.name}</Box>)}
            </DialogContentText> */}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' variant='outlined' onClick={()=>onAction(false)}>{text.cancel}</Button>
                <Button size='large' disableElevation={true} variant='contained' onClick={()=>onAction(true)} autoFocus>
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )

}
function Row(props) {
    const { row, index, text, onClick, isItemSelected } = props;
    return (
        <Fragment>
            <TableRow style={{
                height: 10,
            }} onClick={onClick}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': index,
                        }}
                    />
                </TableCell>
                <TableCell sx={cellSx} >{row.name}</TableCell>
                <TableCell sx={cellSx}>{row.alias}</TableCell>
                <TableCell sx={cellSx} >{row.cropName}</TableCell>
                <TableCell sx={cellSx}>{row.varietyName}</TableCell>
                <TableCell sx={cellSx}>{row.siteName}</TableCell>
            </TableRow>
        </Fragment>
    );
}

export default FieldSelectionDialog;