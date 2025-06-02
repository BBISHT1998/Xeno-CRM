import { useEffect, useState } from "react";
import axios from "axios";

const CampaignForm = () => {
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [launchResult, setLaunchResult] = useState(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/segments`, {
          withCredentials: true,
        });
        setSegments(res.data);
      } catch (err) {
        console.error("Error fetching segments:", err.message);
      }
    };
    fetchSegments();
  }, []);

  const handleLaunch = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/launch`,
        {
          segmentId: selectedSegment,
          message,
        },
        {
          withCredentials: true,
        }
      );
      setLaunchResult(res.data);
      alert("Campaign launched successfully!");
    } catch (err) {
      alert("Launch failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Launch Campaign</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Segment</label>
        <select
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
        >
          <option value="">-- Select Segment --</option>
          {segments.map((seg) => (
            <option key={seg._id} value={seg._id}>
              {seg.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your campaign message..."
        />
      </div>

      <button
        onClick={handleLaunch}
        disabled={loading || !selectedSegment || !message}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow disabled:opacity-50"
      >
        {loading ? "Launching..." : "Launch Campaign"}
      </button>

      {launchResult && (
        <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded text-sm text-green-800">
          <p className="font-semibold">✅ Campaign Launched</p>
          <pre className="mt-2">{JSON.stringify(launchResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CampaignForm;
