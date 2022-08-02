import React from 'react';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { labelRoot } from "../../common/DashboardStyle";

const useStyles = makeStyles(theme => ({
    root: labelRoot(theme),
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: theme.palette.secondary.main,
        minWidth: 200,
        fontWeight: 'bold'
    },
    qty: {
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: theme.palette.secondary.main,
        minWidth: 200,
    },
    unit: {
        display: 'flex',
        justifyContent: 'space-around',
    },

    // textField: textField(theme),
}));


const KPN = (props) => {
    const { k, p, n, text, areaUnit } = props;

    const classes = useStyles();
    return (


        <div className={classes.root}>
            <Typography variant='subtitle1' className={classes.top} >
                <div>{k.name}</div>
                <div>{p.name}</div>
                <div>{n.name}</div>
            </Typography>
            <Divider />
            <Typography variant='h5' className={classes.qty}>
                <div style={{ color: k.color }} >{k.value.toFixed(2)}</div>
                <div style={{ color: p.color }} >{p.value.toFixed(2)}</div>
                <div style={{ color: n.color }} >{n.value.toFixed(2)}</div>
            </Typography>

            <Typography className={classes.unit} variant="h6" color='secondary'>
                <div  >{text['per' + areaUnit]}</div>


            </Typography>
        </div>
    )
}


export default KPN;