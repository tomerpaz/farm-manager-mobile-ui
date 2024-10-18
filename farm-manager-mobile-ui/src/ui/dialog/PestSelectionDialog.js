import { AppBar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../features/app/appSlice";
import { Fragment, useState } from "react";
import { cellSx, headerSx, Transition } from "../Util";
import { Close, Search } from "@mui/icons-material";
import { isMobile, isStringEmpty } from "../FarmUtil";

import DialogAppBar from "./DialogAppBar";

import { useGetInfectionLevelsQuery, useGetPestsQuery, useGetPestStagesQuery, useGetPlantLocationsQuery } from '../../features/pests/pestsApiSlice';
import ListPager from "../../components/ui/ListPager";

const isElementSelected = (entity, selected) => {
    return selected.some(e => e.id === entity.id)
};

const filterElement = (element, filter) => {
    if (isStringEmpty(filter)) {
        return true;
    }
    return element.name.toLowerCase().includes(filter.toLowerCase());
}


export const ROWS_PER_PAGE = 100;

const PestSelectionDialog = ({ open, handleClose }) => {
    const text = useSelector(selectLang);
    const [filter, setFilter] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
    const [selected, setSelected] = useState([]);

    const { data: pests, isLoading: isPestsLoading } = useGetPestsQuery();

    const handleSetFilter = (value) => {
        setFilter(value);
        setPage(0);
    }



    const onSelectRow = (e) => {
        if (isElementSelected(e, selected)) {
            setSelected(selected.filter(f => e.id !== f.id));
        } else {
            setSelected(selected.concat([e]));
        }
    }


    const onAction = (save) => {
        handleClose(save ? selected : null);
        setSelected([])
        setFilter('');
        setPage(0);
    }

    if (isPestsLoading) {
        return <></>
    }

    //const visableFields = pestst.filter(e => filterField(e, filter, cropId, active));

    const visableDataElements = pests.filter(e => filterElement(e, filter));

    const visableSelectedDataElements = visableDataElements.filter(e => selected.includes(e));
    const rowCount = visableDataElements.length;
    const showPegination = rowCount > ROWS_PER_PAGE;

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={isMobile()} fullWidth={!isMobile()}
            TransitionComponent={Transition}
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={`${text.pests}`} />

            <DialogTitle id="alert-dialog-title">
                <Box display={'flex'} flexDirection={'row'}>

                    <TextFieldBase fullWidth={true} label={text.filter} value={filter}
                        onChange={(e) => handleSetFilter(e.target.value)}
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

                                <TableCell sx={headerSx} >{text.name}</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visableDataElements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>

                                <Row key={index} index={index} row={row} text={text} onClick={() => onSelectRow(row, index)}
                                    isItemSelected={isElementSelected(row, selected)}
                                />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Box display={'flex'} flex={1} flexDirection={'column'} justifyContent={'center'}>
                    {showPegination && <Divider />}
                    {showPegination && <ListPager bottom={50} page={Number(page)}
                        totalPages={Math.ceil(visableDataElements.length / ROWS_PER_PAGE)} setPage={setPage} />}
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button size='large' disableElevation={true} variant='contained' onClick={() => onAction(true)} autoFocus>
                            {text.save}
                        </Button>
                    </Box>
                </Box>
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
            </TableRow>
        </Fragment>
    );
}

export default PestSelectionDialog;