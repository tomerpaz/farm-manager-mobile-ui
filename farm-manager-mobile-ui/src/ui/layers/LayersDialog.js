import React from 'react'
import { Box, Checkbox, Dialog, DialogContent, Divider, FormControlLabel, IconButton, Slide } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLang, selectOpenLayers, selectShowPestsLayer, setOpenLayers, setShowPestsLayer,
    selectShowLayers,
    setShowLayers,
    setEditLayer,
    selectShowFieldAlias,
    selectShowFieldName,
    setShowFieldName,
    setShowFieldAlias
} from '../../features/app/appSlice';
import { isMobile } from '../FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import DialogAppBar from '../dialog/DialogAppBar';
import { Edit, EditLocationAlt } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const scout = 'scout'
const irrigationHead = 'irrigationHead'
const trap = 'trap'
//const irrigationHeads = 'irrigationHeads'

const LayersDialog = () => {

    const text = useSelector(selectLang)
    const dispatch = useDispatch()
    const open = useSelector(selectOpenLayers)


    const { data: user, isSuccess: isUserSuccess } = useGetUserDataQuery()


    const showLayers = useSelector(selectShowLayers);

    const showFieldAlias = useSelector(selectShowFieldAlias);
    const showFieldName = useSelector(selectShowFieldName);


    const handleClose = () => {
        dispatch(setOpenLayers(false));
    }

    const handleEditLayer = (layer) => {
        dispatch(setOpenLayers(false));
        dispatch(setEditLayer(layer));
        dispatch(setShowLayers([layer]));
    }

    const handleChange = (layer) => {
        if (showLayers.includes(layer)) {
            dispatch(setShowLayers(showLayers.filter(e => e !== layer)));
        } else {
            dispatch(setShowLayers(showLayers.concat(layer)));
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
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(scout)} onChange={() => handleChange(scout)} />} label={text.scouting} />
                </Box>
                <Box marginTop={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(trap)} onChange={() => handleChange(trap)} />} label={text.traps} />
                    <IconButton onClick={() => handleEditLayer(trap)}><EditLocationAlt /></IconButton>
                </Box>
                <Box marginTop={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(irrigationHead)} onChange={() => handleChange(irrigationHead)} />} label={text.irrigationHeads} />
                    <IconButton onClick={() => handleEditLayer(irrigationHead)}><EditLocationAlt /></IconButton>
                </Box>

                <Divider />


                <Box marginTop={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showFieldName} onChange={() => dispatch(setShowFieldName(!showFieldName))} />} label={text.field} />
                </Box>
                <Box marginTop={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showFieldAlias} onChange={() => dispatch(setShowFieldAlias(!showFieldAlias))} />} label={text.alias} />
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