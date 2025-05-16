import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { Cancel, Delete, Save, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AREA_UNIT, asShortStringDateTime, getFillColor, getOpacity, getUnitText, isStringEmpty, parseISOOrNull } from "../FarmUtil";
import DialogAppBar from "./DialogAppBar";
import { selectLang } from "../../features/app/appSlice";
import { useSelector } from "react-redux";
import { msgTelegram, msgWhatsapp, shareMsg, Telegram, Whatsapp } from "../../appbar/components/ShareLocationMenu";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { CircleMarker, MapContainer, Polygon, Tooltip, useMapEvents } from "react-leaflet";
import SatelliteMapProvider from "../../components/map/SatelliteMapProvider";
import { safeParseJson } from "../../features/fields/fieldsApiSlice";
import PointIcon from "../layers/PointIcon";
import { Transition } from "../Util";
const WaypointDialog = ({ open, handleClose, selectedPoint, handleDelete, title, polygons, center, initialZoom }) => {

    const text = useSelector(selectLang);
    const [touched, setTouched] = useState(false);

    const [note, setNote] = useState(selectedPoint.note);
    const [lat, setLat] = useState(selectedPoint.point.lat);
    const [lng, setLng] = useState(selectedPoint.point.lng);

//   const [note, setNote] = useState(selectedPoint.note);

    const [anchorEl, setAnchorEl] = useState(null);
    const openShare = Boolean(anchorEl);

    const [zoom, setZoom] = useState(initialZoom);
    const [map, setSetMap] = useState(0);

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
        handleClose(val, note, lat, lng);
        setTouched(false);
    }

    function HandleMapEvents() {
        const m = useMapEvents({
            zoomend: () => {
                setZoom(m.getZoom())
            },
            dragend: (e) => {
                //   setCenter([e.target.getCenter().lat.toFixed(5),e.target.getCenter().lng.toFixed(5)])
            },
            click: (e) => {
                setLat(e.latlng.lat.toFixed(5))
                setLng(e.latlng.lng.toFixed(5))
               // setCenter([e.target.getCenter().lat.toFixed(5),e.target.getCenter().lng.toFixed(5)])

                //   mapCliecked(e, null, 'map');

            }
        })
        return <div></div>
    }

    const height = window.innerHeight - 200;

    const shareClick = (app) => {
        const prefix = isStringEmpty(title) ? '' : title + ' - ';
        const suffix = isStringEmpty(note) ? '' : note;

        const msg = shareMsg(selectedPoint.point.lat, selectedPoint.point.lng, prefix + suffix);
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
            fullScreen
            slots={{ transition: Transition }}
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h6">
                            {title}
                        </Typography>
                        <Typography marginLeft={3} marginRight={3} variant="h6">
                            {asShortStringDateTime(parseISOOrNull(selectedPoint.createTime ? selectedPoint.createTime : selectedPoint.date))}
                        </Typography>
                    </Box>
                } />
            <DialogContent sx={{ margin: 0, padding: 0 }}>
                <Box padding={1}>
                    <TextFieldBase value={note} onChange={e => handleSetNote(e.target.value)} fullWidth={true} label={`${text.note}`} />
                </Box>
                <Box flex={1} id="map" dir='ltr' >
                    <MapContainer style={{ height: height, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={false}
                        ref={setSetMap}
                    >
                        <SatelliteMapProvider />
                        {polygons.map(f =>
                            <Polygon field={f} key={f.id}
                                color={f.color}
                                fillColor={getFillColor(f)}
                                fillOpacity={getOpacity(f)}

                                positions={safeParseJson(f.polygon)}>
                            </Polygon>
                        )}




                        <CircleMarker

                            radius={14}
                            color={'white'}
                            weight={4}
                            fillOpacity={1}
                            center={[lat,lng]}
                        >
                            <Tooltip
                                className={'empty-tooltip'}
                                direction="center" opacity={1} permanent>
                                <PointIcon point={selectedPoint.point} />
                            </Tooltip>
                        </CircleMarker>

                        <HandleMapEvents />
                    </MapContainer>

                </Box>

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
                    onClose={handleCloseShare}

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
                        <ListItemText primary={Telegram} />
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
