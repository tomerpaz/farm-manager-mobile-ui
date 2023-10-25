import React from 'react'
import { Box } from '@mui/material'
import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import SatelliteMapProvider from '../../components/map/SatelliteMapProvider'

const FieldMap = ({ field, height, tile, setMap }) => {
    return (
        <Box flex={1} id="map" dir='ltr'>
            <MapContainer style={{ height: height, width: '100%' }} center={[field.lat, field.lng]} zoom={field.zoom} scrollWheelZoom={false}
                ref={setMap}
            >
                <SatelliteMapProvider />
                {tile && <TileLayer
                    attribution='Farm Manager'
                    url={tile}
                    bounds={field.geoPoints}
                />}
                <Polygon
                    color={field.color}
                    fillColor={field.color}
                    positions={field.geoPoints}>
                </Polygon>
            </MapContainer>
        </Box>
    )
}
export default FieldMap