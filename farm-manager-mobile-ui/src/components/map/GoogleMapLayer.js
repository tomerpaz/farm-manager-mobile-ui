import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';

export const HYBRID = 'hybrid';

const GoogleMapLayer = () => {

    const { data: user,isSuccess } = useGetUserDataQuery();
    if (isSuccess && user) {
        return (
            <ReactLeafletGoogleLayer apiKey={user.googleMapKey} type={HYBRID} />
        )
    }
    else return <></>

}
export default GoogleMapLayer;