import { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, List, ListItem, TextField, Toolbar, Typography } from '@mui/material'
import {
    DEFAULT_ACTIVITY_STATUS, DEFAULT_PLAN_STATUS, selectAppBarDialogOpen, selectCurrentYear, selectEndDateFilter, selectLang, selectActivityParentFieldFilter, selectStartDateFilter,
    setAppBarDialogOpen, setEndDateFilter, setStartDateFilter,
    setFieldFreeTextFilter,
    selectFieldFreeTextFilter,
    selectActivityFreeTextFilter,
    setActivityFreeTextFilter
} from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { MobileDatePicker } from '@mui/x-date-pickers';
import {
    asLocalDate,
    isMobile, isStringEmpty, parseISOOrNull
} from '../../ui/FarmUtil';
import { FilterAltOff } from '@mui/icons-material';
import { Transition } from '../../ui/Util';
import { useFields } from '../../features/fields/fieldsApiSlice';


const ActivitiesFilter = () => {

    const dispatch = useDispatch()
    const { pathname } = useLocation();

    const year = useSelector(selectCurrentYear);
    const fields = useFields(year)

    const isPlan = pathname.includes('plans');

    const role = null;


    const { fieldId } = useParams()
    const text = useSelector(selectLang)
    const open = useSelector(selectAppBarDialogOpen)


    const isDefault = true;// isPlan ? activityStatusFilter === DEFAULT_PLAN_STATUS : activityStatusFilter === DEFAULT_ACTIVITY_STATUS;


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);
    const freeTextFilter = useSelector(selectActivityFreeTextFilter);

    const noFilter = isStringEmpty(freeTextFilter) && isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isDefault;

    const clearFilters = () => {
        dispatch(setStartDateFilter(null));
        dispatch(setEndDateFilter(null));
        dispatch(setActivityFreeTextFilter(''));
    }

    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
    }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
    }


    return (
        <Dialog
            fullScreen={isMobile()} fullWidth={!isMobile()}
            open={open}
            onClose={handleClose}
            slots={{ transition: Transition }}
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
                <ListItem >
                    <TextField
                        id="outlined-select-activity-freetext"
                        fullWidth
                        size='small'
                        label={text.freetext}
                        value={freeTextFilter}
                        onChange={e => dispatch(setActivityFreeTextFilter(e.target.value))}
                    >
                    </TextField>
                </ListItem>

            </List>
        </Dialog>
    )
}

export default ActivitiesFilter