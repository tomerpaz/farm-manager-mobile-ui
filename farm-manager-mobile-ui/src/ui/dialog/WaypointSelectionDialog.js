import { AppBar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import TextFieldBase from "../../components/ui/TextField";
import { useSelector } from "react-redux";
import { selectLang } from "../../features/app/appSlice";
import { Fragment, useState } from "react";
import { cellSx, headerSx, Transition } from "../Util";
import { Close, ContactSupportOutlined, Delete, Save, Search } from "@mui/icons-material";
import { asLocalDateTime, getFillColor, getOpacity, isMobile, isStringEmpty, newDate } from "../FarmUtil";

import DialogAppBar from "./DialogAppBar";

import { useGetInfectionLevelsQuery, useGetPestsQuery, useGetPestStagesQuery, useGetPlantLocationsQuery } from '../../features/pests/pestsApiSlice';
import ListPager from "../../components/ui/ListPager";
import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { CircleMarker, MapContainer, Marker, Polygon, Popup, useMapEvents } from "react-leaflet";
import SatelliteMapProvider from "../../components/map/SatelliteMapProvider";
import GeoLocation from "../../components/GeoLocation";
import { safeParseJson } from "../../features/fields/fieldsApiSlice";
import WaypointDialog from "./WaypointDialog";
import { fi } from "date-fns/locale";



const getFirstFieldWIthGIS = (fields) => {
    return fields.find(e => e.polygon !== null && e.lat !== null && e.lng != null);

}

const getMapCenter = (fields, user) => {
    const e = getFirstFieldWIthGIS(fields);
    if (e) {
        return [e.lat, e.lng]
    } else {
        return [user.lat, user.lng]
    }

}

const getMapZoom = (fields, user) => {
    const e = getFirstFieldWIthGIS(fields);
    if (e) {
        return e.zoom;
    } else {
        return user.zoom;
    }

}

const WaypointSelectionDialog = ({ open, handleClose, fields, waypoints }) => {
    const text = useSelector(selectLang);
    const [filter, setFilter] = useState('');

    const { data: user } = useGetUserDataQuery()


    const [center, setCenter] = useState(getMapCenter(fields.map(e => e.field), user));
    const [zoom, setZoom] = useState(getMapZoom(fields.map(e => e.field), user));
    const [map, setSetMap] = useState(0);

    const [points, setPoints] = useState([...waypoints]);

    const [selectedPoint, setSelectedPoint] = useState(null);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const [openWaypointDialog, setOpenWaypointDialog] = useState(false);


    const height = window.innerHeight - 65;


    const deleteWaypoint = () => {
        const arr = [...points]
        arr.splice(selectedIndex, 1);
        //handleDelete(selectedIndex);
        setSelectedIndex(null);
        setOpenWaypointDialog(false);
        setSelectedPoint(null);
        setPoints(arr);
    }

    function HandleMapEvents() {
        const m = useMapEvents({
            zoomend: () => {
                setZoom(m.getZoom())
            },
            dragend: (e) => {
                setCenter(e.target.getCenter())
            },
            click: (e) => {
                mapCliecked(e, null, 'map');

            }
        })
        return <div></div>
    }


    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
    // const [selected, setSelected] = useState([]);

    // const { data: pests, isLoading: isPestsLoading } = useGetPestsQuery();

    // const handleSetFilter = (value) => {
    //     setFilter(value);
    //     setPage(0);
    // }



    // const onSelectRow = (e) => {
    //     if (isElementSelected(e, selected)) {
    //         setSelected(selected.filter(f => e.id !== f.id));
    //     } else {
    //         setSelected(selected.concat([e]));
    //     }
    // }


    const onAction = (save) => {
        handleClose(save ? points : null);
        setPoints([])
    }


    const mapCliecked = (e, element, type, index) => {
        console.log('mapCliecked', type)
        if (type === 'point') {
            e.originalEvent.view.L.DomEvent.stopPropagation(e);
            setSelectedPoint(element);
            setOpenWaypointDialog(true);
            setSelectedIndex(index);
        } else {
            setPoints(points.concat({ note: '', date: asLocalDateTime(newDate(), true), point: { lat: e.latlng.lat.toFixed(5), lng: e.latlng.lng.toFixed(5) } }));
        }
    }

    //const visableFields = pestst.filter(e => filterField(e, filter, cropId, active));

    const displayFields = fields.map(e => e.field);

    const polygons = displayFields.filter(e => e.polygon !== null);


    const handleCloseWaypointDialog = (val) => {

        setOpenWaypointDialog(false);
        setSelectedPoint(null);
    }

    // const customMarkerIcon = divIcon({
    //     html: "<div>HI</div>"
    //   });

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen

            TransitionComponent={Transition}
        >
            <DialogAppBar onClose={() => onAction(false)}
                title={`${text.map}`} />

            <DialogTitle id="alert-dialog-title" sx={{ margin: 0, padding: 0 }}>
                {/* <Box display={'flex'} flexDirection={'row'}>

                    <TextFieldBase fullWidth={true} label={text.filter} value={filter}
                        onChange={(e) => handleSetFilter(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                        }}
                    />

                </Box> */}
            </DialogTitle>
            <DialogContent sx={{ margin: 0, padding: 0 }}>
                <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'column'} justifyContent={'space-between'}>

                    <Box flex={1} style={{ height: '100%' }} id="map" dir='ltr' >
                        <MapContainer style={{ height: height, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={false}
                            ref={setSetMap}
                        >

                            <SatelliteMapProvider />
                            <GeoLocation />
                            {polygons.map(f =>
                                <Polygon field={f} key={f.id}
                                    color={f.color}
                                    fillColor={getFillColor(f)}
                                    fillOpacity={getOpacity(f)}
                                    eventHandlers={{
                                        click: (e) => {
                                            mapCliecked(e, f, 'polygon');
                                            //  navigate(`/field/map/${f.id}/info`)
                                        }
                                    }}
                                    positions={safeParseJson(f.polygon)}>
                                </Polygon>
                            )}

                            {
                                points.map((e, index, arr) =>
                                    <Marker key={index} position={[e.point.lat, e.point.lng]}
                                        eventHandlers={{
                                            click: (event) => {

                                                mapCliecked(event, e, 'point', index);

                                                // mapCliecked(e, f, 'polygon');
                                                // navigate(`/field/map/${f.id}/info`)
                                            }
                                        }}
                                    >

                                        {/* <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup> */}
                                    </Marker>
                                    // <CircleMarker

                                    //     eventHandlers={{
                                    //         click: (event) => {

                                    //             mapCliecked(event, e, 'point');

                                    //             // mapCliecked(e, f, 'polygon');
                                    //             // navigate(`/field/map/${f.id}/info`)
                                    //         }
                                    //     }}
                                    //     key={index} radius={12}
                                    //     color={'white'}
                                    //     weight={4}
                                    //     fillColor={'white'}
                                    //     fillOpacity={1}
                                    //     center={[e.point.lat, e.point.lng]}
                                    // ></CircleMarker>
                                )
                            }






                            <HandleMapEvents />
                        </MapContainer>

                    </Box>
                </Box>
                {openWaypointDialog && <WaypointDialog open={openWaypointDialog} selectedPoint={selectedPoint} handleClose={handleCloseWaypointDialog} handleDelete={deleteWaypoint} />}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={()=>setPoints([])}>{`${text.delete} ${text.all}`}</Button>

                <Button size='large' endIcon={<Save />}  disableElevation={true} variant='contained' onClick={() => onAction(true)} autoFocus>
                    {text.save}
                </Button>

            </DialogActions>
        </Dialog>
    )

}


export default WaypointSelectionDialog;