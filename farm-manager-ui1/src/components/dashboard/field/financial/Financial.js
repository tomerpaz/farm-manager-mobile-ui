import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { StandardPieChart } from "../../../../charts";
import DashboardLabel from '../../common/DashboardLabel'
import { BORDER_COLOR } from "../../../../App";
import { dataLine } from "../../../../utils/StyleUtils";
import { height400, width500 } from '../../../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',

    },
    chart: {
        backgroundColor: theme.palette.common.white,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        display: 'flex',
        flex: 1,
        borderTop: '2px solid ' + BORDER_COLOR,
    },
    title: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

    },
    dataLine: dataLine(theme),
}));



const Financial = (props) => {
    const classes = useStyles();

    const { dashboard, dashboard: { financial: { categoryExpenses } }, year,
        text, currency, areaUnit, waterUnit, weightUnit, dir
    } = props;


    const [category, setCategory] = useState(null)

    const onCategorySelect = (value) => {
        setCategory(value);
    }


    useEffect(() => {
        setCategory(null);
    }, [year]);

    useEffect(() => {
        setCategory(categoryExpenses && categoryExpenses.length > 0 ? categoryExpenses[0] : null);
    }, [categoryExpenses]);

    const data = dashboard.financial.categoryExpenses;

    data.forEach(e => e.label = text[e.token]);

    return (
        <div className={classes.root}>
            <div className={classes.dataLine}>

                <DashboardLabel
                    element={dashboard.financial.expense}
                    text={text}
                    areaUnit={areaUnit}
                    waterUnit={waterUnit}
                    weightUnit={weightUnit}
                    area={dashboard.area}
                />
                <DashboardLabel
                    element={dashboard.financial.income}
                    text={text}
                    areaUnit={areaUnit}
                    waterUnit={waterUnit}
                    weightUnit={weightUnit}
                    area={dashboard.area}
                />
                <DashboardLabel
                    element={dashboard.financial.profit}
                    text={text}
                    areaUnit={areaUnit}
                    waterUnit={waterUnit}
                    weightUnit={weightUnit}
                    area={dashboard.area}
                />
            </div>

            <div className={classes.chart}
                style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>

                <div>
                    {data && data.length > 0 &&
                        <StandardPieChart dir={dir} tableHeight={height400} tableWidth={width500/2} dataUnit={text[currency]} style={{ flex: 1 }}
                            title={'expenses'} data={data} text={text}
                            nameKey="label" dataKey="cost"
                            onPieClick={onCategorySelect} areaUnit={areaUnit} />}
                </div>

                <div>
                    {category && category.elements &&
                        <StandardPieChart dir={dir} tableHeight={height400} tableWidth={width500/2} dataUnit={text[currency]} style={{ flex: 1 }}
                            title={category.token} data={category.elements} text={text}
                            nameKey="name" dataKey="value" areaUnit={areaUnit} />}
                </div>
            </div>
        </div>

    )
}

export default Financial;
