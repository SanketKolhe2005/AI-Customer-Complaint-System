import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e"
];

export default function RiskChart({ complaints }) {

    const data = [
        {
            name: "High",
            value: complaints.filter(c=>c.risk_level==="High").length
        },
        {
            name:"Moderate",
            value: complaints.filter(c=>c.risk_level==="Moderate").length
        },
        {
            name:"Low",
            value: complaints.filter(c=>c.risk_level==="Low").length
        }
    ];

    return (

<div className="bg-white rounded-xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-5">
Risk Distribution
</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={data}
dataKey="value"
label
>

{data.map((entry,index)=>(

<Cell
key={index}
fill={COLORS[index]}
/>

))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

    );
}