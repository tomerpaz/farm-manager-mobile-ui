import React, { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, InputAdornment, List, ListItem, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { selectActivityTypeFilter, selectAppBarDialogOpen, selectEndDateFilter, selectLang, selectStartDateFilter, setActivityTypeFilter, setAppBarDialogOpen, setEndDateFilter, setStartDateFilter } from '../../features/app/appSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { asLocalDate, getActivityTypes, getActivityTypeText, isStringEmpty } from '../../ui/FarmUtil';
import { FilterAltOff } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ActivitiesFilter = () => {

    const dispatch = useDispatch()
    const isPlan = false;
    const role = null;


    const { fieldId } = useParams()
    const text = useSelector(selectLang)
    const open = useSelector(selectAppBarDialogOpen)


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);
    const activityTypeFilter = useSelector(selectActivityTypeFilter);

    const noFilter = isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isStringEmpty(activityTypeFilter)


    const [to, setTo] = React.useState(endDateFilter);

    const clearFilters = () => {
        dispatch(setStartDateFilter(null));
        dispatch(setEndDateFilter(null));
        dispatch(setActivityTypeFilter(''))

    }

    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
    }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
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
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton> */}
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
                    {/* <Button autoFocus color="inherit" onClick={handleClose}>
          save
        </Button> */}
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
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><IconButton edge="end" onClick={() => dispatch(setStartDateFilter(null))}><CloseIcon></CloseIcon></IconButton></InputAdornment>,
                        }}
                        label={text.fromDate}
                        closeOnSelect
                        //  clearable={true}
                        clearText="Clear"
                        showToolbar={false}
                        value={startDateFilter}
                        onChange={(e)=>dispatch(setStartDateFilter(asLocalDate(e, true)))}
                        renderInput={(params) => <TextField size={'small'} {...params} />}
                    />
                    <Box marginLeft={1} />
                    <MobileDatePicker
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><IconButton edge="end" onClick={() => dispatch(setEndDateFilter(null))}><CloseIcon></CloseIcon></IconButton></InputAdornment>,
                        }}
                        label={text.toDate}
                        closeOnSelect
                        value={endDateFilter}
                        showToolbar={false}
                        onChange={(e)=>dispatch(setEndDateFilter(asLocalDate(e, true)))}
                        renderInput={(params) => <TextField size={'small'} {...params} />}
                    />
                </ListItem>
                <Divider />

                <ListItem>
                    <TextField
                        id="outlined-select-activity-type"
                        select
                        fullWidth
                        size='small'
                        label={text.type}
                        value={activityTypeFilter}
                        onChange={e => dispatch(setActivityTypeFilter(e.target.value))}
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