import React, { useEffect } from 'react'
import { AppBar, Box, Dialog, Divider, IconButton, InputAdornment, List, ListItem, ListItemText, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { selectAppBarDialogOpen, selectLang, setAppBarDialogOpen } from '../../features/app/appSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ActivitiesFilter = () => {

    const dispatch = useDispatch()

    const { fieldId } = useParams()
    const text = useSelector(selectLang)

    const open = useSelector(selectAppBarDialogOpen)


    const [from, setFrom] = React.useState(null);

    const [to, setTo] = React.useState(null);



    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
    }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
    }


    console.log('ActivitiesFilter.fielId', fieldId)

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
                    {/* <Button autoFocus color="inherit" onClick={handleClose}>
          save
        </Button> */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="done"
                    >
                        <DoneIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <MobileDatePicker
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><IconButton edge="end" onClick={() => setFrom(null)}><CloseIcon></CloseIcon></IconButton></InputAdornment>,
                        }}
                        label={text.fromDate}
                        closeOnSelect
                        //  clearable={true}
                        clearText="Clear"
                        showToolbar={false}
                        value={from}
                        onChange={setFrom}
                        renderInput={(params) => <TextField size={'small'} {...params} />}
                    />
                    <Box marginLeft={1} />
                    <MobileDatePicker
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><IconButton edge="end" onClick={() => setTo(null)}><CloseIcon></CloseIcon></IconButton></InputAdornment>,
                        }}
                        label={text.toDate}
                        closeOnSelect
                        value={to}
                        showToolbar={false}
                        onChange={setTo}
                        renderInput={(params) => <TextField size={'small'} {...params} />}
                    />
                </ListItem>
                <Divider />
                {/* <ListItem button>
                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem> */}
            </List>
        </Dialog>
    )
}

export default ActivitiesFilter