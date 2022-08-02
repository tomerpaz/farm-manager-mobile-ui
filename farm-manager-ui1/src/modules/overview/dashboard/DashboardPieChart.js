import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Cell, Pie, PieChart } from 'recharts';
import IconButton from '@mui/material/IconButton';
import TableChart from '@mui/icons-material/Reorder';
import PieChartIcon from '@mui/icons-material/PieChart';
import {Table,} from '../../../components';
import {sumBy} from 'lodash';
import { renderActiveShape, renderCustomizedLabel, colors } from '../../../charts/pieChartUtil';
import { height300 } from '../../../utils';
import { numberFormatter } from '../../../utils/NunberUtil';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    table: {
        margin: theme.spacing(2),
    },
  }));


const DashboardPieChart = (props) => {

    const classes = useStyles();

    const { data, nameKey, dataKey, dataUnit, text, perAreaUnit, areaUnit , dir} = props;

    const [activeIndex, setActiveIndex] = useState(0)

    const [pie, setPie] = useState(true)

    const total = sumBy(data, dataKey);

    const columns = [
        {name: 'name', title: text.name,  getStyle: row => row.color ? {color: row.color} : null },
        {name: dataKey, numeric: true, title: dataUnit ? dataUnit : text.qty, getCellValue: row => numberFormatter(row[dataKey],2)},
        {name: 'percent',numeric: true, title: '%', getCellValue: row => (total && total > 0) ? ((row[dataKey] / total) * 100).toFixed(2) : 0},//obtained*100/total
    ];

    if(perAreaUnit){
        columns.push( {name: 'perAreaUnit', title: text['per'+areaUnit], 
        numeric: true,
        getCellValue: row => numberFormatter(row.perAreaUnit,2)},)
    }
    return (
        <div>
            <IconButton onClick={() => setPie(!pie)}>

                {!pie && <PieChartIcon className={classes.icon} />}
                {pie && <TableChart className={classes.icon} />}
            </IconButton>
            {pie &&<div dir="ltr" className={classes.root}>
                <PieChart width={390} height={330}>

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
                    // onClick={this.onPieClick.bind(this)}
                    >
                        {
                            data.map((entry, index) => <Cell key={index}
                                fill={entry.color ? entry.color : colors[index % 20]}
                                dataUnit={dataUnit} dir={dir} />)
                        }
                    </Pie>
                </PieChart>
            </div>}
            {!pie && 
            <div className={classes.table}>
                    <Table
                        rows={data}
                        columns={columns}

                        height={height300}
                        // onRowClicked={this.onPieClick.bind(this)}
                        indexKey={true}
                    />
            </div>
            }
        </div>
    )
}
export default DashboardPieChart;




