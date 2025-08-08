import { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, List, ListItem, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppBarDialogOpen, selectCurrentYear, selectFieldFreeTextFilter, selectFieldsViewStatus, selectLang, setAppBarDialogOpen, setCurrentYear, setFieldFreeTextFilter, setFieldsViewStatus } from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { FilterAltOff } from '@mui/icons-material';
import { ACTIVE, ALL, getYearArray, INACTIVE, isMobile, isStringEmpty } from '../../ui/FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { Transition } from '../../ui/Util';



const FieldsFilter = ({ fields, }) => {

    const text = useSelector(selectLang)

    const dispatch = useDispatch()

    const open = useSelector(selectAppBarDialogOpen)

    const freeTextFilter = useSelector(selectFieldFreeTextFilter)
    const currentYear = useSelector(selectCurrentYear)
    const { data: user } = useGetUserDataQuery()


    const fieldsViewStatus = useSelector(selectFieldsViewStatus)

    const noFilter = isStringEmpty(freeTextFilter) && user.year === currentYear && user.fieldsViewStatus === fieldsViewStatus;


    const clearFilters = () => {
        dispatch(setFieldFreeTextFilter(''));
        dispatch(setCurrentYear(user.year));
        dispatch(setFieldsViewStatus(user.fieldsViewStatus));


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
                        onClick={handleClose}
                        color="inherit"
                        aria-label="done"
                    >
                        <DoneIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem >
                    <TextField
                        id="outlined-select-year"
                        select
                        fullWidth
                        size='small'
                        label={text.year}
                        value={currentYear}
                        onChange={e => dispatch(setCurrentYear(Number(e.target.value)))}
                    >
                        {getYearArray().map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box paddingLeft={1} />
                    <TextField
                        id="outlined-select-status"
                        select
                        fullWidth
                        size='small'
                        label={text.status}
                        value={fieldsViewStatus}
                        onChange={e => dispatch(setFieldsViewStatus(e.target.value))}
                    >
                        <MenuItem value={ALL}>
                            {text.all}
                        </MenuItem>
                        <MenuItem value={ACTIVE}>
                            {text.active}
                        </MenuItem>
                        <MenuItem value={INACTIVE}>
                            {text.inactive}
                        </MenuItem>
                    </TextField>

                </ListItem>
                <ListItem >
                    <TextField
                        id="outlined-select-freetext"
                        fullWidth
                        size='small'
                        label={text.freetext}
                        value={freeTextFilter}
                        onChange={e => dispatch(setFieldFreeTextFilter(e.target.value))}
                    >
                    </TextField>
                </ListItem>
            </List>
        </Dialog>
    )
}

export default FieldsFilter