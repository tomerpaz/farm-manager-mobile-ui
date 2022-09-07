import React, { useEffect } from 'react'
import { AppBar, Dialog, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppBarDialogOpen, selectFieldBaseFieldFilter, selectFieldSiteFilter, selectLang, setAppBarDialogOpen, setFieldBaseFieldFilter, setFieldSiteFilter } from '../../features/app/appSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { FilterAltOff } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FieldsFilter = ({ fields, }) => {

    const text = useSelector(selectLang)

    const dispatch = useDispatch()

    const open = useSelector(selectAppBarDialogOpen)

    const fieldSiteFilter = useSelector(selectFieldSiteFilter)
    const fieldBaseFieldFilter = useSelector(selectFieldBaseFieldFilter)
   
    const noFilter = fieldSiteFilter === 0 && fieldBaseFieldFilter === 0;


    const clearFilters = () => {
        dispatch(setFieldSiteFilter(0));
        dispatch(setFieldBaseFieldFilter(0));
        
    }

    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
    }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
    }

    const sites = [...new Map(fields.map(item => [item['siteId'], { name: item.siteName, id: item.siteId }])).values()];
    const baseFields = [...new Map(fields.map(item => [item['baseFieldId'], { name: item.name, id: item.baseFieldId }])).values()];

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
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
                        id="outlined-select-site"
                        select
                        fullWidth
                        size='small'
                        label={text.site}
                        value={fieldSiteFilter}
                        onChange={e =>  dispatch(setFieldSiteFilter(Number(e.target.value)))}
                    > 
                        <MenuItem value={0}>
                            <em></em>
                        </MenuItem>
                        {sites.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </ListItem>
                <Divider />
                <ListItem button>
                    <TextField
                        id="outlined-select-basefield"
                        select
                        fullWidth
                        size='small'
                        label={text.field}
                        value={fieldBaseFieldFilter}
                        onChange={e =>  dispatch(setFieldBaseFieldFilter(Number(e.target.value)))}
                    >
                        <MenuItem value={0}>
                            <em></em>
                        </MenuItem>
                        {baseFields.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </ListItem>
                <Divider />
            </List>
        </Dialog>
    )
}

export default FieldsFilter