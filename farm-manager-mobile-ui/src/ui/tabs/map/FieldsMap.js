import { MapContainer, TileLayer, Polygon, useMapEvents, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import GeoLocation from "../../../components/GeoLocation";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useFields } from "../../../features/fields/fieldsApiSlice";
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { selectActivityType, selectCurrentYear, selectFieldBaseFieldFilter, selectFieldFreeTextFilter, selectFieldSiteFilter, selectFieldsViewStatus } from "../../../features/app/appSlice";
import { useSelector } from "react-redux";
import FieldsFilter from "../../../components/filters/FieldsFilter";
import { filterFields, getFillColor, getOpacity, isArrayEmpty, isStringEmpty, SCOUT } from "../../FarmUtil";
import SatelliteMapProvider from "../../../components/map/SatelliteMapProvider";
import ScoutDialog from "../../scout/ScoutDialog";




const FieldsMap = (props) => {
    const [map, setSetMap] = useState(0);

    const { data: user } = useGetUserDataQuery()
    const year = useSelector(selectCurrentYear);

    const fields = useFields(year).filter(f => f.geoPoints);
    const freeText = useSelector(selectFieldFreeTextFilter);
    const fieldSiteFilter = useSelector(selectFieldSiteFilter);
    const fieldBaseFieldFilter = useSelector(selectFieldBaseFieldFilter);
    const fieldsViewStatus = useSelector(selectFieldsViewStatus);
    const activityType = useSelector(selectActivityType);

    const [center, setCenter] = useState([user.lat, user.lng]);
    const [zoom, setZoom] = useState(user.zoom);

    const displayFields = filterFields(fields, freeText, fieldSiteFilter, fieldBaseFieldFilter, fieldsViewStatus);


    function HandleMapEvents() {
        const m = useMapEvents({
            zoomend: () => {
                setZoom(m.getZoom())
            },
            // dragend: (e) => {
            //     setCenter(e.target.getCenter())
            // },
            click: (e) => {
                console.log('lng', e.latlng.lng.toFixed(5));
                console.log('lat', e.latlng.lat.toFixed(5));
            }
        })
        return <div></div>
    }

    useEffect(() => {
        const c = (fields.length === displayFields.length) || isArrayEmpty(displayFields) ? [user.lat, user.lng] : [displayFields[0].lat, displayFields[0].lng];
        setCenter(c);
    }, [freeText, fieldSiteFilter, fieldBaseFieldFilter])


    useEffect(() => {
        if (map && center) {
            map.setView(center, zoom);
        }

    }, [center])

    const mapCliecked = (e, f, type) => {
        console.log('mapCliecked', type)
        if (isStringEmpty(activityType)) {
            navigate(`/field/map/${f.id}/info`)
        } else {
            console.log(e)
        }

    }

    let navigate = useNavigate();

    const height = window.innerHeight - 115;

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'column'} justifyContent={'space-between'}>

            <Box flex={1} style={{ height: '100%' }} id="map" dir='ltr' >
                <MapContainer style={{ height: height, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={false}
                    ref={setSetMap}
                >

                    <SatelliteMapProvider />
                    <GeoLocation />
                    {displayFields.map(f =>
                        <Polygon field={f} key={f.id}
                            color={f.color}
                            fillColor={getFillColor(f)}
                            fillOpacity={getOpacity(f)}
                            eventHandlers={{
                                click: (e) => {
                                    mapCliecked(e, f, 'polygon');
                                    navigate(`/field/map/${f.id}/info`)
                                }
                            }}
                            //     fillOpacity={opacity}
                            positions={f.geoPoints}>
                            {/* // {index < MAX_PER_MAP && <MapTooltip textArr={textArr}>  </MapTooltip>}
                            // <Popup className={LEAFLET_POPUP_CLASS}>
                            //     <FieldCard
                            //         dir={dir}
                            //         domain={domain}
                            //         crops={crops} yearFilter={yearFilter}
                            //         text={text} history={history}
                            //         areaUnit={areaUnit}
                            //         caller={MAP}
                            //         user={user}
                            //         documentor={documentor}
                            //         className={classes.popup} />
                            // </Popup> */}

                        </Polygon>
                    )}

                    {/* {displayFields.map(f =>

<Circle eventHandlers={{
                                click: (e) => {
                                    mapCliecked(e, f, 'circle');
                                    //navigate(`/field/map/${f.id}/info`)
                                }
                            }}key={f.id} center={[f.lat, f.lng]} radius={20} pathOptions={{ color: 'blue' }} />



                    )} */}
                    <HandleMapEvents />
                </MapContainer>

            </Box>
            {fields && <FieldsFilter fields={fields} />}
            {/* <ScoutDialog open={activityType === SCOUT} /> */}
        </Box>
    )
}
export default FieldsMap;





