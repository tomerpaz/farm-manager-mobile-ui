import { MapContainer, Polygon, useMapEvents, CircleMarker, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import GeoLocation from "../../../components/GeoLocation";
import { useNavigate } from "react-router";
import { Alert, Box, IconButton, Snackbar, Typography } from "@mui/material";
import { useFields } from "../../../features/fields/fieldsApiSlice";
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { selectActiveGPS, selectCurrentYear, selectEditLayer, selectFieldBaseFieldFilter, selectFieldFreeTextFilter, selectFieldSiteFilter, selectFieldsViewStatus, selectLang, selectLatitude, selectLongitude, selectMapCenter, selectMapZoom, selectShowFieldAlias, selectShowFieldName, selectShowLayers, selectShowOfficialFieldId, selectShowsPestLayer, selectVisibilLayes, setEditLayer, setMapCenter, setMapZoom } from "../../../features/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import FieldsFilter from "../../../components/filters/FieldsFilter";
import { displayFieldName, filterFields, getFillColor, getOpacity, isArrayEmpty, isStringEmpty, mapDisplayFieldName, MapToolTip, MAX_PER_MAP, stopMapEventPropagation, trap } from "../../FarmUtil";
import SatelliteMapProvider from "../../../components/map/SatelliteMapProvider";
import { useGetLayersQuery, useGetPointsQuery } from "../../../features/points/pointsApiSlice";
import { Close } from "@mui/icons-material";
import PointIcon from "../../layers/PointIcon";
import PointActionDialog from "../../dialog/PointActionDialog";
import RenderLayerPoints from "./RenderLayerPoints";


const sortByEndDate = (fields) => {
    if (fields !== null) {
        fields?.sort((a, b) => a.endDate?.localeCompare(b.endDate));
    }
}

const FieldsMap = (props) => {

    const dispatch = useDispatch()
    const text = useSelector(selectLang)

    const [map, setSetMap] = useState(0);

    const { data: user } = useGetUserDataQuery()
    const year = useSelector(selectCurrentYear);

    const fields = useFields(year).filter(f => f.geoPoints);
    const freeText = useSelector(selectFieldFreeTextFilter);
    const fieldSiteFilter = useSelector(selectFieldSiteFilter);
    const fieldBaseFieldFilter = useSelector(selectFieldBaseFieldFilter);
    const fieldsViewStatus = useSelector(selectFieldsViewStatus);
    // const activityType = useSelector(selectActivityType);
    const showLayers = useSelector(selectShowLayers);
    const editLayer = useSelector(selectEditLayer);

    const zoom = useSelector(selectMapZoom);
    const center = useSelector(selectMapCenter);

    const longitude = useSelector(selectLongitude);
    const latitude = useSelector(selectLatitude);
    const activeGPS = useSelector(selectActiveGPS);


    const showFieldAlias = useSelector(selectShowFieldAlias);
    const showFieldName = useSelector(selectShowFieldName);
    const showOfficialFieldId = useSelector(selectShowOfficialFieldId);

    const [selectedPoint, setSelectedPoint] = useState(null);
    // const [editPoint, setEditPoint] = useState(false);

    const displayFields = filterFields(fields, freeText, fieldSiteFilter, fieldBaseFieldFilter, fieldsViewStatus);

    const visibilLayes = useSelector(selectVisibilLayes);
    const { data: layers } = useGetLayersQuery();

    const getLayers = () => {
        return layers ? layers.filter(e => visibilLayes.includes(e.id)) : [];
    }

    sortByEndDate(displayFields);

    const { data: points, isLoading: isLoadingPoints, isFetching: isFetchingPoints } = useGetPointsQuery({ types: showLayers }, { skip: isArrayEmpty(showLayers) });

    function HandleMapEvents() {
        const m = useMapEvents({
            zoomend: () => {
                dispatch(setMapZoom(m.getZoom()));
            },
            dragend: (e) => {
                dispatch(setMapCenter([e.target.getCenter().lat, e.target.getCenter().lng]));

            },
            click: (e) => {

                // console.log('lng', e.latlng.lng.toFixed(5));
                // console.log('lat', e.latlng.lat.toFixed(5));

                mapCliecked(e, null, 'map')
            }
        })
        return <div></div>
    }

    useEffect(() => {
        if (isStringEmpty(freeText) && isArrayEmpty(fieldSiteFilter) && isArrayEmpty(fieldBaseFieldFilter)) {
            dispatch(setMapCenter([user.lat, user.lng]));
        } else {
            const c = (fields.length === displayFields.length) || isArrayEmpty(displayFields) ? center : [displayFields[0].lat, displayFields[0].lng];
            dispatch(setMapCenter(c));
        }
    }, [freeText, fieldSiteFilter, fieldBaseFieldFilter])


    useEffect(() => {
        if (map && center) {
            map.setView(center, zoom);
        }

    }, [center])


    useEffect(() => {
        if (map && activeGPS && longitude && latitude) {
            map.setView([latitude, longitude], zoom);
        }
    }, [activeGPS, longitude, latitude])

    const mapCliecked = (e, f, type) => {
        // console.log('mapCliecked', type)
        if (editLayer !== null) {
            if (type === 'polygon') {
                const p = {
                    id: null,
                    lat: e.latlng.lat, lng: e.latlng.lng,
                    fieldId: f.id,
                    name: `${text[editLayer]} - ${displayFieldName(f)}: ${points.length + 1} `,
                    pest: null,
                    expiry: null,
                    active: true, type: editLayer
                };
                setSelectedPoint(p);
            }
            else if (type === 'point') {
                setSelectedPoint(f);
            } else if (editLayer !== trap && type === 'map') {
                const p = {
                    id: null,
                    lat: e.latlng.lat, lng: e.latlng.lng,
                    //fieldId: f.id,
                    name: `${text[editLayer]}: ${points.length + 1} `,
                    pest: null,
                    expiry: null,
                    active: true, type: editLayer
                };
                setSelectedPoint(p);
            }


            stopMapEventPropagation(e);

        } else if (type === 'point') {
            // console.log('point lng', e.latlng.lng.toFixed(5), ' lat', e.latlng.lat.toFixed(5));
            // console.log(f);
            setSelectedPoint(f);
            stopMapEventPropagation(e);
        }

        else if (type === 'polygon') {
            navigate(`/field/map/${f.id}/info`)
        }

    }

    const handleCloseEditPoint = () => {
        setSelectedPoint(null);
    }

    const handleCloseEditLayer = () => {
        dispatch(setEditLayer(null));

    }

    let navigate = useNavigate();

    const height = window.innerHeight - 115;

    // console.log(points)

    const getDisplayPoints = () => {
        if (isArrayEmpty(showLayers) || !points || isLoadingPoints || isFetchingPoints) {
            return [];
        }
        else if (editLayer) {
            return points;
        } else {
            return points.filter(e => e.active === true && showLayers.includes(e.type));
        }
    }

    const showMapToolTip = showFieldAlias || showFieldName || showOfficialFieldId;

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'column'} justifyContent={'space-between'}>

            <Box flex={1} style={{ height: '100%' }} id="map" dir='ltr' >
                <MapContainer style={{ height: height, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={false}
                    ref={setSetMap}
                >
                    <SatelliteMapProvider />
                    {!activeGPS && <GeoLocation />}
                    {activeGPS && latitude && longitude && <CircleMarker color={'white'} fillColor={'blue'} fillOpacity={1} center={[latitude, longitude]} />}

                    {displayFields.map((f, index) =>
                        <Polygon field={f} key={f.id}
                            color={f.color}
                            fillColor={getFillColor(f)}
                            fillOpacity={getOpacity(f)}
                            eventHandlers={{
                                click: (e) => {
                                    mapCliecked(e, f, 'polygon');
                                }
                            }}
                            positions={f.geoPoints}>
                            {showMapToolTip && index < MAX_PER_MAP && <Tooltip
                                className={'empty-tooltip'}
                                direction="center" opacity={1} permanent>
                                <MapToolTip textArr={[mapDisplayFieldName(f, showFieldName, showFieldAlias, showOfficialFieldId)]} />
                            </Tooltip>}
                        </Polygon>
                    )}


                    {getLayers().map((e, index, arr) =>
                        <RenderLayerPoints key={index} layer={e} onClick={mapCliecked} />
                    )}
                    {getDisplayPoints().map((e, index, arr) =>

                        <CircleMarker

                            eventHandlers={{
                                click: (event) => {

                                    mapCliecked(event, e, 'point', index);
                                }
                            }}
                            key={index} radius={12}
                            color={e.active ? 'white' : 'gray'}
                            weight={4}
                            fillColor={e.active ? 'white' : 'gray'}
                            fillOpacity={1}
                            center={[e.lat, e.lng]}
                        >
                            <Tooltip
                                className={'empty-tooltip'}
                                direction="center" opacity={1} permanent>
                                <PointIcon point={e} />
                            </Tooltip>
                        </CircleMarker>
                    )}
                    <HandleMapEvents />
                </MapContainer>

            </Box>
            {fields && <FieldsFilter fields={fields} />}
            <Snackbar
                open={editLayer !== null}
                message={<Typography variant="h6">{text[editLayer + 's']}</Typography>}
                action={
                    <IconButton color="inherit" size="large" onClick={handleCloseEditLayer}>
                        <Close />
                    </IconButton>
                }
                // sx={{ bottom: { xs: 10, sm: 0 } }}
                sx={{ width: '100%', bottom: { xs: 10, sm: 0 } }}
            />

            {/* {selectedPoint && editLayer && <FieldPointDialog open={selectedPoint !== null} deletable={true} defaultValues={{...selectedPoint, expiry : parseISOOrNull(selectedPoint.expiry)}} handleClose={handleCloseEditPoint} />} */}
            {selectedPoint && <PointActionDialog open={selectedPoint !== null} deletable={true} selectedPoint={selectedPoint} handleClose={handleCloseEditPoint} />}

        </Box >
    )
}
export default FieldsMap;

/*
<Snackbar open={editLayer !== null} >
<Alert
    onClose={handleCloseEditLayer}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
>
   {editLayer}
</Alert>
</Snackbar>

*/

