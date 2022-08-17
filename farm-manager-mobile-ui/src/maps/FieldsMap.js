import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '@mui/icons-material/Map';

import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Circle, Polygon } from "react-leaflet";
import { useEffect, useState } from "react";
import GeoLocation from "./GeoLocation";
import { selectAllFields, selectFieldIds, selectFieldssResult, useGetFieldsByYearQuery, useGetFieldsQuery } from "../features/fields/fieldsApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";



const position = [51.505, -0.09]

const FieldsMap = (props) => {
    const [value, setValue] = useState(0);
    const [map, setSetMap] = useState(0);

    const { fields } = props;

    const user = useSelector(selectUser)

    // useEffect(() => {
    //     if(map && user){
    //         map.setView([user.lng, user.lat], user.zoom);
    //     }
    // }, [user])



    return (
        <Box>
            <div id="map" dir='ltr' >

                <MapContainer style={{ height: window.screen.height - 280, width: '100%' }} center={[user.lng, user.lat]} zoom={user.zoom} scrollWheelZoom={false}
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
                                      console.log("marker clicked " + f.id);
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
            </div>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Map" icon={<Map />} />
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Archive" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </Box>
    )
}
export default FieldsMap;





