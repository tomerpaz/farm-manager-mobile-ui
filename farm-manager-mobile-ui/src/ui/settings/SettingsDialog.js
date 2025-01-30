import React from 'react'
import { AppBar, Box, Checkbox, Dialog, DialogContent, FormControlLabel, IconButton, MenuItem, Select, Slide, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, selectNewActivityGeo, selectOpenSettings, selectShowInventory, selectShowPlans, setLang, setNewActivityGeo, setOpenSettings, setShowInventory, setShowPlans } from '../../features/app/appSlice';
import { Close, DesktopWindowsOutlined, MobileFriendlyOutlined } from '@mui/icons-material';
import { getUserLang } from '../../router/UserRoutes';
import { isInventoryPossible, isMobile, isPlansPossible } from '../FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import DialogAppBar from '../dialog/DialogAppBar';
import { Transition } from '../Util';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const flagMap = [
    { id: 'en', flag: 'GB', label: 'English', emoji: '🇬🇧' },
    { id: 'pt', flag: 'PT', label: 'Português', emoji: '🇵🇹' },
    { id: 'es', flag: 'ES', label: 'Español', emoji: '🇪🇸' },
    { id: 'he', flag: 'IL', label: 'עברית', emoji: '🇮🇱' },
];

const SettingsDialog = () => {

    const text = useSelector(selectLang)
    const dispatch = useDispatch()
    const open = useSelector(selectOpenSettings)

    const [showAgent, setShowAgent] = React.useState(false);

    const { data: user, isSuccess: isUserSuccess } = useGetUserDataQuery()

    const isInventory = isUserSuccess ? isInventoryPossible(user.userConf) : false;
    const isPlans = isUserSuccess ? isPlansPossible(user.userConf) : false;

    const showInventory = useSelector(selectShowInventory);
    const showPlans = useSelector(selectShowPlans);
    const newActivityGeo = useSelector(selectNewActivityGeo);

    const handleClose = () => {
        dispatch(setOpenSettings(false));
    }

    const handleLangChange = (lang) => {
        dispatch(setLang(getUserLang(lang)))
        dispatch(setOpenSettings(false));
    }

    const handleInvenotryChange = () => {
        dispatch(setShowInventory(!showInventory));
        dispatch(setOpenSettings(false));
    }

    const handlePlansChange = () => {
        dispatch(setShowPlans(!showPlans));
        dispatch(setOpenSettings(false));
    }

    const handleNewActivityGeoChange = () => {
        dispatch(setNewActivityGeo(!newActivityGeo));
        dispatch(setOpenSettings(false));
    }

    return (
        <Dialog
            fullScreen={isMobile()} fullWidth={!isMobile()}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogAppBar onClose={handleClose} title={""} />

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
                {isPlans &&
                    <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                        <FormControlLabel control={<Checkbox checked={showPlans} onChange={handlePlansChange} />} label={text.plans} />
                    </Box>
                }
                {isInventory &&
                    <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                        <FormControlLabel control={<Checkbox checked={showInventory} onChange={handleInvenotryChange} />} label={text.inventory} />


                    </Box>
                }
                {isMobile() &&
                    <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                        <FormControlLabel control={<Checkbox checked={newActivityGeo} onChange={handleNewActivityGeoChange} />} label={text.newActivityGeo} />
                    </Box>
                }

                <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                    <Box>
                        <IconButton sx={{ padding: 0 }} onClick={_ => setShowAgent(!showAgent)} >
                            {isMobile() ? <MobileFriendlyOutlined /> : <DesktopWindowsOutlined />}
                        </IconButton>
                    </Box>
                    <Box margin={1} />
                    {showAgent && <Box>{navigator.userAgent}</Box>}

                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default SettingsDialog