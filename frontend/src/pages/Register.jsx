import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", user);
      navigate("/login");
    } catch {
      setMsg("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl w-96">
        <h1 className="text-2xl mb-4 font-semibold">Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full mb-3 p-2 bg-slate-700 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full mb-3 p-2 bg-slate-700 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full mb-3 p-2 bg-slate-700 rounded"
        />
        <button type="submit" className="bg-green-600 w-full py-2 rounded">
          Register
        </button>
        {msg && <p className="text-red-400 mt-2">{msg}</p>}
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-bold">Login</Link>
        </div>
      </form>
    </div>
  );
}
