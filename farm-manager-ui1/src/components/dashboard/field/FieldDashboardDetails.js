import React from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom';
import Quantitative from './quantitave/Quantitative';
import Financial from './financial/Financial';
import CropRotation from './domain/CropRotation';
import Comparative from "./plantation/Comparative";


const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
    },
}));


const FieldDashboardDetails = (props) => {
    const classes = useStyles();


    const { dir, dashboard, areaUnit, text, value, year, currency, waterUnit, weightUnit } = props;


    return (
        <div className={classes.root}>
            {value === 0 && dashboard.quantitative &&
                <Quantitative style={{ flex: 1 }} dashboard={dashboard} text={text} areaUnit={areaUnit} waterUnit={waterUnit} />}
            {value === 1 && dashboard.financial &&
                <Financial style={{ flex: 1 }} dashboard={dashboard} currency={currency} text={text} areaUnit={areaUnit}
                    waterUnit={waterUnit} weightUnit={weightUnit} dir={dir}
                    year={year} />}
            {value === 2 && dashboard.plantation === false &&
                <CropRotation style={{ flex: 1 }} dashboard={dashboard} text={text} />}
            {value === 2 && dashboard.plantation === true &&
                <Comparative style={{ flex: 1 }} dashboard={dashboard} text={text} weightUnit={weightUnit} areaUnit={areaUnit} waterUnit={waterUnit} />}
        </div>
    );
}

export default withRouter(FieldDashboardDetails);

