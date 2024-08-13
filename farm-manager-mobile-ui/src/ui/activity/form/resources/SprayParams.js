import { Box, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import TextFieldBase from "../../../../components/ui/TextField";
import { Cancel, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DialogAppBar from "../../../dialog/DialogAppBar";


const SprayParams = ({ open, units, text, handleClose, areaUnit, activityArea, days, sprayParams }) => {
    const [speed, setSpeed] = useState(sprayParams?.speed ? sprayParams?.speed : '');
    const [pto, setPto] = useState(sprayParams?.pto);
    const [psi, setPsi] = useState(sprayParams?.psi);

    const onAction = (val) => {
        handleClose(val ? { speed, pto, psi } : null);
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogAppBar onClose={() => onAction(false)} title={""} />

            <DialogContent>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <TextFieldBase sx={{ flex: 1 }}
                        value={speed} onChange={e => setSpeed(Number(e.target.value))}
                        type='number' label={`${text.speed}`}
                        fullWidth
                    />
                </Box>
                <Box margin={2} />
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <TextFieldBase sx={{ flex: 1 }}
                        value={pto} onChange={e => setPto(Number(e.target.value))}
                        type='number' label={`PTO`}
                        fullWidth
                    />
                </Box>
                <Box margin={2} />
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <TextFieldBase sx={{ flex: 1 }}
                        value={psi} onChange={e => setPsi(Number(e.target.value))}
                        type='number' label={`PSI`}
                        fullWidth
                    />
                </Box>


            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default SprayParams;
