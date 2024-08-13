import React from 'react'
import { AppBar, Box, Checkbox, Dialog, DialogContent, FormControlLabel, IconButton, MenuItem, Select, Slide, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectLang, selectOpenLayers, selectOpenSettings, selectShowInventory, selectShowPlans, selectShowsPestLayer, setOpenLayers, setShowPestsLayer } from '../../features/app/appSlice';
import DoneIcon from '@mui/icons-material/Done';
import { getUserLang } from '../../router/UserRoutes';
import { isInventoryPossible, isMobile, isPlansPossible } from '../FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import DialogAppBar from '../dialog/DialogAppBar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LayersDialog = () => {

    const text = useSelector(selectLang)
    const dispatch = useDispatch()
    const open = useSelector(selectOpenLayers)


    const { data: user, isSuccess: isUserSuccess } = useGetUserDataQuery()


    const showPests = useSelector(selectShowsPestLayer);

    const handleClose = () => {
        dispatch(setOpenLayers(false));
    }


    const handlePestsChange = () => {
        dispatch(setShowPestsLayer(!showPests));
    }

    return (
        <Dialog
            fullScreen={isMobile()} fullWidth={!isMobile()}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogAppBar onClose={handleClose} title={text.layers} />


            <DialogContent>

                <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                    <FormControlLabel control={<Checkbox checked={showPests} onChange={handlePestsChange} />} label={text.pests} />
                </Box>

                {/* {isInventory &&
                    <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                        <FormControlLabel control={<Checkbox checked={showInventory} onChange={handleInvenotryChange} />} label={text.inventory} />


                    </Box>
                } */}

            </DialogContent>
        </Dialog>
    )
}
export default LayersDialog