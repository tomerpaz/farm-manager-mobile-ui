import React, { useEffect } from 'react'
import { AppBar, Dialog, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppBarDialogOpen, selectLang, setAppBarDialogOpen } from '../../features/app/appSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FieldsFilter = ({ fields, }) => {

    const text = useSelector(selectLang)

    const dispatch = useDispatch()

    const open = useSelector(selectAppBarDialogOpen)


    const [site, setSite] = React.useState('');
    const [baseField, setBaseField] = React.useState('');


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
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
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
                        value={site}
                        onChange={e => setSite(e.target.value)}
                    >
                        <MenuItem value="">
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
                        value={baseField}
                        onChange={e => setBaseField(e.target.value)}
                    >
                        <MenuItem value="">
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