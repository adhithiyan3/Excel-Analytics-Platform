import { useEffect, useState } from "react";
import api from "../services/api";
import ChartDisplay from "./ChartDisplay";

export default function Dashboard() {
  const [uploads, setUploads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const res = await api.get("/excel/uploads");
      setUploads(res.data);
    };
    fetchUploads();
  }, []);

  const handleView = async (fileId) => {
    const res = await api.get(`/excel/view/${fileId}`);
    setSelected(fileId);
    setData(res.data);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl mb-4 font-semibold">📁 Uploaded Files</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {uploads.map((f) => (
          <div
            key={f._id}
            className={`p-4 rounded-lg cursor-pointer ${
              selected === f._id ? "bg-blue-700" : "bg-slate-800 hover:bg-slate-700"
            }`}
            onClick={() => handleView(f._id)}
          >
            <h3 className="text-lg font-medium">{f.filename}</h3>
            <p className="text-sm text-gray-400">
              Uploaded: {new Date(f.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl mb-3 font-semibold">📊 Data Preview</h2>
          <ChartDisplay data={data} xKey="Name" yKey="Value" />
        </div>
      )}
    </div>
  );
}
