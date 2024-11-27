import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Edit, Share, PestControl as Scout, History } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { AREA_UNIT, asShortStringDateTime, getUnitText, parseISOOrNull, SCOUT, trap } from "../FarmUtil";
import DialogAppBar from "./DialogAppBar";
import { selectLang, setActivityType } from "../../features/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { msgTelegram, msgWhatsapp, shareMsg, Telegram, Whatsapp } from "../../appbar/components/ShareLocationMenu";
import { createSearchParams, useNavigate } from "react-router-dom";

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

    const shareClick = (app) => {
        const msg = shareMsg(selectedPoint.lat, selectedPoint.lng);
        if (app === Whatsapp) {
            msgWhatsapp(msg)
        } else if (app === Telegram) {
            msgTelegram(msg)
        }
        handleClose();
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()


    //   const { data: user } = useGetUserDataQuery()
    //   const actionTypes = user.userConf.filter(e => e.write).map(e => e.type);
    const newActivity = (type, pointId, fieldId) => {
        //  console.log('new',e, 'map',map)

        //  console.log('handleAction',fieldId)
        console.log(type, pointId);
        const searchParams = createSearchParams({ pid: pointId, fid: fieldId }).toString()
        dispatch(setActivityType(type));
          navigate(
            {
              pathname: `/activity/new/${type}`,
              search: searchParams
            }
          )


        handleClose();
    }

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
                    {/* {selectedPoint.type === trap &&
                        <Fragment>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => newActivity(SCOUT, selectedPoint.id, selectedPoint.fieldId)}>
                                    <ListItemIcon>
                                        <Scout />
                                    </ListItemIcon>
                                    <ListItemText primary={text.scouting} secondary={selectedPoint.pest?.name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    } */}
                    <ListItemButton onClick={() => shareClick(Whatsapp)}>
                        <ListItemIcon>
                            <WhatsAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={text.share} secondary={Whatsapp} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={() => shareClick(Telegram)}>
                        <ListItemIcon>
                            <TelegramIcon />
                        </ListItemIcon>
                        <ListItemText primary={text.share} secondary={Telegram} />
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
