import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {  Typography } from '@mui/material';
import { typeColors } from './BenchmarkCard';

const useStyles = makeStyles(theme => ({
    root: {
    //   backgroundColor: theme.palette.common.white,
    //   margin: theme.spacing(1),
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: theme.spacing(2),

        paddingRight: theme.spacing(2),
        justifyContent: 'center',
    },

    businessLegend: {
        padding: theme.spacing(1),
        backgroundColor: typeColors.me,
        color: theme.palette.common.white,
        borderRadius: 4,


    },

    regionalProducersLegend: {
        padding: theme.spacing(1),
        backgroundColor: typeColors.regionalProducers,
        color: theme.palette.common.white,
        borderRadius: 4,


    },

    spacer: {
        marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),

    }

  }));

const BenchmarkLegend = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom className={classes.businessLegend}>{props.businessName}</Typography>
            <div className={classes.spacer}/>
            <Typography variant="h6" gutterBottom className={classes.regionalProducersLegend}>{props.text.regionalProducers}</Typography>

        </div>
    )
}
export default BenchmarkLegend;





