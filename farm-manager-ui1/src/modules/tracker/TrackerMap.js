
import React, { useState, useEffect, } from 'react';

import {
    MapContainer, Polygon, ScaleControl, Polyline, useMapEvents
} from 'react-leaflet';
import { isArrayEmpty } from '../../components/filters/filterUtil';
import { height145 } from '../../utils';
import { ColoredPath } from './ColorPolyline';
import { Typography } from '@mui/material';
import MapTooltip from '../overview/map/MapTooltip';
import SatelliteMapProvider from '../../components/maps/SatelliteMapProvider';


export const SPEED_COLOR_1 = '#008800';
export const SPEED_COLOR_2 = '#ffff00';
export const SPEED_COLOR_3 = '#ff0000';


const palette = {
    0.0: SPEED_COLOR_1,
    0.5: SPEED_COLOR_2,
    1.0: SPEED_COLOR_3
}

const TrackerMap = ({ text, user, googleMapKey, bingMapKey, selectedTracks, domains,
    viewType, smoothFactor, minSpeed, maxSpeed, trackerActivity, user: { mapProvider }
}) => {

    const [zoom, setZoom] = useState(user.zoom);
    const [colorOffset, setColorOffset] = useState(0)

    const [center, setCenter] = useState([user.lng, user.lat]);
    const [firstSelectionId, setFirstSelectionId] = useState(null)

    const mapStyle = { zIndex: 1, height: height145, width: '100%', margin: 0 };

    function HandleMapEvents(e) {
        const m = useMapEvents({
            zoomend: () => {
                setZoom(m.getZoom())
            },
            dragend: (e) => {
                setCenter(e.target.getCenter())
            }
        })
        return <div></div>
    }

    const renderPolygons = (opacity) => {
        const ds = domains.filter(d => d.polygon);
        return ds.map(d => <Polygon domain={d} key={d.id}
            color={d.variety.description}
            fillOpacity={opacity ? opacity : 0.2}
            positions={JSON.parse(d.polygon)}>
            <MapTooltip textArr={[d.field.name]} />
        </Polygon>);
    }


    const renderSingleFragment = (f, track, color, index) => {
        const polylinePoints = track.points.filter(e => (e.fragment === f.index));
        if (!isArrayEmpty(polylinePoints) && polylinePoints.length > 4) {
            return <Polyline smoothFactor={smoothFactor} color={color} key={track.id + '' + f.startTime} positions={polylinePoints.map(e => [e.lat, e.lon, e.s])}></Polyline>
        }

    }
    const getColor = (index, id) => {

        if (trackerActivity) {
            const color = trackActivityColors[index % trackActivityColors.length];
            return color;
        } else {
            const color = trackColors[((id - colorOffset) % trackColors.length)];
            console.log(id, id - colorOffset, color, colorOffset);
            return color;
        }
    }

    const renderTrackFragment = (e, color, index) => {
        return e.fragments.map(f => renderSingleFragment(f, e, color, index))
    }

    const renderFragments = () => {
        return selectedTracks.map((e, index) => renderTrackFragment(e, getColor(index, e.id), index));
    }

    const renderByViewType = () => {
        return viewType === 0 ? renderFragments() : renderTracks();
    }


    const renderSingleTrack = (track, color) => {
        const polylinePoints = track.points;
        if (!isArrayEmpty(polylinePoints) && polylinePoints.length > 4) {
            return <Polyline smoothFactor={smoothFactor} color={color} key={track.id} positions={polylinePoints.map(e => [e.lat, e.lon])}></Polyline>
        }
    }

    const trackActivityColors = ['blue', 'red', 'orange', 'purple', 'yellow', 'white', 'green', 'aqua', 'pink', 'brown']

    const trackColors = ['blue', 'pink', 'brown', 'aqua', 'green', 'white', 'yellow', 'purple', 'orange', 'red']

    const renderTracks = () => {
        return selectedTracks.map((e, index) => renderSingleTrack(e, getColor(index, e.id)));
    }

    const [renderMap, setRenderMap] = useState(true)
    useEffect(() => {
        setRenderMap(false);
        if (!isArrayEmpty(selectedTracks)) {
            if (colorOffset === 0) {
                setColorOffset(selectedTracks[0].id % trackColors.length);
            }
            setFirstSelectionId(selectedTracks[0].id);
        } else {
            setColorOffset(0);
            setFirstSelectionId(null);
        }

    }, [selectedTracks]);

    useEffect(() => {
        console.log('firstSelectionId', firstSelectionId)
        if (firstSelectionId && !isArrayEmpty(selectedTracks)) {
            setCenter([selectedTracks[0].domain.lat, selectedTracks[0].domain.lng])

        }
    }, [firstSelectionId]);

    useEffect(() => {
        setRenderMap(false);
    }, [viewType]);


    useEffect(() => {
        setRenderMap(false);
    }, [smoothFactor]);

    useEffect(() => {
        if (renderMap === false) {
            setRenderMap(true);
        }
    }, [renderMap]);

    if (!googleMapKey || !renderMap) {

        return <div></div>
    }



    const RenderMap = () => {
        const isMultiOption = ![0, 1].includes(viewType);

        return (
            <div dir='ltr' style={{ style: 'flex', flex: 1 }}>

                <MapContainer
                    dir='ltr' style={mapStyle}
                    dragging={true}
                    center={center} zoom={zoom} zoomControl={true}
                >
                    <SatelliteMapProvider mapPovider={mapProvider} googleMapKey={googleMapKey} bingMapKey={bingMapKey} />
                    <ScaleControl position="topright" />
                    {renderPolygons(isMultiOption ? 0.1 : null)}
                    {isMultiOption &&
                        <ColoredPath palette={palette} smoothFactor={smoothFactor} min={minSpeed} max={maxSpeed} data={selectedTracks.map(e => e.points.map(e => [e.lat, e.lon, e.s]))}></ColoredPath>

                    }
                    {!isMultiOption &&
                        renderByViewType()
                    }

                    <HandleMapEvents />
                </MapContainer>
            </div>
        )
    }

    return (
        <div>
            {RenderMap()}
            <div style={{ direction: 'ltr', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', height: 30, backgroundImage: `linear-gradient(to right, ${SPEED_COLOR_1} ,  ${SPEED_COLOR_2} ,  ${SPEED_COLOR_3}` }}>
                <Typography style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>{minSpeed} Km/h</Typography>
                <Typography style={{ color: 'black', padding: 10, fontWeight: 'bold' }}>{(maxSpeed + minSpeed) / 2} Km/h</Typography>
                <Typography style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>{maxSpeed} Km/h</Typography>
            </div>

        </div>
    )
}
export default TrackerMap;



