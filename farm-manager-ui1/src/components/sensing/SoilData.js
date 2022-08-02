
//agromonitoringSoil
import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import amber from '@mui/material/colors/brown';
import { asShortStringDateTime, fromUDCDate } from '../../utils';
import { convertKelvin } from '../../utils/FarmCalculator';
import { Divider } from '@mui/material';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
        flex: 1,
    },
    avatar: {
        backgroundColor: amber[500],
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

    const { data, text, tempUnit } = props;

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Soil" className={classes.avatar}>
                        S
            </Avatar>
                }
                title={text.soilData}
                subheader={asShortStringDateTime(fromUDCDate(data.dt))}
            />
            <div className={classes.body}>
                <Typography className={classes.row} >
                    <span style={{ fontWeight: 'bold' }}>{text.moisture}:</span>  {data.moisture} {text.moistureUnit}
                </Typography>
                <Divider />
                <Typography className={classes.row} >
                    <span style={{ fontWeight: 'bold' }}>{text.t0}:</span> {convertKelvin(data.t0, tempUnit)} {text[tempUnit]}
                </Typography>
                <Divider />
                <Typography className={classes.row}>
                    <span style={{ fontWeight: 'bold' }}>{text.t10}:</span> {convertKelvin(data.t10, tempUnit)} {text[tempUnit]}
                </Typography>
            </div>

        </Card>
    );
}

export default SoilData;
