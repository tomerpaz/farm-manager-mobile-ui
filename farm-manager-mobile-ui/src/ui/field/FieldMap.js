import React from 'react'
import { Box } from '@mui/material'
import { MapContainer, Polygon, TileLayer } from 'react-leaflet'

const FieldMap = ({ field, height, tile, setMap }) => {
    return (
        <Box flex={1} id="map" dir='ltr'>
            <MapContainer style={{ height: height, width: '100%' }} center={[field.lat, field.lng]} zoom={field.zoom} scrollWheelZoom={false}
                ref={setMap}
            >
                <TileLayer
                    attribution='Farm Manager'
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    maxZoom={18}
                />
                {tile && <TileLayer
                    attribution='Farm Manager'
                    url={tile}
                    bounds={field.polygon}
                />}
                <Polygon
                    color={field.color}
                    fillColor={field.color}
                    positions={field.polygon}>
                </Polygon>
            </MapContainer>
        </Box>
    )
}
export default FieldMap