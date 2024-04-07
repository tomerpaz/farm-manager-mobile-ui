import { FilterAlt, MoreVert } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentYear, selectFieldBaseFieldFilter, selectFieldFreeTextFilter, selectFieldSiteFilter, selectFieldsViewStatus, selectInventoryDateFilter, selectInventoryFreeTextFilter, selectInventoryWarehouseFilter, setAppBarDialogOpen, setFieldFreeTextFilter, setInventoryFreeTextFilter } from '../../features/app/appSlice'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from '../components/AppBarSearch'
import { asLocalDate } from '../../ui/FarmUtil'

const InventoryBar = () => {
    const dispatch = useDispatch()

   // const { data: user } = useGetUserDataQuery()
    
    const today = asLocalDate(new Date(), true);
    const inventoryDate = useSelector(selectInventoryDateFilter);
    const inventoryWarehouse = useSelector(selectInventoryWarehouseFilter);

    const noFilter = today === inventoryDate && !inventoryWarehouse;

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
                <AppBarSearch value={useSelector(selectInventoryFreeTextFilter)} onChange={(e) => dispatch(setInventoryFreeTextFilter(e))} />
                <AppBarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default InventoryBar