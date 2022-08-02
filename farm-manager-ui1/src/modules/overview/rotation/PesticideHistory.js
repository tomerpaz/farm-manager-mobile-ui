import React from 'react';
import { makeStyles } from '@mui/styles';
import PesticideCard from './PesticideCard';
import { Typography } from '@mui/material';



const useStyles = makeStyles(theme => ({
    root: {

    },
    title: {
        margin: theme.spacing(1),
    }
  }));

const PesticideHistory = ({pesticides, text}) => {
    const classes = useStyles();

    return (
        <div>
            {pesticides && pesticides.length > 0 && <Typography className={classes.title} variant='subtitle1'>{text.pesticides}</Typography>}
            {pesticides.map((e, index, arr)=> <PesticideCard key={index} date={e.execution} pesticide={e.resource}/>)}
        </div>
    )
}
export default PesticideHistory;



