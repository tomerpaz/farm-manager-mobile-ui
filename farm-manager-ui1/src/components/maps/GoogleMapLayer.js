import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

const GoogleMapLayer = ({mapApiKey, type}) => {

    return (
        <ReactLeafletGoogleLayer apiKey={mapApiKey}/* googleMapsLoaderConf={{version: 3.43}} */type={type}  />
    )
}
export default GoogleMapLayer;



