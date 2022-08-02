import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { asShortStringDate } from "../../../utils/DateUtil";
import { TextField } from '../../../components';
import { MenuItem, IconButton } from '@mui/material'
import CloudOutlined from '@mui/icons-material/CloudOutlined'
import Cloud from '@mui/icons-material/Cloud'
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined'
import { MapContainer as Map, Polygon, TileLayer, } from 'react-leaflet';
import { Add, Remove } from '@mui/icons-material';
import { DEFAULT_CENTER, DEFAULT_ZOOM, SATELLITE } from "../../maps/config";
import Timeline from '@mui/icons-material/Timeline';
import ColorPalette from '../ColorPalette';
import { renderNdviPaletteIds } from '../../../modules/overview/map/FieldsMapUtil';
import SatelliteMapProvider from '../../maps/SatelliteMapProvider';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flex: 1, flexDirection: 'column',
        margin: theme.spacing(1),
    },
    icon: {
        margin: 0,
        padding: 0,
        height: 19,
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
    },
    row: {
        margin: theme.spacing(1),
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    },

    iconButton: {
        padding: theme.spacing(0.5),
    }
}));


const SatelliteImageryView = (props) => {
    const classes = useStyles();

    const { agromonitoringImagerySearch, value, onChange, text, domain, viewType,
        onChangeViewType, onChangePaletteId, paletteid, switchView, user: { mapProvider }, googleMapKey, bingMapKey } = props;

    const polygon = JSON.parse(props.domain.polygon);
    const zoom = domain.zoom ? domain.zoom : DEFAULT_ZOOM;
    const color = domain.variety.description;
    const height = props.height ? props.height : 430

    const center = domain.lat && domain.lng ? [domain.lat, domain.lng] : DEFAULT_CENTER;

    const [showTile, setShowTile] = useState(true)


    useEffect(() => {
        setShowTile(false)
    }, [value, viewType, paletteid]);

    useEffect(() => {
        if (!showTile) {
            setShowTile(true)
        }
    }, [showTile]);

    const satelliteData = agromonitoringImagerySearch[value];

    let tile = null;
    // let image = null;
    if (showTile && satelliteData && satelliteData.tile && satelliteData.tile[viewType]) {
        tile = satelliteData.tile[viewType].replace("http:", "https:") + '&paletteid=' + paletteid;
    }
    // if (satelliteData && satelliteData.image && satelliteData.image[viewType]) {
    //     image = satelliteData.image[viewType].replace("http:", "https:") + '&paletteid=' + paletteid;
    // }

    return (
        <div className={classes.root}>
            <div className={classes.row}>

                <div>
                    <TextField
                        select
                        width={200}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>{text.selectObservation}</em>
                        </MenuItem>
                        {agromonitoringImagerySearch.map((e, index, arr) =>
                            <MenuItem key={index} value={index}>
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        {asShortStringDate(new Date(e.dt * 1000))}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <div>
                                            {e.cl.toFixed(0)}%
                                        </div>
                                        {(e.cl <= 10) && <WbSunnyOutlined className={classes.icon} color='secondary' />}
                                        {(e.cl > 10) && (e.cl <= 30) &&
                                            <CloudOutlined className={classes.icon} color='secondary' />}
                                        {(e.cl > 30) && <Cloud className={classes.icon} color='secondary' />}
                                    </div>
                                </div>
                            </MenuItem>
                        )}
                    </TextField>
                    <IconButton onClick={() => onChange(value + 1)} >
                        <Remove />
                    </IconButton>
                    <IconButton disabled={!value || value <= 0} onClick={() => onChange(value - 1)}>
                        <Add />
                    </IconButton>
                </div>
                <div>
                    {renderNdviPaletteIds(paletteid, onChangePaletteId)}
                </div>
                <div>
                    <TextField
                        select
                        width={160}
                        value={viewType}
                        onChange={(e) => onChangeViewType(e.target.value)}
                    >
                        <MenuItem value={'ndvi'}>
                            NDVI
                        </MenuItem>
                        <MenuItem value={'evi'}>
                            EVI
                        </MenuItem>
                        <MenuItem value={'evi2'}>
                            EVI 2
                        </MenuItem>
                        <MenuItem value={'falsecolor'}>
                            False Color
                        </MenuItem>
                        <MenuItem value={'truecolor'}>
                            True Color
                        </MenuItem>
                        <MenuItem value={'nri'}>
                            NRI
                        </MenuItem>
                        <MenuItem value={'dswi'}>
                            DSWI
                        </MenuItem>
                        <MenuItem value={'ndwi'}>
                            NDWI
                        </MenuItem>
                    </TextField>
                    {switchView &&

                        <IconButton onClick={switchView}>
                            <Timeline />
                        </IconButton>
                    }
                </div>
            </div>
            <div className={classes.row}>
                <div dir='ltr' style={{ height: height, width: '100%' }}>
                    {googleMapKey && <Map style={{ height: height, width: '100%' }} dragging={true} center={center} zoom={zoom}
                        zoomControl={true}
                    >
                        <SatelliteMapProvider mapPovider={mapProvider} googleMapKey={googleMapKey} bingMapKey={bingMapKey} />
                        {polygon && <Polygon color={color} fillOpacity={0} positions={polygon} />}
                        {tile && <TileLayer
                            attribution='Farm Manager'
                            url={tile}
                            bounds={polygon}
                        />}
                    </Map>}
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', paddingTop: 3 }}>
                        <ColorPalette type={paletteid} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SatelliteImageryView;



