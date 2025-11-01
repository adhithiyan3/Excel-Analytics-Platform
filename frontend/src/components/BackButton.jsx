import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-blue-400 hover:text-blue-500"
    >
      <ArrowLeft size={18} className="mr-2" /> Back
    </button>
  );
}
