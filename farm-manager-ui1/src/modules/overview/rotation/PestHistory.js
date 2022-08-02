import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

import PestCard from './PestCard';
import { SOIL_DISEASE, PERENNIAL_PEST } from '../../../admin/utilities/pests/PestForm';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: 400,
        margin: theme.spacing(1),
    },
    title: {
        margin: theme.spacing(1),
    }
}));




const PestHistory = (props) => {
    const { pests, text } = props;
    const classes = useStyles();
    const soilDisease = pests.filter(e => e.pest.type === SOIL_DISEASE);
    const perennialPest = pests.filter(e => e.pest.type === PERENNIAL_PEST);
    return (
        <div className={classes.root}>
            {soilDisease && soilDisease.length > 0 && <Typography className={classes.title} variant='subtitle1'>{text.soilDisease}</Typography>}
            {soilDisease &&
                soilDisease.map((e, index, arr) =>
                    <PestCard key={index} pest={e} />
                )}
            {perennialPest && perennialPest.length > 0 && <Typography className={classes.title} variant='subtitle1'>{text.perennialPest}</Typography>}
            {perennialPest &&
                perennialPest.map((e, index, arr) =>
                    <PestCard key={index} pest={e} />
                )}
        </div>
    );
}


export default PestHistory;