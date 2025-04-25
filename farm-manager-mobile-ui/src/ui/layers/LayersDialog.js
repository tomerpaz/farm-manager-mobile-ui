import React, { useState } from 'react'
import { Box, Button, Checkbox, Dialog, DialogContent, Divider, FormControlLabel, IconButton, Slide } from '@mui/material'
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
import { CenterFocusStrong, Edit, EditLocationAlt, Opacity } from '@mui/icons-material';
import FieldPointDialog from '../point/FieldPointDialog';
import { point } from 'leaflet';
import PointForm from '../point/PointForm';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const SCOUT = 'scout'
export const ACTIVITY = 'activity'
const irrigationHead = 'irrigationHead'
const trap = 'trap'
//const irrigationHeads = 'irrigationHeads'

const LayersDialog = () => {

    const text = useSelector(selectLang)
    const dispatch = useDispatch()
    const open = useSelector(selectOpenLayers)

    const [newPoint, setNewPoint] = useState(null);


    const { data: user, isSuccess: isUserSuccess } = useGetUserDataQuery()


    const showLayers = useSelector(selectShowLayers);

    const showFieldAlias = useSelector(selectShowFieldAlias);
    const showFieldName = useSelector(selectShowFieldName);


    const onNewPointSaved = () => {
        setNewPoint(null);
    }

    const addPoint = (type) => {
        const point  = {
            id: null,
            lat: null, lng: null,
            fieldId: null,
            name: '',
            pest: null,
            expiry: null,
            active: true, type: type
        };
        setNewPoint(point)

    }

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

                <Box marginTop={1} display={'flex'} flexDirection={'row'} >
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(SCOUT)} onChange={() => handleChange(SCOUT)} />} label={text.scouting} />
                </Box>
                <Divider />
                <Box marginTop={1} display={'flex'} flexDirection={'row'} >
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(ACTIVITY)} onChange={() => handleChange(ACTIVITY)} />} label={text.activities} />
                </Box>
                <Divider />
                <Box marginTop={1} marginBottom={1} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(trap)} onChange={() => handleChange(trap)} />} label={text.traps} />
                    {/* <IconButton onClick={() => handleEditLayer(trap)}><EditLocationAlt /></IconButton> */}
                    <Button disableElevation variant='outlined' color='secondary' onClick={() => addPoint(trap)} startIcon={<CenterFocusStrong  />}>{text.add}</Button>

                </Box>
                <Divider />

                <Box marginTop={1}  display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showLayers.includes(irrigationHead)} onChange={() => handleChange(irrigationHead)} />} label={text.irrigationHeads} />
                    {/* <IconButton onClick={() => handleEditLayer(irrigationHead)}><EditLocationAlt /></IconButton> */}
                    <Button disableElevation variant='outlined' color='secondary' onClick={() => addPoint(irrigationHead)} startIcon={<Opacity  />}>{text.add}</Button>

                </Box>
                <Box marginTop={1}></Box>
                <Divider />
                <Box marginTop={1} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showFieldName} onChange={() => dispatch(setShowFieldName(!showFieldName))} />} label={text.field} />
                </Box>
                <Box marginTop={1} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                    <FormControlLabel control={<Checkbox checked={showFieldAlias} onChange={() => dispatch(setShowFieldAlias(!showFieldAlias))} />} label={text.alias} />
                </Box>

                {/* {isInventory &&
                    <Box marginTop={2} display={'flex'} flexDirection={'row'} >
                        <FormControlLabel control={<Checkbox checked={showInventory} onChange={handleInvenotryChange} />} label={text.inventory} />


                    </Box>
                } */}

            </DialogContent>
            {newPoint && <PointForm open={newPoint !== null}
            defaultValues={newPoint}  handleClose={()=>setNewPoint(null)} deletable ={ false}
            
            />}
        </Dialog>
    )
}
export default LayersDialog