import { TileLayer } from 'react-leaflet';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
//import BingTileLayer from './BingMapLayer';
//import { AERIAL_WITH_LABELS, HYBRID } from './config';
import GoogleMapLayer from './GoogleMapLayer';

export const ESRI = 'esri'
export const GOOGLE = 'google'
export const OSM = 'osm'
export const THUNDERFOREST = 'thunderforest'
export const BING = 'bing';

const SatelliteMapProvider = () => {


    const { data: user, isSuccess } = useGetUserDataQuery();
    if (isSuccess && user) {
        if (user.mapProvider === GOOGLE) {
            return (
                <GoogleMapLayer />
            )
        } else {
            return <TileLayer
                attribution='Farm Manager'
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                maxZoom={18}
            />
        }
    }
    else return <></>


    // if (mapPovider === BING) {
    //     return <BingTileLayer
    //         bingMapsKey={bingMapKey}
    //         imagerySet={AERIAL_WITH_LABELS}

    //     />
    // } else if (mapPovider === ESRI) {
    //     return <TileLayer
    //         attribution='&amp;copy <a href="http://www.esri.com/">Esri</a>'
    //         url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    //         maxZoom={18}
    //     />
    // }
    // else if (mapPovider === OSM) {
    //     return <TileLayer
    //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    // }
    // else if (mapPovider === THUNDERFOREST) {
    //     return <TileLayer
    //         url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=368ab92571ef44fb86cb37eb4f7df2c9"
    //     />
    // }
    // else {
    //     return <GoogleMapLayer mapApiKey={googleMapKey} type={HYBRID} />
    // }
}
export default SatelliteMapProvider;



