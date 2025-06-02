import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SegmentBuilder from "./pages/SegmentBuilder";
import CampaignForm from "./pages/CampaignForm";
import CampaignHistory from "./pages/CampaignHistory";
import AllSegments from "./pages/AllSegments";
import CustomerExplorer from "./pages/CustomerExplorer";
import AddCustomer from "./pages/AddCustomer";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div className="bg-gray-100 min-h-screen">
      {!hideNavbar && (
        <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700">Xeno CRM</h1>
          <div className="space-x-4 text-sm">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/segments/new" className="hover:underline">New Segment</Link>
            <Link to="/segments" className="hover:underline">All Segments</Link>
            <Link to="/campaigns/new" className="hover:underline">Launch</Link>
            <Link to="/campaigns/history" className="hover:underline">History</Link>
            <Link to="/customers" className="hover:underline">Customers</Link>
            <a href="http://localhost:5000/auth/logout" className="text-red-500 hover:underline">Logout</a>


          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/segments/new" element={<SegmentBuilder />} />
        <Route path="/segments" element={<AllSegments />} />
        <Route path="/campaigns/new" element={<CampaignForm />} />
        <Route path="/campaigns/history" element={<CampaignHistory />} />
        <Route path="/customers" element={<CustomerExplorer />} />
        <Route path="/customers/new" element={<AddCustomer />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
