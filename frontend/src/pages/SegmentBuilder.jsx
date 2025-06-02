import { useState } from "react";
import axios from "axios";

const SegmentBuilder = () => {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [logic, setLogic] = useState("AND");
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState([]);

  const handleGenerateRules = async () => {
    try {
      setLoading(true);
      setRules([]);
      const res = await axios.post("http://localhost:5000/api/ai/rules", { prompt });
      setRules(res.data.rules);
    } catch (err) {
      alert("Error generating rules: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSegment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/segments",
        { name, rules, logic },
        { withCredentials: true }
      );
      setSaved(true);
      alert("Segment saved successfully!");
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  const handlePreview = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/segments/preview",
        { rules, logic },
        { withCredentials: true }
      );
      setPreview(res.data.customers);
    } catch (err) {
      alert("Preview failed: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Segment Builder</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
        <input
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., High Value Inactive Users"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Describe Your Segment</label>
        <textarea
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g., "users who spent more than 5000 and inactive for 60 days"'
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Logic</label>
        <select
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={logic}
          onChange={(e) => setLogic(e.target.value)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleGenerateRules}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Rules with AI"}
        </button>

        <button
          onClick={handlePreview}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded shadow"
          disabled={!rules.length}
        >
          Preview Customers
        </button>
      </div>

      {rules.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">🧠 AI Generated Rules</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto text-gray-700">
            {JSON.stringify(rules, null, 2)}
          </pre>

          <button
            onClick={handleSaveSegment}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Save Segment
          </button>
        </div>
      )}

      {saved && (
        <p className="mt-4 text-green-700 font-medium">✅ Segment saved successfully!</p>
      )}

      {preview.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">👥 Matching Customers</h3>
          <div className="overflow-x-auto bg-white border rounded shadow">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Spend</th>
                  <th className="p-2 text-left">Visits</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((cust) => (
                  <tr key={cust._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{cust.name}</td>
                    <td className="p-2">{cust.email}</td>
                    <td className="p-2">{cust.totalSpend}</td>
                    <td className="p-2">{cust.visits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentBuilder;
