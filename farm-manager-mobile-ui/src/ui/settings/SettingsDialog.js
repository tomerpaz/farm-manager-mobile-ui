import React, { useEffect } from 'react'
import { AppBar, Box, Dialog, DialogContent, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppBarDialogOpen, selectCurrentYear, selectFieldBaseFieldFilter, selectFieldSiteFilter, selectFieldsViewStatus, selectLang, selectOpenSettings, setAppBarDialogOpen, setCurrentYear, setFieldBaseFieldFilter, setFieldSiteFilter, setFieldsViewStatus, setLang, setOpenSettings } from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { Close, FilterAltOff } from '@mui/icons-material';
import { ACTIVE, ALL, getYearArray, INACTIVE } from '../FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { getUserLang } from '../../router/UserRoutes';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const flagMap = [
    { id: 'en', flag: 'GB', label: 'English' },
    { id: 'pt', flag: 'PT', label: 'Português' },
    { id: 'he', flag: 'IL', label: 'עברית' },

    // { id: 'es', flag: 'ES', label: 'Español' },
];

const SettingsDialog = ({ fields, }) => {

    const text = useSelector(selectLang)

    const dispatch = useDispatch()

    const open = useSelector(selectOpenSettings)

    const fieldSiteFilter = useSelector(selectFieldSiteFilter)
    const fieldBaseFieldFilter = useSelector(selectFieldBaseFieldFilter)
    const { data: user } = useGetUserDataQuery()


    const fieldsViewStatus = useSelector(selectFieldsViewStatus)


    


    // useEffect(() => {
    //     return () => dispatch(setOpenSettings(false));
    // }, [])

    const handleClose = () => {
        dispatch(setOpenSettings(false));
    }

    const handleLangChange = (lang) => {
        dispatch(setOpenSettings(false));
        dispatch(setLang(getUserLang(lang)))
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }} elevation={0}>
                <Toolbar>

                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {/* Filter */}
                    </Typography>
                    <IconButton
                        edge="start"
                        onClick={handleClose}
                        color="inherit"
                        aria-label="done"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={text.lang}
                    fullWidth
                    onChange={e =>handleLangChange(e.target.value)}
                >
                    {flagMap.map(e =>

                        <MenuItem key={e.id} value={e.id}  >
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} alignContent={'center'}>
                                <Box>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${e.flag.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${e.flag.toLowerCase()}.png`}
                                        alt=""
                                    />
                                </Box>
                                <Box marginLeft={1} marginRight={1}>{`${e.label}`} </Box>
                            </Box>
                        </MenuItem>
                    )}


                </Select>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog

/*
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
*/

// <MenuItem key={e.id} value={e.id}>
//     Ten

//     </MenuItem>)}