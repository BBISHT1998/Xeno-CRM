import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; //  Import Link for routing

const CustomerExplorer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/customers`, {
          withCredentials: true,
        });
        setCustomers(res.data);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">👥 Customer Explorer</h1>

      {/* ✅ Add New Customer Button */}
      <Link
        to="/customers/new"
        className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add New Customer
      </Link>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Spend</th>
                <th className="p-2 text-left">Visits</th>
                <th className="p-2 text-left">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{cust.name}</td>
                  <td className="p-2">{cust.email}</td>
                  <td className="p-2">{cust.totalSpend}</td>
                  <td className="p-2">{cust.visits}</td>
                  <td className="p-2">
                    {new Date(cust.lastActive).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerExplorer;
