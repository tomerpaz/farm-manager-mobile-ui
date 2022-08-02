import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { labelRoot } from "./DashboardStyle";
import { numberFormatter } from '../../../utils/NunberUtil';

const useStyles = makeStyles(theme => ({
    root: labelRoot(theme),

    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.palette.secondary.main,
    },
    unit: {
        // margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        color: '#FFFFFF'
    },
    perAreaUnit: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(1),
        color: theme.palette.secondary.main,
    },
}));




const DashboardLabel = (props) => {
    const { element, areaUnit, waterUnit, area, text, minWidth, weightUnit } = props;
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ minWidth: minWidth }}>

            <Typography variant="h6" >
                {text[element.name]}
            </Typography>
            <Divider />
            <div className={classes.top}>
                <Typography dir='ltr' variant='h5' color="textSecondary" >
                    {numberFormatter(element.value, 0)}
                </Typography>
                {element.unit && <Typography component="span" style={{ backgroundColor: element.color, margin: 5 }} className={classes.unit} variant="subtitle1" color='textSecondary'>
                    {text[element.unit]}
                </Typography>}

            </div>

            {areaUnit &&
                <div >
                    <div className={classes.perAreaUnit}>

                        <Typography dir='ltr' component="span" variant="h6" color="textSecondary">
                            {numberFormatter(element.perAreaUnit, 2)}
                        </Typography>
                        <Typography component="span" style={{ color: element.color, size: 8 }} className={classes.unit} variant="h6" color='textSecondary'>
                            {text['per' + areaUnit]}
                        </Typography>
                    </div>
                </div>
            }

            {waterUnit &&
                <div >
                    <div className={classes.perAreaUnit}>
                        <Typography dir='ltr' component="span" variant="h6" color="textSecondary">
                            {numberFormatter(element.perWaterUnit, 0)}
                        </Typography>
                        <Typography component="span" style={{ color: element.color, size: 8 }} className={classes.unit} variant="h6" color='textSecondary'>
                            {text['per' + waterUnit]} {text.water}
                        </Typography>
                    </div>
                </div>
            }

            {weightUnit &&
                <div >
                    <div className={classes.perAreaUnit}>

                        <Typography dir='ltr' component="span" variant="h6" color="textSecondary">
                            {numberFormatter(element.perWeightUnit, 0)}
                        </Typography>
                        <Typography component="span" style={{ color: element.color, size: 8 }} className={classes.unit} variant="h6" color='textSecondary'>
                            {text['per' + weightUnit]}
                        </Typography>
                    </div>
                </div>
            }
        </div>
    )
}

export default DashboardLabel;