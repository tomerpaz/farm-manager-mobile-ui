import React from 'react';
import { makeStyles } from '@mui/styles';
import { dataLine } from "../../../../utils/StyleUtils";
import DashboardLabel from '../../common/DashboardLabel'
import KPN from './KPN'
import { Table, } from '../../../../components';
import {  height360 } from "../../../../utils/TabUtils";
import { Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { Typography } from '@mui/material';
import { BORDER_COLOR } from '../../../../App';


const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    table: {
        backgroundColor: theme.palette.common.white,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        display: 'flex',
        flex: 1,
        // backgroundColor: theme.palette.common.white,
        // margin: theme.spacing(2),
        // borderTop: '2px solid ' + BORDER_COLOR,
        // maxHeight: height290,
    },
    chart: {
        borderTop: '2px solid '+ BORDER_COLOR,
        backgroundColor: theme.palette.common.white,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: 'flex',
        fontSize: 10,
       // flex: 1,
        flexDirection: 'column',
        height: 130
        // borderTop: '1px solid ' + BORDER_COLOR,
    },
    title: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

    },
    dataLine: dataLine(theme),


    // table: {
    //     // maxWidth: 400,
    // },
    cell: {
        // padding: 12,
    },
    titleCell: {
        // padding: 5,
        // color: '#45a15c',
        // backgroundColor: '#45a15c',
        borderRadius: 5,
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    header: {
        fontWeight: 'bold',
        color: theme.palette.common.black,
    },
    row: {
        height: 32,
    }
  }));

const Quantitative = ({ dashboard, text, areaUnit, waterUnit }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <div className={classes.dataLine}>

                <DashboardLabel
                    element={dashboard.quantitative.water}
                    text={text}
                    areaUnit={areaUnit}
                    area={dashboard.area}
                />
                <KPN
                    k={dashboard.quantitative.k}
                    p={dashboard.quantitative.p}
                    n={dashboard.quantitative.n}
                    text={text}
                    areaUnit={areaUnit}
                />
                <DashboardLabel
                    element={dashboard.quantitative.weight}
                    text={text}
                    areaUnit={areaUnit}
                    area={dashboard.area}
                />
            </div>
            <div className={classes.chart}>
                <Typography style={{paddingTop: 10}} variant={'subtitle2'} color={'textPrimary'} className={classes.title}>
                    {text.water} / {text.monthly} ({text[waterUnit]})
                </Typography>
                <div dir={'ltr'}>
                    <ComposedChart
                        width={window.innerWidth - 400}
                        height={100}
                        data={dashboard.quantitative.waterMonthly}
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" /*stroke="#f5f5f5"*/ />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="perAreaUnit" name={text['per' + areaUnit]}
                            stroke="#ff7300" />
                        <Bar dataKey="value" name={text[waterUnit]} barSize={20} fill="#413ea0" />
                    </ComposedChart>
                </div>
            </div>
            <div className={classes.table}>
                <Table
                    rows={dashboard.quantitative.pesticides}
                    indexKey={true}
                    columns={[
                        { name: 'name', title: text.pesticide, },
                        {
                            name: 'value',
                            title: text.qty,
                            getCellValue: row => row.value.toFixed(2),
                        },

                        {
                            name: 'perAreaUnit', title: text['per' + areaUnit],
                            getCellValue: row => row.perAreaUnit.toFixed(2),
                        },
                        {
                            name: 'unit',
                            title: text.unit,
                            getCellValue: row => (text[row.unit]),
                        },]}
                    height={height360}
                />
            </div>


        </div>
    )
}
export default Quantitative;
