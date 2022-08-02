import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import amber from '@mui/material/colors/amber';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { asShortStringDate } from '../../../utils';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    margin: theme.spacing(1),
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
    backgroundColor: amber[500],
  },
}));

const PestCard = (props) => {

  const classes = useStyles();

  const { pest } = props;
  const [expended, setExpended] = useState(false)

  const title = pest.pest.name;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Pest" className={classes.avatar}>
            P
            </Avatar>
        }
        action={
          pest.note && <IconButton onClick={() => setExpended(!expended)}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={title}
        subheader={asShortStringDate(pest.execution)}
      />
      <Collapse in={expended} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {pest.note}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


export default PestCard;
