import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Cancel, Delete, Save, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AREA_UNIT, asShortStringDateTime, getUnitText, parseISOOrNull } from "../FarmUtil";
import DialogAppBar from "./DialogAppBar";
import { selectLang } from "../../features/app/appSlice";
import { useSelector } from "react-redux";
import { msgTelegram, msgWhatsapp, shareMsg, Telegram, Whatsapp } from "../../appbar/components/ShareLocationMenu";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
const WaypointDialog = ({ open, handleClose, selectedPoint, handleDelete }) => {

    const text = useSelector(selectLang);
    const [touched, setTouched] = useState(false);

    const [note, setNote] = useState(selectedPoint.note);

    const [anchorEl, setAnchorEl] = useState(null);
    const openShare = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseShare = () => {
        setAnchorEl(null);
    };

    const handleSetNote = (val) => {
        setNote(val);
        setTouched(true)
    }

    const onAction = (val) => {
        if (val) {
            selectedPoint.note = note;
        }
        handleClose(val);
        setTouched(false);
        // setNote('');
    }

    const shareClick = (app) => {
        console.log('selectedPoint', selectedPoint)
        const msg = shareMsg(selectedPoint.lat, selectedPoint.lng);
        if (app === Whatsapp) {
            msgWhatsapp(msg)
        } else if (app === Telegram) {
            msgTelegram(msg)
        }
        setAnchorEl(null);
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h6">
                            {text.note}
                        </Typography>
                        <Typography marginLeft={3} marginRight={3} variant="h6">
                            {asShortStringDateTime(parseISOOrNull(selectedPoint.createTime ? selectedPoint.createTime : selectedPoint.date))}
                        </Typography>
                    </Box>
                } />
            <DialogContent>
                <TextFieldBase value={note} onChange={e => handleSetNote(e.target.value)} fullWidth={true} /*label={`${text.total} ${text.qty}`}*/ />

                {/* {selectedPoint.date} */}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={handleDelete}>{text.delete}</Button>
                <Button
                    size='large' endIcon={<Share />}
                    disableElevation={true} variant='outlined'
                    id="share-button"
                    aria-controls={open ? 'share-button' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {text.share}
                </Button>
                <Menu
                    id="share-menu"
                    anchorEl={anchorEl}
                    open={openShare}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => shareClick(Whatsapp)}>
                        <ListItemIcon>
                            <WhatsAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={Whatsapp} />
                    </MenuItem>
                    <MenuItem onClick={() => shareClick(Telegram)}>
                        <ListItemIcon>
                            <TelegramIcon />
                        </ListItemIcon>
                        <ListItemText primary={Telegram}/>
                    </MenuItem>
                </Menu>
                <Button /*disabled={!touched}*/ size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} >
                    {text.save}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default WaypointDialog;
