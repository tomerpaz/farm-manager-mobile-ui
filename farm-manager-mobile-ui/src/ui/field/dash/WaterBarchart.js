import { BarChart, Bar, LabelList, XAxis, ResponsiveContainer } from "recharts";

const data = [
    {
        name: "1",
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "2",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "3",
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "4",
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: "5",
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: "6",
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: "7",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
        <g>
            <text
                x={x + width / 2}
                y={y - radius}
                // fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {value}
            </text>
        </g>
    );
};

export default function WaterBarchart() {
    return (
        <ResponsiveContainer width="100%" height={300}>

            <BarChart

                width={150} height={40}
                data={data}
                margin={{
                    top: 20,
                    // right: 30,
                    // left: 20,
                    bottom: 20
                }}
            >
                <Bar dataKey="pv" fill="#8884d8" minPointSize={5}>
                    <LabelList dataKey="pv" content={renderCustomizedLabel} />
                </Bar>
                <XAxis
                    label={{ value: 'Month', position: 'bottom' }}
                    axisLine={false} tickLine={false} dataKey="name" />
            </BarChart>
        </ResponsiveContainer>
    );
}
