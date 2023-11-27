import React from 'react'
import { AppBar, Box, Dialog, DialogContent, IconButton, MenuItem, Select, Slide, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, selectOpenSettings, setLang, setOpenSettings } from '../../features/app/appSlice';
import { Close, DesktopWindowsOutlined, MobileFriendlyOutlined } from '@mui/icons-material';
import { getUserLang } from '../../router/UserRoutes';
import { isMobile } from '../FarmUtil';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const flagMap = [
    { id: 'en', flag: 'GB', label: 'English', emoji: '🇬🇧' },
    { id: 'pt', flag: 'PT', label: 'Português', emoji: '🇵🇹' },
    { id: 'he', flag: 'IL', label: 'עברית', emoji: '🇮🇱' },

    // { id: 'es', flag: 'ES', label: 'Español', emoji: '🇪🇸' },
];

const SettingsDialog = () => {

    const text = useSelector(selectLang)
    const dispatch = useDispatch()
    const open = useSelector(selectOpenSettings)

    const [showAgent, setShowAgent] = React.useState(false);

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
                    onChange={e => handleLangChange(e.target.value)}
                >
                    {flagMap.map(e =>

                        <MenuItem key={e.id} value={e.id}  >
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} alignContent={'center'}>
                                <Box fontSize={25}> {e.emoji}</Box>
                                <Box marginLeft={1} marginRight={1}>{`${e.label}`} </Box>
                            </Box>
                        </MenuItem>
                    )}
                </Select>
                <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                    <IconButton onClick={_=>setShowAgent(!showAgent)} >
                        {isMobile() ? <MobileFriendlyOutlined /> : <DesktopWindowsOutlined />}
                    </IconButton>
                    <Box margin={1}/>
                    {showAgent && <Box>{navigator.userAgent}</Box>}

                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default SettingsDialog