import React from 'react'
import { Box, Checkbox, Dialog, DialogContent, FormControlLabel, Slide } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLang, selectOpenLayers, selectShowPestsLayer, setOpenLayers, setShowPestsLayer,
    selectShowTrapsLayer, selectShowIrrigationHeadsLayer, setShowTrapsLayer, setShowIrrigationHeadsLayer
} from '../../features/app/appSlice';
import { isMobile } from '../FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import DialogAppBar from '../dialog/DialogAppBar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const pests = 'pests'
const irrigationHeads = 'irrigationHeads'
const traps = 'traps'
//const irrigationHeads = 'irrigationHeads'

const LayersDialog = () => {

    const text = useSelector(selectLang)
    const dispatch = useDispatch()
    const open = useSelector(selectOpenLayers)


    const { data: user, isSuccess: isUserSuccess } = useGetUserDataQuery()


    const showPests = useSelector(selectShowPestsLayer);
    const showTraps = useSelector(selectShowTrapsLayer);
    const showIrrigationHeads = useSelector(selectShowIrrigationHeadsLayer);

    const handleClose = () => {
        dispatch(setOpenLayers(false));
    }


    const handleChange = (layer) => {
        if (layer === pests) {
            dispatch(setShowPestsLayer(!showPests));
        } if (layer === traps) {
            dispatch(setShowTrapsLayer(!showTraps));
        } if (layer === irrigationHeads) {
            dispatch(setShowIrrigationHeadsLayer(!showIrrigationHeads));
        }
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
                    <FormControlLabel control={<Checkbox checked={showPests} onChange={() => handleChange(pests)} />} label={text.pests} />
                </Box>
                <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                    <FormControlLabel control={<Checkbox checked={showTraps} onChange={() => handleChange(traps)} />} label={text.traps} />
                </Box>
                <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                    <FormControlLabel control={<Checkbox checked={showIrrigationHeads} onChange={() => handleChange(irrigationHeads)} />} label={text.irrigationHeads} />
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