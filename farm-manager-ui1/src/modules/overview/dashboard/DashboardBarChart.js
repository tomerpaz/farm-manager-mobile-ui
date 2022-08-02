import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';


import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer
} from 'recharts';


import { Typography } from '@mui/material';

import { reverseString } from '../../../utils/StringUtil';
import { numberFormatter } from '../../../utils/NunberUtil';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {},
  barChart: {
    fontSize: 10,
  }
}));


const variant = 'subtitle2';
const labelColor = 'textPrimary';

const tickFormatter = (tick, dir) => {
  return tick;//reverseString(tick, dir);
};

function getRange(data, compared, indexName) {

  if (data) {
    const all = compared ?
      data.map(e => e[indexName]).concat(compared.map(e => e[indexName])) :
      data.map(e => e[indexName]);
    const max = Math.max(...all, 0);
    const min = Math.min(...all, 0);
    const range = [min > 0 ? 0 : min, max < 0 ? 0 : max];
    console.log(range);
    return range;
  }
  return null;
}

const DashboardBarChart = (props) => {
  const classes = useStyles();
  const { text, unitType, color, hasNegative, data, indexName, dataUnit, dir, height, compared } = props;
  const dataKey =
    indexName === 'area' ?
      'perAreaUnit' :
      indexName === 'water' ?
        'perWaterUnit' :
        indexName === 'weight' ?
          'perWeightUnit' : 'value';

  const range = getRange(data, compared, dataKey);
  // data.forEach((e) => e.display = reverseString(e.name, dir));

  return (
    <div className={classes.root}>
      {unitType && <Typography variant={variant} color={labelColor} className={classes.title}>
        {text['per' + unitType]}
      </Typography>}
      <div dir={'ltr'} className={classes.barChart}>
        {/* <ResponsiveContainer width={350} height={'30%'}> */}
        <BarChart
          width={350}
          height={height ? height : 160}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={(value) => tickFormatter(value, dir)} />
          <YAxis domain={range} tickFormatter={(value) => numberFormatter(value, 0)} />
          <Tooltip formatter={(value) => numberFormatter(value, 0)} />
          {/* <Legend /> */}
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey={dataKey} fill={color} name={text[dataUnit]} value={8}>
            {
              data.map((entry, index) => {
                return (
                  <Cell cursor="pointer" fill={entry.value >= 0 ? color : 'red'} key={`cell-${index}`} />
                )
              }
              )
            }
          </Bar>
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
}
export default DashboardBarChart;
