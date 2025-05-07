import React, { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, InputAdornment, List, ListItem, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { DEFAULT_ACTIVITY_STATUS, DEFAULT_PLAN_STATUS, selectActivityPlanStatusFilter, selectActivityPlanTypeFilter, selectActivityStatusFilter, selectActivityTypeFilter, selectAppBarDialogOpen, selectEndDateFilter, selectInventoryDateFilter, selectInventoryWarehouseFilter, selectLang, selectStartDateFilter, setActivityPlanStatusFilter, setActivityPlanTypeFilter, setActivityStatusFilter, setActivityTypeFilter, setAppBarDialogOpen, setEndDateFilter, setInventoryDateFilter, setInventoryWarehouseFilter, setStartDateFilter } from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { asLocalDate, getActivityStatuses, getActivityStatusText, getActivityTypes, getActivityTypeText, isMobile, isStringEmpty, parseISOOrNull, PLAN } from '../../ui/FarmUtil';
import { FilterAltOff } from '@mui/icons-material';
import { getWarehousesState, useGetWarehousesQuery } from '../../features/warehouses/warehouseApiSlice';
import { Transition } from '../../ui/Util';



const InventoryFilter = () => {

    const dispatch = useDispatch()
    const { pathname } = useLocation();

    const isPlan = pathname.includes('plans');


    const { data: warehouses, isSuccess: isWarehousesSuccess } = useGetWarehousesQuery()


    const today = asLocalDate(new Date(), true);

    const text = useSelector(selectLang)
    const open = useSelector(selectAppBarDialogOpen)

    const inventoryDate = useSelector(selectInventoryDateFilter);
    const inventoryWarehouse = useSelector(selectInventoryWarehouseFilter);

    const noFilter = today === inventoryDate && !inventoryWarehouse;// && isStringEmpty(endDateFilter) && isStringEmpty(typeFilter) && isDefault;

    const clearFilters = () => {
        dispatch(setInventoryDateFilter(today));
        dispatch(setInventoryWarehouseFilter(null));
    }

    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
    }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
    }

    // const handleTypeChange = (value) => {
    //     if (isPlan) {
    //         dispatch(setActivityPlanTypeFilter(value))
    //     } else {
    //         dispatch(setActivityTypeFilter(value))
    //     }
    // }


    return (
        <Dialog
            fullScreen={isMobile()} fullWidth={!isMobile()}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }} elevation={0}>
                <Toolbar>
                    {!noFilter && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open filter"
                        onClick={clearFilters}
                        sx={{ mr: 1 }}
                    >
                        <FilterAltOff />
                    </IconButton>}
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {/* Filter */}
                    </Typography>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="done"
                    >
                        <DoneIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <MobileDatePicker
                        label={text.date}
                        closeOnSelect
                        localeText={{
                            cancelButtonLabel: text.cancel,
                            clearButtonLabel: text.clear
                        }}
                        // okButtonLabel: text.save

                        showToolbar={false}
                        value={parseISOOrNull(inventoryDate)}
                        onChange={(e) => dispatch(setInventoryDateFilter(asLocalDate(e, true)))}
                        slotProps={{
                            textField: { size: 'small', variant: 'outlined' },
                            actionBar: { actions: ["cancel", "clear"] }
                        }}
                    />
                    <Box marginLeft={1} />
                    {isWarehousesSuccess &&
                        <TextField
                            id="outlined-select-site"
                            select
                            fullWidth
                            size='small'
                            label={text.warehouse}
                            value={inventoryWarehouse}
                            onChange={e => dispatch(setInventoryWarehouseFilter(Number(e.target.value)))}
                        >
                            <MenuItem value={0}>
                                <em></em>
                            </MenuItem>
                            {warehouses.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                    }

                </ListItem>
                <Divider />

                {/* 
                <Box display='flex' flexDirection={'row'}>
                    <ListItem>
                        <TextField
                            id="outlined-select-activity-type"
                            select
                            fullWidth
                            size='small'
                            label={text.type}
                            value={typeFilter}
                            onChange={e => handleTypeChange(e.target.value)}
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            {getActivityTypes(role, isPlan).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {getActivityTypeText(type, text)}
                                </MenuItem>
                            ))}
                        </TextField>


                    </ListItem>


                </Box> */}

            </List>
        </Dialog>
    )
}

export default InventoryFilter