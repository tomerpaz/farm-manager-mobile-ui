import { FilterAlt, FilterAltOff } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectActivityFreeTextFilter, selectActivityTypeFilter, selectEndDateFilter, selectStartDateFilter, setActivityFreeTextFilter, setAppBarDialogOpen, setEndDateFilter, setStartDateFilter } from '../../features/app/appSlice'
import { isStringEmpty } from '../../ui/FarmUtil'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from '../components/AppBarSearch'

const ActivitiesListBar = () => {
    const dispatch = useDispatch()


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);
    const activityTypeFilter = useSelector(selectActivityTypeFilter);

    const noFilter = isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isStringEmpty(activityTypeFilter)




    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open filter"
                    onClick={() => dispatch(setAppBarDialogOpen(true))}
                    sx={{ mr: 1 }}
                >
                    <FilterAlt sx={{color: noFilter ? null : 'blue'}}/>
                </IconButton>
                <AppBarSearch value={useSelector(selectActivityFreeTextFilter)} onChange={(e) => dispatch(setActivityFreeTextFilter(e))} />
                <AppBarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default ActivitiesListBar