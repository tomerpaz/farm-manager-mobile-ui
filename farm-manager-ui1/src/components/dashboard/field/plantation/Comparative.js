import React from 'react';
import {Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis} from 'recharts';
import { makeStyles } from '@mui/styles';

import { Typography } from '@mui/material';
import {
    accessoryColor,
    compostColor,
    contractorColor, disinfectantColor, equipmentColor, fertilizerColor, pesticideColor, procurementColor, varietyColor,
    waterColor,
    workerColor,
    workerGroupColor
} from "./ColorUtil";
import { width500, height300 } from '../../../../utils';



const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: 'flex',
        fontSize: 10,
        flex: 1,
        flexDirection: 'column',
    },

    row: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',

        // justifyContent: 'space-around',
        // alignItems: 'center'
    },

    column: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    title: {
        //color: theme.palette.
        fontWeight: 'bold',
        // margin: 0,
        // padding: 0,

    }
  }));

const Comparative = (props) => {

    const classes = useStyles();

    /*
        String expenses = "#ed5565";
        String income = "#1ab394";
     */
    // render() {
    const {dashboard: {comparative}, text, weightUnit, areaUnit, waterUnit} = props;
    const variant = 'subtitle2';
    const color = 'textPrimary';
    // const

    // console.log(weightUnit);

    if (!comparative) {
        return <div></div>
    }

    const chartHieght = height300/3;

    const charWidth = width500 / 2;

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <div className={classes.column}>
                    <Typography variant={variant} color={color} className={classes.title}>
                        {text.expenses} - {text.income}
                    </Typography>
                    <div dir={'ltr'}>
                        <AreaChart

                            width={charWidth}
                            height={chartHieght}
                            data={comparative.expenseIncome}
                            syncId="anyId"
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1ab394" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#1ab394" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#B82E2E" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#B82E2E" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            {/*<Legend/>*/}

                            <CartesianGrid strokeDasharray="1 1"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" name={text.expenses} dataKey="value" stroke="#B82E2E" fillOpacity={1}
                                  fill="url(#colorPv)"/>
                            <Area type="monotone" name={text.income} dataKey="value2" stroke="#1ab394" fillOpacity={1}
                                  fill="url(#colorUv)"/>


                        </AreaChart>
                    </div>
                    <Typography variant={variant} color={color} className={classes.title}>
                        {text.expenses} - {text.income} / {text[areaUnit]}
                    </Typography>
                    <div dir={'ltr'}>
                        <AreaChart
                            width={charWidth}
                            height={chartHieght}
                            data={comparative.expenseIncome}
                            syncId="anyId"
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            {/*<Legend/>*/}

                            <CartesianGrid strokeDasharray="1 1"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" name={text.expenses} dataKey="perAreaUnit" stroke="#B82E2E" fill="#B82E2E" fillOpacity={0}/>
                            <Area type="monotone" name={text.income} dataKey="perAreaUnit2" stroke="#1ab394" fill="#1ab394" fillOpacity={0}/>


                        </AreaChart>
                    </div>
                    <Typography variant={variant} color={color} className={classes.title}>
                        {text.water} ({text[waterUnit]})
                    </Typography>
                    <div dir={'ltr'}>
                        <ComposedChart
                            width={charWidth}
                            height={chartHieght}
                            data={comparative.water}
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="1 1" /*stroke="#f5f5f5"*/ />
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="perAreaUnit" name={text['per' + areaUnit]}
                                  stroke="#ff7300"/>
                            <Bar dataKey="value" name={text[waterUnit]} barSize={20} fill="#413ea0"/>
                        </ComposedChart>
                    </div>
                </div>

                <div className={classes.column}>
                    <Typography variant={variant} color={color} className={classes.title}>
                        {text.expenses}
                    </Typography>
                    <div dir={'ltr'}>
                        <BarChart
                            width={charWidth}
                            height={chartHieght}
                            data={comparative.expenses}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="1 1"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            {/*<Legend />*/}
                            <Bar dataKey="procurement" name={text.procurement} stackId="a" fill={procurementColor}/>
                            <Bar dataKey="pesticides" name={text.pesticides} stackId="a" fill={pesticideColor}/>
                            <Bar dataKey="fertilizers" name={text.fertilizers}  stackId="a" fill={fertilizerColor}/>
                            <Bar dataKey="disinfectants" name={text.disinfectants}  stackId="a" fill={disinfectantColor}/>
                            <Bar dataKey="compost" name={text.compost} stackId="a" fill={compostColor}/>
                            <Bar dataKey="varieties" name={text.varieties} stackId="a" fill={varietyColor}/>
                            <Bar dataKey="accessories" name={text.accessories} stackId="a" fill={accessoryColor}/>
                            <Bar dataKey="equipment" name={text.equipment} stackId="a" fill={equipmentColor}/>
                            <Bar dataKey="workers" name={text.workers} stackId="a" fill={workerColor}/>
                            <Bar dataKey="workerGroups" name={text.workergroups} stackId="a" fill={workerGroupColor}/>
                            <Bar dataKey="contractors" name={text.contractors} stackId="a" fill={contractorColor}/>
                            <Bar dataKey="water" name={text.water} stackId="a" fill={waterColor}/>

                        </BarChart>
                    </div>

                    <Typography variant={variant} color={color} className={classes.title}>
                        {text.yield} ({text[weightUnit]})
                    </Typography>
                    <div dir={'ltr'}>
                        <AreaChart
                            width={charWidth}
                            height={chartHieght}
                            data={comparative.yield}
                            syncId="anyId"
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            {/*<Legend/>*/}
                            <defs>
                                <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#109618" stopOpacity={0.5}/>
                                    <stop offset="95%" stopColor="#109618" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="1 1"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" name={text[weightUnit]} dataKey="value" stroke="#109618"
                                  fill="url(#colorYield)" fillOpacity={1}/>
                            {/*<Area type="monotone" dataKey="pv" stroke="#B82E2E" fill="#B82E2E"/>*/}

                        </AreaChart>
                    </div>
                    <Typography variant={variant} color={color} className={classes.title}>
                        {text[weightUnit]} / {text[areaUnit]}
                    </Typography>
                    <div dir={'ltr'}>
                        <AreaChart
                            width={charWidth}
                            height={chartHieght}
                            data={comparative.yield}
                            syncId="anyId"
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            {/*<Legend/>*/}

                            <CartesianGrid strokeDasharray="1 1"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" name={text[weightUnit]} dataKey="perAreaUnit" stroke="#1ab394"
                                  fill="#109618" fillOpacity={0}/>
                            {/*<Area type="monotone" dataKey="pv" stroke="#B82E2E" fill="#B82E2E" fillOpacity={0}/>*/}

                        </AreaChart>
                    </div>
                </div>
            </div>
        </div>

    );
    // }
}

export default Comparative;