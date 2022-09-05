import { FilterAlt,  MoreVert } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setAppBarDialogOpen } from '../../features/app/appSlice'
import AppBarMenu from '../components/AppBarMenu'
import AppBarSearch from '../components/AppBarSearch'

const FieldsBar = () => {
    const dispatch = useDispatch()

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
                    <FilterAlt/>
                </IconButton>
                <AppBarSearch />
                <AppBarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default FieldsBar