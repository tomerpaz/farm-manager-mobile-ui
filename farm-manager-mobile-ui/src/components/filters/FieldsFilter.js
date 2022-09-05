import React, { useEffect } from 'react'
import { AppBar, Dialog, Divider, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppBarDialogOpen, setAppBarDialogOpen } from '../../features/app/appSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FieldsFilter = () => {

    const dispatch = useDispatch()

    const open = useSelector(selectAppBarDialogOpen)

    useEffect(() => {
        return () => dispatch(setAppBarDialogOpen(false));
      }, [])

    const handleClose = () => {
        dispatch(setAppBarDialogOpen(false))
    }

    console.log('openFilter', open);

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
                        onClick={handleClose}
                        color="inherit"
                        aria-label="done"
                    >
                        <DoneIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem>
            </List>
        </Dialog>
    )
}

export default FieldsFilter