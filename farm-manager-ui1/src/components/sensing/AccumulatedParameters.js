import React from 'react';
import { makeStyles } from '@mui/styles';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';
import { Typography } from '@mui/material';




const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(1),
        // marginBottom: theme.spacing(1),
        display: 'flex',
        fontSize: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
        // borderTop: '1px solid ' + BORDER_COLOR,
    },
    title: {
        paddingTop: theme.spacing(2),
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around'
    },
  }));


const AccumulatedParameters = (props) => {

        const classes = useStyles();


    const { accumulatedTemp, accumulatedPrecip, text } = props;
    // const data = orderBy(accumulatedTemp.concat(accumulatedPrecip), 'dt', 'asc');


    // console.log('accumulatedTemp',accumulatedTemp);
    // console.log('accumulatedPrecip',accumulatedPrecip);
    return (
        <div className={classes.root}>
        <div className={classes.title}>
            <Typography variant="h5">{text.precipitation}</Typography>
        </div>

        
            <div dir={'ltr'} >
                <ComposedChart
                    width={1000}
                    height={470}
                    data={accumulatedPrecip}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="dt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rain" fill="#413ea0" name={text.rainmm} />
                    {/* <Line type="monotone" dataKey="temp" stroke="#ff7300" /> */}
                </ComposedChart>
            </div>
        </div>
    );
}

export default AccumulatedParameters;
