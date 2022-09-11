import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import GeoLocation from "../../../components/GeoLocation";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useFields } from "../../../features/fields/fieldsApiSlice";
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { selectCurrentYear, selectFieldBaseFieldFilter, selectFieldFreeTextFilter, selectFieldSiteFilter, selectFieldsViewStatus } from "../../../features/app/appSlice";
import { useSelector } from "react-redux";
import FieldsFilter from "../../../components/filters/FieldsFilter";
import { filterFields, getFillColor, getOpacity, isArrayEmpty } from "../../FarmUtil";




const FieldsMap = (props) => {
    const [map, setSetMap] = useState(0);

    const { data: user } = useGetUserDataQuery()
    const year = useSelector(selectCurrentYear);

    const fields = useFields(year).filter(f => f.polygon);
    const freeText = useSelector(selectFieldFreeTextFilter);
    const fieldSiteFilter = useSelector(selectFieldSiteFilter)
    const fieldBaseFieldFilter = useSelector(selectFieldBaseFieldFilter)
    const fieldsViewStatus = useSelector(selectFieldsViewStatus)

    const [center, setCenter] = useState([user.lat, user.lng]);
    const [zoom, setZoom] = useState(user.zoom);

    const displayFields = filterFields(fields, freeText, fieldSiteFilter, fieldBaseFieldFilter, fieldsViewStatus);


    function HandleMapEvents(e) {
        const m = useMapEvents({
            zoomend: () => {
                setZoom(m.getZoom())
            },
            // dragend: (e) => {
            //     setCenter(e.target.getCenter())
            // },
            // click: (e) => {
            //     change('lng', e.latlng.lng.toFixed(5));
            //     change('lat', e.latlng.lat.toFixed(5));
            // }
        })
        return <div></div>
    }

    useEffect(() => {
        const c = (fields.length === displayFields.length) || isArrayEmpty(displayFields) ? [user.lat, user.lng] : [displayFields[0].lat, displayFields[0].lng];
        setCenter(c);
    }, [freeText, fieldSiteFilter, fieldBaseFieldFilter])


    useEffect(() => {
        console.log('center changed')
        if (map && center) {
            map.setView(center, zoom);
        }

    }, [center])

    let navigate = useNavigate();

    const height = window.window.innerHeight - 110;


    console.log('center', center);

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'column'} justifyContent={'space-between'}>

            <Box flex={1} style={{ height: '100%' }} id="map" dir='ltr' >
                <MapContainer style={{ height: height, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={false}
                    ref={setSetMap}
                >
                    <TileLayer
                        attribution='Farm Manager'
                        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        maxZoom={18}
                    />
                    {/* <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker> */}
                    <GeoLocation />
                    {displayFields.map(f =>
                        <Polygon field={f} key={f.id}
                            color={f.color}
                            fillColor={getFillColor(f)}
                            fillOpacity={getOpacity(f)}
                            eventHandlers={{
                                click: () => {
                                    navigate(`/field/map/${f.id}/info`)
                                }
                            }}
                            //     fillOpacity={opacity}
                            positions={f.polygon}>
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
                    <HandleMapEvents />
                </MapContainer>

            </Box>
            {fields && <FieldsFilter fields={fields} />}
        </Box>
    )
}
export default FieldsMap;





