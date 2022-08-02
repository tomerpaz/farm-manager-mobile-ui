import React, { useState, useEffect } from 'react';
import { FeatureGroup, MapContainer, Polygon, ScaleControl } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { DEFAULT_CENTER, DEFAULT_COLOR, DEFAULT_ZOOM } from '../config'

import GeoLocation from '../controls/GeoLocation';
import GeoSearch from '../controls/GeoSearch';
import geojsonArea from 'geojson-area';
import { safeParse } from './JsonUtil';
import SatelliteMapProvider from '../SatelliteMapProvider';

const PolygonMapDraw = (props) => {

    const { text, polygons, googleMapKey, bingMapKey
        , onChange, deletePolygon, minHeight, user: { mapProvider } } = props;
    const [polygon, setPolygon] = useState(props.polygon ? safeParse(props.polygon) : null);
    const [dragging, setDragging] = useState(true)
    const [center, setCenter] = useState(props.center ? props.center : DEFAULT_CENTER)
    const [zoom, setZoom] = useState(props.zoom ? props.zoom : DEFAULT_ZOOM)
    const [color, setColor] = useState(props.color ? props.color : DEFAULT_COLOR)
    const [height, setHeight] = useState(props.height ? props.height : 280)


    const _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
        })
        console.log(`onDeleted: removed ${numDeleted} layers`, e);
        _onChange();
        if (props.onUpdateOrSave) {
            props.onUpdateOrSave(null, e.target, null)
        }
        setPolygon(null);
        setColor(props.color)
    }

    const _onMounted = (drawControl) => {
        //  console.log('_onMounted', drawControl);
    }

    const _onEditStart = (e) => {
        console.log('_onEditStart', e);
    }

    const _onEditStop = (e) => {
        console.log('_onEditStop', e);
    }

    const _onDeleteStart = (e) => {
        if (deletePolygon) {
            deletePolygon();
        }
        console.log('_onDeleteStart', e);
    }

    const _onDeleteStop = (e) => {
        console.log('_onDeleteStop', e);
    }

    const _onCreated = (e) => {
        let layer = e.layer;
        let geometry = layer.toGeoJSON().geometry;
        var area = geojsonArea.geometry(geometry);
        let coordinates = geometry.coordinates[0];
        onUpdateOrSave(coordinates, e.target, area)
    }

    const _onEdited = (e) => {
        let features = e.layers.toGeoJSON().features;
        if (features.length > 0) {
            let geometry = features[0].geometry;
            var area = geojsonArea.geometry(geometry);
            let coordinates = geometry.coordinates[0];
            onUpdateOrSave(coordinates, e.target, area);
        }
        _onChange();

    }

    const _onChange = (e) => {
        console.log('_onChange', e);
    }

    const onUpdateOrSave = (coordinates, target, area) => {
        let polygon = null;
        if (coordinates) {
            coordinates.pop()
            polygon = coordinates.map(function (item, index) {
                return [item[1], item[0]];
            })
            polygon = JSON.stringify(polygon);
        }
        if (area !== null && area > 0) {
            const ratio = props.areaUnit === 'hectare' ? 10000 : 1000;
            area = (area / ratio).toFixed(2)
        }
        if (props.onPolygonDraw) {
            props.onPolygonDraw(polygon, target.getZoom(), target.getCenter().lat, target.getCenter().lng, area);
        }
    }


    let parsed = [];
    if (polygons && polygons.length > 0) {
        polygons.forEach((p, index, arr) => {

            try {
                const singlePoly = JSON.parse(p);
                if (singlePoly) {
                    parsed.push(singlePoly);
                }
            } catch (err) {
                console.log('error parse polygon', p);
            }
        })

    }



    return (
        <div  dir='ltr' style={{ height: height, width: '100%' }}>
            <MapContainer style={{ height: height, minHeight: minHeight, width: '100%' }} dragging={true} center={center} zoom={zoom}
                zoomControl={true}>


                <SatelliteMapProvider mapPovider={mapProvider} googleMapKey={googleMapKey} bingMapKey={bingMapKey} />

                <ScaleControl position="topright" />

                {parsed && parsed.length > 0 && parsed.map((e, index, arr) => <Polygon key={index} positions={e} color="black" />)}

                <FeatureGroup /*ref={ (reactFGref) => {this._onFeatureGroupReady(reactFGref);} }*/>
                    <EditControl
                        position='topright'
                        onEdited={_onEdited}
                        onCreated={_onCreated}
                        onDeleted={_onDeleted}
                        onMounted={_onMounted}
                        onEditStart={_onEditStart}
                        onEditStop={_onEditStop}
                        onDeleteStart={_onDeleteStart}
                        onDeleteStop={_onDeleteStop}
                        edit={{
                            edit: polygon !== null,
                            remove: polygon !== null
                        }}
                        remove={{
                            remove: true
                        }}
                        draw={{
                            rectangle: false,
                            circle: false,
                            polyline: false,
                            marker: false,
                            polygon: polygon === null,
                            circlemarker: false
                        }}
                    />
                    <GeoSearch position="topleft" retainZoomLevel={true} autoClose={true}
                        inputPlaceholder={text.typeToSearch} />
                    <GeoLocation position="topleft" flyTo={false} icon="fa fa-dot-circle-o"
                        keepCurrentZoomLevel={true} />


                    {polygon && <Polygon color={color} positions={polygon} />}
                </FeatureGroup>
            </MapContainer>
        </div>
    );




}

// data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176

export default PolygonMapDraw