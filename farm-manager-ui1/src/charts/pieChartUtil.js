import React from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import { numberFormatter } from '../utils/NunberUtil';
import { reverseString } from '../utils/StringUtil';


//<tspan direction="rtl" unicode-bidi="embed" xml:lang="ar">
export const renderValueAndUnit = (value, dataUnit, dir) => {
  //  console.log('dir', dir)
    if (dir === 'rtl') {
        return `${numberFormatter(value, 0)} ${reverseString(dataUnit ? dataUnit : '', dir)}`

    }
    else {
        return `${numberFormatter(value, 0)} ${dataUnit ? dataUnit : ''}`
    }
}

export const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value, type, label, dataUnit, name, dir
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 2;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            {/*<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{label}</text>*/}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text style={{ fontSize: 'small' }} x={ex + (cos >= 0 ? 1 : -1) * 3} dy={-18} y={ey} textAnchor={textAnchor}
                fill="#333">{`${reverseString(label ? label : name, dir)}`}</text>
            <text style={{ fontSize: 'small' }} x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} dy={0} textAnchor={textAnchor}
                fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
            <text style={{ fontSize: 'small' }} x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} dy={18} textAnchor={textAnchor}
                fill="#333">{renderValueAndUnit(value, dataUnit, dir)}</text>
        </g>
    );
};

const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const value = percent * 100;
    // console.log(value)
    const text = value >= 10 ? `${value.toFixed(0)}%` : ''
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {text}
        </text>
    );
};

export const colors = [
    '#DC3912',
    '#FF9900',
    '#109618',
    '#990099',
    '#3B3EAC',
    '#0099C6',
    '#DD4477',
    '#66AA00',
    '#B82E2E',
    '#316395',
    '#994499',
    '#22AA99',
    '#AAAA11',
    '#6633CC',
    '#E67300',
    '#8B0707',
    '#329262',
    '#5574A6',
    '#3B3EAC',
    '#3366CC'];