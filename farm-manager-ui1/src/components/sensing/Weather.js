
//agromonitoringSoil
import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import green from '@mui/material/colors/green';
import { convertKelvin } from '../../utils/FarmCalculator';
import { Divider } from '@mui/material';

const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 400,
    margin: theme.spacing(1),
    //display: 'flex',
    flex: 1,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  avatar: {
    backgroundColor: green[500],
  },
  row: {
    padding: theme.spacing(1),
  },
  body: {
    margin: theme.spacing(1),
  },
}));


const SoilData = (props) => {
  const classes = useStyles();

  const { text, data, uvi, tempUnit } = props;
  const icon = data.weather[0].icon;
  const title = `${convertKelvin(data.main.temp)} ${text[tempUnit]}`
  return (

    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Current" className={classes.avatar}>
            <img src={`https://openweathermap.org/img/w/${icon}.png`}></img>

          </Avatar>
        }
        title={title}
        subheader={text.weather}
      />
      <div className={classes.body}>
        <Divider />
        <Typography className={classes.row} >
          <span style={{ fontWeight: 'bold' }}>{text.wind}:</span> {data.wind.speed} m/s
        </Typography>
        <Divider />
        <Typography className={classes.row}>
          <span style={{ fontWeight: 'bold' }}>{text.pressure}:</span> {data.main.pressure} hPa
        </Typography>
        <Divider />
        <Typography className={classes.row} >
          <span style={{ fontWeight: 'bold' }}>{text.humidity}:</span> {data.main.humidity}%
        </Typography>
        <Divider />
        <Typography className={classes.row} >
          <span style={{ fontWeight: 'bold' }}>{text.clouds}:</span> {data.clouds.all} %
        </Typography>
        <Divider />
        {uvi && <Typography className={classes.row} >
          UVI: {uvi.uvi}
        </Typography>}
      </div>
    </Card>
  );
}


export default SoilData;
