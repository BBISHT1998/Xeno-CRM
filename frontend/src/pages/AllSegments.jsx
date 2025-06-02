import { useEffect, useState } from "react";
import axios from "axios";

const AllSegments = () => {
  const [segments, setSegments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", logic: "AND" });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/segments`, { withCredentials: true })
      .then((res) => setSegments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this segment?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/segments/${id}`, {
        withCredentials: true,
      });
      setSegments((prev) => prev.filter((seg) => seg._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleEditClick = (segment) => {
    setEditingId(segment._id);
    setForm({ name: segment.name, logic: segment.logic });
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/segments/${editingId}`,
        form,
        { withCredentials: true }
      );
      setSegments((prev) =>
        prev.map((seg) =>
          seg._id === editingId ? res.data.segment : seg
        )
      );
      setEditingId(null);
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6"> All Segments</h2>
      <ul className="space-y-4">
        {segments.map((seg) => (
          <li
            key={seg._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {editingId === seg._id ? (
              <div className="flex gap-2 flex-col sm:flex-row">
                <input
                  className="border px-2 py-1"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <select
                  className="border px-2 py-1"
                  value={form.logic}
                  onChange={(e) => setForm({ ...form, logic: e.target.value })}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
                <button onClick={handleEditSave} className="bg-green-600 text-white px-2 py-1 rounded">💾 Save</button>
                <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <div>
                  <div className="font-semibold">{seg.name}</div>
                  <div className="text-sm text-gray-600">Logic: {seg.logic}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(seg)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(seg._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSegments;
