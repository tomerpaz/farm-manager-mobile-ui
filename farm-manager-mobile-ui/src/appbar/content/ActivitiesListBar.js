import { Close, FilterAlt } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router'
import { selectActivityFreeTextFilter, selectCurrentYear, selectEndDateFilter, selectLang, selectSelectedActivityFilterOptions, selectSelectedActivityPlanFilterOptions, selectStartDateFilter, setAppBarDialogOpen, setSelectedActivityFilterOptions, setSelectedActivityPlanFilterOptions } from '../../features/app/appSlice'
import { buildActivityOptions, isStringEmpty, removeRedundantSelectedActivityOptions } from '../../ui/FarmUtil'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from './SearchBarAutoComplete'
import Accuracy from '../components/Accuracy'
import { useFields } from '../../features/fields/fieldsApiSlice'
import { useGetActivityDefsQuery } from '../../features/activityDefs/activityDefsApiSlice'

const ActivitiesListBar = ({ plans }) => {
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const text = useSelector(selectLang)


    const { fieldId, src } = useParams()
    const navigate = useNavigate()

    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);
    const freeTextFilter = useSelector(selectActivityFreeTextFilter);

    const isPlan = pathname && pathname.includes('plans');

    const currentYear = useSelector(selectCurrentYear)

    const isDefault = true;//isPlan ? statusFilter === DEFAULT_PLAN_STATUS : statusFilter === DEFAULT_ACTIVITY_STATUS;

    const noFilter = isStringEmpty(freeTextFilter) && isStringEmpty(startDateFilter) && isStringEmpty(endDateFilter) && isDefault;


    const activitiesFilterOptions = removeRedundantSelectedActivityOptions(useSelector(isPlan ? selectSelectedActivityPlanFilterOptions : selectSelectedActivityFilterOptions), fieldId);

    const fields = useFields(currentYear);
    const { data: activityDefs } = useGetActivityDefsQuery()
    const autoCompleteOptions = buildActivityOptions(fields, activityDefs, fieldId, text, isPlan)

    const setFilter = (values) => {
        if (isPlan) {
            dispatch(setSelectedActivityPlanFilterOptions(values));
        } else {
            dispatch(setSelectedActivityFilterOptions(values));
        }
    }

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
                    <FilterAlt sx={{ color: noFilter ? null : 'blue' }} />
                </IconButton>
                <AppBarSearch value={activitiesFilterOptions} options={autoCompleteOptions} onChenge={(values, action) => setFilter(values)} />
                <Accuracy />
                {!fieldId && <AppBarMenu />}
                {fieldId && <IconButton color="inherit" onClick={() => navigate(`/tabs/${src}`)}>
                    <Close />
                </IconButton>}
            </Toolbar>
        </AppBar>
    )
}

export default ActivitiesListBar