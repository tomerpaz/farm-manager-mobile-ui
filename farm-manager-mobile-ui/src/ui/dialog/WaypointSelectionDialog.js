import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectActiveGPS, selectLang, selectLatitude, selectLongitude } from "../../features/app/appSlice";
import { useEffect, useState } from "react";
import { Transition } from "../Util";
import { Add, Delete, GpsFixed, Save } from "@mui/icons-material";
import { activityDescription, asLocalDateTime, getFillColor, getOpacity, newDate, SCOUT, stopMapEventPropagation } from "../FarmUtil";

import DialogAppBar from "./DialogAppBar";

import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { CircleMarker, MapContainer, Polygon, Tooltip, useMapEvents } from "react-leaflet";
import SatelliteMapProvider from "../../components/map/SatelliteMapProvider";
import GeoLocation from "../../components/GeoLocation";
import { safeParseJson } from "../../features/fields/fieldsApiSlice";
import WaypointDialog from "./WaypointDialog";
import PointIcon, { ACTIVITY_POINT_TYPE, SCOUT_POINT_TYPE } from "../layers/PointIcon";
import Accuracy from "../../appbar/components/Accuracy";


const getPointType = (activityType) => {
    if (activityType === SCOUT) {
        return SCOUT_POINT_TYPE;
    } else {
        return ACTIVITY_POINT_TYPE;
    }
}

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

const WaypointSelectionDialog = ({ open, handleClose, fields, waypoints, activityType, activityDef }) => {
    const text = useSelector(selectLang);
    const [filter, setFilter] = useState('');

    const { data: user } = useGetUserDataQuery()


    const longitude = useSelector(selectLongitude);
    const latitude = useSelector(selectLatitude);
    const activeGPS = useSelector(selectActiveGPS);


    const [center, setCenter] = useState(activeGPS && latitude && longitude ? [latitude, longitude] : getMapCenter(fields.map(e => e.field), user));
    const [zoom, setZoom] = useState(getMapZoom(fields.map(e => e.field), user));
    const [map, setSetMap] = useState(0);

    const [points, setPoints] = useState([...waypoints]);

    const [selectedPoint, setSelectedPoint] = useState(null);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const [openWaypointDialog, setOpenWaypointDialog] = useState(false);



    const title = activityDescription({activityDef, type: activityType}, text);

    useEffect(() => {
        if (map && activeGPS && longitude && latitude) {
            map.setView([latitude, longitude], zoom);
        }

    }, [activeGPS, longitude, latitude])


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
                setCenter([e.target.getCenter().lat.toFixed(5),e.target.getCenter().lng.toFixed(5)])
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

    const addNewPoint = () => {

        var point = null;
        var index = null;
        var lat =  activeGPS? latitude : center[0];
        var lng =  activeGPS? longitude : center[1];
        points.forEach((e, i) => {

            if (e.point.lat === lat && e.point.lng === lng) {
                point = e;
                index = i;
            }
        })

        if (point === null) {
            var i = points.length +1;
            point = {
                note: `${i}`, date: asLocalDateTime(newDate(), true),
                createTime: asLocalDateTime(newDate(), true), point: { lat, lng, type: getPointType(activityType), active: true }
            };
        }
        setSelectedPoint(point);
        setOpenWaypointDialog(true);
      //  setSelectedIndex(index);
    }


    const mapCliecked = (e, element, type, index) => {
//          console.log('mapCliecked', type, index)
        if (type === 'point') {
            stopMapEventPropagation(e);
            setSelectedPoint(element);
            setOpenWaypointDialog(true);
            setSelectedIndex(index);
        } 
        else if(!activeGPS){
            stopMapEventPropagation(e);

            var i = points.length+1;
            var point = {
                note: `${i}`, date: asLocalDateTime(newDate(), true),
                createTime: asLocalDateTime(newDate(), true), point: { lat: e.latlng.lat.toFixed(5), lng: e.latlng.lng.toFixed(5), type: getPointType(activityType), active: true }
            };

          //  setPoints(points.concat(point));
            setSelectedPoint(point);
            setOpenWaypointDialog(true);
          //  setSelectedIndex(i);
        }
    }


    const displayFields = fields.map(e => e.field);

    const polygons = displayFields.filter(e => e.polygon !== null);


    const handleCloseWaypointDialog = (val, note, lat, lng) => {
       // console.log('val',val)
       if(val){
           //const  updatedPoint = {not}

            selectedPoint.note = note;
            selectedPoint.point.lat = lat;
            selectedPoint.point.lng = lng;
       }
        if(val && selectedIndex === null){            
            setPoints(points.concat(selectedPoint));
        }
        setOpenWaypointDialog(false);
        setSelectedPoint(null);
        setSelectedIndex(null);
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
            slots={{ transition: Transition }}
                    >
            <DialogAppBar onClose={() => onAction(false)}
                title={<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography variant="h6">{`${text.map}`}</Typography><Box padding={2}><Accuracy /></Box></Box>} />

            <DialogTitle id="alert-dialog-title" sx={{ margin: 0, padding: 0 }}>
                {/* {title} */}
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
                            {!activeGPS && <GeoLocation />}
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

{/* {!activeGPS  && <CircleMarker color={'black'} fillColor={'yellow'} fillOpacity={1} center={[center[0], center[1]]} />} */}

                            {activeGPS && latitude && longitude && <CircleMarker color={'white'} fillColor={'blue'} fillOpacity={1} center={[latitude, longitude]} />}
                            {
                                points.map((e, index, arr) =>

                                    <CircleMarker

                                        eventHandlers={{
                                            click: (event) => {

                                                mapCliecked(event, e, 'point', index);
                                            }
                                        }}
                                        key={index} radius={14}
                                        color={'white'}
                                        weight={4}
                                        // fillColor={'lightGray'}
                                        fillOpacity={1}
                                        center={[e.point.lat, e.point.lng]}
                                    >
                                        <Tooltip
                                            className={'empty-tooltip'}
                                            direction="center" opacity={1} permanent>
                                            <PointIcon point={e.point} />
                                        </Tooltip>
                                    </CircleMarker>
                                )
                            }
                            <HandleMapEvents />
                        </MapContainer>

                    </Box>
                </Box>
                {openWaypointDialog && <WaypointDialog title={title} open={openWaypointDialog} selectedPoint={selectedPoint} handleClose={handleCloseWaypointDialog} handleDelete={deleteWaypoint} polygons={polygons} center={center} initialZoom={zoom}/>}
                            {/* {openWaypointDialog && <ActivityPointActionDialog open={openWaypointDialog} selectedPoint={selectedPoint} handleClose={handleCloseWaypointDialog} handleDelete={deleteWaypoint} />} */}

            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button size='large' endIcon={activeGPS ? <GpsFixed/> : <Add />} disableElevation={true} variant='outlined' onClick={() => addNewPoint()} autoFocus>
                    {text.add}
                </Button>
                <Button size='large' endIcon={<Delete />} disableElevation={true} variant='outlined' onClick={() => setPoints([])}>{`${text.delete} ${text.all}`}</Button>

                <Button size='large' endIcon={<Save />} disableElevation={true} variant='contained' onClick={() => onAction(true)} autoFocus>
                    {text.save}
                </Button>

            </DialogActions>
        </Dialog>
    )

}


export default WaypointSelectionDialog;