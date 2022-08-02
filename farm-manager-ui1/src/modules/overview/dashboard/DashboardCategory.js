import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Divider, MenuItem } from '@mui/material';
import IndexBarCharts from './IndexBarCharts';
import { rootElement } from './financialStyle';
import { numberFormatter } from '../../../utils/NunberUtil';
import DashboardPieChart from './DashboardPieChart';
import DashboardBarChart from './DashboardBarChart';
import { TextField } from '../../../components';

const useStyles = makeStyles(theme => ({
    root: rootElement(theme),

    top: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        maxHeight: 60,
    },
    unit: {
        // margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        color: '#FFFFFF'
    },
    optionSelect: {
        width: 120,
    },
  }));



const FinancialDashboardCategory = (props) => {
    const classes = useStyles();

    const {  color, dataUnit, title, text, totalValue, hasNegative,
         options,onChangeOption, option, areaUnit, dir, compared } = props;

         console.log('totalValue',totalValue)
    const indices = option === 'indices';
    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <Typography variant="h6" >
                    {title}
                </Typography>
                <Typography dir='ltr' variant='h6'  >
                    {numberFormatter(totalValue, 2)}
                </Typography>
                <div>
                    <Typography component="span" style={{ backgroundColor: color, margin: 5 }} className={classes.unit} variant="subtitle1" color='textSecondary'>
                        {text[dataUnit]}
                    </Typography>
                </div>
                <div>
                <TextField
    
                        select
                        className={classes.optionSelect}
                        value={option}
                        onChange={(e) => onChangeOption(e.target.value)}
                    >
                       {options.map(e=>
                            <MenuItem key={e} value={e}>{text[e]}</MenuItem>
                       )}
                    </TextField>
                </div>
            </div>
            <Divider />
            {indices && <IndexBarCharts {...props} />}
            {!indices && !hasNegative &&
                <DashboardPieChart dir={dir} areaUnit={areaUnit} data={props.data} perAreaUnit={option === 'field'} nameKey={'name'} dataKey= 'value' dataUnit={text[dataUnit]} text={text} />
            }

            {!indices && hasNegative &&
                        <DashboardBarChart color={color} dir={dir} text={text} data={props.data} indexName={'value'} dataUnit={dataUnit}
                            compared={compared}
                        />
            }
        </div>
    )
}
export default FinancialDashboardCategory;



