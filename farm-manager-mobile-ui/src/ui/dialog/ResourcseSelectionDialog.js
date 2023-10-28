import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../features/app/appSlice";
import { Fragment, useEffect, useState } from "react";
import { cellSx, headerSx } from "../activity/view/FieldsView";
import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { Search } from "@mui/icons-material";
import { getResourceTypeText, isStringEmpty } from "../FarmUtil";
import Loading from "../../components/Loading";
import { useGetResourcesQuery } from "../../features/resources/resourcesApiSlice";

const filterResource = (e, filter) => {
    if (isStringEmpty(filter)) {
        return true;
    } else {
        const val = filter.toLowerCase();
        return e.name.toLowerCase().includes(val) ||
            e.code?.toLowerCase().includes(val)
    }
};

const isResourceSelected = (resource, selectedResources) => {
    return selectedResources.some(e => e.id === resource.id)
};

const ResourcseSelectionDialog = ({ open, handleClose, resourceTypes }) => {
    const text = useSelector(selectLang);
    // const { data: user } = useGetUserDataQuery()
    const [filter, setFilter] = useState('');
    const [type, setType] = useState(resourceTypes[0]);

    const [selectedResources, setSelectedResources] = useState([]);



    useEffect(() => {
        setFilter('')
    }, [type]);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetResourcesQuery({ type })


    if (isLoading) return <Loading />


    const onSelectRow = (e) => {
        if (isResourceSelected(e, selectedResources)) {
            setSelectedResources(selectedResources.filter(f => e.id !== f.id));
        } else {
            setSelectedResources(selectedResources.concat([e]));
        }
    }

    const visableResources = data.filter(e => filterResource(e, filter));

    const visableSelectedResources = visableResources.filter(e => selectedResources.includes(e));
    const numSelected = visableSelectedResources.length;

    const rowCount = visableResources.length;


    const onSelectAllClick = (e) => {
        if(e.target.checked){
            const visableSelectedResourceIDs = visableSelectedResources.map(f=>f.id);
            const visableNotSelectedResources = visableResources.filter(f=>!visableSelectedResourceIDs.includes(f.id));
            setSelectedResources(selectedResources.concat(visableNotSelectedResources));
        } else {
            const visableResourceIDs = visableResources.map(f=>f.id);
            setSelectedResources(selectedResources.filter(f=> !visableResourceIDs.includes(f.id)));
        }
    };



    const onAction = (save) => {
        handleClose(save ? selectedResources : null);
        setSelectedResources([])
        //handleClose(save);
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
                    <TextFieldBase
                        sx={{ margin: 1 }}
                        id="outlined-select-resource-type"
                        select
                        fullWidth
                        label={text.type}
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        {resourceTypes.map((e) => (
                            <MenuItem key={e} value={e}>
                                {getResourceTypeText(e, text)}
                            </MenuItem>
                        ))}
                    </TextFieldBase>

                    <TextFieldBase fullWidth={true} label={text.filter} value={filter}
                        sx={{ margin: 1 }}
                        id="outlined-filter-resource-type"
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
                                <TableCell sx={headerSx} >{text.name}</TableCell>
                                <TableCell sx={headerSx}>{text.unit}</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visableResources.map((row, index) =>
                                <Row key={index} index={index} row={row} text={text} onClick={() => onSelectRow(row, index)} isItemSelected={isResourceSelected(row, selectedResources)} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' variant='outlined' onClick={() => onAction(false)}>{text.cancel}</Button>
                <Button size='large' disableElevation={true} variant='contained' onClick={() => onAction(true)} autoFocus>
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
                <TableCell sx={cellSx}>{row.usageUnit}</TableCell>

            </TableRow>
        </Fragment>
    );
}

export default ResourcseSelectionDialog;