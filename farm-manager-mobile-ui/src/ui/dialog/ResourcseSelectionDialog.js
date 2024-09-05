import { AppBar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../features/app/appSlice";
import { Fragment, useEffect, useState } from "react";
import { cellSx, headerSx, Transition } from "../Util";
import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { Close, Search } from "@mui/icons-material";
import { EQUIPMENT, FERTILIZER, LIST_PESTICIDE, PESTICIDE, SPRAYER, VARIETY, WATER, getResourceTypeText, getUnitText, isMobile, isStringEmpty } from "../FarmUtil";
import { useGetResourcesQuery } from "../../features/resources/resourcesApiSlice";
import ListPager from "../../components/ui/ListPager";
import { useGetCropPesticidesQuery } from "../../features/pesticides/pecticidesApiSlice";
import DialogAppBar from "./DialogAppBar";

const filterResource = (e, filter, type, text, isSprayer) => {
    const categopryOk = (isSprayer ? e.category === SPRAYER : e.category !== SPRAYER);
    if (isStringEmpty(filter)) {
        return type === e.type && categopryOk;
    } else {
        const val = filter.toLowerCase();
        return (categopryOk) && (e.name.toLowerCase().includes(val) ||
            e.code?.toLowerCase().includes(val) ||
            e.identification?.toLowerCase().includes(val) ||
            text[e.category?.toLowerCase()]?.toLowerCase().includes(val))
    }
};

const isItemSelected = (item, selectedItems) => {
    return selectedItems.some(e => e.id === item.id)
};

const height = window.innerHeight - 252;

export const ROWS_PER_PAGE = 100;
const ResourcseSelectionDialog = ({ open, handleClose, resourceTypes, cropId }) => {

    console.log('cropId', cropId)
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()

    const [filter, setFilter] = useState('');
    const [type, setType] = useState(resourceTypes[0]);

    const [selectedResources, setSelectedResources] = useState([]);
    //  const [selectedPesticides, setSelectedPesticides] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);


    const clear = () => {
        setFilter('');
        setPage(0);
        setRowsPerPage(ROWS_PER_PAGE)
    }

    const handleSetFilter = (value) => {
        setFilter(value);
        setPage(0);
    }

    const handleSeType = (value) => {
        setType(value);
        clear();
    }

    useEffect(() => {
        clear();
    }, [type]);

    const isPesticidelist = type === LIST_PESTICIDE;
    const isSprayer = type === SPRAYER;

    const fetchType = isSprayer ? EQUIPMENT : type;
    const {
        data,
        isLoading,
        isSuccess,
        // isError,
        // error
    } = useGetResourcesQuery({ type: fetchType }, { skip: isPesticidelist })

    const { data: cropPesticides, isSuccess: isCropPesticidesSuccess, isLoading: isLoadingesticideList } = useGetCropPesticidesQuery({ cropId }, { skip: !cropId })
    console.log(isCropPesticidesSuccess,isLoadingesticideList)


    if (isLoadingesticideList && !isCropPesticidesSuccess) {
        return <></>
    }
    const isSingular = [WATER, SPRAYER].includes(type);

    const onSelectRow = (e) => {
        if (isItemSelected(e, selectedResources)) {
            setSelectedResources(selectedResources.filter(f => e.id !== f.id));
        } else {
            if (isSingular) {
                setSelectedResources(selectedResources.filter(r => r.type !== e.type).concat([e]))
            } else {
                setSelectedResources(selectedResources.concat([e]));
            }
        }
    }



    const buildVisableResources = () => {
        if (isPesticidelist) {
    
            if(cropPesticides){
            return cropPesticides.filter(e => filterResource(e.resource, filter, PESTICIDE, text, false));
            }
            else {
                return [];
            }// return cropPesticides ? cropPesticides : [];

        } else {
            return data ? data.filter(e => filterResource(e, filter, fetchType, text, type === SPRAYER)) : [];
        }
    }


    const visableResources = buildVisableResources().filter(e => e.active);

    const visableSelectedResources = visableResources.filter(e => selectedResources.includes(e));
    const numSelected = visableSelectedResources.length;
    const rowCount = visableResources.length;
    const showPegination = rowCount > ROWS_PER_PAGE;
    const isFertilizer = type === FERTILIZER;
    const isVariety = type === VARIETY;
    const isEquipment = type === EQUIPMENT;

    const onSelectAllClick = (e) => {
        if (e.target.checked) {
            const visableSelectedResourceIDs = visableSelectedResources.map(f => f.id);
            const visableNotSelectedResources = visableResources.filter(f => !visableSelectedResourceIDs.includes(f.id));
            setSelectedResources(selectedResources.concat(visableNotSelectedResources));
        } else {
            const visableResourceIDs = visableResources.map(f => f.id);
            setSelectedResources(selectedResources.filter(f => !visableResourceIDs.includes(f.id)));
        }
    };

    const onAction = (save) => {
        handleClose(save ? selectedResources : null);
        setSelectedResources([]);
        clear();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={isMobile()} fullWidth={!isMobile()}
            TransitionComponent={Transition}

        >
            <DialogAppBar onClose={() => onAction(false)}
                title={`${text.resources}`} />
            <DialogTitle id="alert-dialog-title">
                <Box>
                    <TextFieldBase
                        sx={{ margin: 1 }}
                        id="outlined-select-resource-type"
                        select
                        fullWidth
                        label={text.type}
                        value={type}
                        onChange={e => handleSeType(e.target.value)}
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
                        onChange={(e) => handleSetFilter(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                        }}
                    />
                </Box>
            </DialogTitle>
            <DialogContent sx={{ padding: 0, margin: 0 }}>
                <TableContainer sx={{ padding: 0, maxHeight: height }}>
                    <Table stickyHeader size="small" sx={{ width: '100%', margin: 0, padding: 0 }} aria-label="a dense table">
                        <TableHead >
                            <TableRow
                            // style={{
                            //     height: 10,
                            // }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        disabled={isSingular}
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

                                {isPesticidelist &&
                                    <TableCell sx={headerSx}>{text.pest}</TableCell>
                                }
                                <TableCell sx={headerSx}>{text.unit}</TableCell>
                                {isSprayer &&
                                    <TableCell sx={headerSx}>{text.capacity}</TableCell>
                                }
                                {isFertilizer &&
                                    <TableCell sx={headerSx}>{'N-P-K'}</TableCell>
                                }
                                {isFertilizer &&
                                    <TableCell sx={headerSx}>{'SG'}</TableCell>
                                }
                                {isVariety && <TableCell sx={headerSx} >{text.crop}</TableCell>}
                                {isEquipment && <TableCell sx={headerSx} >{text.category}</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visableResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>
                                <Row key={index} index={index} row={row} text={text}
                                    onClick={() => onSelectRow(row, index)}
                                    isItemSelected={isItemSelected(row, selectedResources)}
                                    user={user} isFertilizer={isFertilizer} isVariety={isVariety}
                                    isEquipment={isEquipment} isSprayer={isSprayer} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {showPegination && <ListPager bottom={50} page={Number(page)}
                    totalPages={Math.ceil(visableResources.length / ROWS_PER_PAGE)} setPage={setPage} />}

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' disableElevation={true} variant='contained' onClick={() => onAction(true)} autoFocus>
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog >
    )

}
function Row(props) {
    const { row, index, text, onClick, isItemSelected, user, isFertilizer, isVariety, isEquipment, isSprayer } = props;
    const resource = row.resource ? row.resource : row;
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
                <TableCell sx={cellSx} >{resource.name}</TableCell>
                {row.pestName && <TableCell sx={cellSx} >{row.pestName}</TableCell>}

                <TableCell sx={cellSx}>{getUnitText(row.unit ? row.unit : resource.usageUnit, user.areaUnit, text)}</TableCell>
                {isSprayer && <TableCell sx={cellSx} >{`${resource.capacity} `}</TableCell>}

                {isFertilizer && <TableCell sx={cellSx} >{`${resource.n}-${resource.p}-${resource.k} `}</TableCell>}
                {isFertilizer && <TableCell sx={cellSx} >{resource.specificGravity}</TableCell>}
                {isVariety && <TableCell sx={cellSx} >{resource.identification}</TableCell>}
                {isEquipment && <TableCell sx={cellSx} >{text[resource.category?.toLowerCase()]}</TableCell>}
            </TableRow>
        </Fragment>
    );
}

export default ResourcseSelectionDialog;