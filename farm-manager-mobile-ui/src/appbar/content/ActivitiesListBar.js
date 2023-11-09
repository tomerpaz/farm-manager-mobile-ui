import { FilterAlt } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { DEFAULT_ACTIVITY_STATUS, DEFAULT_PLAN_STATUS, selectActivityFreeTextFilter, selectActivityPlanStatusFilter, selectActivityPlanTypeFilter, selectActivityStatusFilter, selectActivityTypeFilter, selectEndDateFilter, selectStartDateFilter, setActivityFreeTextFilter, setAppBarDialogOpen, setEndDateFilter, setStartDateFilter } from '../../features/app/appSlice'
import { isStringEmpty } from '../../ui/FarmUtil'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from '../components/AppBarSearch'

const ActivitiesListBar = ({plans}) => {
    const dispatch = useDispatch()
    const { pathname } = useLocation();

    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);
    const isPlan = pathname && pathname.includes('plans');
    const typeFilter = useSelector(isPlan ? selectActivityPlanTypeFilter : selectActivityTypeFilter);
    const statusFilter = useSelector(isPlan ? selectActivityPlanStatusFilter : selectActivityStatusFilter);

    const isDefault = isPlan ? statusFilter === DEFAULT_PLAN_STATUS : statusFilter === DEFAULT_ACTIVITY_STATUS;

    const noFilter = isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isStringEmpty(typeFilter) && isDefault;

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