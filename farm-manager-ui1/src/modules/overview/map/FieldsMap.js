import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Drawer, Divider, List, ListItem, ListItemText, Checkbox, IconButton, ListSubheader } from '@mui/material';
import { Settings, Close, ControlCamera as SetMapCenter } from '@mui/icons-material';

import { sumBy } from 'lodash';

import {
    FeatureGroup, MapContainer, Polygon, Popup, TileLayer, CircleMarker, ScaleControl,
} from 'react-leaflet';

import { AERIAL_WITH_LABELS, HYBRID, LEAFLET_POPUP_CLASS } from '../../../components/maps/config'

import Satellite from '../../../icons/Satellite';

import GeoLocation from '../../../components/maps/controls/GeoLocation';
import GeoSearch from '../../../components/maps/controls/GeoSearch';
import { filterDomains, filterDomainsFreeText, filterDomainsByStatus, isArrayEmpty } from "../../../components/filters/filterUtil";
import { bodyHeight, height170 } from "../../../utils/TabUtils";
import DomainViewTop from '../DomainViewTop'
import FieldCard from './FieldCard';
import ActivityrCard from './ActivityCard';
import Fullscreen from 'react-leaflet-fullscreen-plugin';

import { DOMAIN, END, MAP } from "../../../components/frame/Routes";


import { drawerTitle, drawerFab } from '../../../utils/StyleUtils';
import { isEmpty } from '../../../utils/StringUtil';
import { loadDataByName } from '../../../utils/LoadUtil';
import { safeParseJson } from '../../../utils/FieldUtil';
import Iframe from 'react-iframe';
import PestMonitorCard, { getPestMonitorInfectionLevelColor } from './PestMonitorCard';
import { getStart } from '../../../utils';
import { filterPestMonitor, filterActivities } from './FieldsMapUtil';
import InfoSnackBar from '../../../components/core/util/InfoSnackBar';
import { numberFormatter } from '../../../utils/NunberUtil';
import GoogleMapLayer from '../../../components/maps/GoogleMapLayer';
import MapTooltip, { MAX_PER_MAP } from './MapTooltip';
import { SettingsFab } from '../../../components';
import { BING, ESRI, GOOGLE, OSM, THUNDERFOREST } from '../../../components/maps/SatelliteMapProvider';
import BingTileLayer from '../../../components/maps/BingMapLayer';
import { Loading, OutlinedButton } from '../../../components/core';
import FullscreenControl from '../../../components/maps/controls/FullscreenControl';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        flexDirection: 'column'
    },
    popup: {
        margin: 0,
        padding: 0,
    },
    tooltip: {
        margin: 0,
        padding: 0,
        paddingLeft: theme.spacing(0.25),
        paddingRight: theme.spacing(0.25),

    },
    fab: drawerFab(theme),
    columns: drawerTitle(theme),
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0,
        },
    },
}));

function getMapCenter(domains, defaultCenter) {
    if (domains && domains.length > 0) {
        const fistPolygon = domains.filter(e => !isEmpty(e.polygon) && e.lat && e.lng).find(e => true);
        if (!isEmpty(fistPolygon)) {
            return [fistPolygon.lat, fistPolygon.lng];
        }

    }
    return defaultCenter;
}

function filterDisplayRows(domains, fieldFilter, domainStatusFilter, fieldFreeText) {
    let displayRows = filterDomainsByStatus(filterDomains(domains, fieldFilter), domainStatusFilter);

    if (!isEmpty(fieldFreeText)) {
        displayRows = filterDomainsFreeText(displayRows, fieldFreeText)
    }
    return displayRows;
}

const FieldsMap = (props) => {
    const classes = useStyles();

    const { domains, getDomainsByYear, yearFilter, user, reloadDomains, setYearFilter, setUserMapCenter,
        showFieldNames, showNdvi, showCropNames, history,
        text, fieldFilter, setFieldFilter, domainFilterOption,
        crops, viewSize, viewSizeOptions, setDomainViewSize, areaUnit,
        setFieldFilterFreeText, fieldFreeText, mapApiKey,
        toggleFieldLayer, setMapBaseLayer, mapBaseLayer, domainStatusFilter, setDomainStatusFilter,
        agromonitoringSearchPolygons, fields, polygonsHistory, imageryDate, changeImageryDate, paletteid,
        changeNdviPalette,
        showWind,
        showRainRadar,
        showGovmap,
        showPests,
        pestsGeoJson, getPestGeoJson,
        mapRefDate, mapTimeRange, mapInfectionLevel, mapPests,
        showWaypoints, waypointsGeoJson, getWaypointsGeoJson,
        mapActivities,
        setMapRefDate, setMapInfectionLevel, setMapTimeRange, setMapPests, setMapActivities,
        isInspector, growerOptions, user: { manageDomains, }, googleMapKey, bingMapKey,
        ventusky, documentor, dir,
    } = props;

   // const viewType = 'ndvi'

    const serviceKey = user.business.openweathermapApiKey;
    const country = user.business.country;

    const [map, setMap] = useState(null)

    const [showTile, setShowTile] = useState(true)


    const [lng, setLng] = useState(user.lng);
    const [lat, setLat] = useState(user.lat);

    const [center, setCenter] = useState([user.lng, user.lat]);

    const [zoom, setZoom] = useState(user.zoom);
    const [openMapSettings, setOpenMapSettings] = useState(false);

    const [rerenderMap, setRerenderMap] = useState(false);

    const [selectedPoint, setSelectedPoint] = useState(null)

    const [showMap, setShowMap] = useState(false)

    const [displayRows, setDisplayRows] = useState(filterDisplayRows(domains, fieldFilter, domainStatusFilter, fieldFreeText));

    const [showTotalArea, setShowTotalArea] = useState(true);


    const [imageryType, setImageryType] = useState('ndvi')


    useEffect(() => {
        if (domains.length === 0 || reloadDomains) {
            getDomainsByYear(yearFilter);
        }
        loadDataByName(props, ['fields']);
        setShowMap(true);
    }, [])

    useEffect(() => {
        setRerenderMap(true);
        if (showNdvi && polygonsHistory.length === 0 && !isEmpty(serviceKey)) {
            const imageryIds = fields.filter(e => e.imageryId !== null).map(e => e.imageryId);
            agromonitoringSearchPolygons(imageryIds, serviceKey, 's2');
        }
    }, [showNdvi])

    useEffect(() => {
        setShowTile(false);
    }, [imageryDate, imageryType, paletteid])

    useEffect(() => {
        setShowTile(true);
    }, [showTile])

    useEffect(() => {
        if (isArrayEmpty(fieldFilter, true) && isEmpty(fieldFreeText)) {
            setCenter([lng, lat]);
        } else {
            setCenter(getMapCenter(displayRows, [lng, lat]));
        }
    }, [displayRows])

    useEffect(() => {
        setDisplayRows(filterDisplayRows(domains, fieldFilter, domainStatusFilter, fieldFreeText));
    }, [domains, fieldFilter, domainStatusFilter, fieldFreeText])

    useEffect(() => {
        if (map && center && zoom) {
            map.setView(center, zoom);
        }
    }, [center])

    useEffect(() => {
        if (selectedPoint) {
            setCenter([selectedPoint.lat, selectedPoint.longitude])
        } else {
            setCenter([lng, lat])
        }
    }, [selectedPoint])

    useEffect(() => {
        setRerenderMap(true);
        if (showPests == true) {
            getPestGeoJson(getStart(mapRefDate, mapTimeRange), mapRefDate);
        }
    }, [showPests, mapRefDate, mapTimeRange])

    useEffect(() => {
        setRerenderMap(true);
        if (showWaypoints === true) {
            getWaypointsGeoJson(getStart(mapRefDate, mapTimeRange), mapRefDate);
        }
    }, [showWaypoints, mapRefDate, mapTimeRange])


    useEffect(() => {
        setRerenderMap(true);
    }, [mapRefDate, mapTimeRange])

    useEffect(() => {
        setRerenderMap(false);
    }, [rerenderMap])

    function setMapCenter() {
        if (map) {
            const latLng = map.getCenter();
            setUserMapCenter(map.getZoom(), latLng.lat, latLng.lng)
        }
    }

    function onYearFilterChange(year) {
        setYearFilter(year);
        getDomainsByYear(year);
    }

    function renderPolygons(displayRows) {
        const planted = displayRows.filter(e => !e.root);
        const rooted = displayRows.filter(e => e.root);

        return (
            <div>
                {rooted.concat(planted).map((domain, index) => (
                    renderPolygon(domain, index)
                ))}
            </div>
        )
    }

    function renderPest(p, index) {
        const geoJson = safeParseJson(p.geoJson);
        if (geoJson) {
            return geoJson.features.map((f, i2) => {
                const key = f.geometry.coordinates[1] + f.geometry.coordinates[0] + 'i' + index + 'i2' + i2;
                const c = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
                return <CircleMarker key={key} radius={8}
                    color={getPestMonitorInfectionLevelColor(p.pestMonitors, true)}
                    weight={2}
                    fillColor={getPestMonitorInfectionLevelColor(p.pestMonitors)}
                    fillOpacity={1}
                    center={c}
                >
                    {p && <Popup dir={dir} className={LEAFLET_POPUP_CLASS}>
                        <PestMonitorCard
                            pestMonitor={p}
                            waypoint={f}
                            text={text} history={history}
                            areaUnit={areaUnit}
                            caller={MAP}
                            user={user}
                            className={classes.popup}
                        />
                    </Popup>}
                </CircleMarker>
            });
        }
    }

    function renderPests() {
        if (showPests && pestsGeoJson) {
            return (
                <div>
                    {filterPestMonitor(mapInfectionLevel, mapPests, pestsGeoJson).map((e, index) => (
                        renderPest(e, index)
                    ))}
                </div>
            )
        }
    }

    function renderWaypoint(p, index) {
        const geoJson = safeParseJson(p.geoJson);
        if (geoJson) {
            return geoJson.features.map((f, i2) => {
                const key = f.geometry.coordinates[1] + f.geometry.coordinates[0] + 'i' + index + 'i2' + i2;
                const c = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
                return <CircleMarker key={key} radius={8}
                    colot={'blue'}
                    weight={2}
                    fillColor={'blue'}
                    fillOpacity={1}
                    center={c}
                >
                    <Popup className={LEAFLET_POPUP_CLASS}>
                        <ActivityrCard
                            activity={p}
                            waypoint={f}
                            text={text} history={history}
                            areaUnit={areaUnit}
                            caller={MAP}
                            user={user}
                            className={classes.popup}
                        />
                    </Popup>
                </CircleMarker>

            });
        }
    }

    function renderWaypoints() {
        if (showWaypoints && waypointsGeoJson) {
            return (
                <div>
                    {filterActivities(mapActivities, waypointsGeoJson).map((e, index) => (
                        renderWaypoint(e, index)
                    ))}
                </div>
            )
        }
    }

    function getOpacity(domain) {
        if (showNdvi) {
            return 0;
        } else if (domain.root) {
            return 1;
        } else {
            return 0.3;
        }
    }
    function getFillColor(domain) {
        if (domain.root) {
            return '#FFFFFF';
        } else {
            return domain.variety.description;
        }
    }

    function renderPolygon(domain, index) {
        if (domain.polygon) {
            try {
                let poly = JSON.parse(domain.polygon);
                if (poly !== null) {
                    const textArr = [];
                    if (showFieldNames) {
                        textArr.push(domain.field.name);
                        if (domain.field.officialFieldId) {
                            textArr.push(domain.field.officialFieldId);
                        }
                    }
                    if (showCropNames) {
                        textArr.push(`${domain.variety.category}/${domain.variety.name}`);
                    }
                    //#9E9E9E
                    var opacity = getOpacity(domain)
                    return (
                        <Polygon domain={domain} key={domain.id}
                            color={domain.variety.description}
                            fillColor={getFillColor(domain)}
                            fillOpacity={opacity}
                            positions={poly}>
                            {index < MAX_PER_MAP && <MapTooltip textArr={textArr}>  </MapTooltip>}
                            <Popup className={LEAFLET_POPUP_CLASS}>
                                <FieldCard
                                    dir={dir}
                                    domain={domain}
                                    crops={crops} yearFilter={yearFilter}
                                    text={text} history={history}
                                    areaUnit={areaUnit}
                                    caller={MAP}
                                    user={user}
                                    documentor={documentor}
                                    className={classes.popup} />
                            </Popup>
                        </Polygon>
                    )
                }
            }
            catch (err) {
                console.log('unable to parse polygon:', domain.polygon)
            }
        }
    }

    let tiles = [];

    const hasFilter = !isEmpty(fieldFreeText) || fieldFilter && fieldFilter.length > 0 && fieldFilter[0] !== null;

    if (showTile && showNdvi && polygonsHistory.length > 0) {
        const dateData = polygonsHistory.find(e => e.dt === imageryDate);
        if (dateData && dateData.data) {
            let tilesData = dateData.data;

            if (hasFilter) {
                const imageryIds = displayRows.filter(e => !isEmpty(e.field.imageryId)).map(e => e.field.imageryId);
                tilesData = tilesData.filter(e => imageryIds.includes(e.imageryId));
            }
            tiles = tilesData.map(e => {

                const f = fields.find(fld => fld.imageryId === e.imageryId)
                const bounds = f && f.polygon ? safeParseJson(f.polygon) : null;

                let url = e.imagery.tile[imageryType];
                if (url.includes("http://")) {
                    url = url.replace("http://", "https://{s}.");
                } else {
                    url = url.replace("https://", "https://{s}.");
                }
                return {
                    url: url + '&paletteid=' + paletteid,
                    bounds: bounds
                }
            }).filter(e => !isEmpty(e.bounds));
        }
    }


    const FORM_URL = manageDomains ? `${DOMAIN}${MAP}/0` : null;
    const END_CROP_URL = manageDomains ? `${END}${MAP}` : null;


    let iframe = null;


    if (showWind || showRainRadar) {
        const overlay = showWind ? 'wind' : 'radar';
        const lat = center[0];
        const lon = center[1];

        iframe = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=${zoom}&level=surface&overlay=${overlay}&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${lat.toFixed(3)}&detailLon=${lon.toFixed(3)}&metricWind=default&metricTemp=default&radarRange=-1 frameborder="0"`

    }

    if (showGovmap) {
        const lat = center[0];
        const lon = center[1];
        iframe = `https://www.govmap.gov.il/map.html?bb=1&zb=1&in=1&c=${lon},${lat}&z=${(zoom - 8)}&b=2&lay=SUB_GUSH_ALL,AGRIPARCELS`

    }
    if (ventusky) {
        const lat = center[0];
        const lon = center[1];
        iframe = `https://www.ventusky.com/?p=${lat};${lon};7&l=temperature-2m`;
    }

    function renderFieldLayerToggle(layer, checked, label) {
        return (
            <ListItem role={undefined} dense button onClick={() => toggleFieldLayer(layer)}>
                <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                />
                <ListItemText primary={label} />
            </ListItem>
        )
    }

    function renderMapBaseLayerToggle(baseLayer, label) {
        return (
            <ListItem role={undefined} dense button onClick={() => setMapBaseLayer(baseLayer)}>
                <IconButton >
                    <Satellite />
                </IconButton>
                <ListItemText primary={label} />
            </ListItem>
        )
    }
    const totalArea = sumBy(displayRows, 'plantArea');

    const mapStyle = { zIndex: 1, height: height170+5, width: '100%', marginTop: 5 };


    if (!showMap) {
        return <Loading />
    }

    
    return (
        <div className={classes.root}>
            <DomainViewTop options={domainFilterOption} filter={fieldFilter} setFilter={setFieldFilter}
                label={text.typeToSearchField} actionUrl={FORM_URL} actionText={text.newField}
                dir={text.dir} yearFilter={yearFilter}
                setYearFilter={(year) => onYearFilterChange(year)}
                text={text}
                endCropUrl={END_CROP_URL}
                viewSize={viewSize}
                viewSizeOptions={viewSizeOptions}
                setDomainViewSize={setDomainViewSize}
                setFieldFilterFreeText={setFieldFilterFreeText}
                fieldFreeText={fieldFreeText}
                showFieldNames={showFieldNames} showCropNames={showCropNames}
                endSpace={60}
                domainStatusFilter={domainStatusFilter}
                setDomainStatusFilter={setDomainStatusFilter}
                showNdvi={showNdvi}
                imageryDate={imageryDate}
                imageryDates={polygonsHistory.map(e => e.dt)}
                changeImageryDate={changeImageryDate}
                changeNdviPalette={changeNdviPalette}
                paletteid={paletteid}
                showPests={showPests}
                pestsGeoJson={pestsGeoJson}
                mapRefDate={mapRefDate}
                mapInfectionLevel={mapInfectionLevel}
                mapTimeRange={mapTimeRange}
                setMapRefDate={setMapRefDate}
                setMapInfectionLevel={setMapInfectionLevel}
                setMapTimeRange={setMapTimeRange}
                setMapPests={setMapPests}
                mapPests={mapPests}
                polygonsHistory={polygonsHistory}
                showWaypoints={showWaypoints}
                mapActivities={mapActivities}
                setMapActivities={setMapActivities}
                waypointsGeoJson={waypointsGeoJson}
                isInspector={isInspector}
                growerOptions={growerOptions}
                imageryType={imageryType}
                setImageryType={setImageryType}

            />

            {iframe &&
                <Iframe width="100%" height={height170} src={iframe} frameborder="0"
                    scrolling='no' marginheight='0' marginwidth='0'
                    styles={{ border: "none" }}
                ></Iframe>
            }
            {!iframe &&
                <div  id={'map'} dir='ltr' style={{ style: 'flex', flex: 1 }}>

                    <MapContainer
                        onZoomEnd={(e) => setZoom(e.target._zoom)}
                        dir='ltr' style={mapStyle}
                        dragging={true}
                        center={center} zoom={zoom} zoomControl={true}
                        ref={setMap}
                    >
                        {mapBaseLayer === GOOGLE &&
                            <GoogleMapLayer mapApiKey={mapApiKey} type={HYBRID} />}
                        {mapBaseLayer === BING &&
                            <BingTileLayer
                                bingMapsKey={bingMapKey}
                                imagerySet={AERIAL_WITH_LABELS}

                            />}
                        {mapBaseLayer === OSM &&
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />}
                        {mapBaseLayer === THUNDERFOREST && <TileLayer
                            url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=368ab92571ef44fb86cb37eb4f7df2c9"
                        />}

                        {mapBaseLayer === ESRI && <TileLayer
                            attribution='&amp;copy <a href="http://www.esri.com/">Esri</a>'
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                            maxZoom={18}
                        />}

                        <FeatureGroup >
                            <GeoSearch position="topleft" retainZoomLevel={true} autoClose={true} inputPlaceholder={text.typeToSearch} />
                            <GeoLocation position="topleft" flyTo={false} icon="fa fa-dot-circle-o"
                                keepCurrentZoomLevel={true} />

                        </FeatureGroup>
                        <ScaleControl position="topright" />
                        <FullscreenControl  />
                        {!rerenderMap && renderPolygons(displayRows)}
                        {!rerenderMap && renderWaypoints()}
                        {!rerenderMap && renderPests()}
                        {tiles.map((e, index, arr) => <TileLayer key={index}
                            attribution='Farm Manager'
                            url={e.url}
                            bounds={e.bounds}
                        />)}

                    </MapContainer>
                </div>
            }
            <SettingsFab
                onClick={() => setOpenMapSettings(!openMapSettings)}
            >
                <Settings />
            </SettingsFab>

            <Drawer anchor="right"
                open={openMapSettings === true}
                onClose={() => setOpenMapSettings(false)}>
                <List className={classes.columns}
                    component="nav"
                    subheader={<ListSubheader component="div">
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography sx={{ margin: 1 }} variant='h6'>
                                {text.settings}
                            </Typography>
                            <OutlinedButton size='small'
                                onClick={() => setOpenMapSettings(false)}>
                                <Close />
                            </OutlinedButton>
                        </div>
                    </ListSubheader>}
                >
                    <Divider />
                    <ListItem role={undefined} dense button onClick={() => setMapCenter()}>
                        <IconButton aria-label="Comments">
                            <SetMapCenter />
                        </IconButton>
                        <ListItemText primary={text.setMapCenter} />
                    </ListItem>
                    <Divider />
                    {renderFieldLayerToggle('crop', showCropNames, text.crops)}
                    {renderFieldLayerToggle('field', showFieldNames, text.fields)}
                    {!isEmpty(serviceKey) &&
                        renderFieldLayerToggle('ndvi', showNdvi, 'NDVI')
                    }
                    {renderFieldLayerToggle('pest', showPests, text.pests)}
                    {renderFieldLayerToggle('waypoints', showWaypoints, text.waypoints)}

                    <Divider />
                    {country === 'israel' && renderFieldLayerToggle('govmap', showGovmap, 'GovMap')}

                    {renderFieldLayerToggle('ventusky', ventusky, 'Ventusky')}
                    {renderFieldLayerToggle('showRainRadar', showRainRadar, text.rainRadar)}
                    {renderFieldLayerToggle('showWind', showWind, text.wind)}
                    <Divider />
                    {renderMapBaseLayerToggle(GOOGLE, 'Google')}
                    {renderMapBaseLayerToggle(ESRI, 'Esri')}
                    {renderMapBaseLayerToggle(OSM, 'OSM')}
                    {renderMapBaseLayerToggle(THUNDERFOREST, 'Thunderforest')}
                    {renderMapBaseLayerToggle(BING, 'Bing')}

                    <Divider />
                </List>
            </Drawer>

            {!iframe && showTotalArea &&
                <InfoSnackBar
                    onAction={e => setShowTotalArea(false)}
                    open={(totalArea && totalArea > 0) ? true : false}
                    dir={dir}
                    message={`${numberFormatter(totalArea, 2)} ${text[areaUnit]}`}
                />}
        </div>
    );
}
export default FieldsMap;

