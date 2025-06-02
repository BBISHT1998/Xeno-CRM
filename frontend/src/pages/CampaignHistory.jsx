import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/history", {
          withCredentials: true
        });
        setCampaigns(res.data);
        generateChart(res.data);
      } catch (err) {
        console.error("Failed to fetch campaigns:", err.message);
      }
    };

    fetchCampaigns();
  }, []);

  const generateChart = (data) => {
    const countsByDate = {};

    data.forEach((camp) => {
      const date = new Date(camp.createdAt).toLocaleDateString();
      countsByDate[date] = (countsByDate[date] || 0) + 1;
    });

    const labels = Object.keys(countsByDate);
    const values = Object.values(countsByDate);

    setChartData({
      labels,
      datasets: [
        {
          label: "Campaigns Launched",
          backgroundColor: "#3b82f6",
          data: values,
        },
      ],
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">📈 Campaign History</h2>

      {chartData && (
        <div className="mb-10 bg-white p-6 rounded shadow">
          <Bar data={chartData} />
        </div>
      )}

      <div className="bg-white shadow rounded p-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Message</th>
              <th className="p-3 border-b">Segment</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Campaign ID</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border-b">{c.message}</td>
                <td className="p-3 border-b">{c.segmentId?.name || c.segmentId || "N/A"}</td>
                <td className="p-3 border-b whitespace-nowrap">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="p-3 border-b text-xs text-gray-600 truncate">{c._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignHistory;
