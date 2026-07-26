import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TrendChart({ complaints }) {
  // Group complaints by date
  const grouped = complaints.reduce((acc, complaint) => {
    let date = "Unknown";

    if (complaint.created_at) {
      // Supports "27-07-2026 22:30" or ISO timestamps
      date = complaint.created_at.split(" ")[0];
    }

    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([date, count]) => ({
    date,
    complaints: count,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Complaint Trend
      </h2>

      {data.length === 0 ? (
        <div className="h-[320px] flex items-center justify-center text-gray-500">
          No complaint data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}