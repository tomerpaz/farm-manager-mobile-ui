import React, { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, InputAdornment, List, ListItem, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { DEFAULT_ACTIVITY_STATUS, DEFAULT_PLAN_STATUS, selectActivityPlanStatusFilter, selectActivityPlanTypeFilter, selectActivityStatusFilter, selectActivityTypeFilter, selectAppBarDialogOpen, selectEndDateFilter, selectLang, selectStartDateFilter, setActivityPlanStatusFilter, setActivityPlanTypeFilter, setActivityStatusFilter, setActivityTypeFilter, setAppBarDialogOpen, setEndDateFilter, setStartDateFilter } from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { asLocalDate, getActivityStatuses, getActivityStatusText, getActivityTypes, getActivityTypeText, isStringEmpty, parseISOOrNull, PLAN } from '../../ui/FarmUtil';
import { FilterAltOff } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ActivitiesFilter = () => {

    const dispatch = useDispatch()
    const { pathname } = useLocation();

    const isPlan = pathname.includes('plans');
    const typeFilter = useSelector(isPlan ? selectActivityPlanTypeFilter : selectActivityTypeFilter);

    const statusFilter = useSelector(isPlan ? selectActivityPlanStatusFilter : selectActivityStatusFilter);



    const role = null;


    const { fieldId } = useParams()
    const text = useSelector(selectLang)
    const open = useSelector(selectAppBarDialogOpen)

    const activityStatusFilter = useSelector(isPlan ? selectActivityPlanStatusFilter : selectActivityStatusFilter);

    const isDefault = isPlan ? activityStatusFilter === DEFAULT_PLAN_STATUS : activityStatusFilter === DEFAULT_ACTIVITY_STATUS;


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);

    const noFilter = isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isStringEmpty(typeFilter) && isDefault;

    const clearFilters = () => {
        dispatch(setStartDateFilter(null));
        dispatch(setEndDateFilter(null));
        if (isPlan) {
            dispatch(setActivityPlanTypeFilter(''))
            dispatch(setActivityPlanStatusFilter(DEFAULT_PLAN_STATUS))
        } else {
            dispatch(setActivityTypeFilter(''))
            dispatch(setActivityPlanStatusFilter(DEFAULT_ACTIVITY_STATUS))

        }
    }

    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
    }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
    }

    const handleTypeChange = (value) => {
        if (isPlan) {
            dispatch(setActivityPlanTypeFilter(value))
        } else {
            dispatch(setActivityTypeFilter(value))
        }
    }

    const handleStatusChange = (value) => {
        if (isPlan) {
            dispatch(setActivityPlanStatusFilter(value))
        } else {
            dispatch(setActivityStatusFilter(value))
        }
    }


    return (
        <Dialog
            fullScreen
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
                        label={text.fromDate}
                        closeOnSelect
                        localeText={{cancelButtonLabel: text.cancel, 
                            clearButtonLabel: text.clear  }}
                            // okButtonLabel: text.save
                  
                        showToolbar={false}
                        value={parseISOOrNull(startDateFilter)}
                        onChange={(e) => dispatch(setStartDateFilter(asLocalDate(e, true)))}
                        slotProps={{ textField: {size: 'small', variant: 'outlined' },
                        actionBar: { actions: ["cancel","clear"] } }}
                    />
                    <Box marginLeft={1} />
                    <MobileDatePicker
                        label={text.toDate}
                        closeOnSelect
                        value={parseISOOrNull((endDateFilter))}
                        showToolbar={true}
                        localeText={{cancelButtonLabel: text.cancel, 
                        clearButtonLabel: text.clear  }}
                        onChange={(e) => dispatch(setEndDateFilter(asLocalDate(e, true)))}
                        slotProps={{ textField: {size: 'small', variant: 'outlined' },
                        actionBar: { actions: ["cancel","clear"] } }}
                    />
                </ListItem>
                <Divider />

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
                        {isPlan && <Box paddingLeft={1} />}

                        {isPlan &&
                            <TextField
                                id="outlined-select-activity-type"
                                select
                                fullWidth
                                size='small'
                                label={text.status}
                                value={statusFilter}
                                onChange={e => handleStatusChange(e.target.value)}
                            >
                                {getActivityStatuses(role, isPlan).map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {getActivityStatusText(status, text)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }
                    </ListItem>


                </Box>

                <Divider />
                {/* <ListItem button>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem> */}
            </List>
        </Dialog>
    )
}

export default ActivitiesFilter