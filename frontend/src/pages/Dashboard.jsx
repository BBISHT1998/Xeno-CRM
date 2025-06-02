import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const Dashboard = () => {
  const [stats, setStats] = useState({
    segments: 0,
    campaigns: 0,
    customers: 0,
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [segRes, campRes, custRes] = await Promise.all([
          axios.get("http://localhost:5000/api/segments", { withCredentials: true }),
          axios.get("http://localhost:5000/api/campaigns/history", { withCredentials: true }),
          axios.get("http://localhost:5000/api/customers", { withCredentials: true }),
        ]);

        setStats({
          segments: segRes.data.length,
          campaigns: campRes.data.length,
          customers: custRes.data.length,
        });

        setRecent(campRes.data.slice(0, 5)); // show only 5 latest campaigns
      } catch (err) {
        console.error("Dashboard load failed:", err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">CRM Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Segments", count: stats.segments, color: "blue" },
          { label: "Campaigns", count: stats.campaigns, color: "green" },
          { label: "Customers", count: stats.customers, color: "purple" },
        ].map((item) => (
          <div key={item.label} className={`bg-${item.color}-100 p-6 rounded shadow`}>
            <p className="text-sm text-gray-700">{item.label}</p>
            <p className={`text-2xl font-bold text-${item.color}-700`}>{item.count}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/segments/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          + New Segment
        </Link>
        <Link to="/campaigns/new" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Launch Campaign
        </Link>
        <Link to="/campaigns/history" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
          View History
        </Link>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Recent Campaigns</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Message</th>
                <th className="p-2">Segment</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.length > 0 ? recent.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-2">{c.message}</td>
                  <td className="p-2">{c.segmentId}</td>
                  <td className="p-2">{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td className="p-2 text-gray-500 italic" colSpan={3}>No campaigns yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10">
  <h2 className="text-xl font-semibold mb-2">Campaigns by Segment</h2>
  <div className="bg-white rounded shadow p-4">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={recent.reduce((acc, item) => {
          const existing = acc.find((a) => a.segment === item.segmentId);
          if (existing) existing.count += 1;
          else acc.push({ segment: item.segmentId, count: 1 });
          return acc;
        }, [])}
      >
        <XAxis dataKey="segment" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
