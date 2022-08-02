import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import IconButton from '@mui/material/IconButton';
import TableChart from '@mui/icons-material/Reorder';
import { Table, } from '../components';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sumBy } from 'lodash';
import PieChartIcon from "../icons/PieChartIcon";
import { renderActiveShape, renderCustomizedLabel, colors } from './pieChartUtil';
import { numberFormatter } from '../utils/NunberUtil';


const useStyles = makeStyles(theme => ({
    element: {
        backgroundColor: '#F5F5F5', borderRadius: 10,
    },
    chartTitle: {
        textAlign: 'center',
    },
    table: {
        margin: theme.spacing(1),
    },
    icon: {
        fontSize: 20,
    }
}));



const StandardPieChart = (props) => {

    const classes = useStyles();

    const { data, nameKey, dataKey, dataUnit, text, perAreaUnit, areaUnit, dir, title, onPieClick, tableHeight } = props;

    const [activeIndex, setActiveIndex] = useState(0)

    const [pie, setPie] = useState(true)

    const total = sumBy(data, dataKey);

    const onPieClickInner = (data, index) => {
        if (onPieClick) {
            onPieClick(data);
        }
        setActiveIndex(index);
    }


    if (!data) {
        return <div />
    }
    data.forEach(e => {
        const label = e[nameKey];
        e.label = text[label] ? text[label] : label;
    });

    const columns = [
        { name: 'label', title: text.type },
        { name: dataKey, numeric: true, title: dataUnit ? dataUnit : text.qty, getCellValue: row => numberFormatter(row[dataKey]) },
    ];

    if (areaUnit) {
        columns.push({
            name: 'perAreaUnit', title: text['per' + areaUnit],
            numeric: true,
            getCellValue: row => numberFormatter(row.perAreaUnit)
        })
    }

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: 400 }}>
            {title && <div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={() => setPie(!pie)}>
                        {!pie && <PieChartIcon className={classes.icon} />}
                        {pie && <TableChart className={classes.icon} />}
                    </IconButton>
                    <Typography className={classes.chartTitle}
                        variant="h6">{text[title]}</Typography>
                </div>
            </div>}

            {pie && <div dir="ltr">
                <PieChart width={400} height={330}>

                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx={180}
                        cy={160}
                        innerRadius={1}
                        outerRadius={80}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        nameKey={nameKey}
                        dataKey={dataKey}
                        onMouseEnter={(data, index) => setActiveIndex(index)}
                        onClick={onPieClickInner}
                    >
                        {
                            data.map((entry, index) => <Cell key={index}
                                fill={entry.color ? entry.color : colors[index % 20]}
                                dataUnit={dataUnit} dir={dir} />)
                        }
                    </Pie>
                </PieChart>
            </div>}
            {!pie && <div className={classes.table}>
                <Table
                    rows={data}
                    columns={columns}

                    height={tableHeight ? tableHeight : 315}
                    onRowClicked={onPieClick}
                    indexKey={true}
                />
            </div>}
        </div>
    )
}

export default StandardPieChart;

