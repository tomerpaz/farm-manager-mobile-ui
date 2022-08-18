import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useState } from "react";
import GeoLocation from "../../../components/GeoLocation";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { selectFields } from "../../../features/fields/fieldSlice";
import { Box } from "@mui/material";


const FieldsMap = (props) => {
    const [map, setSetMap] = useState(0);

    const fields = useSelector(selectFields);

    const user = useSelector(selectUser)

    let navigate = useNavigate();

    const height = window.window.innerHeight - 110;

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'column'} justifyContent={'space-between'}>

            <Box flex={1} style={{ height: '100%' }} id="map" dir='ltr' >
                <MapContainer style={{ height: height, width: '100%' }} center={[user.lng, user.lat]} zoom={user.zoom} scrollWheelZoom={false}
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
                    {fields.filter(f => f.polygon).map(f =>
                        <Polygon field={f} key={f.id}
                            color={f.color}
                            fillColor={f.color}
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
                </MapContainer>
            </Box>
        </Box>
    )
}
export default FieldsMap;





