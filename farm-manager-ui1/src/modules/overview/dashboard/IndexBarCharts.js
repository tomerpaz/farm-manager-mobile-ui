import React from 'react';
import { makeStyles } from '@mui/styles';

import DashboardBarChart from './DashboardBarChart';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
  }));


const height = 120;
const IndexBarCharts = ({ text, waterUnit, weightUnit, areaUnit, color, data, dataUnit, waterIndex, weighIndex, areaIndex, dir, compared }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
           {areaIndex && <DashboardBarChart color={color} unitType={areaUnit} text={text} data={data} indexName={'area'} dataUnit={dataUnit} dir={dir} height={height} compared={compared}/>}
           {waterIndex && <DashboardBarChart color={color} unitType={waterUnit} text={text} data={data} indexName={'water'} dataUnit={dataUnit} dir={dir} height={height} compared={compared}/>}
           {weighIndex && <DashboardBarChart color={color} unitType={weightUnit} text={text} data={data} indexName={'weight'} dataUnit={dataUnit} dir={dir} height={height} compared={compared}/>}
        </div>
    )
}
export default IndexBarCharts;



