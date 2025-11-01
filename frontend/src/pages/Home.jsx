import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold mb-6">Welcome to Excel Dashboard 📈</h1>
        <p className="text-gray-400 mb-8 text-center w-3/4 md:w-1/2">
          Upload Excel files, visualize data dynamically, and explore insights instantly.
        </p>
        <div className="space-x-4">
          <Link
            to="/upload"
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Upload File
          </Link>
          <Link
            to="/dashboard"
            className="bg-green-600 px-5 py-2 rounded hover:bg-green-700"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
