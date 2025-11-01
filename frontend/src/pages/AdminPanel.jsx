import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await api.get("/admin/uploads");
      setUploads(res.data);
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-4">🛠 Admin Panel</h1>
        <table className="w-full bg-slate-800 rounded-lg">
          <thead>
            <tr className="text-left bg-slate-700">
              <th className="p-3">User</th>
              <th className="p-3">Filename</th>
              <th className="p-3">Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((u) => (
              <tr key={u._id} className="border-b border-slate-700">
                <td className="p-3">{u.user?.name || "Unknown"}</td>
                <td className="p-3">{u.filename}</td>
                <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
