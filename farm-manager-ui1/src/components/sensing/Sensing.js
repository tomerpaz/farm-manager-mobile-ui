import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom';
import { TopBackBar } from "../../components";
import { asShortStringDate, subtractMonths, newDate, subtractDays, asShortStringDateTime } from "../../utils/DateUtil";
import Typography from '@mui/material/Typography'

import { height120, } from "../../utils/TabUtils";
import { BORDER_COLOR, SECOND_TOP_LINE } from "../../App";

import SoilData from './SoilData';
import Weather from './Weather';
import AccumulatedParameters from './AccumulatedParameters';
import SoilDataHistory from './SoilDataHistory';
import { getPolygonSoilHistory } from '../../actions';
import { convertKelvin } from '../../utils/FarmCalculator';

const useStyles = makeStyles(theme => ({
    root: {

        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    icon: {
        color: theme.palette.primary
    },
    paper: {
        margin: theme.spacing(1),
        height: height120,
    },

    title: {
        display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
        backgroundColor: SECOND_TOP_LINE,
        borderBottom: '1px solid ' + BORDER_COLOR,
    }
}));




const Sensing = (props) => {

    const classes = useStyles();

    const { match: { params: { domainId, imageryId } }, user,
        getDomain, selectedDomain, selectDomain, text, dir, history, areaUnit,
        getSenecingData, polygonSoilData, polygonWeather, polygonUvi, getPolygonAccumulatedData,
        polygonAccumulatedTemp, polygonAccumulatedPrecip } = props;
    const serviceKey = user.business.openweathermapApiKey;
    const end = newDate();
    const months = 12;
    const start = subtractMonths(newDate(), months);

    const tempUnit = 'celsius'

    const [data, setData] = useState([])


    useEffect(() => {
        selectDomain(null);
        getDomain(domainId);
        // getSenecingData(imageryId, serviceKey);
        // getPolygonAccumulatedData(imageryId, serviceKey, start, end);
        getPolygonSoilHistory(imageryId, serviceKey, subtractDays(end, 14), end).then(response => {
            const temp = response.data.map(e => {

                return {

                    dt: asShortStringDateTime(e.dt * 1000) ,
                    t0: convertKelvin(e.t0, tempUnit),
                    t10: convertKelvin(e.t10, tempUnit),
                    moisture: e.moisture,
                }


            })
            setData(temp);
        })
            .catch(error => {
                setData([]);

                console.log(error);
            });
    }, [])




    console.log(data);

    const show = selectedDomain;

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
                </div>}
            </div>

            {/* <div style={{ display: 'flex', flexDirection: 'row', flex: 1, }}> */}
                {/* <div style={{display: 'flex', flexDirection: 'column',}}>
                        {show && <div style={{display: 'flex', flex: 1}}>
                            {polygonSoilData && <SoilData tempUnit={tempUnit} text={text} data={polygonSoilData}/>}
                        </div>
                        }
                        {show && <div style={{display: 'flex', flex: 1}}>
                            {polygonWeather && <Weather tempUnit={tempUnit} text={text} data={polygonWeather} uvi={polygonUvi}/>}
                        </div>
                        }
                    </div>
                    <div style={{display: 'flex', flex: 1}}>
                        <AccumulatedParameters text={text} accumulatedTemp={polygonAccumulatedTemp} accumulatedPrecip={polygonAccumulatedPrecip}/>
                    </div> */}
                <SoilDataHistory data={data} tempUnit={tempUnit} text={text} />
            {/* </div> */}

        </div>
    )
}


export default withRouter(Sensing);
