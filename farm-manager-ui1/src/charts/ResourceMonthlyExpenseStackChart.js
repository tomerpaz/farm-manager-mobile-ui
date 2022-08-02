import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts';

const ResourceMonthlyExpenseStackChart = ({data, text, colors}) => (
    <BarChart width={500} height={300} data={data}
              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="label"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar name={text.contractor}  dataKey="contractor" stackId="a" fill={colors['contractor']} />
        <Bar name={text.worker} dataKey="worker" stackId="a" fill={colors['worker']} />
        <Bar name={text.workerGroupsShort} dataKey="worker_group" stackId="a" fill={colors['worker_group']} />
        <Bar name={text.pesticideShort} dataKey="pesticide" stackId="a" fill={colors['pesticide']} />
        <Bar name={text.fertilizerShort} dataKey="fertilizer" stackId="a" fill={colors['fertilizer']} />
        <Bar name={text.disinfectant} dataKey="disinfectant" stackId="a" fill={colors['disinfectant']} />
        <Bar name={text.water} dataKey="water" stackId="a" fill={colors['water']} />
        <Bar name={text.seeds} dataKey="variety" stackId="a" fill={colors['variety']} />
        <Bar name={text.equipment} dataKey="equipment" stackId="a" fill={colors['equipment']} />
        <Bar name={text.compost} dataKey="compost" stackId="a" fill={colors['compost']} />
    </BarChart>

)

export default ResourceMonthlyExpenseStackChart;


