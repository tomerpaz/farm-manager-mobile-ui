import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Edit, Share, PestControl as Scout, History, EditLocation } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { activityDescription, activityLongText, AREA_UNIT, asShortStringDateTime, getUnitText, parseDate, parseISOOrNull, SCOUT, trap } from "../FarmUtil";
import DialogAppBar from "./DialogAppBar";
import { selectLang, setActivityType } from "../../features/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { msgTelegram, msgWhatsapp, shareMsg, Telegram, Whatsapp } from "../../appbar/components/ShareLocationMenu";
import { createSearchParams, useNavigate } from "react-router";
import PointForm from "../point/PointForm";
import PointIcon, { ACTIVITY_POINT_TYPE, SCOUT_POINT_TYPE } from "../layers/PointIcon";
import ActivityTypeIcon from "../../icons/ActivityTypeIcon";

const PointActionDialog = ({ open, handleClose, selectedPoint }) => {

    const text = useSelector(selectLang);
    // const [touched, setTouched] = useState(false);

    const [share, setShare] = useState(false);

    const [editPoint, setEditPoint] = useState(null);


    const handleSetNote = (val) => {
        // setNote(val);
        // setTouched(true)
    }

    const onAction = (val) => {

        setEditPoint(null);
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
        console.log('selectedPoint', selectedPoint)
        const msg = shareMsg(selectedPoint.lat, selectedPoint.lng, selectedPoint?.name);
        if (app === Whatsapp) {
            msgWhatsapp(msg)
        } else if (app === Telegram) {
            msgTelegram(msg)
        }
        handleClose();
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const onPointFormClose = () => {
        onAction();
        // setEditPoint(null)
    }

    console.log(selectedPoint)
    //   const { data: user } = useGetUserDataQuery()
    //   const actionTypes = user.userConf.filter(e => e.write).map(e => e.type);
    const newActivity = (type, pointId, fieldId) => {

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


    const newPoint = () => {
        setEditPoint({ ...selectedPoint, expiry: parseISOOrNull(selectedPoint.expiry) })
        //handleClose();

    }


    const activityBased = [SCOUT_POINT_TYPE, ACTIVITY_POINT_TYPE].includes(selectedPoint?.type);
    const edit = selectedPoint.type === trap;
    const title = activityBased ? activityDescription(selectedPoint.activity, text) : selectedPoint.name;
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={title}
            />
            <DialogContent sx={{ padding: 0, margin: 0 }}>
                <List dense>
                    {selectedPoint.type === trap &&
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
                    }
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
                    {edit && <Divider />}
                    {edit && <ListItemButton onClick={() => newPoint()}>
                        <ListItemIcon>
                            <EditLocation />
                        </ListItemIcon>
                        <ListItemText primary={text.edit} secondary={selectedPoint.name} />
                    </ListItemButton>}
                    {activityBased &&
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <ActivityTypeIcon type={selectedPoint?.activity?.type} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={parseDate(selectedPoint?.activity?.execution)}
                                secondary={activityLongText(selectedPoint.activity)}/>
                        </ListItem>

                    }




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
            {editPoint && <PointForm open={true} defaultValues={editPoint} handleClose={onPointFormClose} deletable={true} />}
        </Dialog>
    )
}
export default PointActionDialog;
