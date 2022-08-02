import React , { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import red from '@mui/material/colors/red';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { asShortStringDate } from '../../../utils';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const PesticideCard = (props) => {

    const classes = useStyles();

    const { pesticide, date } = props;
    const [expended, setExpended] = useState(false)

    const title = pesticide.name + ', ' +pesticide.identification;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              P
            </Avatar>
          }
          action={ 
           pesticide.note && <IconButton onClick={()=> setExpended(!expended)}
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={title}
          subheader={asShortStringDate(date)}
        />
         <Collapse in={expended} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
             {pesticide.note}
            </Typography>
          </CardContent>
        </Collapse> 
      </Card>
    );
  
}

export default PesticideCard;
