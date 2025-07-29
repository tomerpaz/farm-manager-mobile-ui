import { FilterAlt, Layers } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentYear, selectFieldFreeTextFilter, selectFieldsViewStatus, selectSelectedFieldFilterOptions, setAppBarDialogOpen, setOpenLayers, setSelectedFieldFilterOptions } from '../../features/app/appSlice'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from './SearchBarAutoComplete'
import Accuracy from '../components/Accuracy'
import { buildFieldOptions, isStringEmpty } from '../../ui/FarmUtil'
import { useFields } from '../../features/fields/fieldsApiSlice'

const MapBar = () => {


    const dispatch = useDispatch()

    const freeTextFilter = useSelector(selectFieldFreeTextFilter)
    const fieldsViewStatus = useSelector(selectFieldsViewStatus)
    const currentYear = useSelector(selectCurrentYear)
    const { data: user } = useGetUserDataQuery()


    const noFilter = isStringEmpty(freeTextFilter) && user && user.year === currentYear && user.fieldsViewStatus === fieldsViewStatus;

    const fields = useFields(currentYear)
    const autoCompleteOptions = buildFieldOptions(fields)

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => dispatch(setAppBarDialogOpen(true))}
                    sx={{ mr: 1 }}
                >
                    <FilterAlt sx={{ color: noFilter ? null : 'blue' }} />
                </IconButton>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => dispatch(setOpenLayers(true))}
                    sx={{ mr: 1 }}
                >
                    <Layers
                    />
                </IconButton>
                <AppBarSearch value={useSelector(selectSelectedFieldFilterOptions)} options={autoCompleteOptions} onChenge={(values, action) => dispatch(setSelectedFieldFilterOptions(values))} />
                <Accuracy />
                <AppBarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default MapBar