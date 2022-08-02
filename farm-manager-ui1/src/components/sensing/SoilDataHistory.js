import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { asShortStringDate, height120, height140, height160, height200, height220, width100 } from '../../utils';
import { Checkbox, FormControlLabel } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },


  controls: {
    //  backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    display: 'flex',
    flex: 1,
    alignItems: 'center',
   // justifyContent: 'center'

  },



}));



const CustomizedAxisTick = ({ x, y, stroke, payload }) => {




  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
    </g>
  );

}

const SoilDataHistory = ({ data, tempUnit, text }) => {
  const classes = useStyles();

  const [moisture, setMoisture] = useState(true)
  const [t0, setT0] = useState(true)
  const [t10, setT10] = useState(true)

  //moistureUnit
  // {dt: 1569369600, t10: 296.201, moisture: 0.175, t0: 289.277}
  return (
    <div>
      <div className={classes.controls}>
        <FormControlLabel
          control={
            <Checkbox
              checked={moisture}
              onChange={() => setMoisture(!moisture)}
              color="primary"
            />
          }
          label={`${text.moisture} ${text.moistureUnit}`}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={t0}
              onChange={() => setT0(!t0)}
              color="primary"
            />
          }
          label={`${text.t0} ${text[tempUnit]}`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={t10}
              onChange={() => setT10(!t10)}
              color="primary"
            />
          }
          label={`${text.t10} ${text[tempUnit]} `}

        />
      </div>
      <div className={classes.root} dir={'ltr'}>
        <LineChart
          width={width100}
          height={height220}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt" />

          <YAxis /*domain={[250, 350]}*/ />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {t10 && <Line type="monotone" dataKey="t10" stroke="#8884d8" activeDot={{ r: 8 }} />}
          {t0 && <Line type="monotone" dataKey="t0" stroke="#82ca9d" activeDot={{ r: 8 }} />}
          {moisture && <Line type="monotone" dataKey="moisture" stroke="blue" activeDot={{ r: 8 }} />}

        </LineChart>
      </div>

    </div>
  )
}
export default SoilDataHistory;



