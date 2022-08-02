import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from '@mui/material';
import GlobalGapSvg from '../../../icons/GlobalGapSvg';
import { amber, blue, lime, deepOrange, green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/InfoOutlined'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: theme.spacing(1)
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    divider: {
        marginBottom: theme.spacing(2),
    },
}));

export const typeColors = {
    activeIngredients: green[700],
    energy: lime[700],
    water: blue[700],
    nitrogen: deepOrange[700],
    phosphorus: amber[700],
}


export const BenchmarkCard = ({ type, data, text , areaUnit}) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const getAmount = (amount) => {
        return  areaUnit === 'dunam' && amount ? (amount/10).toFixed() : 0 ;
    }

    const getUnit = (unit) => {
        return `${unit}/${text[areaUnit]}`;
    }

    const renderEnergyItem = (item, type) => {
        const amount = getAmount(item.amount);
        const percentile = item.percentile;
        const nonAmount = getAmount(item['percentage_non-renewable_energy'].amount);
        const nonPercentile = item['percentage_non-renewable_energy'].percentile;
        const renewableAmount = getAmount(item.percentage_renewable_energy.amount);
        const renewablePercentile = item.percentage_renewable_energy.percentile;

        const unit = getUnit(text.kwh);

        return (
            <Fragment>
                <Typography >{text[type]}: {amount} {unit}, % {percentile} </Typography>
                <Typography variant={'body2'} color="textSecondary" >{text.renewable}: {renewableAmount} {unit},  % { renewablePercentile }</Typography>
                <Typography variant={'body2'} color="textSecondary" >{text.nonRenewable}: {nonAmount} {unit},  % {nonPercentile}</Typography>
                <Divider className={classes.divider} />
            </Fragment>
        )
    }

    const renderEnergy = () => {
        const amount = getAmount(data.absolute_value.amount);
        const percentile = data.absolute_value.percentile;
        const unit =  getUnit(text.kwh);
        const diesel = data.Diesel;
        const ethanol = data.Ethanol;
        const natural_gas = data['Natural gas'];
        const hydrogen = data.Hydrogen;
        const liquid_gas = data['Liquid gas'];
        const gasoline_petrol = data['Gasoline/petrol'];
        const solar_power = data['Solar power'];
        const wind_power = data['Wind power'];
        const heavy_oil = data['Heavy oil'];
        const electricity_bill = data['Electricity bill'];

        const hasDetails = diesel || ethanol || natural_gas || hydrogen || liquid_gas || gasoline_petrol || solar_power || wind_power || heavy_oil || electricity_bill;

        return (
            < CardContent >
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>

                        <Typography style={{ color: typeColors.energy }} variant="h6" component="h2">
                            {amount}  {unit}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {text.percentile}:  {percentile}
                        </Typography>
                    </div>
                    {hasDetails && <CardActions>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>}
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {diesel && renderEnergyItem(diesel, 'diesel')}
                    {ethanol && renderEnergyItem(ethanol, 'ethanol')}

                    {natural_gas && renderEnergyItem(ethanol, 'naturalGas')}
                    {hydrogen && renderEnergyItem(hydrogen, 'hydrogen')}
                    {liquid_gas && renderEnergyItem(liquid_gas, 'liquidGas')}
                    {gasoline_petrol && renderEnergyItem(gasoline_petrol, 'gasolinePetrol')}
                    {solar_power && renderEnergyItem(solar_power, 'solarPower')}
                    {wind_power && renderEnergyItem(wind_power, 'windPower')}
                    {heavy_oil && renderEnergyItem(heavy_oil, 'heavyOil')}
                    {electricity_bill && renderEnergyItem(electricity_bill, 'electricityBill')}
                </Collapse>
            </CardContent >

        )
    }

    const renderFertilizers = () => {

        const n = getAmount(data.Nitrogen.amount)
        const nPercentile = data.Nitrogen.percentile

        const p = getAmount(data.Phosphorus.amount)
        const pPercentile = data.Phosphorus.percentile
        const unit =  getUnit(text.kg);

        return (
            < CardContent >
                <Typography style={{ color: typeColors.nitrogen }} variant="h6" component="h2">
                    {text.nitrogen}  {n}  {unit}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {text.percentile}:  {nPercentile}
                </Typography>
                <Typography style={{ color: typeColors.phosphorus }} variant="h6" component="h2">
                    {text.phosphorus}  {p}  {unit}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {text.percentile}:  {pPercentile}
                </Typography>
            </CardContent >
        )
    }
    const renderWater = () => {

        const amount = getAmount(data.total_consumption.amount);
        const percentile = data.total_consumption.percentile;

        const pubPercentageAmount = getAmount(data.percentage_public_waters.amount);
        const pubPercentagePercentile = data.percentage_public_waters.percentile;

        const unit =  getUnit(text.m3);
        return (
            < CardContent >
                <Typography style={{ color: typeColors.water }} variant="h6" component="h2">
                    {text.totalConsumption}  {amount}  {unit}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {text.percentile}:  {percentile}
                </Typography>
                <Typography style={{ color: typeColors.water }} variant="h6" component="h2">
                    {text.percentagePublicWater}   {pubPercentageAmount}  {unit}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {text.percentile}:  {pubPercentagePercentile}
                </Typography>
            </CardContent >
        )
    }

    const renderActiveIngredients = () => {
        const amount = getAmount(data.absolute_value.amount);
        const percentile = data.absolute_value.percentile;
        const unit =  getUnit(text.kg);
        return (
            < CardContent >
                <Typography style={{ color: typeColors.activeIngredients }} variant="h6" component="h2">
                    {amount}  {unit}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {text.percentile}:  {percentile}
                </Typography>
            </CardContent >

        )
    }



    const period = data.period.init_period;
    const total_producers = data.period.total_producers
    const date = new Date(period);

    const yearMonth = `${date.getMonth() + 1}/${date.getFullYear()}`



    const getPrecentile = (data) => {
        if('activeIngredients' === type) {
            return 'A';
        } else if('energy' === type) {
            return 'E';
        } else if('fertilizers' === type) {
            return 'F';
        } else if('water' === type) {
            return 'W';
        }


    }

    return (
        <Card className={classes.root}>
            <CardHeader
                // avatar={
                //     // <GlobalGapSvg height={40} width={50} />
                //     <Avatar aria-label="recipe" className={classes.avatar}>
                //    {getPrecentile(data)}
                //   </Avatar>
                // }
                title={
                    <Typography color="textSecondary" variant="h6" component="h2">
                        {`${text[type]}, ${yearMonth}`}
                    </Typography>
                }
                subheader={`${total_producers} ${text.producers}`}
            />
            {'activeIngredients' === type && renderActiveIngredients()}
            {'energy' === type && renderEnergy()}

            {type === 'fertilizers' && renderFertilizers()}
            {type === 'water' && renderWater()}


        </Card>
    );
}