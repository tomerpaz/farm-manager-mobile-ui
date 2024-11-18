import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Edit, Share, PestControl as Scout, History } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AREA_UNIT, asShortStringDateTime, getUnitText, parseISOOrNull } from "../FarmUtil";
import DialogAppBar from "./DialogAppBar";
import { selectLang } from "../../features/app/appSlice";
import { useSelector } from "react-redux";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { msgTelegram, msgWhatsapp, shareMsg } from "../../appbar/components/ShareLocationMenu";

const PointActionDialog = ({ open, handleClose, selectedPoint }) => {

    const text = useSelector(selectLang);
    // const [touched, setTouched] = useState(false);

    const [share, setShare] = useState(false);


    console.log('selectedPoint', selectedPoint)

    const handleSetNote = (val) => {
        // setNote(val);
        // setTouched(true)
    }

    const onAction = (val) => {
        // if (val) {
        //     selectedPoint.note = note;
        // }
        handleClose();
        // setTouched(false);
        // setNote('');
    }
    /**
     Share,
    Edit,
    History,
    Scout,
    Activity
     */
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={selectedPoint.name}
            />
            <DialogContent>
                <List>
                    <ListItemButton onClick={() => msgWhatsapp(shareMsg(selectedPoint.lat, selectedPoint.lng))}>
                        <ListItemIcon>
                            <WhatsAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={text.share} secondary="Whatsapp" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={() => msgTelegram(shareMsg(selectedPoint.lat, selectedPoint.lng))}>
                        <ListItemIcon>
                            <TelegramIcon />
                        </ListItemIcon>
                        <ListItemText primary={text.share} secondary="Telegram" />
                    </ListItemButton>
                    {/* <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemText
                            primary={text.edit}
                        />
                    </ListItemButton>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Scout />
                            </ListItemIcon>
                            <ListItemText primary={text.scouting} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <History />
                            </ListItemIcon>
                            <ListItemText primary={text.history} />
                        </ListItemButton>
                    </ListItem> */}
                </List>
            </DialogContent>
        </Dialog>
    )
}
export default PointActionDialog;
