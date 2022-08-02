import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom';
import { TopBackBar, TextField } from "../../../components";
import { asShortStringDate } from "../../../utils/DateUtil";
import SatelliteImageryView from './SatelliteImageryView';
import { Typography, MenuItem } from '@mui/material'
import { height120, height260 } from "../../../utils/TabUtils";
import { BORDER_COLOR, SECOND_TOP_LINE } from "../../../App";
import NdviHistory from '../NdviHistory';

const useStyles = makeStyles(theme => ({
    root: {

        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    icon: {
        color: theme.palette.primary
    },
    paper: {
        margin: theme.spacing(1),
        height: height120,
        display: 'flex', flex: 1
    },

    title: {
        display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
        backgroundColor: SECOND_TOP_LINE,
        borderBottom: '1px solid ' + BORDER_COLOR,
    }
}));

const SatelliteImagery = (props) => {
    const classes = useStyles();

    const { match: { params: { domainId, imageryId } }, agromonitoringSearchPolygon,
        getDomain, selectDomain, getNdviHistory, ndviHistory,
        dir, text, history, agromonitoringImagerySearch, selectedDomain,
        areaUnit, user, googleMapKey, bingMapKey
    } = props;
    const serviceKey = user.business.openweathermapApiKey;

    const [view1, setView1] = useState(0);
    const [view2, setView2] = useState(0);
    const [view1Type, setView1Type] = useState('ndvi');
    const [view2Type, setView2Type] = useState('ndvi');

    const [view1paletteid, setView1paletteid] = useState(3);
    const [view2paletteid, setView2paletteid] = useState(3);
    const [graph, setGraph] = useState(true);
    const [sat, setSat] = useState('s2');

    useEffect(() => {
        getDomain(domainId);
        agromonitoringSearchPolygon(imageryId, serviceKey)

        return () => {
            console.log('will unmount');
            selectDomain(null);
        }
    }, []);

    useEffect(() => {
        agromonitoringSearchPolygon(imageryId, serviceKey, sat)
    }, [sat]);


    const show = selectedDomain && selectedDomain.polygon;

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <TopBackBar dir={dir} label={`${text.back}`} history={history} />
                {show && <div className={classes.title}>
                    <Typography variant={'h6'} color="textSecondary">
                        {`${selectedDomain.field.name} ${selectedDomain.alias ? " (" + selectedDomain.alias + ")" : ""}`}
                    </Typography>
                    <Typography variant={'h6'}>
                        {selectedDomain.variety.category}, {selectedDomain.variety.name}
                    </Typography>
                    <Typography variant={'h6'} color="textSecondary">
                        {selectedDomain.plantArea + ' ' + text[areaUnit] + ', ' + asShortStringDate(selectedDomain.plant)}
                    </Typography>
                    <TextField
                        select
                        width={80}
                        value={sat}
                        onChange={(e) => setSat(e.target.value)}
                    >
                        <MenuItem value={'s2'}>
                            S2
                        </MenuItem>
                        <MenuItem value={'l8'}>
                            L8
                        </MenuItem>
                    </TextField>
                </div>}
            </div>
            <div className={classes.paper}>
                {show && <div style={{ display: 'flex', flex: 1 }}>
                    <SatelliteImageryView value={view1}
                        viewType={view1Type}
                        height={height260}
                        onChange={setView1}
                        onChangeViewType={setView1Type}
                        onChangePaletteId={setView1paletteid}
                        text={text}
                        agromonitoringImagerySearch={agromonitoringImagerySearch}
                        domain={selectedDomain}
                        paletteid={view1paletteid}
                        user={user}
                        googleMapKey={googleMapKey}
                        bingMapKey={bingMapKey}
                        dir={dir}
                    />

                    {!graph && <SatelliteImageryView value={view2}
                        viewType={view2Type}
                        height={height260}
                        onChangeViewType={setView2Type}
                        onChange={setView2}
                        onChangePaletteId={setView2paletteid}
                        text={text}
                        agromonitoringImagerySearch={agromonitoringImagerySearch}
                        domain={selectedDomain}
                        paletteid={view2paletteid}
                        user={user}
                        googleMapKey={googleMapKey}
                        bingMapKey={bingMapKey}
                        switchView={() => setGraph(!graph)}
                        dir={dir}
                    />}

                    {graph && <NdviHistory
                        type={sat}
                        switchView={() => setGraph(!graph)}
                        ndviHistory={ndviHistory} getNdviHistory={getNdviHistory} serviceKey={serviceKey} imageryId={imageryId} text={text} />
                    }

                </div>
                }
            </div>
        </div>
    )
}

export default withRouter(SatelliteImagery);
