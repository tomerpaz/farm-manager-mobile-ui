import React from 'react';
import { makeStyles } from '@mui/styles';
import {List, ListSubheader, ListItem, ListItemSecondaryAction, Typography , Button} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material';
import GpsFixed from '@mui/icons-material/GpsFixed';
import Close from '@mui/icons-material/Close';

import Tractor from '../../icons/Tractor';
import {  asShortStringDateTime, height120, height160, height200, height140, asShortStringHour, fromUDCDate, height80, height60, height100 } from '../../utils';
import { isEmpty } from '../../utils/StringUtil';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // height: height120,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));


const GpsPointList = ({gpsLog, text, selectPoint, onClose,  speedExceedColor, speed}) => {
  const classes = useStyles();
 
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  function handleListSelectPoint(event, index) {
    if(index !== selectedPoint){
      setSelectedPoint(index);
      selectPoint(gpsLog.points[index]);
    }
  }
  const naxHeight = height100;// - (1 * 60);
  return (
    <div className={classes.root}>
      <List component="nav" >


        <ListItem
            button
            onClick={event => console.log(event)}
          >
            <ListItemIcon>
             {gpsLog.gpsLogger.category === 'TRACTOR' ? <Tractor /> : <GpsFixed />}
            </ListItemIcon>
            <ListItemText primary={gpsLog.gpsLogger.name} secondary={asShortStringDateTime(gpsLog.execution)}/>
            <ListItemSecondaryAction>          <Button variant='outlined' size='small' color='primary'
              onClick={onClose}>
              <Close />
          </Button></ListItemSecondaryAction>
        </ListItem>
      </List> 
        
      
      <Divider />
      <List component="nav" style={{maxHeight: naxHeight, overflow: 'auto'}}>
      {gpsLog.points.map((e, index, arr) =>  
        {
          return (
        <ListItem
            divider={true}
            key={index}
            button
            selected={selectedPoint === index}
            onClick={event => handleListSelectPoint(event, index)}
            
          >
            <ListItemIcon >
              <GpsFixed style={{color: !isEmpty( speed ) && e.speed  >= Number(speed)  ? speedExceedColor : null}}/>
            </ListItemIcon>
            <ListItemText primary={`${text.speed}: ${e.speed.toFixed(2)} ${e.desc}`} secondary={`${asShortStringHour(fromUDCDate(e.timestamp))} ,${text.accuracy} ${e.acc.toFixed(1)}`} />
        </ListItem> )})}
      </List>
    </div>
  );
}

export default GpsPointList;
