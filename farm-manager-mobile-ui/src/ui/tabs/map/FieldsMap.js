import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '@mui/icons-material/Map';

import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Circle, Polygon } from "react-leaflet";
import { useEffect, useState } from "react";
import GeoLocation from "../../../components/GeoLocation";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { selectFields } from "../../../features/fields/fieldSlice";


const FieldsMap = (props) => {
    const [map, setSetMap] = useState(0);

    const fields = useSelector(selectFields);

    const user = useSelector(selectUser)

    let navigate = useNavigate();

    // useEffect(() => {
    //     if(map && user){
    //         map.setView([user.lng, user.lat], user.zoom);
    //     }
    // }, [user])

    const height = window.window.innerHeight - 110;

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'column'} justifyContent={'space-between'}>
            
            <Box flex={1} style={{height: '100%'}} id="map" dir='ltr' >

                <MapContainer style={{ height: height, width: '100%' }} center={[user.lng, user.lat]} zoom={user.zoom} scrollWheelZoom={false}
                    ref={setSetMap}
                >


                    <TileLayer
                        // attribution='&amp;copy <a href="http://www.esri.com/">Esri</a>'
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
                                //  mouseover: highlightFeature,
                                  click: () => {
                                    navigate(`/field/map/${f.id}/info`)

                                    //   console.log("marker clicked " + f.id);
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





