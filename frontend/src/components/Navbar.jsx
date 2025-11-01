import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">📊 Excel Dashboard</h1>
      <div className="space-x-4">
        <Link to="/upload" className="hover:text-blue-400">Upload</Link>
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
