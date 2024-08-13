import React from 'react'
import { Box } from '@mui/material'
import { CircleMarker, MapContainer, Polygon, TileLayer, useMapEvents } from 'react-leaflet'
import SatelliteMapProvider from '../../components/map/SatelliteMapProvider'
import GeoLocation from '../../components/GeoLocation'

const FieldMap = ({ field, height, tile, setMap, onClick, points }) => {

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


    const hasPoints = Array.isArray(points);

    return (
        <Box flex={1} id="map" dir='ltr'>
            <MapContainer style={{ height: height, width: '100%' }} center={[field.lat, field.lng]} zoom={field.zoom} scrollWheelZoom={false}
                ref={setMap}
            >
                <SatelliteMapProvider />
                <GeoLocation />
                {tile && <TileLayer
                    attribution='Farm Manager'
                    url={tile}
                    bounds={field.geoPoints}
                />}
                <Polygon
                    eventHandlers={{
                        click: (e) => {
                            if (onClick) {
                                onClick(e, field, 'polygon');

                            }
                            // mapCliecked(e, f, 'polygon');
                            // navigate(`/field/map/${f.id}/info`)
                        }
                    }}
                    color={field.color}
                    fillColor={field.color}
                    positions={field.geoPoints}>
                </Polygon>
                {hasPoints && points.map(e =>
                //    <Circle center={[e.lat, e.lng]} radius={10}  />
                {
                    return (
                        <CircleMarker

                            eventHandlers={{
                                click: (event) => {
                                    if (onClick) {
                                        onClick(event, e, 'point');
                                    }
                                    // mapCliecked(e, f, 'polygon');
                                    // navigate(`/field/map/${f.id}/info`)
                                }
                            }}
                            key={e.id} radius={12}
                            color={e.color}
                            weight={4}
                            fillColor={e.fillColor}
                            fillOpacity={1}
                            center={[e.lat, e.lng]}
                        ></CircleMarker>
                    )
                }


                )}
                <HandleMapEvents />

            </MapContainer>
        </Box>
    )
}
export default FieldMap