import React from 'react'
import { Box } from '@mui/material'
import { MapContainer, Polygon, TileLayer, useMapEvents } from 'react-leaflet'
import SatelliteMapProvider from '../../components/map/SatelliteMapProvider'
import fi from 'date-fns/esm/locale/fi/index.js'

const FieldMap = ({ field, height, tile, setMap, onClick }) => {


    function HandleMapEvents(d) {
        const m = useMapEvents({

            click: (e) => {
                if (onClick) {
                    onClick(e, field, 'map');
                }
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
                <Polygon id={33}
                    eventHandlers={{
                        click: (e) => {
                            if (onClick) {
                                onClick(e, field, 'polygon');
                                e.originalEvent.view.L.DomEvent.stopPropagation(e)
                            }
                            // mapCliecked(e, f, 'polygon');
                            // navigate(`/field/map/${f.id}/info`)
                        }
                    }}
                    color={field.color}
                    fillColor={field.color}
                    positions={field.geoPoints}>
                </Polygon>
                <HandleMapEvents />

            </MapContainer>
        </Box>
    )
}
export default FieldMap