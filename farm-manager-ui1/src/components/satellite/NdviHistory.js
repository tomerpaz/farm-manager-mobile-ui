import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';


import { LineChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { asShortStringDate, subtractMonths, newDate, height260, width100 } from '../../utils';
import { Typography, MenuItem, IconButton } from '@mui/material';
import { TextField } from '../../components';

import Map from '@mui/icons-material/Map';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flex: 1, flexDirection: 'column',
        margin: theme.spacing(1),
        fontSize: 12,
    },
    row: {
        margin: theme.spacing(1),
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    },
    iconButton: {
        padding: theme.spacing(0.5),
    }
}));


const NdviHistory = (props) => {
    const classes = useStyles();
    const { getNdviHistory, serviceKey, imageryId, type,
        ndviHistory, text, switchView
    } = props;

    const end = newDate();
    //const [end, setEnd] = useState(newDate());
    const [months, setMonths] = useState(3);

    const [start, setStart] = useState(subtractMonths(end, months));

    useEffect(() => {

        getNdviHistory(imageryId, serviceKey, start, end, type);

    }, []);

    useEffect(() => {
        setStart(subtractMonths(end, months));
    }, [months]);

    useEffect(() => {
        getNdviHistory(imageryId, serviceKey, start, end, type);
    }, [start]);

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <TextField
                    select
                    width={150}
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                >
                    <MenuItem value={''}><em>{text.timeRange}</em></MenuItem>))
                    <MenuItem value={1}>{text.month}</MenuItem>))
                    <MenuItem value={3}>3 {text.months}</MenuItem>))
                    <MenuItem value={6}>6 {text.months}</MenuItem>))
                    <MenuItem value={12}>{text.year}</MenuItem>))
                    <MenuItem value={24}>{text.twoYears}</MenuItem>))
                </TextField>
                <Typography variant={'h6'} >
                    NDVI
                </Typography>
                <div>
                    <IconButton onClick={switchView}>
                        <Map />
                    </IconButton>
                </div>
            </div>
            <div dir={'ltr'}>
                <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                    <LineChart
                        width={width100 /2}
                        height={height260}
                        data={ndviHistory}
                        syncId="anyId"
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <Legend />

                        <CartesianGrid vertical={false} strokeDasharray="1 1" />
                        <XAxis dataKey="dt" tickFormatter={(value) => asShortStringDate(value * 1000)} />
                        <YAxis />
                        <Tooltip formatter={(value, name, props) => value.toFixed(2)} labelFormatter={(value) => asShortStringDate(value * 1000)} />
                        <Line type='natural' name={text.min} dataKey="data.min" stroke="#ff0000" />
                        {/* <Line type='natural' name={'25%'} dataKey="data.p25" stroke="#000000" /> */}
                        <Line type='natural' name={text.mean} dataKey="data.mean" stroke="#ffbf00" />
                        {/* <Line type='natural' name={'std'} dataKey="data.std" stroke="#ffbf00"   />
                        <Line type='natural' name={'median'} dataKey="data.median" stroke="#ffbf00"   /> */}
                        {/* <Line type='natural' name={'75%'} dataKey="data.p75" stroke="#0000ff" /> */}
                        <Line type='natural' name={text.max} dataKey="data.max" stroke="#49A05E" />

                    </LineChart>
                </div>
            </div>
        </div>
    )
}

export default NdviHistory;


