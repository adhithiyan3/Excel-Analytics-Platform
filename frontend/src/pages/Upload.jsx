import { useState } from "react";
import api from "../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Please select a file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
   const res = await api.post("/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

      setMsg(`✅ Uploaded successfully: ${res.data.filename || "File"}`);
    } catch (err) {
      setMsg(`❌ Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 font-semibold">Upload Excel File</h1>
      <form onSubmit={handleUpload} className="bg-slate-800 p-6 rounded-lg">
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block mb-4 text-sm text-gray-300"
        />
        <button
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
