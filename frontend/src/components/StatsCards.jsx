import { useEffect, useState } from "react";
import api from "../services/api";

function Card({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

export default function StatsCards({ refresh }) {

  const [stats, setStats] = useState({
    total: 0,
    high_risk: 0,
    duplicates: 0,
    today: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, [refresh]);

  async function loadDashboard() {

    try {

      const res = await api.get("/dashboard/");

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div className="grid md:grid-cols-4 gap-6">

      <Card
        title="Total Complaints"
        value={stats.total}
        color="text-blue-600"
      />

      <Card
        title="High Risk"
        value={stats.high_risk}
        color="text-red-600"
      />

      <Card
        title="Duplicates"
        value={stats.duplicates}
        color="text-yellow-500"
      />

      <Card
        title="Today's Cases"
        value={stats.today}
        color="text-green-600"
      />

    </div>

  );
}