import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { formRowSpaceBetween } from '../../utils/FormStyle';
import { Button, TextField, TopBackBar, YesNoDialog } from '../../components';
import { buttonSecondary } from '../../utils/StyleUtils';
import { isEmpty } from '../../utils/StringUtil';
import { FormTitle, Loading } from '../../components/core';
import { CircleMarker, FeatureGroup, MapContainer } from "react-leaflet";
import { height300, height350 } from '../../utils';
import { IconButton, Typography, Tooltip, MenuItem } from '@mui/material';

import { isArrayEmpty } from '../../components/filters/filterUtil';
import MapTooltip from '../overview/map/MapTooltip';
import { LinkOffOutlined as Disconnect, Sync, } from '@mui/icons-material';
import Tractor from '../../icons/Tractor';
import { importTracks } from '../../actions';
import TextFieldBase from '../../components/core/textfield/TextFIeld';
import SatelliteMapProvider from '../../components/maps/SatelliteMapProvider';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        // margin: theme.spacing(1),
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    row: formRowSpaceBetween(theme),
    save: buttonSecondary(theme),

}));

export const WIALON_TITLE = 'Wialon'

export function isWialonAdmin(user) {
    return user.business.wialon && user.isAdmin;
}

const WialonSettings = (props) => {


    const { wialonSyncFields, wialonGetUnits, wialonGetToken, wialonSaveToken, wialonToken, wialonUnits, text, wialonDeleteToken,
        dir, history, user, wialonSynching, user: { mapProvider }, googleMapKey, bingMapKey } = props;

    const [newToken, setNewToken] = useState('')
    const [center, setCenter] = useState([user.lng, user.lat]);

    const [zoom, setZoom] = useState(13)
    const [rerenderMap, setRerenderMap] = useState(false)


    const [disconnect, setDisconnect] = useState(false)

    const [importing, setImporting] = useState(false)

    const [importDays, setImportDays] = useState(5)


    useEffect(() => {
        wialonGetToken();
    }, []);

    useEffect(() => {
        if (!isEmpty(wialonToken)) {
            wialonGetUnits();
        }
    }, [wialonToken])


    useEffect(() => {
        if (rerenderMap) {
            setRerenderMap(false);

        }
    }, [rerenderMap])


    const syncTracks = (e) => {

        setImporting(true);
        importTracks(importDays).then(response => {
            setImporting(false);

        }).catch((error) => {
            if (error) {
                console.log(error);
            }
        });

    }

    const onUnitClick = (e) => {
        if (e.pos && e.pos.x && e.pos.y) {
            setCenter([e.pos.y, e.pos.x])
            setRerenderMap(true);
        }

    }

    const handleDisconnect = (e) => {

        // wialonDeleteToken();
        console.log("handleDisconnect", e);
        if (e) {
            console.log("wialonDeleteToken");

            wialonDeleteToken();
        }
        setDisconnect(false);
    }


    const classes = useStyles();

    const iframe = 'https://hosting.wialon.com/login.html?duration=0&access_type=-1';

    const saveToken = () => {
        wialonSaveToken(newToken);
        setNewToken('');
    }


    if (wialonSynching || importing || rerenderMap) {
        return <Loading></Loading>
    }

    return (
        <div className={classes.root}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            <div className={classes.row}>
                <FormTitle title={"Wialon"} />
                {wialonToken &&
                    <div>
                        <Tooltip title="Disconnect Wialon">
                            <IconButton
                                onClick={() => setDisconnect(true)}
                                variant="outlined"
                            >
                                <Disconnect />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sync Fields">
                            <IconButton
                                onClick={() => wialonSyncFields()}
                                variant="outlined"
                            >
                                <Sync />
                            </IconButton>
                        </Tooltip>
                        <TextFieldBase
                            select
                            // style={{ width: 200 }}
                            value={importDays}
                            onChange={(e) => setImportDays(e.target.value)}
                            label={text.days}
                        >
                            {[1, 3, 5, 10, 15, 20, 60].map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                        </TextFieldBase>
                        <Tooltip title="Sync Tracks">
                            <IconButton
                                onClick={() => syncTracks()}
                                variant="outlined"
                            >
                                <Sync />
                            </IconButton>
                        </Tooltip>
                    </div>
                }
            </div>
            {!wialonToken && <div className={classes.row}>
                <TextField label={'Token'} placeholder={'Token'}
                    style={{ flex: 1 }}
                    value={newToken}
                    onChange={e => setNewToken(e.target.value)}
                ></TextField>
                <Button className={classes.save} disabled={isEmpty(newToken)} onClick={saveToken}>
                    {text.save}
                </Button>
                <Button href={iframe} target="_blank">
                    GENERATE TOKEN
                </Button>
            </div>}
            <div className={classes.row}>
                {wialonUnits.map((e, i, arr) => {
                    return (
                        <Typography key={i} onClick={() => onUnitClick(e)} variant="h6">{e.nm}</Typography>
                    )
                })}
                {!isArrayEmpty(wialonUnits) &&
                    <Tooltip title="Equipment">
                        <IconButton
                            onClick={() => history.push('/resources/equipment')}
                            variant="outlined"
                        >
                            <Tractor />
                        </IconButton>
                    </Tooltip>
                }
            </div>
            {/* <div className={classes.row}  style={{ height: height350 }}> */}
            {!isArrayEmpty(wialonUnits) &&

                <div dir='ltr' style={{ style: 'flex', flex: 1 }}>

                    <MapContainer
                        scrollWheelZoom={true}
                        style={{ height: height300 }}
                        dragging={true}
                        center={center} zoom={zoom} zoomControl={true}
                        dir='ltr'
                    >
                        <SatelliteMapProvider mapPovider={mapProvider} googleMapKey={googleMapKey} bingMapKey={bingMapKey} />
                        {wialonUnits.filter(e => e.pos).map((e, index, arr) =>
                            <CircleMarker key={index} radius={8} /*color={speedExceedColor}*/ /*fillColor={speedExceedColor}*/ fillOpacity={1}
                                center={[e.pos.y, e.pos.x]} >
                                <MapTooltip textArr={[e.nm]} large={true} />
                            </CircleMarker>
                        )}
                    </MapContainer>
                </div>
            }

            <YesNoDialog open={disconnect}
                action={handleDisconnect}
                title={'Disconnect Wialon'}
                body={''}
                yesText={text.yes}
                noText={text.no} />
        </div>
    )
}
export default WialonSettings;




/* <iframe class="login-form" style="border:none;height:600px;width:400px;" src='http://my.hosting.wialon.com/login.html?access_type=256&css_url=http://dinacheley.com/wialon/css/login2.css&redirect_uri=http://my.hosting.wialon.com/post_token.html'>
</iframe>*/