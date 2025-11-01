import { useState } from "react";
import api from "../services/api";

export default function FileUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Please select a file");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/excel/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("✅ File uploaded successfully!");
      if (onSuccess) onSuccess(res.data);
    } catch {
      setMsg("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl text-white">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block mb-3 text-sm text-gray-300"
        />
        <button
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {msg && <p className="mt-2 text-gray-300">{msg}</p>}
    </div>
  );
}
