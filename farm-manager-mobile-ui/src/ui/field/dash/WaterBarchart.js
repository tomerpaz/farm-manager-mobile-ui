import { BarChart, Bar, LabelList, XAxis, ResponsiveContainer, Area, AreaChart, YAxis, CartesianGrid, Tooltip } from "recharts";

const COLOR = '#1c84c6';



const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
        <g style={{fontSize: 13}}>
            <text
                x={x + width / 2}
                y={y - radius}
                // fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {value.toFixed(0)}
            </text>
        </g>
    );
};

export default function WaterBarchart({data, text, waterUnit}) {
    // areaUnit={text[user.waterUnit]}
    return (
        <ResponsiveContainer width="100%" height={230}>

            <BarChart

                // width={150} height={40}
                data={data}
                margin={{
                    top: 10,
                    // right: 30,
                    // left: 20,
                    bottom: 18
                }}
            >
                <defs>
                    <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLOR} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLOR} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Bar dataKey="value" fill="url(#colorWater)" minPointSize={5}>
                    <LabelList dataKey="value" content={renderCustomizedLabel} />
                </Bar>
                <XAxis
                    label={{ value: `${text[waterUnit]}/${text.month}`, position: 'bottom' }}
                    axisLine={false} tickLine={false} dataKey="key" />
            </BarChart>
        </ResponsiveContainer>
    );
}