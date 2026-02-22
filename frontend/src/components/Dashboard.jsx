// frontend/src/components/Dashboard.jsx

import { useEffect, useState } from "react";
import api from "../api";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// simple dashboard showing total applications and a pie chart of status breakdown
export default function Dashboard({ refresh }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get("/analytics/summary")
      .then(res => { if (mounted) setData(res.data); })
      .catch(err => console.error("Analytics error", err));
    return () => { mounted = false };
  }, [refresh]);

  if (!data) return <p>Loading analytics...</p>;

  const chartData = {
    labels: Object.keys(data.status_breakdown),
    datasets: [
      {
        data: Object.values(data.status_breakdown),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],  // Simple colors
      }
    ]
  };

  return (
    <div className="dashboard">
      <h2>Analytics Overview</h2>
      <p>Total Applications: {data.total_applications}</p>
      <Pie data={chartData} />
    </div>
  );
}