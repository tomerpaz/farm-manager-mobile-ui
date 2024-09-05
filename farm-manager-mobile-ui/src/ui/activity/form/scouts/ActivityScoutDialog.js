import { Box, Button, Dialog, DialogActions, DialogContent, MenuItem } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../../../features/app/appSlice";
import { useState } from "react";
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice";
import { Delete, Save } from "@mui/icons-material";
import DialogAppBar from "../../../dialog/DialogAppBar";
import { useGetInfectionLevelsQuery, useGetPestStagesQuery, useGetPlantLocationsQuery } from "../../../../features/pests/pestsApiSlice";



const ActivityScoutDialog = ({ selectedRow, selectedIndex, handleClose, update, remove, stages }) => {
    const text = useSelector(selectLang);
    const { data: user } = useGetUserDataQuery()
    const [note, setNote] = useState(selectedRow.note ? selectedRow.note : '');
    const [value, setValue] = useState(selectedRow.value ? selectedRow.value : '');
    const [infectionLevel, setInfectionLevel] = useState(selectedRow.infectionLevel);
    const [stage, setStage] = useState(selectedRow.stage ? selectedRow.stage : stages.find(e=>e.code === 'none'));
    const [plantLocation, setPlantLocation] = useState(selectedRow.location);

    const { data: infectionLevels, isLoading: isLoadingInfectionLevels } = useGetInfectionLevelsQuery()
    const { data: plantLocations, isLoading: isLoadingPlantLocations } = useGetPlantLocationsQuery()

    const onAction = (save) => {
        if (save) {

            selectedRow.value = value;
            selectedRow.note = note;
            selectedRow.location = plantLocation;
            selectedRow.infectionLevel = infectionLevel;
            selectedRow.stage = stage;

            update(selectedIndex, selectedRow);
        }
        handleClose(save);
    }
    if (isLoadingPlantLocations || isLoadingInfectionLevels) {
        return <></>
    }

    return (
        <Dialog
            open={selectedRow !== null}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogAppBar onClose={() => onAction(false)}
                title=
                {`${selectedRow.finding.name}`}
            />
            <DialogContent /*sx={{ minHeight: isWarehouse ? height : null }}*/>
                <Box display={'flex'} flex={1} flexDirection={'column'}  >
                    <TextFieldBase
                        id="scout-location"
                        select
                        value={plantLocation}
                        label={text.location}
                        fullWidth={true}
                        onChange={e => setPlantLocation(e.target.value)}
                    >
                        {plantLocations.map((option) => (
                            <MenuItem key={option} value={option}>
                                {text[option]}
                            </MenuItem>
                        ))}
                    </TextFieldBase>
                    <TextFieldBase
                        id="scout-infection-level"
                        select
                        value={infectionLevel}
                        label={text.infectionLevel}
                        fullWidth={true}
                        onChange={e => setInfectionLevel(e.target.value)}
                    >
                        {infectionLevels.map((option) => (
                            <MenuItem key={option} value={option}>
                                {text[option]}
                            </MenuItem>
                        ))}
                    </TextFieldBase>
                    <TextFieldBase
                        id="scout-pest-stage"
                        select
                        value={stage.id}
                        label={text.phenologicalStage}
                        fullWidth={true}
                        onChange={e => setStage(stages.find(s => s.id === e.target.value))}
                    >
                        {stages.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextFieldBase>
                    <TextFieldBase value={value} onChange={e => setValue(Number(e.target.value))}
                        type='number' label={text.qty}
                        fullWidth={true}
                    />
                    <TextFieldBase value={note} onChange={e => setNote(e.target.value)} fullWidth={true} label={text.note} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={remove}>{text.delete}
                </Button>
                <Button size='large' disableElevation={true} variant='contained'
                    endIcon={<Save />}
                    onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default ActivityScoutDialog;