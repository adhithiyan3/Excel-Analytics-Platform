import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", { email, password });
      const res = await api.post("/auth/login", { email, password });
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.name));
      setMsg("Login successful");
      navigate("/upload");
    } catch {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl w-96">
        <h1 className="text-2xl mb-4 font-semibold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 bg-slate-700 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 bg-slate-700 rounded"
        />
        <button type="submit" className="bg-blue-600 w-full py-2 rounded">
          Login
        </button>
        {msg && <p className="text-red-400 mt-2">{msg}</p>}
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline font-bold">Register</Link>
        </div>
      </form>
    </div>
  );
}
