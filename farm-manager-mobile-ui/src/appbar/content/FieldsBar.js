import { FilterAlt,  MoreVert } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentYear, selectFieldBaseFieldFilter, selectFieldFreeTextFilter, selectFieldSiteFilter, selectFieldsViewStatus, setAppBarDialogOpen, setFieldFreeTextFilter } from '../../features/app/appSlice'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from '../components/AppBarSearch'

const FieldsBar = () => {
    const dispatch = useDispatch()

    const fieldSiteFilter = useSelector(selectFieldSiteFilter)
    const fieldBaseFieldFilter = useSelector(selectFieldBaseFieldFilter)
    const currentYear = useSelector(selectCurrentYear)
    const fieldsViewStatus = useSelector(selectFieldsViewStatus)
    const { data: user } = useGetUserDataQuery()

    const noFilter = fieldSiteFilter === 0 && fieldBaseFieldFilter === 0  && user && user.year === currentYear && user.fieldsViewStatus === fieldsViewStatus;;

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() =>  dispatch(setAppBarDialogOpen(true))}
                    sx={{ mr: 1 }}
                >
                    <FilterAlt sx={{color: noFilter ? null : 'blue'}}/>
                </IconButton>
                <AppBarSearch value={useSelector(selectFieldFreeTextFilter)} onChange={(e) => dispatch(setFieldFreeTextFilter(e))} />
                <AppBarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default FieldsBar