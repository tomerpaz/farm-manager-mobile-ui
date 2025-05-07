import React, { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, InputAdornment, List, ListItem, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { DEFAULT_ACTIVITY_STATUS, DEFAULT_PLAN_STATUS, selectActivityBaseFieldFilter, selectActivityPlanStatusFilter, selectActivityPlanTypeFilter, selectActivitySiteFilter, selectActivityStatusFilter, selectActivityTypeFilter, selectAppBarDialogOpen, selectCurrentYear, selectEndDateFilter, selectLang, selectActivityParentFieldFilter, selectStartDateFilter, setActivityBaseFieldFilter, setActivityParentFieldFilter, setActivityPlanStatusFilter, setActivityPlanTypeFilter, setActivitySiteFilter, setActivityStatusFilter, setActivityTypeFilter, setAppBarDialogOpen, setEndDateFilter, setStartDateFilter } from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { asLocalDate, getActivityStatuses, getActivityStatusText, getActivityTypes, getActivityTypeText, isMobile, isStringEmpty, parseISOOrNull, PLAN } from '../../ui/FarmUtil';
import { FilterAltOff } from '@mui/icons-material';
import { Transition } from '../../ui/Util';
import { useFields } from '../../features/fields/fieldsApiSlice';


const ActivitiesFilter = () => {

    const dispatch = useDispatch()
    const { pathname } = useLocation();

    const year = useSelector(selectCurrentYear);
    const fields = useFields(year)

    const isPlan = pathname.includes('plans');
    const typeFilter = useSelector(isPlan ? selectActivityPlanTypeFilter : selectActivityTypeFilter);

    const statusFilter = useSelector(isPlan ? selectActivityPlanStatusFilter : selectActivityStatusFilter);

    const activitySiteFilter = useSelector(selectActivitySiteFilter)
    const activityBaseFieldFilter = useSelector(selectActivityBaseFieldFilter)
    const activityParentFieldFilter = useSelector(selectActivityParentFieldFilter)

    const role = null;


    const { fieldId } = useParams()
    const text = useSelector(selectLang)
    const open = useSelector(selectAppBarDialogOpen)

    const activityStatusFilter = useSelector(isPlan ? selectActivityPlanStatusFilter : selectActivityStatusFilter);

    const isDefault = isPlan ? activityStatusFilter === DEFAULT_PLAN_STATUS : activityStatusFilter === DEFAULT_ACTIVITY_STATUS;


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);

    const noFilter = isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isStringEmpty(typeFilter) && isStringEmpty(activitySiteFilter) && isStringEmpty(activityBaseFieldFilter) && isStringEmpty(activityParentFieldFilter) && isDefault;


    const sites = [...new Map(fields.map(item => [item['siteId'], { name: item.siteName, id: item.siteId }])).values()];
    const baseFields = [...new Map(fields.map(item => [item['baseFieldId'], { name: item.name, id: item.baseFieldId }])).values()];
    const parentFields = [...new Map(fields.filter(e => e.parentFieldId !== null).map(item => [item['parentFieldId'], { name: item.name, id: item.parentFieldId }])).values()];

    const clearFilters = () => {
        dispatch(setStartDateFilter(null));
        dispatch(setEndDateFilter(null));
        dispatch(setActivityBaseFieldFilter(''))
        dispatch(setActivitySiteFilter(''))
        dispatch(setActivityParentFieldFilter(''))

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
                        label={text.fromDate}
                        closeOnSelect
                        localeText={{
                            cancelButtonLabel: text.cancel,
                            clearButtonLabel: text.clear
                        }}
                        // okButtonLabel: text.save

                        showToolbar={false}
                        value={parseISOOrNull(startDateFilter)}
                        onChange={(e) => dispatch(setStartDateFilter(asLocalDate(e, true)))}
                        slotProps={{
                            textField: { size: 'small', variant: 'outlined' },
                            actionBar: { actions: ["cancel", "clear"] }
                        }}
                    />
                    <Box marginLeft={1} />
                    <MobileDatePicker
                        label={text.toDate}
                        closeOnSelect
                        value={parseISOOrNull((endDateFilter))}
                        showToolbar={true}
                        localeText={{
                            cancelButtonLabel: text.cancel,
                            clearButtonLabel: text.clear
                        }}
                        onChange={(e) => dispatch(setEndDateFilter(asLocalDate(e, true)))}
                        slotProps={{
                            textField: { size: 'small', variant: 'outlined' },
                            actionBar: { actions: ["cancel", "clear"] }
                        }}
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
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>


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
                <ListItem >
                    <TextField
                        id="outlined-select-site"
                        select
                        fullWidth
                        size='small'
                        label={text.site}
                        value={activitySiteFilter}
                        onChange={e => dispatch(setActivitySiteFilter(Number(e.target.value)))}
                    >
                        <MenuItem value={0}>
                            <em></em>
                        </MenuItem>
                        {sites.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </ListItem>
                <Divider />
                <ListItem button>
                    <TextField
                        id="outlined-select-basefield"
                        select
                        fullWidth
                        size='small'
                        label={text.field}
                        value={activityBaseFieldFilter}
                        onChange={e => dispatch(setActivityBaseFieldFilter(Number(e.target.value)))}
                    >
                        <MenuItem value={0}>
                            <em></em>
                        </MenuItem>
                        {baseFields.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </ListItem>
                <Divider />
                <ListItem button>
                        <TextField
                            id="outlined-select-parentField"
                            select
                            fullWidth
                            size='small'
                            label={text.parentField}
                            value={activityParentFieldFilter}
                            onChange={e => dispatch(setActivityParentFieldFilter(Number(e.target.value)))}
                        >
                            <MenuItem value={0}>
                                <em></em>
                            </MenuItem>
                            {parentFields.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </ListItem>
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